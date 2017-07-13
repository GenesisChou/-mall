<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
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
        <div v-if='hasShared&&id&&other_id&&other_type' @click='playSomethingElse' class='monster monster-else'></div>
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
            id: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                other_id: '',
                other_type: ''
            };
        },
        watch: {
            id(value) {
                if (value) {
                    this.getSomethingElse();
                }
            }
        },
        created() {
            this.getSomethingElse();
        },
        methods: {
            changeState() {
                this.$emit('update:show', true);
            },
            playSomethingElse() {
                if (this.other_type === 1) {
                    this.$router.push({
                        path: 'product_detail',
                        query: {
                            product_id: this.other_id,
                        },
                    });
                } else if (this.other_type === 2) {
                    this.$router.push({
                        path: 'activity_detail',
                        query: {
                            activity_id: this.other_id,
                        },
                    });
                } else if (this.other_type === 3) {
                    this.$router.push({
                        path: 'subject_detail',
                        query: {
                            subject_id: this.other_id,
                        },
                    });
                }
            },
            getSomethingElse() {
                const page = this.$parent.$route.name;
                let url = '';
                if (page === 'activity_detail') {
                    url = 'activity';
                } else if (page === 'subject_detail') {
                    url = 'subject';
                }
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/other_${url}_id/${this.id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                    origin: APP.ORIGIN
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (data.data) {
                            this.other_id = data.data.id;
                            this.other_type = data.data.type;
                        }
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    }
                });
            }
        }
    };
</script>