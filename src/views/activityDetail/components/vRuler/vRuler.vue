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
            width: pxTorem(650); // height: pxTorem(620);
            background-color: $white;
            border-radius: pxTorem(10);
            text-align: justify;
            transform: translate(-50%, -50%);
            z-index: 6;
        }
        .title {
            position: relative;
            text-align: center;
            padding: pxTorem(30) 0;
            color: $white;
            font-size: pxTorem(36);
            &:before,
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                margin-top: pxTorem(-10);
                width: pxTorem(20);
                height: pxTorem(20);
                border-radius: 50%;
                background: $white;
            }
            &:before {
                left: pxTorem(215);
            }
            &:after {
                right: pxTorem(215);
            }
        }

        .rulers {
            width: 100%;
            height: pxTorem(550);
            color: $white !important;
            padding: 0 pxTorem(30) pxTorem(48) pxTorem(30);
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        .operation {
            position: relative;
            text-align: center;
            color: $white;
            font-size: pxTorem(36);
            padding: pxTorem(38) 0 pxTorem(45) 0;
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: pxTorem(-304);
                width: pxTorem(608);
                height: 1px;
                background: $white;
            }
        }
        .close {
            width: pxTorem(80);
            height: pxTorem(80);
            position: absolute;
            right: 0;
            top: 0;
            background: url('./images/close.png') center center no-repeat;
            background-size: pxTorem(28) pxTorem(28);
        }
    }
</style>
<template>
    <div class='v-ruler'>
        <div v-show='show' class='bg-cover' ref='cover'></div>
        <transition name='enlarge'>
            <div v-show='show' class='content' :style='style'>
                <h1 class='title'>活动规则</h1>
                <div class='close' @click='close'></div>
                <div class='rulers'>
                    <v-simditor>
                        <section v-html='activityDetail.content'></section>
                        <section v-html='activityDetail.content_prob'></section>
                    </v-simditor>
                </div>
                <div class='operation' @click='close'>
                    我知道了
                </div>
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
        computed: {
            style() {
                const colors = {
                        scrap: ['#2ba7a9', '#e76241'],
                        quiz: ['#f89f14', '#ff6766'],
                        game: [],
                        shake: ['#fe7a6f', '#fe7236'],
                        fortune: ['#ff494b', '#ee1b6b'],
                        egg: ['#fe7a6f'],
                        machine: ['#2793c4', '#2793c4'],
                        treasure: ['#007e94'],
                        doll: ['#0f73ce'],
                        card: ['#cf9500'],
                        tear: ['#fd5957'],
                        marble: ['#fd5957']
                    },
                    theme_type = this.activityDetail.theme_type,
                    type = this.$parent.activity_type;
                if (type && theme_type && colors[type] && colors[type][theme_type - 1]) {
                    return {
                        background: colors[type][theme_type - 1]
                    };
                }
                return {
                    background: '#2ba7a9'
                };
            }
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