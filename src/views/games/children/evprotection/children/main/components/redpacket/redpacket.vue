<style lang='scss' scoped>
    @import '../../../../../../../../assets/scss/variable.scss';
    .redpacket {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 5;
    }

    .content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: pxTorem(651);
        height: pxTorem(869);
        margin-left: pxTorem(-651/2);
        margin-top: pxTorem(-869/2);
        background: url('./images/redpacket.png') 100% 100%/100% 100%;
        color: #e6dba4;
        text-align: center;
        transform-origin: center center;
        transform: scale(1.04);
        z-index: 6;
    }

    .close {
        position: absolute;
        right: 0;
        top: 0;
        padding: pxTorem(32);
        .icon-error {
            font-weight: bold;
            font-size: pxTorem(26);
            color: #b53e26;
        }
    }

    .avater {
        border-radius: pxTorem(15);
        width: pxTorem(104);
        height: pxTorem(104);
        margin: pxTorem(76) auto pxTorem(20) auto;
        overflow: hidden;
        border: pxTorem(3) solid $white;
    }

    h1 {
        font-size: pxTorem(34);
        font-weight: 500;
    }

    h3 {
        padding: pxTorem(10) 0 pxTorem(50) 0;
        &.gray {
            color: #4d4d4d;
            padding-top: pxTorem(80);
        }
    }

    .open {
        position: absolute;
        left: 50%;
        top: pxTorem(464);
        width: pxTorem(220);
        height: pxTorem(220);
        margin-left: pxTorem(-110);
        border-radius: 50%;
        &.open-1 {
            background: url('./images/yellowButton.png') no-repeat center center/100% 100%;
        }
        &.open-2 {
            background: url('./images/grayButton.png') no-repeat center center/100% 100%;
        }
    }
</style>
<template>
    <div v-if='show' class='redpacket'>
        <transition name='enlarge'>
            <div v-if='content_show' class='content'>
                <div class='close' @click='close'>
                    <i class='iconfont icon-error'></i>
                </div>
                <div class='avater'>
                    <img class='img-responsive' :src='user.headimg'>
                </div>
                <h1>剿灭劣V类 争做西湖环保卫士</h1>
                <h3 v-if='avaliable'>{{notice}}</h3>
                <h3 class='gray' v-else>今日抽奖机会已经用完喽！</h3>
                <h1 v-if='avaliable'>恭喜你完成挑战，成为西湖环保<br>卫士！小小奖励，以示敬意~</h1>
                <div v-if='avaliable' class='open open-1' @click='lottery'></div>
                <div v-else class='open open-2'></div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            show: Boolean
        },
        data() {
            return {
                content_show: false,
                clicked: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            notice() {
                return this.$store.state.games.lottery_infor.notice;
            },
            type() {
                return this.$store.state.games.lottery_infor.type;
            },
            avaliable() {
                return this.$store.state.games.lottery_infor.avaliable || false;
            }
        },
        watch: {
            show(value) {
                setTimeout(() => {
                    this.content_show = value;
                }, 0);
            }
        },
        created() {
            this.getLotteryInfor();
        },
        methods: {
            close() {
                this.$emit('update:show', false);
            },
            getLotteryInfor() {
                this.$store.dispatch('getLotteryInfor', this.$route.params.id);
            },
            lottery() {
                if (this.clicked === false) {
                    this.clicked = true;
                    this.getResult().then(data => {
                        const temp = data.data;
                        this.getLotteryInfor();
                        this.clicked = false;
                        this.$router.push({
                            path: `/games/${this.$route.params.id}/evprotection/lottery`,
                            query: {
                                type: temp.is_win || 2,
                                money: temp.cash || 0
                            }
                        })
                    }, () => {
                        this.clicked = false;
                    })
                }
            },
            getResult() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('toggleLoading');
                    const game_id = parseInt(this.$route.params.id);
                    this.$http.post(`${APP.HOST}/game_tool_draw/${game_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN,
                        url: APP.HOST
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS && typeof resolve === 'function') {
                            resolve(data);
                        } else {
                            reject();
                        }
                    }, (response) => {
                        reject();
                        this.$store.dispatch('toggleLoading');
                    });
                });
            }
        }
    }
</script>