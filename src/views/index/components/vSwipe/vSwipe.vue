<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-swipe {
        height: pxTorem(300);
        img {
            width: 100%;
            height: pxTorem(300);
        }
    }
</style>
<template>
    <swipe class='v-swipe' :auto=5000 :speed=500>
        <swipe-item v-for='slide in slides'>
            <img @click='bannerView(slide);' :src="slide.pic">
        </swipe-item>
    </swipe>
</template>
<script>
    import './style/vSwipe.scss';
    import {
        Swipe,
        SwipeItem
    } from 'vue-swipe';
    export default {
        name:'vSwipe',
        components: {
            Swipe,
            SwipeItem
        },
        data() {
            return {
                slides: []
            }
        },
        created() {
            this.getHotBanners();
        },
        methods: {
            getHotBanners() {
                this.$http.post(`${APP.HOST}/hot_banner`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    this.slides = data.data;
                }, (response) => {});
            },
            routerLink(banner) {
                if (banner.type == 1) {
                    let subject_id = utils.getParameterByName('subject_id', banner.url);
                    if (subject_id) {
                        let router = {
                            name: "subject_detail",
                            query: {
                                subject_id,
                            }
                        };
                        this.$router.push(router);
                    } else {
                        location.href = banner.url;
                    }
                    return;
                }
                let activity_id = utils.getParameterByName('activity_id', banner.url),
                    product_id = utils.getParameterByName('product_id', banner.url),
                    subject_id = utils.getParameterByName('subject_id', banner.url),
                    router = {};

                if (activity_id) {
                    router = {
                        name: "activity_detail",
                        query: {
                            activity_id,
                        }
                    };
                } else if (product_id) {
                    router = {
                        name: "product_detail",
                        query: {
                            product_id,
                        }
                    };
                } else if (subject_id) {
                    router = {
                        name: "subject_detail",
                        query: {
                            subject_id,
                        }
                    };
                }
                this.$router.push(router);
            },
            bannerView(banner) {
                this.$store.dispatch('bannerView', banner.id);
                this.routerLink(banner);
            },
        }

    }
</script>