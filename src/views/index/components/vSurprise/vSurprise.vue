<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 5;
    }

    .content {
        position: fixed;
        left: 50%;
        top: pxTorem(120);
        width: pxTorem(630);
        height: pxTorem(850);
        margin-left: pxTorem(-630/2);
        z-index: 6;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .close {
        position: absolute;
        left: 50%;
        bottom: pxTorem(-150);
        width: pxTorem(100);
        height: pxTorem(100);
        text-align: center;
        line-height: pxTorem(100);
        margin-left: pxTorem(-50);
        .icon-error {
            font-weight: bold;
            color: $white;
            font-size: pxTorem(60);
        }
    }

    .surprise {
        position: fixed;
        right: pxTorem(40);
        bottom: pxTorem(260);
        width: pxTorem(434/3);
        height: pxTorem(500/3);
        z-index: 2;
        .hand {
            position: absolute;
            top: 20%;
            width: pxTorem(297/3);
            height: pxTorem(323/3);
            margin-left: pxTorem(20);
            z-index: 0;
            animation: hand 2s infinite linear;
        }
        .text {
            position: absolute;
            bottom: 0;
            width: pxTorem(434/3);
            height: pxTorem(169/3);
            background-image: url('./images/blue.png');
            background-size: 100% 100%;
            z-index: 1; // animation: bg 2s infinite linear;
        }
    }

    @keyframes bg {
        0% {
            background-image: url('./images/pink.png');
        }
        50% {
            background-image: url('./images/blue.png');
        }
        100% {
            background-image: url('./images/pink.png');
        }
    }

    @keyframes hand {
        0% {
            top: 20%;
        }
        50% {
            top: 5%;
        }
        100% {
            top: 20%;
        }
    }
</style>
<template>
    <div class='v-surprise'>
        <div v-if='surprise_show===true' class='bg-cover'></div>
        <transition name='enlarge'>
            <div v-if='surprise_show===true' class='content'>
                <img :src='pic' @click='toSomeWhere'>
                <div class='close' @click='close'>
                    <i class='iconfont icon-error'></i>
                </div>
            </div>
        </transition>
        <div v-show='surprise_show===false' @click='toSomeWhere' class='surprise'>
            <img class='hand' src='./images/hand.png'>
            <div class='text'></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vSurprise',
        props: {
            layout: Object,
            routerLink: Function
        },
        data() {
            return {
                pic: '',
            };
        },
        created() {
            if (this.layout && this.layout.items && this.layout.items.length > 0) {
                this.pic = this.layout.items[0].pic_init_new;
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            surprise_show() {
                return this.$store.state.index.surprise_show;
            }
        },
        watch: {
            $route(value) {
                if (value.name !== 'index') {
                    this.surprise_show = false;
                }
            }
        },
        methods: {
            toSomeWhere() {
                this.$store.dispatch('toggleSurprise', false);
                if (this.user.first_login === 1) {
                    this.$store.dispatch('updateGuideState', 'guide-wish');
                }
                this.routerLink(this.layout.items[0], this.layout);
            },
            close() {
                this.$store.dispatch('toggleSurprise', false);
                if (this.user.first_login === 1) {
                    this.$store.dispatch('updateGuideState', 'guide-wish');
                }
            },
        }
    };
</script>