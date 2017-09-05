<style lang="scss" scoped>
    @import '../../../../../../../../assets/scss/variable.scss';
    .v-rank {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 5;
    }

    .content {
        position: fixed;
        left: 50%;
        top: 50%;
        width: pxTorem(660);
        height: pxTorem(910);
        margin-left: pxTorem(-330);
        margin-top: pxTorem(-455);
        background: #fff5e3;
        border: pxTorem(10) solid #c68e4f;
        border-radius: pxTorem(10);
        z-index: 6;
    }

    .close {
        position: absolute;
        right: pxTorem(-55);
        top: pxTorem(-60);
        padding: pxTorem(30);
        img {
            width: pxTorem(50);
            height: pxTorem(50);
        }
    }

    .header {
        display: flex;
        align-items: center;
        height: pxTorem(220);
        background: #fbe5bd;
        color: #1b1b1b;
        .avater {
            width: pxTorem(120);
            height: pxTorem(120);
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid $white;
            background: $white;
        }
        li {
            list-style: none;
            span {
                padding-left: pxTorem(40);
                font-size: pxTorem(42);
            }
            h2 {
                line-height: pxTorem(48);
            }
        }
        li:nth-child(1),
        li:nth-child(3) {
            text-align: center;
            padding: 0 pxTorem(40);
        }
        li:nth-child(2) {
            flex: 1;
            padding-left: pxTorem(60);
        }
    }



    .list {
        padding-top: pxTorem(15);
        color: #1b1b1b;
        height: pxTorem(487);
        font-size: pxTorem(34);
        li {
            display: flex;
            list-style: none;
            height: pxTorem(90);
            align-items: center;
        }
        .ranking {
            position: relative;
            text-align: center;
            width: pxTorem(120);
            font-size: pxTorem(34);
            img {
                display: none;
                position: absolute;
                left: pxTorem(25);
                top: pxTorem(-18);
                width: pxTorem(70);
                height: pxTorem(81);
                z-index: 0;
            }
            span {
                position: relative;
            }
            &.active {
                img {
                    display: block;
                }
                span {
                    font-size: pxTorem(25);
                    color: $white;
                }
            }
        }
        .avater {
            width: pxTorem(68);
            height: pxTorem(68);
            margin: 0 pxTorem(40) 0 pxTorem(10);
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid $white;
            background: $white;
        }
        .name {
            flex: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .score {
            padding-right: pxTorem(32);
        }
    }
</style>

<template>
    <div v-if='show' class='v-rank'>
        <transition name='enlarge'>
            <div v-if='content_show' class='content'>
                <div class='close' @click='close'><img src='./images/close.png'></div>
                <ul class='header'>
                    <li>
                        <div class='avater'>
                            <img class='img-responsive' :src='rankList.self.headimg'>
                        </div>
                        <h2>
                            {{rankList.self.nickname}}
                        </h2>
                    </li>
                    <li>
                        本次得分<span>{{rankList.self.game_score}}</span>
                    </li>
                </ul>
                <ul class='list'>
                    <li v-for='(item,$index) in rankList.rank'>
                        <div :class='[{active:$index<3},"ranking"]'>
                            <img src='./images/award.png'>
                            <span>{{$index+1}}</span>
                        </div>
                        <img class='avater' :src='item.headimg'>
                        <div class='name'>{{item.nickname}}</div>
                        <span class='score'>{{item.game_score}}分</span>
                    </li>
                </ul>
                <footer>
                    <slot name='operation'></slot>
                </footer>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                default: false,
                type: Boolean,
            },
            callback: Function,
            rankList: Object
        },
        data() {
            return {
                content_show: false,
            }
        },
        watch: {
            show(value) {
                setTimeout(() => {
                    this.content_show = value;
                }, 0);
            }
        },
        methods: {
            close() {
                if (this.callback && typeof this.callback === 'function') {
                    this.callback();
                } else {
                    this.$emit('update:show', false);
                }
            }
        }
    }
</script>