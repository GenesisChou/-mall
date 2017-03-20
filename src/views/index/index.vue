<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .icon-list {
        @include list-inline;
        margin-bottom: pxTorem(15);
        border-bottom: 1px solid #d3d4d6;
        color: #666;
        background-color: $white;
        font-size: pxTorem(24);
        li {
            @include active;
            @include flex-center;
            @include flex-direction(column);
            width: 25%;
            height: pxTorem(190);
            position: relative;
            text-align: center;
            .v-badage {
                @include flex-center;
                width: pxTorem(50);
                height: pxTorem(50);
                position: absolute;
                right: pxTorem(45);
                top: pxTorem(0);
                background-color: $white;
                color: $red;
                border-radius: 50%;
                border: 2px solid $red;
                box-sizing: content-box;
                z-index: 1;
                transform: scale(0.5);
                -webkit-transform: scale(0.5);
            }
        }
        .icon {
            width: pxTorem(95);
            height: pxTorem(95);
            margin-bottom: pxTorem(15);
        }
    }
    
    .subject {
        width: pxTorem(750);
        height: pxTorem(376);
        margin-bottom: pxTorem(20);
        overflow: hidden;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        .left {
            width: 50%;
            height: 100%;
            padding: pxTorem(15) pxTorem(7.5) pxTorem(15) pxTorem(10);
            float: left;
        }
        .right {
            width: 50%;
            height: 50%;
            float: right;
        }
        img {
            @include active;
        }
        img:nth-child(2) {
            padding: pxTorem(15) pxTorem(10) pxTorem(5) pxTorem(7.5);
        }
        img:nth-child(3) {
            padding: pxTorem(5) pxTorem(10) pxTorem(15) pxTorem(7.5);
        }
    }
    
    .advs li {
        list-style: none;
    }
    
    .main {
        @include clearfix;
        background-color: $white;
    }
</style>
<template>
    <div class='index '>
        <v-swipe></v-swipe>
        <ul class='icon-list'>
            <router-link :to='{name:"my_account"}' tag='li'>
                <img class='icon' src='./images/myAccount.png'>
                <p>我的账户</p>
            </router-link>
            <router-link :to='{name:"earn_integral"}' tag='li'>
                <img class='icon' src='./images/earnIntegral.png'>
                <p>赚取积分</p>
            </router-link>
            <router-link :to='{name:"order_list"}' tag='li'>
                <img class='icon' src='./images/myOrder.png'>
                <!--
                <b v-if='user.unfinished_order_count>0' class='v-badage'>{{user.unfinished_order_count}}</b>
                -->
                <p>我的订单</p>
            </router-link>
            <router-link :to='{name:"product_list"}' tag='li'>
                <img class='icon' src='./images/allProduct.png'>
                <p>所有商品</p>
            </router-link>
        </ul>
        <!-- 专题 -->
        <div v-if='subject_show' class='subject'>
            <img class='left' @click='routerLink(subject_list[0])' :src='subject_list[0].pic_main'>
            <img class='right' @click='routerLink(subject_list[1])' :src='subject_list[1].pic_second'>
            <img class='right' @click='routerLink(subject_list[2])' :src='subject_list[2].pic_second'>
        </div>
        <!-- 广告列表 -->
        <ul class='advs'>
            <li v-for='adv in hot_adcolumn'>
                <v-adv :adv='adv'></v-adv>
            </li>
        </ul>
        <!-- balabala -->
        <main class='main'>
            <!-- 热门推荐 -->
            <v-item v-for='item in hot_commend' :item='item' type='commend'></v-item>
            <!-- 热门 -->
            <v-item v-for='item in hot_items' :item='item' type='item'></v-item>
        </main>
        <v-load-more v-if='busy'></v-load-more>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vSwipe from './components/vSwipe';
    import vItem from './components/vItem';
    import vAdv from './components/vAdv';
    import vBackTop from 'components/vBackTop';
    export default {
        name: 'index',
        components: {
            vSwipe,
            vItem,
            vAdv,
            vBackTop
        },
        data() {
            return {
                hot_items: [],
                hot_commend: [],
                hot_adcolumn: [],
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
        activated() {
            let position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        created() {
            this.getHotCommend();
            this.getHotAdcolumn();
            this.getSubjectList();
            this.$store.dispatch('toggleLoading');
            this.getHotItems().then(() => {
                this.$store.dispatch('toggleLoading');
            }).catch(() => {
                this.$store.dispatch('toggleLoading');
            });
            this.scroll_event = this.getScrollEvent();
        },
        beforeRouteLeave(to, from, next) {
            window.removeEventListener('scroll', this.scroll_event);
            next();
        },
        methods: {
            getSubjectList() {
                this.$http.post(`${APP.HOST}/subject_list`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.data.length >= 3) {
                        this.subject_list = data.data;
                    }
                });
            },
            getHotCommend() {
                this.$http.post(`${APP.HOST}/hot_commend`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.hot_commend = data.data;
                });
            },
            getHotAdcolumn() {
                this.$http.post(`${APP.HOST}/hot_adcolumn`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.hot_adcolumn = data.data;
                });
            },
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
            routerLink(subject) {
                //type 1 外链 type 2 详情
                const type = subject.type,
                    url = subject.url;
                if (type == 1) {
                    const product_id = utils.getParameterByName('product_id',url),
                        activity_id = utils.getParameterByName('activity_id',url);
                    if (product_id) {
                        this.$router.push({
                            name: "product_detail",
                            query: {
                                product_id
                            }
                        });
                    } else if (activity_id) {
                        this.$router.push({
                            name: "activity_detail",
                            query: {
                                activity_id
                            }
                        });
                    } else {
                        location.href = subject.url;
                    }
                } else if (type == 2) {
                    this.$router.push({
                        name: "subject_detail",
                        query: {
                            subject_id: subject.id,
                        }
                    });
                }
            }
        },
    };
</script>