<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-guide {
        position: fixed;
        right: 0;
        top: pxTorem(868);
        width: pxTorem(173);
        height: pxTorem(153);
        overflow: hidden;
        z-index: 5;
        .monster {
            position: relative;
            width: 100%;
            height: 100%;
            &:after {
                content: '';
                position: absolute;
                right: pxTorem(22);
                top: pxTorem(20);
                width: pxTorem(12);
                height: pxTorem(12);
                background: url('./images/redPocket.png');
                background-size: 100% 100%;
                transform-origin: center bottom;
                animation: jitter infinite 2s linear; // transform: rotate(-30deg);
            }
        }
        .monster-share {
            background: url('./images/monsterShare.png');
            background-size: 100% 100%;
        }
        .monster-else {
            background: url('./images/monsterElse.png');
            background-size: 100% 100%;
        }
        .money {
            position: absolute;
            right: -15%;
            top: 0;
            width: pxTorem(173);
            height: pxTorem(75);
            animation: rain infinite 4s linear;
        }
    }

    @keyframes jitter {
        0% {
            transform: rotate(30deg);
        }
        25% {
            transform: rotate(-30deg);
        }
        50% {
            transform: rotate(30deg);
        }
        75% {
            transform: rotate(-30deg);
        }
        100% {
            transform: rotate(30deg);
        }
    }

    @keyframes rain {
        0% {
            right: -15%;
            top: 0;
        }
        100% {
            right: -30%;
            top: 100%;
        }
    }
</style>
<template>
    <div class='v-guide'>
        <img class='money' src='./images/money.png'>
        <div v-if='hasShared&&other_activity_id' @click='playSomethingElse' class='monster monster-else'></div>
        <div v-else @click='changeState' class='monster monster-share'></div>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            hasShared: Boolean,
            activityId: Number
        },
        data() {
            return {
                other_activity_id: ''
            };
        },
        created() {
            this.getSomethingElse().then(data => {
                if (data.data) {
                    this.other_activity_id = data.data;
                }
            });
        },
        methods: {
            changeState() {
                this.$emit('update:show', true);
            },
            playSomethingElse() {
                this.$router.replace({
                    name: 'activity_detail',
                    query: {
                        activity_id: this.other_activity_id
                    }
                });
                window.location.reload();
            },
            getSomethingElse() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/other_activity_id/${this.activityId}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        origin: APP.ORIGIN
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS && typeof resolve === 'function') {
                            resolve(data);
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info
                            });
                        }
                    });
                });
            }
        }
    };
</script>