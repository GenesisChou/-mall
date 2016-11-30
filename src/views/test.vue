<style type="text/css" scoped>
@import '../assets/scss/variable.scss';
</style>
<template>
    <div class='test'>
        <canvas id="canvas"></canvas>
        <button class='btn btn-default'>startGame</button>
    </div>
</template>
<script type="text/javascript">
// import 'libs/games/chuck.js'
export default {
    components: {},
    data() {
        return {}
    },
    mounted() {



        /**
         * 开始游戏
         */
        // AIR.Game.startGame('#canvas');

        document.querySelector('.test .btn').addEventListener('click', () => {
            var chuck = require('libs/games/chuck.js');
            AIR.Game.startGame('#canvas');
            AIR.Game.gameOver((score) => {
                this.$store.dispatch('toggleAlert', {
                    show: true,
                    msg: '垃圾游戏结束啦,得分' + score,
                    btn_test: '关闭'
                })

            });
        })
    },
    methods: {
        // startGame() {
        //     AIR.Game.startGame('#canvas');

        // }
    }
}
</script>
