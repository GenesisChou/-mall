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
        z-index: 2;
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
        <v-menu></v-menu>
        <v-support></v-support>
        <div v-if='guide_state' class='cover'></div>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vBackTop from 'components/vBackTop';
    import weChatShare from 'libs/weChatShare.js';
    import vNotice from 'components/vNotice';
    import vMenu from 'components/vMenu';
    import Cookies from 'js-cookie';
    export default {
        components: {
            vBackTop,
            vNotice,
            vMenu,
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
            vSpace: require('./components/vSpace'),
            vText: require('./components/vText'),
            vMission: require('./components/vMission'),
            vChunk: require('./components/vChunk.vue'),
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
            const game_id = Cookies.get('game_id');
            if (APP.MEDIA_ID === `994063a9aa492b8858f31e2011fe0705` && game_id) {
                Cookies.remove('game_id');
                this.$router.replace({
                    path: `/games/${game_id}/evprotection`
                })
            } else {
                this.getLayOut().then(components => {
                    let surprise_show = false;
                    if (utils.getTypeOf(components) === 'Array') {
                        components.forEach(component => {
                            if (component.component_type === 7 && component.is_show === 1) {
                                surprise_show = true;
                            }
                        });
                    }
                    setTimeout(() => {
                        this.$store.dispatch('toggleSurprise', surprise_show);
                    }, 1500);
                    if (surprise_show) return;
                    const qr_code = this.$store.state.qr_code,
                        first_login = (this.user.first_login === 1),
                        has_qr_code = qr_code.qr_code_pic && qr_code.qr_code_tips;
                    if ((has_qr_code && APP.ORIGIN !== 'menu') || !has_qr_code) {
                        if (first_login) {
                            this.$store.dispatch('updateGuideState', 'guide-wish');
                        }
                    }
                });
            }
        },
        activated() {
            weChatShare({
                link: `${APP.MALL_HOST}?id=${APP.MEDIA_ID}&origin=wechat`
            });
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
                    this.$http.post(`${APP.HOST}/index`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS && utils.getTypeOf(data.data) === 'Array' &&
                            data.data.length) {
                            utils.syncLoadArray(this.framework, data.data);
                            if (typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    });
                });
            },
            getComponent(component_type, layout_type) {
                const components = [
                        ['vItemLarge', 'vItemSmall', 'vItemList'],
                        ['vSubjectOne', 'vSubjectTwo'],
                        ['vAdvSlide', 'vAdvList'],
                        ['vTitle'],
                        ['vSpace'],
                        ['vIcon'],
                        ['vSurprise'],
                        ['vText'],
                        ['vMission'],
                        ['vChunk'],
                    ],
                    temp = component_type >= 4 ? 0 : layout_type - 1;
                try {
                    return components[component_type - 1][temp];
                } catch (err) {
                    console.log(err);
                    return null;
                }
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
                        if ((item.url === 'integral_details' || item.url === 'earn_integral' || item.url ===
                                'order_list' ||
                                item.url === 'wish_wall') &&
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