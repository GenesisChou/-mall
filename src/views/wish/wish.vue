<template>
    <keep-alive exclude='wishDetail,publishWish'>
        <router-view></router-view>
    </keep-alive>
</template>
<script>
    export default {
        watch: {
            $route() {
                window.scrollTo(0, 0);
            }
        },
        created() {
            console.log("fuck");
            this.$store.dispatch('getWishBanners');
        },
    };
</script>