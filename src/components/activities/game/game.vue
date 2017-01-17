<style lang='sass' scoped>
    @import '../../../assets/scss/variable.scss';
    .game {
        width: 100%;
        min-height: pxTorem(720);
    }
    
    .start {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        padding: 0;
        width: pxTorem(268);
        height: pxTorem(106);
        font-size: pxTorem(30);
        background: url('./images/start.png');
        background-size: pxTorem(284) pxTorem(126);
        background-repeat: no-repeat;
        background-position-x: inherit;
        z-index: 2;
    }
    
    .cover {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
    }
    
    .free-time-message {
        position: absolute;
        color: $white;
        left: 50%;
        top: 65%;
        transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        z-index: 2;
    }
</style>
<template>
    <div class='game' :style='bg_img'>
        <canvas id="canvas"></canvas>
        <div v-if='state=="ready"' class='start' @click='startGame'></div>
        <div v-if='state=="ready"' class='cover'></div>
        <div v-if='state=="ready"' class='free-time-message'>{{notice}}</div>
    </div>
</template>
<script>
    // import './game.js';
    export default {
        components: {},
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function
        },
        data() {
            return {
                game: '',
                state: '',
                is_win: '',
                order_detail_id: '', //活动结束跳转id
                alert: {},
                bg_img: '',
                script: null,
                loaded: false,
                activity_result: {}
            }
        },
        watch: {
            state(value) {
                if (value == 'start') {
                    this.freshFreeTimes();
                    // this.$parent.game_start = true;
                    AIR.Game.startGame('#canvas', this.game);
                    AIR.Game.gameOver((score) => {
                        this.state = 'stop';
                    });
                } else if (value == 'stop') {
                    AIR.Game.stopGame();
                    this.$store.dispatch('toggleAlert', this.alert);
                }
            },
            game(value) {
                if (!value) return;
                let url = `http://m.goldmiao.com/yngame/${value}.min.1.0.0.js`;
                this.$script(url, () => {
                    console.log('game loaded');
                    this.loaded = true;
                });
            },
            is_win(value) {
                if (this.state != 'start') return;
                let result = this.activity_result,
                    game = this.$el,
                    canvas = document.getElementById('canvas');
                if (value) {
                    this.alert = {
                        close_btn: true,
                        type: 'img',
                        img: result.pic_thumb,
                        msg: '获得' + result.name,
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                            game.removeChild(canvas);
                            let new_canvas = document.createElement('canvas');
                            new_canvas.setAttribute('id', 'canvas');
                            game.appendChild(canvas);
                        },
                        btn_text: '查看'
                    };
                } else {
                    this.alert = {
                        msg: result.name,
                        callback: () => {
                            this.init();
                            game.removeChild(canvas);
                            let new_canvas = document.createElement('canvas');
                            new_canvas.setAttribute('id', 'canvas');
                            game.appendChild(canvas);
                        }
                    }
                }

            }
        },
        computed: {
            game_id() {
                return this.activityDetail.game_id;
            }
        },
        created() {
            this.$script = require('scriptjs');
        },
        activated() {
            this.init();
            this.getGameDetail();
        },
        deactivated() {
            //若游戏结束前离开界面，手动停止游戏 
            if (this.state != 'stop') {
                AIR.Game.stopGame();
                console.log('game stopped');
            }
        },
        methods: {
            init() {
                this.is_win = '';
                this.order_detail_id = ''; //活动结束跳转id
                this.alert = {};
                this.state = 'ready';
            },
            getGameDetail() {
                this.$http.post(`${APP.HOST}/game_detail/${this.game_id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    let data = response.data;
                    this.bg_img = {
                        background: 'url(' + data.data.pic + ')',
                        backgroundSize: '100% 100%',
                    };

                    /*
                     * 各个游戏的游戏代码为：
                     * 接元宝游戏：   8Ew3kl53
                     * 逝去的青春：   o3KdlWed
                     * 三消游戏  ：   r3FEflzD
                     * 棍子忍者  ：   uWr5e32D
                     */
                    let name = data.data.name;
                    switch (name) {
                        case '开心消消乐':
                            this.game = 'r3FEflzD';
                            break;
                        case '棍子忍者':
                            this.game = 'uWr5e32D';
                            break;
                        case '逝去的青春':
                            this.game = 'o3KdlWed';
                            break;
                        case '接金元宝':
                            this.game = '8Ew3kl53';
                            break;
                        default:
                            console.log('no game found');
                            break;
                    }
                })
            },
            startGame() {
                if (!this.game) {
                    this.$store.dispatch('toggleAlert', {
                        msg: '该活动已下架'
                    });
                    return;
                }
                if (!this.loaded) {
                    this.$store.dispatch('toggleAlert', {
                        msg: '请等待游戏完全载入'
                    });
                    return;
                }
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/game_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })
            },
        }
    }
</script>