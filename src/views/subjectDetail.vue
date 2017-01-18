<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    header {
        width: 100%;
        height: pxTorem(350);
        background-color: $gray-light;
    }
    
    .tabs {
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        border-bottom: 1px solid $gray-light;
        li {
            flex: 1;
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            text-align: center;
            height: pxTorem(80);
            padding: 0 pxTorem(15);
            line-height: pxTorem(80);
            list-style: none;
            &.active {
                color: $red;
            }
        }
    }
</style>
<template>
    <div class='subject-detail'>
        <header>
            <img class='img-responsive' :src='subject_detail.pic'>
        </header>
        <section>
            <ul v-if='tabs_show' class='tabs'>
                <li :class='{active:current_tab=="全部"}' @click='switchTab("全部")'>全部</li>
                <li v-for='tab in tabs' :class='{active:current_tab==tab.name}' @click='switchTab(tab.name)'>
                    {{tab.name}}
                </li>
            </ul>
            <template v-for='tab in tabs'>
                <router-link v-for='item in tab.items' :to='getRouter(item)' tag='div'>
                    <v-list-item v-show='current_tab=="全部"||current_tab==tab.name' :title='item.name' :title-dupty='~~item.integral+"积分"' :img='item.pic'
                        color='text-red'></v-list-item>
                </router-link>
            </template>
        </section>
        <v-support v-if='support_show'></v-support>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
    export default {
        name: 'subject_detail',
        data() {
            return {
                subject_id: '',
                subject_detail: {
                    class_items: []
                },
                current_tab: '全部',
                support_show: false,
                tabs_init: false
            }
        },
        computed: {
            tabs() {
                return this.subject_detail.class_items;
            },
            tabs_show() {
                return this.subject_detail.class_items.length > 1;
            }
        },
        watch: {
            subject_id(value) {
                this.getSubjectDetail().then(() => {
                    this.tabs_init = true;
                    this.support_show = true;
                });
                this.$store.dispatch('subjectView',value);
            }
        },
        created() {
            this.subject_id = this.$route.query.subject_id;
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
                        let data = response.data;
                        this.subject_detail = data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });

                })
            },
            switchTab(name) {
                this.current_tab = name;
            },
            getRouter(item) {
                if (item.type == 1) {
                    return {
                        name: "product_detail",
                        query: {
                            product_id: item.item_id,
                            integral: item.integral >> 0,
                            product_name: item.name,
                        }
                    };
                }
                if (item.type == 2) {
                    return {
                        name: "activity_detail",
                        query: {
                            activity_id: item.item_id,
                            integral: item.integral >> 0
                        }
                    };

                }
            }
        }
    }
</script>