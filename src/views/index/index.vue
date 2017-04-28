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
</style>
<template>
    <div class='index'>
        <div class='index-content'>
            <component v-for='layout in framework' :is='getComponent(layout.component_type,layout.layout_type)' :layout='layout' :router-link='routerLink'
                :get-icon='getIcon' :state='state'></component>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
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
                state: ''
            };
        },
        created() {
            this.getLayOut();
        },
        activated() {
            this.state = 'enter';
            const position = utils.getSessionStorage('position:' + this.$route.name);
            if (position) {
                window.scrollTo(0, position);
            }
        },
        beforeRouteLeave(to, from, next) {
            this.state = 'leave';
            utils.setSessionStorage('position:' + from.name, utils.getScrollTop());
            next();
        },
        methods: {
            getLayOut() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/index`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.framework = data.data;
                    }
                }, () => {
                    this.$store.dispatch('toggleLoading');
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
            getIcon(item) {
                if (item.item_type === 2) {
                    if (item.activity_sub_type === 1) {
                        return require('./components/images/game.png');
                    }
                    return require('./components/images/activity.png');
                }
                return require('./components/images/exchange.png');
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
                    this.iconLink(item);
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
            iconLink(icon) {
                if (icon.is_inner_url === 1) {
                    this.$router.push({
                        name: icon.url
                    });
                } else if (icon.is_inner_url === 2) {
                    location.href = icon.url;
                }
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