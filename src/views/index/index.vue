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

    .cover {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, .76);
    }

    .space {
        height: pxTorem(80);
    }
</style>
<template>
    <div class='index'>
        <template v-if='notice_show'>
            <v-notice></v-notice>
            <div class='space'></div>
        </template>
        <transition-group tag='div' class='index-content' name='slide-fade'>
            <component v-for='layout in framework' key='layout.id' :is='getComponent(layout.component_type,layout.layout_type)' :layout='layout'
                :router-link='routerLink'></component>
        </transition-group>
        <v-support></v-support>
        <div v-if='guide_state' class='cover'></div>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vBackTop from 'components/vBackTop';
    import weChatShare from 'libs/weChatShare.js';
    import vNotice from 'components/vNotice';
    export default {
        components: {
            vBackTop,
            vNotice,
            vSurprise: require('./components/vSurprise'),
            vItemSmall: require('./components/vItemSmall'),
            vItemList: require('./components/vItemList'),
            vItemLarge: require('./components/vItemLarge'),
            vSubjectOne: require('./components/vSubjectOne'),
            vSubjectTwo: require('./components/vSubjectTwo'),
            vAdvList: require('./components/vAdvList'),
            vAdvSlide: require('./components/vAdvSlide'),
            vTitle: require('./components/vTitle'),
            vIcon: require('./components/vIcon'),
            vSpace: require('./components/vSpace')
        },
        data() {
            return {
                framework: [],
                router_state: '',
            };
        },
        computed: {
            guide_state() {
                return this.$store.state.index.guide_state;
            },
            user() {
                return this.$store.state.user;
            },
            notice_show() {
                return APP.ORIGIN !== 'menu' &&
                    this.$store.state.qr_code.qr_code_tips &&
                    this.$store.state.qr_code.qr_code_pic;
            }
        },
        created() {
            this.getLayOut();
        },
        activated() {
            if (this.$store.state.current_signature_page !== 'index') {
                weChatShare({
                    router: this.$route,
                    link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}`
                });
            }
            this.router_state = 'enter';
            const position = this.$store.state.position[this.$route.name];
            if (position) {
                window.scrollTo(0, position);
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
        methods: {
            getLayOut() {
                return new Promise(resolve => {
                    // this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/index`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        // this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS && utils.getTypeOf(data.data) === 'Array' &&
                            data.data.length) {
                            utils.syncLoadArray(this.framework, data.data);
                        }

                        if (typeof resolve === 'function') {
                            resolve();
                        }
                    }, () => {
                        if (typeof resolve === 'function') {
                            resolve();
                        }
                        // this.$store.dispatch('toggleLoading');
                    });
                });
            },
            getComponent(component_type, layout_type) {
                const components = [
                    ['vItemLarge', 'vItemSmall', 'vItemList'],
                    ['vSubjectOne', 'vSubjectTwo'],
                    ['vAdvSlide', 'vAdvList'],
                ];
                if (component_type === 4) {
                    return 'vTitle';
                } else if (component_type === 5) {
                    return 'vSpace';
                } else if (component_type === 6) {
                    return 'vIcon';
                } else if (component_type === 7) {
                    return 'vSurprise';
                } else if (component_type === 8) {
                    return null;
                }

                return components[component_type - 1][layout_type - 1];
            },
            routerLink(item, layout) {
                if (!item) {
                    console.log('缺少item');
                    return;
                }
                if (!layout) {
                    console.log('缺少layout');
                    return;
                }
                let link = '';
                if (item.is_local_ads === 1) {
                    this.advView(item);
                }
                this.indexView(item, layout);
                if (layout.component_type === 6) {
                    if (item.is_inner_url === 1) {
                        if ((item.url === 'my_account' || item.url === 'earn_integral' || item.url === 'order_list') &&
                            this.user.show_authorize !== 1) {
                            utils.login(APP.MEDIA_ID, 2, item.url, null, APP.ORIGIN);
                            return;
                        }
                        this.$router.push({
                            name: item.url
                        });
                    } else if (item.is_inner_url === 2) {
                        location.href = item.url;
                    }
                    return;
                };
                if (item.item_type === 1) {
                    link = {
                        name: 'product_detail',
                        query: {
                            product_id: item.item_id,
                        }
                    };
                } else if (item.item_type === 2) {
                    link = {
                        name: 'activity_detail',
                        query: {
                            activity_id: item.item_id,
                        }
                    };
                } else if (item.item_type === 3) {
                    link = {
                        name: 'subject_detail',
                        query: {
                            subject_id: item.item_id,
                        }
                    };
                } else if (item.item_type === 4) {
                    location.href = item.url;
                }
                this.$router.push(link);
            },
            indexView(item, layout) {
                this.$http.post(`${APP.HOST}/index_view`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN,
                    item_id: item.item_id,
                    item_type: item.item_type,
                    item_title: item.title,
                    component_id: item.component_id,
                    component_type: layout.component_type,
                    index_item_id: item.id
                });
            },
            advView(item) {
                this.$http.post(`${APP.HOST}/local_ads_view`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN,
                    advertisement_id: item.id
                });
            }
        },
    };
</script>