<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .slide {
        height: pxTorem(200);
    }

    .tab-content {
        padding: pxTorem(26) pxTorem(24) pxTorem(100) pxTorem(24);
        background: $white;
    }

    .tabs {
        display: flex;
        border-bottom: 1px solid #d3d4d6;
        li {
            position: relative;
            flex: 1;
            height: pxTorem(80);
            line-height: pxTorem(80);
            font-size: pxTorem(30);
            color: #bababa;
            text-align: center;
            list-style: none;
            &.active {
                color: #ff5000;
            }
        }
        li:nth-child(2) {
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: 1px;
                height: pxTorem(48);
                margin-top: pxTorem(-24);
                background: #f2f3f4;
            }
        }
    }

    .wish {
        @include active($white,2%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: pxTorem(703);
        height: pxTorem(215); // padding: pxTorem(27) 0;
        margin-bottom: pxTorem(23);
        background: $white;
        border-radius: pxTorem(20);
        box-shadow: 0 0 pxTorem(20) rgba(0, 0, 0, .1);
    }



    .message {
        flex: 1;
        height: 100%;
        padding-top: pxTorem(56);
        margin-left: pxTorem(60);
        overflow: hidden;
        strong {
            font-size: pxTorem(31);
            margin-right: pxTorem(10);
        }
        .date {
            font-size: pxTorem(22);
            font-weight: normal; // width: 100%;
        }
        p {
            max-height: pxTorem(72);
            padding-right: pxTorem(10);
            overflow: hidden;
            font-size: pxTorem(22);
            color: #a9aaae;
        }
    }

    .right {
        width: pxTorem(235);
        h5 {
            text-align: center;
        }
        .number {
            font-size: pxTorem(45);
            color: #ff5f17;
            margin-right: pxTorem(12);
            &.blue {
                color: #00a1e0;
            }
        }
    }
</style>
<template>
    <div class='mine'>
        <v-slide :items='slides'></v-slide>
        <ul class='tabs'>
            <li :class='{active:status==3}' @click='changeStatus(3)'>可支持心愿</li>
            <li :class='{active:status==4}' @click='changeStatus(4)'>已支持心愿</li>
        </ul>
        <div class='tab-content'>
            <div v-for='wish in wish_list' class='wish' @click='toWishDetail(wish)'>
                <div class='message'>
                    <strong>{{user.nickname}} </strong><span class='date'>{{wish.create_time|date_format}}</span>
                    <p>{{wish.desc}}</p>
                </div>
                <div class='right'>
                    <h5>
                        已经有
                    </h5>
                    <h5>
                        <span class='number'>{{wish.score}}</span>人支持
                    </h5>
                </div>
            </div>
        </div>
        <v-menu></v-menu>
    </div>
</template>
<script>
    import vMenu from 'components/vMenu';
    import vWish from '../../components/vWish';
    import vSlide from '../../components/vSlide.vue';
    export default {
        name: 'myWish',
        components: {
            vMenu,
            vWish,
            vSlide
        },
        data() {
            return {
                wish_list: [],
                status: 3,
                slides: []
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        filters: {
            date_format(value) {
                const date = new Date(value);
                return `${date.getMonth()}月${date.getDate()}日`;
            }
        },
        created() {
            this.getMyWishes();
            this.getSlides();
        },
        methods: {
            getMyWishes() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/my_wishes`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        status: this.status,
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.wish_list = data.data.list;
                            if (typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
                });
            },
            getSlides() {
                this.$http.post(`${APP.HOST}/wish_wall_banner`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.slides = data.data.items;
                    }
                });
            },
            toWishDetail(wish) {
                this.$router.push({
                    name: 'wish_detail',
                    query: {
                        wish_id: wish.id
                    }
                });
            },
            changeStatus($index) {
                this.status = $index;
                this.getMyWishes();
            }
        }
    };
</script>