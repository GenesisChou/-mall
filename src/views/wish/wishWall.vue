<template>
    <keep-alive exclude='detail'>
        <router-view></router-view>
    </keep-alive>
</template>
<script>
    export default {
        watch: {
            $route() {
                window.scrollTo(0, 0);
            }
        }
    };
</script>