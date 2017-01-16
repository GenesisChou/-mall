<style lang='sass' scoped>
    @import '../../assets/scss/variable.scss';
    .v-swipe {
        height: pxTorem(300);
        img {
            width: 100%;
            height: pxTorem(300);
        }
    }
    
</style>
<template>
    <swipe class='v-swipe'>
        <swipe-item v-for='slide in slides'>
            <img @click='bannerView(slide);' :src="slide.pic">
        </swipe-item>
    </swipe>
</template>
<script>
    import './vSwipe.css';
    import {
        Swipe,
        SwipeItem
    } from 'vue-swipe';
    export default {
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
                    location.href = banner.url;
                } else if (banner.type == 2) {
                    this.$router.push({
                        name: "activity_detail",
                        query: {
                            activity_id: banner.item_id
                        }
                    })
                }
            },
            bannerView(banner) {
                this.$store.dispatch('bannerView', banner.id);
                this.routerLink(banner);
            },
        }

    }
</script>