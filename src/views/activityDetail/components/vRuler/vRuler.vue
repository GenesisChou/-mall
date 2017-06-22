<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-ruler {
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
            top: 50%;
            width: pxTorem(608); // height: pxTorem(620);
            background-color: $white;
            border-radius: pxTorem(10);
            text-align: justify;
            transform: translate(-50%, -50%);
            z-index: 6;
        }
        .title {
            text-align: center;
            padding: pxTorem(40) 0;
            color: #3d4244;
            font-size: pxTorem(38);
        }

        .rulers {
            width: 100%;
            height: pxTorem(400);
            padding: 0 pxTorem(45) pxTorem(45) pxTorem(45);
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .operation {
            @include active;
            border-top: 1px solid #d3d4d6;
            height: pxTorem(100);
            line-height: pxTorem(100);
            text-align: center;
            color: #ff5000;
            font-size: pxTorem(36);
            border-bottom-left-radius: pxTorem(10);
            border-bottom-right-radius: pxTorem(10);
        }
        .close {
            width: pxTorem(80);
            height: pxTorem(80);
            text-align: center;
            line-height: pxTorem(80);
            position: absolute;
            right: pxTorem(-26);
            top: pxTorem(-26);
            font-size: pxTorem(70);
            color: $orange;
            &:active{
                color:darken($orange,5%);
            }
        }
    }
</style>
<template>
    <div class='v-ruler'>
        <div v-show='show' class='bg-cover' ref='cover'></div>
        <transition name='enlarge'>
            <div v-show='show' class='content'>
                <h1 class='title'>活动说明</h1>
                <i class='close iconfont icon-cancel' @click='close'></i>
                <div class='rulers'>
                    <v-simditor>
                        <section v-html='activityDetail.content'></section>
                        <section v-html='activityDetail.content_prob'></section>
                    </v-simditor>
                </div>
                <div class='operation' @click='close'>我知道了</div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            activityDetail: Object
        },
        data() {
            const touchMoveEvent = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
            return {
                touchMoveEvent
            };
        },
        watch: {
            show(v) {
                if (this.type === 'select') {
                    return;
                }
                utils.toggleTouchMove(v, this.$refs.cover);
            }
        },
        methods: {
            close() {
                this.$emit('update:show', false);
            },
        }

    };
</script>