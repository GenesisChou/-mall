<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    .index {
        overflow: hidden;
        background-color: $gray-light;
    }
    
    .icon-list {
        margin: pxTorem(20) 0;
        overflow: hidden;
        color: $gray;
        li {
            position: relative;
            width: 25%;
            height: pxTorem(138);
            float: left;
            text-align: center;
            font-size: pxTorem(24);
            background-color: $white;
            &:active {
                background-color: darken($white, 10%);
            }
        }
        .iconfont {
            display: block;
            width: 100%;
            height: pxTorem(80);
            padding-top: pxTorem(10);
            font-size: pxTorem(50);
        }
        .icon-money {
            color: rgb(14, 75, 171);
        }
        .icon-check-in {
            font-size: pxTorem(43);
            padding-top: pxTorem(15);
            color: rgb(42, 170, 24);
        }
        .icon-order-unsolved {
            color: rgb(202, 84, 70);
        }
        .icon-product {
            color: rgb(231, 143, 65);
        }
    }
    
    .v-item:nth-child(1) {
        border-top: 0;
    }
    
    .v-item:nth-child(2) {
        border-top: 0;
    }
    
    .v-item:nth-child(2n-1) {
        border-left: 0;
    }
    
    .v-item:nth-child(2n) {
        border-right: 0;
    }
    
    .subject {
        margin-bottom: pxTorem(20);
        overflow: hidden;
        background-color: $white;
        img {
            width: 100%;
            height: 100%;
        }
        >div {
            float: left;
            width: 50%;
            height: pxTorem(400);
        }
        .left div:active,
        .right div:active {
            background-color: darken($white, 5%);
        }
        .left {
            div {
                width: 100%;
                height: 100%;
            }
        }
        .right {
            border-left: 1px solid $gray-light;
            div {
                width: 100%;
                height: 50%;
                &:nth-child(1) {
                    border-bottom: 1px solid $gray-light;
                }
            }
        }
    }
    .hot-list{
        overflow:hidden;
    }
</style>
<template>
    <div class='index '>
        <v-swipe></v-swipe>
        <ul class='list-inline icon-list'>
            <router-link :to='{name:"my_integral"}' tag='li'>
                <i class=' icon-money iconfont  '></i>
                <p>我的积分</p>
            </router-link>
            <router-link :to='{name:"check_in"}' tag='li'>
                <i class=' icon-check-in iconfont  '></i>
                <p>每日签到</p>
            </router-link>
            <router-link :to='{name:"order_list"}' tag='li'>
                <i class=' icon-order-unsolved iconfont  '></i>
                <v-badage :num='user.unfinished_order_count'></v-badage>
                <p>我的订单</p>
            </router-link>
            <router-link :to='{name:"product_list"}' tag='li'>
                <i class=' icon-product iconfont  '></i>
                <p>所有商品</p>
            </router-link>
        </ul>
        <!-- 专题列表 -->
        <div v-if='subject_show' class='subject'>
            <div class='left'>
                <router-link :to='{name:"subject_detail",query:{subject_id:subject_list[0].id}}' tag='div'>
                    <img :src='subject_list[0].pic_main'>
                </router-link>
            </div>
            <div class='right'>
                <router-link :to='{name:"subject_detail",query:{subject_id:subject_list[1].id}}' tag='div'>
                    <img :src='subject_list[1].pic_second'>
                </router-link>
                <router-link :to='{name:"subject_detail",query:{subject_id:subject_list[2].id}}' tag='div'>
                    <img :src='subject_list[2].pic_second'>
                </router-link>
            </div>
        </div>
        <section class='hot-list'>
            <!-- 热门推荐 -->
            <v-item v-for='item in hot_commend' :item='item' type='commend'></v-item>
            <!-- 热门 -->
            <v-item v-for='item in hot_items' :item='item' type='item'></v-item>
        </section>
        <v-load-more v-if='busy'></v-load-more>
        <v-support v-if='support_show'></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vSwipe from 'components/index/vSwipe.vue'
    import vItem from 'components/index/vItem.vue'
    export default {
        name: 'index',
        components: {
            vSwipe,
            vItem,
        },
        data() {
            return {
                hot_items: [],
                hot_commend: [],
                subject_list: [],
                params: {
                    p: 1,
                    r: APP.PERPAGE,
                    total: 0,
                    count: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    pro_st: ''
                },
                scroll_event: '',
                support_show: false,
                subject_show: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            busy() {
                return this.params.total > this.params.p;
            },
            subject_show() {
                return this.subject_list.length >= 3;
            }
        },
        created() {
            this.getHotCommend();
            this.$store.dispatch('toggleLoading');
            this.getHotItems().then(() => {
                this.support_show = true;
                this.$store.dispatch('toggleLoading');
            }).catch(() => {
                this.$store.dispatch('toggleLoading');
            });
            this.getSubjectList();
            this.scroll_event = this.getScrollEvent();
        },
        activated() {
            var position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        deactivated() {
            window.removeEventListener('scroll', this.scroll_event);
        },
        methods: {
            getSubjectList() {
                this.$http.post(`${APP.HOST}/subject_list`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.data.list.length >= 3) {
                        this.subject_list = data.data.list;
                    }
                }, (response) => {});
            },
            getHotCommend() {
                this.$http.post(`${APP.HOST}/hot_commend`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.hot_commend = data.data;
                }, (response) => {});
            },
            //  热门商品和活动列表，用于首页列表
            getHotItems() {
                return new Promise((resolve, reject) => {
                    this.$http.post(`${APP.HOST}/hot_item`, this.params).then((response) => {
                        let data = response.data;
                        this.params.total = data.data.total;
                        this.params.pro_st = data.data.pro_st;
                        this.hot_items = this.hot_items.concat(data.data.list);
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        reject();
                    });


                })
            },
            getScrollEvent() {
                let scroll = true;
                return utils.debounce(() => {
                    if (scroll && this.busy && utils.touchBottom()) {
                        scroll = false;
                        this.params.p++;
                        this.getHotItems().then(() => {
                            scroll = true;
                        });
                    }
                }, 500, 500);
            },
        }
    };
</script>