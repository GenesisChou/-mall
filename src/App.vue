<template>
    <div id='app'>
        <router-view ：transition='fade'></router-view>
    </div>
</template>
<script>
import 'assets/scss/main.scss'
export default {
    created() {
            this.init();
            window.onresize = () => {
                this.init();
            };
        },
        methods: {
            init() {
                let scale = 1 / devicePixelRatio;
                document.querySelector('meta[name="viewport"]').setAttribute('content', `initial-scale=${scale}, maximum-scale=${scale} , minimum-scale=${scale} , user-scalable=no`);
                document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 10}px`;

            }
        }
}
</script>
