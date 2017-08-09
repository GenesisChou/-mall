<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .v-pk {
        position: relative;
        margin-top: pxTorem(30);
        &:after {
            clear: both;
            content: '';
            display: block;
        }
    }

    .participant {
        display: flex;
        align-items: center;
        width: pxTorem(354);
        height: pxTorem(154);
        background: $white;
        box-shadow: 0 0 pxTorem(5) rgba(0, 0, 0, .1);
        &.winner {
            opacity: .5;
            .win {
                display: block;
            }
        }
    }

    .left {
        float: left;
        border-top-right-radius: pxTorem(10);
        border-bottom-right-radius: pxTorem(10);
    }

    .right {
        float: right;
        border-top-left-radius: pxTorem(10);
        border-bottom-left-radius: pxTorem(10);
        .message {
            text-align: right;
            overflow: hidden;
            p {
                float: right;
                text-align: right;
            }
            span {
                float: right;
            }
        }
        .operation {
            flex-direction: row-reverse;
            .button {
                margin-right: 0;
                margin-left: pxTorem(10);
            }
        }
    }

    .icon {
        width: pxTorem(138);
        height: pxTorem(138);
        margin: 0 pxTorem(10);
        border-radius: pxTorem(20);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .detail {
        flex: 1;
    }

    .message {
        p {
            width: pxTorem(140);
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        span {
            display: block;
            width: pxTorem(140);
            color: #a9aaae;
            font-size: pxTorem(20);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    .operation {
        display: flex;
        align-items: center;
        .button {
            width: pxTorem(95);
            height: pxTorem(36);
            margin-right: pxTorem(10);
            line-height: pxTorem(36);
            text-align: center;
            color: $white;
            background: #ff5f17;
            border-radius: pxTorem(18);
            font-size: pxTorem(24);
            &.disable {
                background-color: #b5b5b5;
                color: $white;
            }
        }
        strong {
            font-size: pxTorem(32);
            color: #ff5f17;
            span {
                padding-left: pxTorem(4);
                font-size: pxTorem(22);
            }
        }
    }

    .vs {
        position: absolute;
        left: 50%;
        top: -12%;
        width: pxTorem(118);
        height: pxTorem(118);
        transform: translateX(-50%);
        border-radius: 50%;
        box-shadow: 0 0 pxTorem(5) rgba(0, 0, 0, .1);
        background: $white url('./images/vs.png') no-repeat center center;
        background-size: pxTorem(44) pxTorem(66);
    }

    .win {
        display: none;
        position: absolute;
        width: pxTorem(137);
        height: pxTorem(83);
        &.win-right {
            top: 0;
            right: pxTorem(10);
        }
        &.win-left {
            top: pxTorem(10);
            left: pxTorem(10);
            transform: rotate(-33deg);
        }
    }
</style>
<template>
    <div v-if='mate.length>1' class='v-pk'>
        <div :class='["participant","left",{winner:pk.status===3&&left.score>right.score}]'>
            <img class='win win-left' src='./images/win.png'>
            <div class='icon'>
                <img :src='left.pic'>
            </div>
            <div class='detail'>
                <div class='message'>
                    <p>{{left.title}}</p>
                    <span>{{left.sub_title}}</span>
                </div>
                <div class='operation'>
                    <div v-if='left.state===1' class='button' @click='supportPk(left.id,0)'>支持</div>
                    <div v-else-if='left.state===2' class='button disable'>支持</div>
                    <div v-else-if='left.state===3' class='button disable'>已支持</div>
                    <strong class='votes'>{{left.score}}<span>票</span></strong>
                </div>
            </div>
        </div>
        <div :class='["participant","right",{winner:pk.status===3&&left.score<right.score}]'>
            <div class='detail'>
                <div class='message'>
                    <p>{{right.title}}</p>
                    <span>{{right.sub_title}}</span>
                </div>
                <div class='operation'>
                    <div v-if='right.state===1' class='button' @click='supportPk(right.id,1)'>支持</div>
                    <div v-else-if='right.state===2' class='button disable'>支持</div>
                    <div v-else-if='right.state===3' class='button disable'>已支持</div>
                    <strong class='votes'>{{right.score}}<span>票</span></strong>
                </div>
            </div>
            <div class='icon'>
                <img :src='right.pic'>
            </div>
            <img class='win win-right' src='./images/win.png'>
        </div>
        <div class='vs'></div>
    </div>
</template>
<script>
    export default {
        name: 'vPk',
        props: {
            pk: Object
        },
        data() {
            return {
                state: 'ready'
            };
        },
        computed: {
            mate() {
                return this.pk.items;
            },
            left() {
                return this.mate[0];
            },
            right() {
                return this.mate[1];
            }
        },
        created() {
            this.init();
        },
        methods: {
            supportPk(id, $index) {
                if (this.mate[0].is_support === 2 && this.mate[1].is_support === 2 && this.state === 'ready') {
                    this.state = 'block';
                    this.$http.post(`${APP.HOST}/pk_support/${id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID,
                        pk_id: this.pk.id
                    }).then((response) => {
                        const data = response.data;
                        this.state = 'ready';
                        if (data.status === APP.SUCCESS) {
                            this.$parent.getPkInfor(this.pk.id).then(() => {
                                this.init();
                            });
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info
                            });
                        }
                    });
                }
            },
            init() {
                /*
                    state
                    1 支持 orange
                    2 支持 gray
                    3 已支持 gray
                 */
                this.left.state = 2;
                this.right.state = 2;
                if (this.left.is_support === 1) {
                    this.left.state = 3;
                } else if (this.right.is_support === 1) {
                    this.right.state = 3;
                } else if (this.pk.status === 2) {
                    this.left.state = 1;
                    this.right.state = 1;
                }
            }
        }
    };
</script>