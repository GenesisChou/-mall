<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .product-detail {
        min-height: 100%;
        padding-bottom: pxTorem(85);
        background-color: #f2f3f4;
    }

    .header {
        position: relative;
    }

    .space {
        height: pxTorem(80);
    }

    .adv {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: pxTorem(80);
        padding-left: pxTorem(24);
        line-height: pxTorem(80);
        background-color: rgba(0, 0, 0, .7);
        font-size: pxTorem(32);
        color: $white;
        z-index: 1;
        span {
            position: relative;
        }
        img {
            position: absolute;
            right: pxTorem(-70);
            top: 0;
            width: pxTorem(63);
            height: pxTorem(22);
            animation: drift infinite 1.5s linear;
        }
        .arrows {
            position: absolute;
            right: pxTorem(20);
            top: 50%;
            transform: translateY(-50%);
            animation: shaking infinite 1.5s linear;
        }
        .icon-arrows-right {
            font-size: bold;
            font-size: pxTorem(36);
            &:last-child {
                margin-left: pxTorem(-30);
                margin-right: 0;
            }
        }
    }

    @keyframes shaking {
        0% {
            right: pxTorem(20);
        }
        25% {
            right: pxTorem(10);
        }
        50% {

            right: pxTorem(20);
        }
        75% {
            right: pxTorem(30);
        }
        100% {
            right: pxTorem(20);
        }
    }


    @keyframes drift {
        0% {
            transform: translateY(0%);
        }
        25% {
            transform: translateY(-10%);
        }
        50% {
            transform: translateY(0%);
        }
        75% {
            transform: translateY(10%);
        }
        100% {
            transform: translateY(0%);
        }
    }

    .back {
        position: absolute;
        left: pxTorem(38);
        top: pxTorem(24);
        width: pxTorem(94);
        height: pxTorem(94);
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(200);
        img {
            width: 100%;
            height: 100%;
        }
    }

    .title {
        @include flex-center-h;
        flex-direction: column;
        height: pxTorem(140);
        padding-left: pxTorem(30);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        h1 {
            font-size: pxTorem(34);
        }
        h3 {
            display: inline-block;
            color: $orange;
        }
        .number {
            font-size: pxTorem(36);
        }
        s {
            padding-left: 0.4rem;
            color: #6e6f6f;
            transform: scale(0.6) translateY(10%);
            display: inline-block;
            transform-origin: left;
        }
    }

    .main {
        padding-bottom: pxTorem(100);
    }

    .sticky {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        padding: 0 pxTorem(30) pxTorem(30) pxTorem(30);
        text-align: center;
        background-color: $white;
        border-bottom: 1px solid $gray-light;
        box-shadow: 0 0 0 #000, 0 0 pxTorem(15) #ddd;
        >div {
            display: block;
            width: 100%;
            height: pxTorem(100);
            line-height: pxTorem(100);
            font-size: pxTorem(40);
            color: $white;
            border-radius: pxTorem(10);
        }
        h6 {
            @include flex-center;
            height: pxTorem(66);
            color: #646565;
            .iconfont {
                color: #ff9817;
                margin-right: pxTorem(5);
            }
        }
        .exchange {
            @include active(#ff5000, 5%);
            margin-top: pxTorem(30);
            background-color: #ff5000;
            &.right {
                width: pxTorem(465);
                font-size: pxTorem(36);
                float: right;
            }
        }
        .exchange.disable {
            @include active(#b5b5b5, 5%);
            background-color: #b5b5b5;
            &.left {
                width: pxTorem(211);
                font-size: pxTorem(36);
                float: left;
            }
        }
        .lack {
            @include active(#ff9817, 5%);
            background-color: #ff9817;
        }
        .icon-arrows-right {
            font-size: bold;
            font-size: pxTorem(36);
            &:last-child {
                margin-left: pxTorem(-30);
                margin-right: 0;
            }
        }
    }

    .product-recommends {
        margin-top: pxTorem(20);
        padding-top: pxTorem(40);
        overflow: hidden;
        background: $white;
        border-bottom: 1px solid #d3d4d6;
    }

    .share-notice {
        li {
            list-style: none;
            font-size: pxTorem(36);
            line-height: pxTorem(66);
        }
        li:first-child {
            position: relative;
            &:after {
                content: '“...”';
                position: absolute;
                right: pxTorem(-40);
                top: 0;
            }
        }
        position:absolute;
        top: pxTorem(-350);
        left: 50%;
        transform: translateX(-50%);
        color: $white;
        z-index:1;
    }
</style>
<template>
    <div v-if='product_detail' class='product-detail'>
        <template v-if='notice_show'>
            <v-notice></v-notice>
            <div class='space'></div>
        </template>
        <template v-if='!is_recharge'>
            <header class='header '>
                <img v-show='back' class='back' src='./images/back.png' @click='returnPrev' />
                <div class='banner'>
                    <template v-if='product_detail.pics.length>0'>
                        <v-swiper v-if='product_detail.pics.length>1' :slides='product_detail.pics'></v-swiper>
                        <img v-else :src='product_detail.pics[0].url' />
                    </template>
                </div>
                <div class='title'>
                    <h1 class='text-ellipsis'>{{product_detail.name}}</h1>
                    <h3><span class='number'>{{integral}}</span>积分
                        <s>¥{{product_detail.price}}</s>
                    </h3>
                </div>
            </header>
            <main class='main'>
                <v-introduction v-if='product_detail.content' title='详细说明' :content='product_detail.content'></v-introduction>
                <v-introduction v-if='product_detail.content_use' title='使用说明' :content='product_detail.content_use'></v-introduction>
                <div v-if='product_detail.recommend_items&&product_detail.recommend_items.length>0' class='product-recommends'>
                    <v-recommend :recommends='product_detail.recommend_items' color='gray' text-color='gray'></v-recommend>
                </div>
            </main>
            <footer class='sticky'>
                <div class='exchange' v-if='state===1' @click='exchange'>立即兑换</div>
                <template v-else-if='state===2'>
                    <h6>
                        <i class='iconfont icon-warn'></i> 您的积分不足
                    </h6>
                    <router-link :to='{name:"earn_integral",query:{back_show:true}}' tag='div' class='lack'>
                        去赚取更多的积分
                        <i class='iconfont icon-arrows-right'></i>
                        <i class='iconfont icon-arrows-right'></i>
                    </router-link>
                </template>
                <div class='exchange disable' v-else-if='state===3'>
                    <div v-if='product_detail.recommend_items&&product_detail.recommend_items.length>0' @click='toRecommend'>
                        商品已兑换光，查看其它优惠
                    </div>
                    <div v-else>
                        商品已兑换光
                    </div>
                </div>
                <div class='exchange ' v-else-if='state===4' @click='share_show=true'>完成分享 立即兑换</div>
                <template v-else-if='state===5'>
                    <div v-if='integral_lack' class='exchange disable left' @click='toggleDialog({
                                type: "lack",
                                msg: "积分不足，请先赚取！",
                                btn_text: "去赚取",
                    })'>
                        直接兑换
                    </div>
                    <div v-else class='exchange disable left' @click='exchange'>
                        直接兑换
                    </div>
                    <div class='exchange right' @click='share_show=true'>
                        马上分享 {{product_detail.share_integral}}积分兑换
                        <i class='iconfont icon-arrows-right'></i>
                        <i class='iconfont icon-arrows-right'></i>
                    </div>
                </template>
                <div class='exchange disable' v-else-if='state===6'>
                    <div v-if='product_detail.recommend_items&&product_detail.recommend_items.length>0' @click='toRecommend'>
                        该商品已兑换，查看其它优惠
                    </div>
                    <div v-else>
                        该商品已兑换
                    </div>
                </div>
            </footer>
        </template>
        <recharge v-else :product-detail='product_detail'></recharge>
        <v-dialog :show='dialog_show' :dialog='dialog' :toggle-dialog='toggleDialog'></v-dialog>
        <v-share-guide :show.sync='share_show'>
            <ul class='share-notice'>
                <li>1、点击右上角的 </li>
                <li>2、选择“ <i class='iconfont icon-share-time'></i> ”即可</li>
                <li>3、请分享后继续参与</li>
            </ul>
        </v-share-guide>
    </div>
</template>
<script>
    import weChatShare from 'libs/weChatShare.js';
    import vIntroduction from 'components/vIntroduction';
    import recharge from './components/recharge';
    import vDialog from './components/vDialog';
    import vShareGuide from 'components/vShareGuide';
    import vNotice from 'components/vNotice';
    import vSwiper from 'components/vSwiper.vue';
    import vRecommend from 'components/vRecommend';
    export default {
        name: 'productDetail',
        components: {
            vIntroduction,
            recharge,
            vDialog,
            vShareGuide,
            vNotice,
            vSwiper,
            vRecommend
        },
        data() {
            return {
                product_id: '',
                view_id: '',
                product_detail: '',
                order_detail_id: '', //兑换成功后用于跳转订单详情的订单id
                is_recharge: false,
                dialog: {},
                dialog_show: false,
                share_show: false,
                lack_show: false,
                from: '',
                back: '',
                state: '',
                has_shared: false,
                has_exchanged: false,
                integral_lack: false,
                qr_code: {
                    title: '',
                    img: ''
                }
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            integral() {
                if (this.product_detail) {
                    if (this.product_detail.is_share === 1 &&
                        this.has_shared === true &&
                        this.product_detail.share === 2) {
                        if (this.has_exchanged) {
                            return this.product_detail.integral >> 0;
                        }
                        return this.product_detail.share_integral >> 0;
                    }
                    return this.product_detail.integral >> 0;
                }
                return 0;
            },
            notice_show() {
                return APP.ORIGIN !== 'menu' &&
                    this.$store.state.qr_code.qr_code_tips &&
                    this.$store.state.qr_code.qr_code_pic;
            }
        },
        watch: {
            $route(value) {
                this.init();
                window.scrollTo(0, 0);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.share_show = false;
            this.dialog_show = false;
            if (this.view_id) {
                this.$store.dispatch('updateItemView', this.view_id);
            }
            this.$store.dispatch('updatePageView');
            next();
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.product_id = this.$route.query.product_id;
                this.from = this.$route.query.from || 'index';
                this.back = this.$route.query.back;
                this.getProductPromise(this.getProductDetail('product_detail_l'), this.isShare()).then(data => {
                    this.has_shared = data[1].is_share;
                    this.has_exchanged = data[1].is_exchange;
                    this.changeState(data);
                    let link =
                        `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=product_detail&product_id=${this.product_id}&back=${this.from}`;
                    if (this.from === 'subject_detail') {
                        link += `&subject_id=${this.$route.query.subject_id}`;
                    }
                    const is_share_info = this.product_detail.is_share_info === 1;
                    weChatShare({
                        router: this.$route,
                        title: is_share_info ? this.product_detail.share_name : this.product_detail.name,
                        img: is_share_info ? this.product_detail.share_pic_thumb_new : this.product_detail
                            .pic_thumb_new,
                        desc: is_share_info ? this.product_detail.share_name_show : this.product_detail
                            .name_show,
                        link
                    }).then(share_point => {
                        this.share_show = false;
                        return this.shareView(share_point);
                    }).then(() => {
                        this.getProductPromise(this.getProductDetail(), this.isShare()).then(data => {
                            this.has_shared = data[1].is_share;
                            this.has_exchanged = data[1].is_exchange;
                            this.changeState(data);
                        });
                    });
                });
            },
            getProductPromise(promiseX, promiseY) {
                return Promise.all([promiseX, promiseY])
                    .then(data => {
                        return data;
                    });
            },
            //获取商品详情
            getProductDetail(url = 'product_detail') {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/${url}/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            this.product_detail = data.data;
                            if (url === 'product_detail_l') {
                                this.view_id = data.data.view_id;
                            }
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                        if (this.product_detail.type === 8) {
                            this.is_recharge = true;
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            //兑换
            exchange() {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'product_detail', this.product_id, APP.ORIGIN);
                } else {
                    this.$store.dispatch('toggleConfirm', {
                        msg: '确认兑换该商品吗?',
                        callback: () => {
                            if (this.$route.query.mission) {
                                const mission = JSON.parse(this.$route.query.mission);
                                this.completeMission(mission.id, mission.type, mission.product_id, mission.status,
                                    mission.step).then(data => {
                                    this.$store.dispatch('getUserInfor');
                                    const order_id = data.order_id;
                                    mission.items = data.items || [];
                                    this.$router.push({
                                        name: 'order_detail',
                                        query: {
                                            order_id,
                                            mission: JSON.stringify(mission)
                                        }
                                    });
                                });
                            } else {
                                this.order().then(data => {
                                    this.order_detail_id = data.data.id;
                                    this.$store.dispatch('getUserInfor');
                                    this.toOrderDetail();
                                }).catch(data => {
                                    this.toggleDialog({
                                        type: 'faliure',
                                        msg: data.info,
                                        btn_text: '我知道了',
                                    });
                                });
                            }
                        }
                    });
                }
            },
            //生成订单
            order() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/product_order/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        } else {
                            if (reject && typeof reject === 'function') {
                                reject(data);
                            }
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                        if (reject && typeof reject === 'function') {
                            reject(response.data);
                        }
                    });
                });
            },
            //路由跳转
            toOrderDetail() {
                this.$router.push({
                    name: 'order_detail',
                    query: {
                        order_id: this.order_detail_id
                    }
                });
            },
            toggleDialog(dialog) {
                this.dialog = dialog;
                this.dialog_show = !this.dialog_show;
            },
            returnPrev() {
                var link = {
                    name: this.back
                };
                if (this.back === 'subject_detail') {
                    link.query = {
                        subject_id: utils.getParameterByName('subject_id')
                    };
                }
                this.$router.push(link);
            },
            changeState(data = []) {
                const product = data[0],
                    stock_lack = (product.type !== 8 && product.type !== 5) && product
                    .stocks <= 0 || product.status === 1,
                    integral_lack = parseInt(this.user.integral) < parseInt(product.integral);
                if (product.is_share === 1) {
                    if (this.has_shared) {
                        if (product.share === 2) {
                            if (this.has_exchanged) {
                                if (product.is_beyond_limit) {
                                    this.state = 6;
                                } else if (stock_lack) {
                                    this.state = 3;
                                } else if (integral_lack) {
                                    this.state = 2;
                                } else {
                                    this.state = 1;
                                }
                            } else if (stock_lack) {
                                this.state = 3;
                            } else if (parseInt(this.user.integral) < parseInt(product.share_integral)) {
                                this.state = 2;
                            } else {
                                this.state = 1;
                            }
                        } else if (product.share === 1) {
                            if (this.has_exchanged && product.is_beyond_limit) {
                                this.state = 6;
                            } else if (stock_lack) {
                                this.state = 3;
                            } else if (integral_lack) {
                                this.state = 2;
                            } else {
                                this.state = 1;
                            }
                        }
                    } else if (product.share === 1) {
                        this.state = 4;
                    } else if (product.share === 2) {
                        if (integral_lack) {
                            this.integral_lack = true;
                        }
                        this.state = 5;
                    } else {
                        this.state = 1;
                    }
                } else if (stock_lack) {
                    this.state = 3;
                } else if (integral_lack) {
                    this.state = 2;
                } else {
                    this.state = 1;
                }
            },
            shareView(share_point) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/share_view/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN,
                        share_point,
                        type: 1
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve();
                            }
                        }
                    });
                });
            },
            isShare() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/is_share/${this.product_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 1
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    });
                });
            },
            toRecommend() {
                const recommends = this.product_detail.recommend_items,
                    num = Math.floor(Math.random() * recommends.length),
                    recommend = recommends[num];
                if (recommend) {
                    const type = recommend.type,
                        link = recommend.url;
                    if (type >= 1 && type <= 3) {
                        const item_id = recommend.item_id,
                            routes = [{
                                name: 'product_detail',
                                query: {
                                    product_id: item_id
                                }
                            }, {
                                name: 'activity_detail',
                                query: {
                                    activity_id: item_id
                                }
                            }, {
                                name: 'subject_detail',
                                query: {
                                    subject_id: item_id
                                }
                            }];
                        if (item_id) {
                            this.$router.push({
                                name: routes[type - 1].name,
                                query: routes[type - 1].query
                            });
                        }
                    } else if (link && (type === 4 || type === 5)) {
                        location.href = link;
                    }
                }
            },
            completeMission(id, type, product_id = '', status, step) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/fulfil_newbie_task`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID,
                        origin: APP.ORIGIN,
                        id,
                        type,
                        product_id,
                        status,
                        step
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            const temp = data.data;
                            if (temp.error_code === 0) {
                                if (typeof resolve === 'function') {
                                    resolve(data.data);
                                }
                            } else if (temp.error_code === 40001) {
                                this.toggleDialog({
                                    type: 'faliure',
                                    msg: temp.message,
                                    btn_text: '我知道了'
                                });
                            } else {
                                this.toggleDialog({
                                    type: 'faliure',
                                    msg: temp,
                                    btn_text: '我知道了'
                                });
                            }
                        } else {
                            this.toggleDialog({
                                type: 'faliure',
                                msg: data.info,
                                btn_text: '我知道了',
                            });
                        }
                    });
                });
            },
        }
    };
</script>