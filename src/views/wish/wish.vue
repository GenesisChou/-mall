<template>
    <keep-alive exclude='wishDetail'>
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
            this.$store.dispatch('getWishBanners');
        },
    };
</script>