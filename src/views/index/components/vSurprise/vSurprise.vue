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
        right: pxTorem(30);
        bottom: pxTorem(260);
        width: pxTorem(300/2);
        height: pxTorem(280/2);
        background: url('./images/guide.gif');
        background-size: 100% 100%;
        z-index: 2;
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
        <div v-show='surprise_show===false' @click='toSomeWhere' class='surprise'></div>
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
                pic: ''
            };
        },
        computed: {
            surprise_show() {
                return this.$store.state.index.surprise_show || false;
            },
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            if (this.layout && this.layout.items && this.layout.items.length > 0) {
                this.pic = this.layout.items[0].pic_init_new;
            }
        },
        watch: {
            $route(value) {
                if (value.name !== 'index') {
                    this.$store.dispatch('toggleSurprise', false);
                }
            }
        },
        methods: {
            toSomeWhere() {
                this.$store.dispatch('toggleSurprise', false);
                this.routerLink(this.layout.items[0], this.layout);
            },
            close() {
                if (this.user.first_login === 1) {
                    this.$store.dispatch('updateGuideState', 'guide-account');
                }
                this.$store.dispatch('toggleSurprise', false);
            },
        }
    };
</script>