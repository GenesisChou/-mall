<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .subject-detail {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        padding-bottom: pxTorem(20);
        background-color: #f2f3f4;
        .space {
            height: pxTorem(80);
        }
    }

    .subject-detail-content {
        flex: 1;
    }

    .banner {
        width: pxTorem(750);
        height: pxTorem(200);
        img {
            width: 100%;
            height: 100%;
        }
    }

    ul,
    li {
        list-style: none;
    }

    .tabs {
        @include flex-center-v;
        border-bottom: 1px solid #d3d4d6;
        margin-bottom: pxTorem(20);
        li {
            @include flex-center;
            flex: 1;
            position: relative;
            height: pxTorem(80);
            background-color: $white;
            font-size: pxTorem(30);
            color: #a9aaae;
            &.active {
                color: $orange;
            }
            &.active:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 50%;
                width: 65%;
                height: pxTorem(5);
                transform: translateX(-50%);
                background-color: $orange;
            }
        }
    }

    .content {
        overflow: hidden;
        padding-bottom: pxTorem(13);
    }

    .activity {
        width: pxTorem(750);
        height: pxTorem(200);
        margin-top: pxTorem(13);
    }

    .subject-recommends {
        padding-top: pxTorem(40);
        overflow: hidden;
        background: $white;
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
    <div v-if='subject_detail' class='subject-detail'>
        <template v-if='notice_show'>
            <v-notice></v-notice>
            <div class='space'></div>
        </template>
        <div class='subject-detail-content'>
            <div class='banner'>
                <template v-if='subject_detail.pics.length>0'>
                    <v-swiper v-if='subject_detail.pics.length>1' :slides='subject_detail.pics'></v-swiper>
                    <img v-else :src='subject_detail.pics[0].url' />
                </template>
            </div>
            <ul v-if='tabs_show' class='tabs'>
                <li :class='{active:current_tab=="全部"}' @click='switchTab("全部")'>全部</li>
                <li v-for='tab in tabs' :class='{active:current_tab==tab.name}' @click='switchTab(tab.name)'>
                    {{tab.name}}
                </li>
            </ul>
            <main class='content'>
                <div v-show='current_tab==="全部"||tab.name===current_tab' v-for='tab in tabs'>
                    <template v-for='(item,$index) in tab.items'>
                        <img v-if='item.type===2' class='activity' :src='item.pic' @click='routerLink(item)' />
                        <v-item v-else :item='item' :callback='routerLink'></v-item>
                    </template>
                </div>
            </main>
            <v-guide v-if='subject_detail.is_share_info===1' :show.sync='share_show' :has-shared='has_shared' :id='subject_id>>0'></v-guide>
            <v-share-guide :show.sync='share_show'>
                <ul class='share-notice'>
                    <li>1、点击右上角的 </li>
                    <li>2、选择“ <i class='iconfont icon-share-time'></i> ”即可</li>
                    <li>3、请分享后继续参与</li>
                </ul>
            </v-share-guide>
            <div v-if='subject_detail.recommend_items.length>0' class='subject-recommends'>
                <v-recommend :recommends='subject_detail.recommend_items' color='gray' text-color='gray'></v-recommend>
            </div>

        </div>
        <v-support></v-support>
    </div>
</template>
<script>
    import vListItem from 'components/vListItem';
    import weChatShare from 'libs/weChatShare.js';
    import vNotice from 'components/vNotice';
    import vSwiper from 'components/vSwiper.vue';
    import vItem from './components/vItem';
    import vRecommend from 'components/vRecommend';
    import vGuide from 'components/vGuide';
    import vShareGuide from 'components/vShareGuide';
    export default {
        name: 'subjectDetail',
        components: {
            vListItem,
            vNotice,
            vSwiper,
            vItem,
            vRecommend,
            vGuide,
            vShareGuide
        },
        data() {
            return {
                subject_id: '',
                subject_detail: '',
                current_tab: '全部',
                // content_show: false,
                share_show: false,
                has_shared: false
            };
        },
        computed: {
            tabs() {
                return this.subject_detail.class_items;
            },
            tabs_show() {
                return this.subject_detail.class_items.length > 1;
            },
            notice_show() {
                return APP.ORIGIN !== 'menu' &&
                    this.$store.state.qr_code.qr_code_tips &&
                    this.$store.state.qr_code.qr_code_pic;
            }
        },
        watch: {
            subject_id(value) {
                this.getSubjectPromise(this.getSubjectDetail(), this.isShare()).then(data => {
                    this.has_shared = data[1].is_share;
                    const is_share_info = data[0].is_share_info === 1;
                    weChatShare({
                        title: is_share_info ? data[0].share_name : data[0].name,
                        img: is_share_info ? data[0].share_pic_thumb_new : data[0].pic_thumb_new,
                        desc: is_share_info ? data[0].share_sub_name : data[0].sub_name,
                        link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&origin=wechat&page=subject_detail&subject_id=${value}`
                    }).then(share_point => {
                        this.share_show = false;
                        return this.shareView(share_point);
                    }).then(() => {
                        this.getSubjectPromise(this.getSubjectDetail(), this.isShare()).then(data => {
                            this.has_shared = data[1].is_share;
                        });
                    });
                });
            },
            $route(value) {
                if (value.name === 'subject_detail') {
                    this.subject_id = value.query.subject_id;
                    window.scrollTo(0, 0);
                }
            }
        },
        activated() {
            this.subject_id = this.$route.query.subject_id;
        },
        beforeRouteLeave(to, from, next) {
            if (to.name === 'index') {
                this.current_tab = '全部';
            }
            this.$store.dispatch('updatePageView');
            this.share_show = false;
            next();
        },
        methods: {
            getSubjectPromise(promiseX, promiseY) {
                return Promise.all([promiseX, promiseY])
                    .then(data => {
                        return data;
                    });
            },
            getSubjectDetail() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/subject_detail/${this.subject_id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        this.subject_detail = data.data;
                        if (resolve && typeof resolve === 'function') {
                            resolve(data.data);
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            isShare() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/is_share/${this.subject_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        type: 3
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
            shareView(share_point) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/share_view/${this.subject_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN,
                        share_point,
                        type: 3
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
            switchTab(name) {
                this.current_tab = name;
            },
            routerLink(item) {
                if (item.type === 1) {
                    this.$router.push({
                        name: 'product_detail',
                        query: {
                            product_id: item.item_id,
                            from: 'subject_detail',
                            subject_id: this.subject_id
                        }
                    });
                } else if (item.type === 2) {
                    this.$router.push({
                        name: 'activity_detail',
                        query: {
                            activity_id: item.item_id,
                        }
                    });
                } else if (item.type === 3) {
                    this.$router.push({
                        name: 'subject_detail',
                        query: {
                            subject_id: item.item_id,
                        }
                    });
                } else if (item.type === 4) {
                    location.href = item.url;
                }
            },
        },
    };
</script>