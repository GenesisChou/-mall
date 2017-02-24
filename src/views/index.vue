<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .icon-list {
        margin-bottom: pxTorem(15);
        border-bottom: 1px solid #d3d4d6;
        overflow: hidden;
        color: #666;
        background-color: $white;
        font-size: pxTorem(24);
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            display: -webkit-flex;
            -webkit-flex-direction: column;
            -webkit-justify-content: center;
            -webkit-align-items: center;
            width: 25%;
            float: left;
            height: pxTorem(190);
            position: relative;
            text-align: center;
            &:active {
                background-color: darken($white, 10%);
            }
            .v-badage {
                display: flex;
                display: -webkit-flex;
                align-items: center;
                -webkit-align-items: center;
                justify-content: center;
                -webkit-justify-content: center;
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
        margin-bottom: pxTorem(20);
        overflow: hidden;
        background-color: $white;
        padding: pxTorem(7.5);
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
                padding: pxTorem(7.5);
            }
        }
        .right {
            div {
                width: 100%;
                height: 50%;
                padding: pxTorem(7.5);
            }
        }
    }
</style>
<template>
    <div class='index '>
        <v-swipe></v-swipe>
        <ul class='list-inline icon-list'>
            <router-link :to='{name:"my_account"}' tag='li'>
                <img class='icon' src='../assets/images/myAccount.png'>
                <p>我的账户</p>
            </router-link>
            <router-link :to='{name:"earn_integral"}' tag='li'>
                <img class='icon' src='../assets/images/earnIntegral.png'>
                <p>赚取积分</p>
            </router-link>
            <router-link :to='{name:"order_list"}' tag='li'>
                <img class='icon' src='../assets/images/myOrder.png'>
                <!--
                <b v-if='user.unfinished_order_count>0' class='v-badage'>{{user.unfinished_order_count}}</b>
                -->
                <p>我的订单</p>
            </router-link>
            <router-link :to='{name:"product_list"}' tag='li'>
                <img class='icon' src='../assets/images/allProduct.png'>
                <p>所有商品</p>
            </router-link>
        </ul>
        <!-- 专题列表 -->
        <div v-if='subject_show' class='subject'>
            <div class='left'>
                <router-link :to='{
                    name:"subject_detail",
                    query:{subject_id:(subject_list[0].id).toString() }}' tag='div'>
                    <img :src='subject_list[0].pic_main'>
                </router-link>
            </div>
            <div class='right'>
                <router-link :to='{
                    name:"subject_detail",
                    query:{subject_id:(subject_list[1].id).toString()}}' tag='div'>
                    <img :src='subject_list[1].pic_second'>
                </router-link>
                <router-link :to='{
                    name:"subject_detail",
                    query:{subject_id:(subject_list[2].id).toString()}}' tag='div'>
                    <img :src='subject_list[2].pic_second'>
                </router-link>
            </div>
        </div>
        <main class='clearfix'>
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
    import vSwipe from 'components/index/vSwipe.vue'
    import vItem from 'components/index/vItem'
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
            this.$store.dispatch('toggleLoading');
            this.getHotItems().then(() => {
                this.$store.dispatch('toggleLoading');
            }).catch(() => {
                this.$store.dispatch('toggleLoading');
            });
            this.getSubjectList();
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
        },
    };
</script>