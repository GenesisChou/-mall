<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .wish-list {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .wish-list-content {
        flex: 1;
    }

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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: pxTorem(26);
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

    .finish {
        position: absolute;
        right: pxTorem(-20);
        top: pxTorem(-20);
        width: pxTorem(136);
        height: pxTorem(110);
    }

    .notice {
        position: relative;
        border-top: 2px dotted #e0e0e0;
        h4 {
            line-height: pxTorem(80);
            text-align: center;
        }
        .content {
            display: flex;
            align-items: center;
            height: pxTorem(140);
            padding: 0 pxTorem(12);
            img {
                width: pxTorem(102);
                height: pxTorem(102);
            }
            .summary {
                flex: 1;
                padding-left: pxTorem(20);
                h6 {
                    color: #a9aaae;
                }
            }
            .button {
                @include active(#00a1e0, 5%);
                display: flex;
                justify-content: center;
                align-items: center;
                width: pxTorem(155);
                height: pxTorem(50);
                font-size: pxTorem(24);
                border-radius: pxTorem(10);
                color: $white;
                background: #00a1e0;
            }
        }
        .circle {
            position: absolute;
            z-index: 1;
            top: pxTorem(-30);
            width: pxTorem(60);
            height: pxTorem(60);
            border-radius: 50%;
            background: $white;
            box-shadow: 0 0 pxTorem(20) rgba(0, 0, 0, .1);
            &.circle-left {
                left: pxTorem(-30);
            }
            &.circle-right {
                right: pxTorem(-30);
            }
        }
    }
</style>
<template>
    <div class='wish-list'>
        <div class='wish-list-content'>
            <v-slide :items='banners'></v-slide>
            <div class='search'>
                <form class='form-control' action='javascript:return true;'>
                    <i class='iconfont icon-search' @click='search'></i>
                    <input v-model='params.sword' type='search' placeholder='请输入关键字' @keyup.enter='search' @blur='toggleClear' @focus='toggleClear'
                        id='search'>
                    <i class='iconfont icon-close-circle' @click='params.sword=""'></i>
                </form>
            </div>
            <ul class='tabs'>
                <li :class='{active:params.status==""}' @click='changeStatus("")'>全部</li>
                <li :class='{active:params.status==3}' @click='changeStatus(3)'>可支持心愿</li>
                <li :class='{active:params.status==4}' @click='changeStatus(4)'>已支持心愿</li>
            </ul>
            <div class='tab-content'>
                <v-wish v-for='wish in wish_list' :wish='wish' :callback='supportCallback' :type='wish.status===4?2:1'>
                    <template v-if='wish.status===4'>
                        <img class='finish' src='../../images/finish.png'>
                        <div class='notice'>
                            <h4><strong>{{wish.reply_characters}}</strong></h4>
                            <div v-if='wish.is_reply_product===1' class='content'>
                                <img :src='wish.product_pic_thumb'>
                                <div class='summary'>
                                    <h5><strong>{{wish.product_name}}</strong></h5>
                                    <h6>{{wish.product_name_show}}</h6>
                                </div>
                                <router-link :to='{name:"product_detail",query:{product_id:wish.product_id}}' class='button' tag='div'>去兑换</router-link>
                            </div>
                        </div>
                    </template>
                </v-wish>
            </div>
        </div>
        <v-support :busy='busy'></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vBackTop from 'components/vBackTop';
    import vWish from '../../components/vWish';
    import vSlide from '../../components/vSlide.vue';
    export default {
        name: 'all',
        components: {
            vBackTop,
            vWish,
            vSlide
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            banners() {
                return this.$store.state.wish.banners;
            }
        },
        data() {
            return {
                wish_list: [],
                router_state: '',
                params: {
                    sword: '',
                    status: '',
                    total: '',
                    p: 1,
                    r: APP.PERPAGE,
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                },
                scroll_event: '',
                busy: false,
            };
        },
        activated() {
            this.router_state = 'enter';
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        created() {
            this.$store.dispatch('toggleLoading');
            this.getWishList().then(data => {
                this.wish_list = data.data.list;
                this.$store.dispatch('toggleLoading');
            }).catch(() => {
                this.$store.dispatch('toggleLoading');
            });
            this.getSlides();
            this.scroll_event = this.getScrollEvent();
        },
        beforeRouteLeave(to, from, next) {
            this.router_state = 'leave';
            this.$store.dispatch('savePosition', position => {
                position[from.name] = utils.getScrollTop();
            });
            window.removeEventListener('scroll', this.scroll_event);
            this.$store.dispatch('updatePageView');
            next();
        },
        methods: {
            getScrollEvent() {
                let scroll = true;
                return utils.debounce(() => {
                    this.busy = this.params.total > this.params.p;
                    if (scroll && this.busy && utils.touchBottom()) {
                        scroll = false;
                        this.params.p++;
                        this.getWishList().then(data => {
                            this.wish_list = this.wish_list.concat(data.data.list);
                            scroll = true;
                        });
                    }
                }, 500, 500);
            },
            getWishList() {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/wishes_list`, this.params).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            const total = data.data.total;
                            this.params.total = total;
                            if (total > data.data.p) {
                                this.busy = true;
                            }
                            if (typeof resolve === 'function') {
                                resolve(data);
                            }
                        } else {
                            reject();
                        }
                    }, () => {
                        reject();
                    });
                });
            },
            search() {
                this.params.p = 1;
                this.$store.dispatch('toggleLoading');
                this.getWishList().then(data => {
                    this.wish_list = data.data.list;
                    this.$store.dispatch('toggleLoading');
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            changeStatus($index) {
                this.params.p = 1;
                this.params.status = $index;
                this.$store.dispatch('toggleLoading');
                this.getWishList().then(data => {
                    this.wish_list = data.data.list;
                    this.$store.dispatch('toggleLoading');
                }).catch(() => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            supportCallback(wish) {
                for (let i = 0; i < this.wish_list.length; i++) {
                    if (this.wish_list[i].id === wish.id) {
                        this.wish_list[i].is_support = 1;
                        this.wish_list[i].score++;
                        return;
                    }
                }
            },
            toggleClear(state) {
                event.target.parentElement.querySelector('.icon-close-circle').classList.toggle('active');
            },
        }
    };
</script>