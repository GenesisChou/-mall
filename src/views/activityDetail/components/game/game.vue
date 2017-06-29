<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .game-detail {
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: $white;
    }

    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(330);
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

    .notice {
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
    <div class='game-detail' v-if='game'>
        <header class='header' ref='container'>
            <template v-if='state==="ready"||state==="block"'>
                <img class='banner' :src='activityDetail.pic_banner_new'>
                <div class='start' @click='startGame'></div>
                <div class='cover'></div>
                <div class='notice' v-if='isOff'>游戏已下架</div>
                <div class='notice' v-else>{{notice}}</div>
            </template>
            <canvas id="canvas"></canvas>
        </header>
        <article v-if='state==="ready"||state==="block"' :class='["describe",color]'>
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
        <footer v-if='state==="ready"||state==="block"'>
            <v-award-box :awords='activityDetail.items' :color='color'></v-award-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vAwardBox from '../vAwardBox';
    export default {
        components: {
            vDescribeTitle,
            vAwardBox
        },
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            toggleDialog: Function,
            isOff: Boolean
        },
        data() {
            const game_list = [{
                    name: '开心消消乐',
                    code: 'r3FEflzD',
                    style: 'eliminate'
                }, {
                    name: '棍子忍者',
                    code: 'uWr5e32D',
                    style: 'stick'
                },
                {
                    name: '逝去的青春',
                    code: 'o3KdlWed',
                    style: 'mario'
                },
                {
                    name: '接金元宝',
                    code: '8Ew3kl53',
                    style: 'gold'
                },
                {
                    name: '颠球大赛',
                    code: '6Uwfer9e',
                    style: 'soccer'
                },
                {
                    name: '猫落游戏',
                    code: 'U49deE3',
                    style: 'cat'
                },
                {
                    name: '双色小弹球',
                    code: 'a3jeUdw8',
                    style: 'twins'
                },
                {
                    name: '蛋糕制造者',
                    code: 't8EwO4nh',
                    style: 'cake'
                },
                {
                    name: '忍者跑酷',
                    code: 'E1w9gp4i3',
                    style: 'pakour'
                }
            ];
            return {
                name: '',
                game_id: '',
                game: '',
                state: '',
                is_win: '',
                order_detail_id: '', //活动结束跳转id
                dialog: {},
                game_loaded: false,
                activity_result: {},
                game_list,
                dialog_style: ''
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
                ];
                let color = 'green';
                colors.forEach(item => {
                    if (item.name === this.name) {
                        color = item.color;
                    }
                });
                return color;
            },
            user() {
                return this.$store.state.user;
            },
        },
        watch: {
            state(value) {
                if (value === 'start') {
                    this.freshFreeTimes();
                    // this.$parent.game_start = true;
                    AIR.Game.startGame('#canvas', false, false, this.game, 1, true);
                    AIR.Game.gameOver((score) => {
                        this.dialog.score = score;
                        this.state = 'stop';
                        AIR.Game.stopGame();
                        this.toggleDialog(this.dialog);
                    });
                }
            },
            game_id(value) {
                this.getGameDetail(value).then(data => {
                    this.name = data.data.name;
                    this.game_list.forEach(item => {
                        if (item.name === this.name) {
                            this.game = item.code;
                            this.dialog_style = item.style || '';
                            return;
                        }
                    });
                });
            },
            game(value) {
                if (!value) return;
                const url = `http://m.goldmiao.com/yngame/${value}.min.1.0.1.js`,
                    $script = require('scriptjs');
                $script(url, () => {
                    console.log('game loaded');
                    this.game_loaded = true;
                });
            },
            is_win(value) {
                if (this.state !== 'start') return;
                const result = this.activity_result,
                    old_canvas = document.getElementById('canvas'),
                    new_canvas = document.createElement('canvas');
                new_canvas.setAttribute('id', 'canvas');
                if (value) {
                    this.dialog = {
                        type: 'success',
                        style: this.dialog_style,
                        score: 0,
                        img: result.pic_thumb_new,
                        msg: '获得' + result.name,
                        callback: this.toOrderDetail(result.id),
                        callback_close: () => {
                            this.init();
                            this.$refs.container.replaceChild(new_canvas, old_canvas);
                        },
                        btn_text: '查看'
                    };
                } else {
                    this.dialog = {
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
        deactivated() {
            //游戏开始后
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
                this.dialog = {};
                this.state = 'ready';
            },
            getGameDetail(game_id) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/game_detail/${game_id}`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data);
                            }
                        }
                    });
                });
            },
            startGame() {
                if (this.user.show_authorize !== 1) {
                    utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                    return;
                }
                if (this.state !== 'ready') return;
                if (!this.game) {
                    this.toggleDialog({
                        msg: '该活动已下架',
                    });
                    return;
                }
                if (!this.game_loaded) {
                    this.toggleDialog({
                        msg: '请等待游戏完全载入',
                    });
                    return;
                }
                this.state = 'block';
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/game_activity/${this.id}`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        //缺少积分
                        if (data.data.error_code === APP.INTEGRAL_LACK) {
                            this.toggleDialog({
                                faliure: 'lack',
                                callback: () => {
                                    this.init();
                                }
                            });
                            return;
                        }
                        this.state = 'start';
                        this.activity_result = data.data;
                        this.is_win = this.activity_result.is_win;
                    } else {
                        this.toggleDialog({
                            msg: data.info,
                            callback: () => {
                                this.init();
                            }
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
        }
    };
</script>