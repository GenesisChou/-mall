<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .index {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .index-content {
        flex: 1;
    }

    .icon-list {
        display: flex;
        list-style: none; // border-bottom: 1px solid #d3d4d6;
        color: #666;
        font-size: pxTorem(24);
        margin-bottom: pxTorem(20);
        li {
            @include active;
            @include flex-center;
            list-style: none;
            flex-direction: column;
            width: 25%;
            height: pxTorem(190);
            overflow: hidden;
            position: relative;
            text-align: center;
            background-color: $white;
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
            }
        }
        p {
            width: 100%;
            height: pxTorem(30);
            overflow: hidden;
        }
        .icon {
            width: pxTorem(95);
            height: pxTorem(95);
            margin-bottom: pxTorem(15);
        }
    }

    .subject {
        // width: pxTorem(750);
        // height: pxTorem(485);
        margin-bottom: pxTorem(20);
        overflow: hidden;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        img:nth-child(1) {
            width: pxTorem(456);
            height: pxTorem(456);
            margin: pxTorem(14) 0 pxTorem(14) pxTorem(28);
            float: left;
        }
        img:nth-child(2),
        img:nth-child(3) {
            width: pxTorem(222);
            height: pxTorem(222);
            margin-right: pxTorem(28);
            float: right;
        }
        img:nth-child(2) {
            margin: pxTorem(14) pxTorem(28) pxTorem(12) 0;
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
        <div class='index-content'>
            <!-- 轮播 -->
            <v-swipe></v-swipe>
            <!-- 功能区 -->
            <ul class='icon-list'>
                <li v-for='icon in icon_list' @click='iconLink(icon)'>
                    <img class='icon' :src='icon.pic'>
                    <p>{{icon.name}}</p>
                </li>
            </ul>
            <!-- 专题 -->
            <div v-if='subject_show' class='subject'>
                <img v-for='(subject,$index) in subject_list' @click='routerLink(subject)' :src='$index==0?subject.pic_main:subject.pic_second'>
            </div>
            <!-- 广告列表 -->
            <ul class='advs'>
                <li v-for='adv in hot_adcolumn'>
                    <v-adv :adv='adv'></v-adv>
                </li>
            </ul>
            <!-- 热门列表 -->
            <main class='main'>
                <!-- 热门推荐 -->
                <v-item v-for='item in hot_commend' :item='item' type='commend'></v-item>
                <!-- 热门 -->
                <v-item v-for='item in hot_items' :item='item' type='item'></v-item>
            </main>
        </div>
        <v-back-top></v-back-top>
        <v-support :busy='busy'></v-support>
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
                icon_list: [],
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
            };
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
            this.$children[0].swiper.startAutoplay();
            const position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
            window.addEventListener('scroll', this.scroll_event);
        },
        created() {
            this.getIconList();
            this.getHotCommend();
            this.getHotAdcolumn();
            this.getHotShowCase();
            this.getHotItems();
            this.scroll_event = this.getScrollEvent();
        },
        beforeRouteLeave(to, from, next) {
            this.$children[0].swiper.startAutoplay();
            utils.setSessionStorage('position:' + from.name, utils.getScrollTop());

            window.removeEventListener('scroll', this.scroll_event);
            next();
        },
        methods: {
            getIconList() {
                this.$http.post(`${APP.HOST}/icon_list`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS && data.data) {
                        for (let i = 0; i < 4; i++) {
                            if (data.data[i]) {
                                this.icon_list.push(data.data[i]);
                            }
                        }
                    }
                });
            },
            iconLink(icon) {
                this.$http.post(`${APP.HOST}/icon_view/${icon.id}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {});
                if (icon.is_inner_url === 1) {
                    this.$router.push({
                        name: icon.url
                    });
                } else if (icon.is_inner_url === 2) {
                    location.href = icon.url;
                }
            },
            getHotShowCase() {
                this.$http.post(`${APP.HOST}/hot_showcase`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS && data.data.length >= 3) {
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
                    const data = response.data;
                    this.hot_commend = data.data;
                });
            },
            getHotAdcolumn() {
                this.$http.post(`${APP.HOST}/hot_adcolumn`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    this.hot_adcolumn = data.data;
                });
            },
            getHotItems() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/hot_item`, this.params).then((response) => {
                        const data = response.data;
                        this.params.total = data.data.total;
                        this.params.pro_st = data.data.pro_st;
                        this.hot_items = this.hot_items.concat(data.data.list);
                        if (resolve) {
                            resolve();
                        }
                    });
                });
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
                    id = subject.item_id;
                this.$store.dispatch('subjectView', subject.id);
                switch (type) {
                    case 1:
                        location.href = subject.url;
                        break;
                    case 2:
                        this.$router.push({
                            name: 'activity_detail',
                            query: {
                                activity_id: id,
                            }
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: 'product_detail',
                            query: {
                                product_id: id,
                            }
                        });
                        break;
                    case 4:
                        this.$router.push({
                            name: 'subject_detail',
                            query: {
                                subject_id: id,
                            }
                        });
                        break;
                }
            }
        },
    };
</script>