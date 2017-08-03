<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .my-wish {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .my-wish-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .slide {
        height: pxTorem(200);
    }

    .tab-content {
        padding: pxTorem(26) pxTorem(24) 0 pxTorem(24);
        overflow: hidden;
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
            background: $white;
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
        @include active($white, 2%);
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
            color: rgba(0, 0, 0, .48);
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

    .empty {
        flex: 1;
        background: $white;
        text-align: center;
        img {
            width: pxTorem(750);
            height: pxTorem(600);
        }
        h2 {
            color: #707e89;
        }
    }
</style>
<template>
    <div class='my-wish'>
        <div class='my-wish-content'>
            <v-slide :items='banners'></v-slide>
            <ul class='tabs'>
                <li :class='{active:status==3}' @click='changeStatus(3)'>可支持心愿</li>
                <li :class='{active:status==4}' @click='changeStatus(4)'>已实现心愿</li>
            </ul>
            <template v-if='wish_list'>
                <div v-if='wish_list.length>0' class='tab-content'>
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
                <div v-else class='empty'>
                    <img src='./images/empty.png'>
                    <h2 v-if='status===4'>您暂时还没有已实现的心愿哦！</h2>
                    <h2 v-if='status===3'>您暂时还没有可支持的心愿哦！</h2>
                </div>
            </template>
        </div>
        {{name}}
        <v-support></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vBackTop from 'components/vBackTop';
    import vWish from '../../components/vWish';
    import vSlide from '../../components/vSlide.vue';
    export default {
        name: 'myWish',
        props: {
            name: String
        },
        components: {
            vWish,
            vSlide,
            vBackTop
        },
        data() {
            return {
                wish_list: '',
                status: 3,
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            banners() {
                return this.$store.state.wish.banners;
            }
        },
        filters: {
            date_format(value) {
                const temp = value.split(' ')[0].split('-');
                let month = temp[1],
                    day = temp[2];
                month = temp[1] >= 10 ? temp[1] : Math.floor(temp[1]);
                day = temp[2] >= 10 ? temp[2] : Math.floor(temp[2]);
                return `${month}月${day}日`;
            }
        },
        beforeRouteLeave(to, from, next) {
            this.router_state = 'leave';
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            this.$store.dispatch('updatePageView');
            next();
        },
        activated() {
            this.router_state = 'enter';
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
        },
        created() {
            this.getMyWishes();
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
                            this.wish_list = data.data;
                            if (typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
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
                this.wish_list = '';
                this.getMyWishes();
            }
        }
    };
</script>