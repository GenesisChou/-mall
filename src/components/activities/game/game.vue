<style lang='sass' scoped>
@import '../../../assets/scss/variable.scss';
.game {
    // height: 100%;
    width: 100%;
    height:pxTorem(720);
    background:url('./images/game.png');
    background-size:pxTorem(750) pxTorem(720);
    background-repeat:no-repeat;
    background-position:center;
}

.start {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    padding: 0;
    width: pxTorem(268);
    height: pxTorem(106);
    font-size: pxTorem(30);
    background:url('./images/start.png');
    background-size:pxTorem(284) pxTorem(126);
    background-repeat:no-repeat;
    background-position-x:inherit;
}
</style>
<template>
    <div class='game'>
        <canvas id="canvas"></canvas>
        <div v-if='!start' class='start' @click='startGame'></div>
    </div>
</template>
<script>
import './game.js';
export default {
    components: {},
    data() {
        return {
            start: false,
            is_win: false,
            order_detail_id: '', //活动结束跳转id
            alert: {
                msg: '谢谢参与',
                btn_text: '关闭',
                callback: function() {}
            }
        }
    },
    watch: {
        start(value) {
            if (value) {
                AIR.Game.startGame('#canvas');
                AIR.Game.gameOver((score) => {
                    this.toggleAlert(this.alert);
                });
            }
        }
    },
    methods: {
        startGame() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/game_activity/${this.$parent.activity_id}`, {
                token: APP.TOKEN,
                user_id: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.is_win = data.data.is_win;
                this.$parent.game_start=true;
                this.start = true;
                if (this.is_win) {
                    this.order_detail_id = data.data.id;
                    this.alert = {
                        msg: data.data.name,
                        callback: this.toOrderDetail,
                        btn_text: '查看'
                    };
                }
                this.$store.dispatch('toggleLoading');
                this.$store.dispatch('getUserInfor'); //更新用户信息
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            })
        },
        stopGame() {
            AIR.Game.stopGame();
        },
        toOrderDetail() {
            this.$router.push({
                name: 'order_detail',
                query: {
                    order_id: this.order_detail_id
                }
            })
        },
        toggleAlert(alert) {
            this.$store.dispatch('toggleAlert', {
                show: true,
                msg: alert.msg,
                btn_text: alert.btn_text,
                callback: alert.callback,
            })
        }

    }
}
</script>
