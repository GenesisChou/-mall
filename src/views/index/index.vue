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
        background-color: rgba(0, 0, 0, .5);
    }

   </style>
<template>
    <div class='index'>
        <transition-group tag='div' class='index-content' name='slide-fade'>
            <component v-for='layout in framework' key='layout.id' :is='getComponent(layout.component_type,layout.layout_type)' :layout='layout'
                :router-link='routerLink' :guide.sync='guide'></component>
        </transition-group>
        <div v-if='guide' class='cover'></div>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    import vBackTop from 'components/vBackTop';
    export default {
        components: {
            vBackTop,
            vItemSmall: (resolve) => {
                require(['./components/vItemSmall'], resolve);
            },
            vItemList: (resolve) => {
                require(['./components/vItemList'], resolve);
            },
            vItemLarge: (resolve) => {
                require(['./components/vItemLarge'], resolve);
            },
            vSubjectOne: (resolve) => {
                require(['./components/vSubjectOne'], resolve);
            },
            vSubjectTwo: (resolve) => {
                require(['./components/vSubjectTwo'], resolve);
            },
            vAdvList: (resolve) => {
                require(['./components/vAdvList'], resolve);
            },
            vAdvSlide: (resolve) => {
                require(['./components/vAdvSlide'], resolve);
            },
            vTitle: (resolve) => {
                require(['./components/vTitle'], resolve);
            },
            vIcon: (resolve) => {
                require(['./components/vIcon'], resolve);
            },
            vSpace: (resolve) => {
                require(['./components/vSpace'], resolve);
            },
        },
        data() {
            return {
                framework: [],
                router_state: '',
                guide: '',
            };
        },
        created() {
            this.getLayOut().then(first_login => {
                this.guide = first_login ? 'guide-account' : '';
            });
        },
        activated() {
            this.router_state = 'enter';
            const position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.router_state = 'leave';
            utils.setSessionStorage('position:' + from.name, utils.getScrollTop());
            next();
        },
        methods: {
            test() {
                this.list.push(this.list.length);
            },
            getLayOut() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/index`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS && utils.getTypeOf(data.data) === 'Array' &&
                            data.data.length) {
                            utils.syncLoadArray(this.framework, data.data);
                            if (resolve && data.data[0] !== 'undefined') {
                                resolve(data.data[0].first_login === 1);
                            }
                        }
                    }, () => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            },
            getComponent(component_type, layout_type) {
                const components = [
                    ['vItemLarge', 'vItemSmall', 'vItemList'],
                    ['vSubjectOne', 'vSubjectTwo'],
                    ['vAdvList', 'vAdvSlide'],
                ];
                if (component_type === 4) {
                    return 'vTitle';
                } else if (component_type === 5) {
                    return 'vSpace';
                } else if (component_type === 6) {
                    return 'vIcon';
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
                this.index_view(item, layout);
                if (layout.component_type === 6) {
                    if (item.is_inner_url === 1) {
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
                            integral: item.integral >> 0
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
            index_view(item, layout) {
                this.$http.post(`${APP.HOST}/index_view`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                    open_id: APP.OPEN_ID,
                    item_id: item.item_id,
                    item_type: item.item_type,
                    item_title: item.title,
                    component_id: item.component_id,
                    component_type: layout.component_type
                });
            },
        },
    };
</script>