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
        height: pxTorem(330);
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
</style>
<template>
    <div v-show='content_show' class='subject-detail'>
        <template v-if='notice_show'>
            <v-notice></v-notice>
            <div class='space'></div>
        </template>
        <div class='subject-detail-content'>
            <img class='banner' :src='subject_detail.pic_banner_new'>
            <main>
                <ul v-if='tabs_show' class='tabs'>
                    <li :class='{active:current_tab=="全部"}' @click='switchTab("全部")'>全部</li>
                    <li v-for='tab in tabs' :class='{active:current_tab==tab.name}' @click='switchTab(tab.name)'>
                        {{tab.name}}
                    </li>
                </ul>
                <ul v-for='tab in tabs'>
                    <router-link v-for='(item,$index) in tab.items' :to='getRouter(item)' tag='li' v-show='current_tab=="全部"||current_tab==tab.name'>
                        <v-list-item :title='item.name' :title-dupty='item.sub_name' :integral='item.integral>>0' :img='item.pic' :script='item.script'></v-list-item>
                    </router-link>
                </ul>
            </main>
        </div>
        <v-support></v-support>
    </div>
</template>
<script>
    import vListItem from 'components/vListItem';
    import weChatShare from 'libs/weChatShare.js';
    import vNotice from 'components/vNotice';
    export default {
        name: 'subjectDetail',
        components: {
            vListItem,
            vNotice
        },
        data() {
            return {
                subject_id: '',
                subject_detail: {
                    class_items: []
                },
                current_tab: '全部',
                content_show: false,
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
                this.content_show = false;
                this.getSubjectDetail().then(data => {
                    this.content_show = true;
                    const is_share_info = data.is_share_info === 1;
                    weChatShare({
                        router: this.$route,
                        title: is_share_info ? data.share_name : data.name,
                        img: is_share_info ? data.share_pic_thumb_new : data.pic_thumb_new,
                        desc: is_share_info ? data.share_sub_name : data.sub_name,
                        link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&page=subject_detail&subject_id=${value}`
                    });
                });
            }
        },
        activated() {
            this.subject_id = this.$route.query.subject_id;
        },
        beforeRouteLeave(to, from, next) {
            if (to.name === 'index') {
                this.current_tab = '全部';
            }
            next();
        },
        methods: {
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
            switchTab(name) {
                this.current_tab = name;
            },
            getRouter(item) {
                if (item.type === 1) {
                    return {
                        name: 'product_detail',
                        query: {
                            product_id: item.item_id,
                            from: 'subject_detail',
                            subject_id: this.subject_id
                        }
                    };
                }
                if (item.type === 2) {
                    return {
                        name: 'activity_detail',
                        query: {
                            activity_id: item.item_id,
                        }
                    };
                }
            },
        },
    };
</script>