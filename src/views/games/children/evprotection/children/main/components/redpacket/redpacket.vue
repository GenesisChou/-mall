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
        z-index: 6;
    }

    .close {
        position: absolute;
        left: 0;
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
    }

    .open {
        position: absolute;
        left: 50%;
        top: pxTorem(464);
        width: pxTorem(220);
        height: pxTorem(220);
        margin-left: pxTorem(-110);
        border-radius: 50%;
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
                <h3>恭喜您获得一次抽奖机会</h3>
                <h1>恭喜你完成挑战，成为西湖环保<br>卫士！小小奖励，以示敬意~</h1>
                <div class='open' @click='lottery'></div>
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
                content_show: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
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
                this.$emit('update:show', false);
            },
            lottery() {
                this.$router.push({
                    path: '/games/evprotection/lottery'
                })
            }
        }
    }
</script>