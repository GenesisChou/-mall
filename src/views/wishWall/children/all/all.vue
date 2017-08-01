<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .slide {
        height: pxTorem(200);
    }

    .search {
        padding: pxTorem(30) pxTorem(32);
        background: #f2f3f4;
        .form-control {
            @include flex-center-v; // width: pxTorem(593);
            height: pxTorem(72);
            border-radius: pxTorem(20);
            background-color: $white;
        }
        .iconfont {
            width: pxTorem(60);
            text-align: center;
            font-size: pxTorem(36);
            color: #bababa;
        }
        .icon-close-circle {
            display: none;
            &.active {
                display: block;
            }
        }
        input {
            flex: 1;
            height: 100%;
            width: pxTorem(610);
            border: 0;
            font-size: pxTorem(28);
            color: $orange;
            text-shadow: 0 0 0 #bababa;
            -webkit-text-fill-color: transparent;
        }
         ::-webkit-input-placeholder {
            color: #bababa;
        }
        input[type=search]::-webkit-search-cancel-button {
            display: none;
        }
        span {
            font-size: pxTorem(32);
        }
        &.top {
            position: absolute;
        }
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
        li:nth-child(2),
        li:nth-child(3) {
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

    .achived {
        position: absolute;
        right: pxTorem(6);
        top: pxTorem(66);
        width: pxTorem(180);
        height: pxTorem(105);
    }
</style>
<template>
    <div class='all'>
        <v-slide :items='slides'></v-slide>
        <div class='search'>
            <form class='form-control' action='javascript:return true;'>
                <i class='iconfont icon-search' @click='search'></i>
                <input v-model='sword' type='search' placeholder='请输入关键字' @keyup.enter='search'>
                <i class='iconfont icon-close-circle'></i>
            </form>
        </div>
        <ul class='tabs'>
            <li :class='{active:status==""}' @click='changeStatus("")'>全部</li>
            <li :class='{active:status==3}' @click='changeStatus(3)'>可支持心愿</li>
            <li :class='{active:status==4}' @click='changeStatus(4)'>已支持心愿</li>
        </ul>
        <div class='tab-content'>
            <v-wish v-for='wish in wish_list' :wish='wish'></v-wish>
        </div>
        <v-menu></v-menu>
    </div>
</template>
<script>
    import vMenu from 'components/vMenu';
    import vWish from '../../components/vWish';
    import vSlide from '../../components/vSlide.vue';
    export default {
        name: 'all',
        components: {
            vMenu,
            vWish,
            vSlide
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        data() {
            return {
                sword: '',
                status: '',
                wish_list: [],
                slides: []
            };
        },
        created() {
            this.getWishList();
            this.getSlides();
        },
        methods: {
            getWishList() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/wishes_list`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        status: this.status,
                        sword: this.sword
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
            search() {
                this.getWishList();
            },
            changeStatus($index) {
                this.status = $index;
                this.getWishList();
            }
        }
    };
</script>