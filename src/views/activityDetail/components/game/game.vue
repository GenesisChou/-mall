<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .game-detail {
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: $white;
    }

    .game {
        position: relative;
        width: 100%;
        height: pxTorem(400);
    }

    .banner {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: pxTorem(268);
        height: pxTorem(106);
        padding: 0;
        font-size: pxTorem(30);
        background: url('./images/start.png');
        background-size: pxTorem(284) pxTorem(126);
        background-repeat: no-repeat;
        background-position-x: inherit;
        z-index: 2;
        transform: translate(-50%, -50%);
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
        z-index: 2;
    }

    .describe {
        padding: pxTorem(50) pxTorem(40) 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
        }
    }

    .describe.red {
        .editor-style {
            color: #ad0406;
        }
    }

    .describe.green {
        .editor-style {
            color: #6a3c05;
        }
    }
</style>
<template>
    <div class='game-detail'>
        <main class='game' ref='container'>
            <template v-if='state=="ready"'>
                <img class='banner' :src='activityDetail.pic_icon'>
                <div class='start' @click='startGame'></div>
                <div class='cover'></div>
                <div class='free-time-message'>{{notice}}</div>
            </template>
            <canvas id="canvas"></canvas>
        </main>
        <article v-if='state=="ready"' :class='["describe",color]'>
            <v-describe-title text='详细说明' :color='color'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' :color='color'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' :color='color'></v-describe-title>
        </article>
        <footer v-if='state=="ready"'>
            <v-aword-box :awords='activityDetail.items' :color='color'></v-aword-box>
        </footer>
    </div>
</template>
<script>
    // import './game.js';
    import vDescribeTitle from '../vDescribeTitle';
    import vAwordBox from '../vAwordBox';
    export default {
        components: {
            vDescribeTitle,
            vAwordBox
        },
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog: Function
        },
        data() {
            return {
                name: '',
                game_id: '',
                state: '',
                is_win: '',
                order_detail_id: '', //活动结束跳转id
                alert: {},
                script: null,
                game_loaded: false,
                activity_result: {}
            };
        },
        computed: {
            color() {
                const colors = [{
                            name: '逝去的青春',
                            color: 'red'
                        }, {
                            name: '棍子忍者',
                            color: 'green'
                        },
                        {
                            name: '开心消消乐',
                            color: 'green'
                        },
                        {
                            name: '逝去的青春',
                            color: 'red'
                        },
                    ],
                    color = 'red';
                return color;
            },
        },
        watch: {
            state(value) {
                if (value === 'start') {
                    this.freshFreeTimes();
                    AIR.Game.startGame('#canvas', false, false, this.game, 1, true);
                    AIR.Game.gameOver(score => {
                        this.state = 'stop';
                        console.log(score);
                        AIR.Game.stopGame();
                        this.toggleDialog(this.alert);
                    });
                }
            },
            game_id(value) {
                this.getGameDetail(value).then(data => {
                    this.$script(data.data.url, () => {
                        console.log('game loaded');
                        this.game_loaded = true;
                    });
                });
            },
            is_win(value) {
                if (this.state !== 'start') return;
                const result = this.activity_result,
                    old_canvas = document.getElementById('canvas'),
                    new_canvas = document.createElement('canvas');
                new_canvas.setAttribute('id', 'canvas');
                if (value) {
                    this.alert = {
                        type: 'success',
                        img: result.pic_thumb,
                        msg: '获得' + result.name,
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                            this.$refs.container.replaceChild(new_canvas, old_canvas);
                        },
                        btn_text: '查看'
                    };
                } else {
                    this.alert = {
                        msg: result.name,
                        callback: () => {
                            this.init();
                            this.$refs.container.replaceChild(new_canvas, old_canvas);
                        }
                    };
                }
            }
        },
        activated() {
            this.init();
        },
        created() {
            this.$script = require('scriptjs');
        },
        deactivated() {
            if (this.state === 'start') {
                AIR.Game.stopGame();
                console.log('game stopped');
            }
        },
        methods: {
            init() {
                this.game_id = this.activityDetail.game_id;
                this.is_win = '';
                this.order_detail_id = ''; //活动结束跳转id
                this.alert = {};
                this.state = 'ready';
            },
            getGameDetail(game_id) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/game_detail/${game_id}`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID
                    }).then((response) => {
                        const data = response.data;
                        if (resolve) {
                            resolve(data);
                        }
                    });
                });
            },
            startGame() {
                if (!this.game_loaded) {
                    this.toggleDialog({
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
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
        }
    }
</script>