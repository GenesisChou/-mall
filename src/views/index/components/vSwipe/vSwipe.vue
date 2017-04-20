<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-swipe {
        height: pxTorem(330);
        img {
            width: pxTorem(750);
            height: pxTorem(330);
        }
    }
</style>
<template>
    <swipe  class='v-swipe' :auto=5000 :speed=500>
        <swipe-item v-for='slide in slides'>
            <img @click='routerLink(slide);' :src="slide.pic">
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
        name: 'vSwipe',
        components: {
            Swipe,
            SwipeItem
        },
        data() {
            return {
                slides: []
            };
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
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.slides = data.data;
                    }
                }, (response) => {});
            },
            routerLink(banner) {
                //1 外链    2 活动    3 商品     4 专题
                const type = banner.type,
                    id = banner.id,
                    item_id = banner.item_id;
                // let router = null;
                this.$store.dispatch('bannerView', id);
                switch (type) {
                case 1:
                    location.href = banner.url;
                    break;
                case 2:
                    this.$router.push({
                        name: 'activity_detail',
                        query: {
                            activity_id: item_id,
                        }
                    });
                    break;
                case 3:
                    this.$router.push({
                        name: 'product_detail',
                        query: {
                            product_id: item_id,
                        }
                    });
                    break;
                case 4:
                    this.$router.push({
                        name: 'subject_detail',
                        query: {
                            subject_id: item_id,
                        }
                    });
                    break;
                }
            },
        }
    };
</script>