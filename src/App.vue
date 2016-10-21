<style lang='sass'>
@import './assets/scss/main.scss';
</style>
<template>
    <div id='app'>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    created() {
            this.init();
        },
        methods: {
            init() {
                let scale = 1 / devicePixelRatio;
                // document.querySelector('meta[name="viewport"]').setAttribute('content', `width=device-width,initial-scale=${scale}, maximum-scale=${scale} , minimum-scale=${scale} , user-scalable=no`);
                // document.write('<script src="../resource/js/item.js?t='+(+new Date)+'"><\/script>');
                // let build=document.getElementById('build');
                // console.log(build.src);
                // build.src=`${build.src}?timestamp=${new Date().getTime()}`;
                document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;

            }
        }
}
</script>
