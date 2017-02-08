<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-mission {
        position: relative;
        height: pxTorem(150);
        margin-left: pxTorem(20);
        padding: pxTorem(25) 0;
        overflow: hidden;
        border-bottom: 1px solid $gray-light;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: pxTorem(8);
            height: pxTorem(8);
            margin-top: pxTorem(-4);
            border-radius: 50%;
            background-color: $red;
        }
    }
    
    .title {
        width: 70%;
        padding: 0 pxTorem(50) 0 pxTorem(30);
        float: left;
        line-height: pxTorem(50);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    button {
        position: absolute;
        right: pxTorem(50);
        top: 50%;
        margin-top: pxTorem(-30);
        width: pxTorem(180);
        height: pxTorem(60);
        line-height: pxTorem(60);
        border-radius: pxTorem(90);
        font-size: pxTorem(26);
        text-align: center;
        &:active {
            color: darken($white, 10%);
        }
    }
    
    button.btn-sliver {
        background-color: $sliver;
        color: $white;
    }
</style>
<template>
    <div class='v-mission'>
        <h4 class='title' :style='verticle'>
            {{title}}
        </h4>
        <button @click='router()' :class='["btn",isRead?"btn-sliver":"btn-red"]'>{{btn_text}}></button>
    </div>
</template>
<script>
    export default {
        name: 'v-mission',
        props: {
            title: String,
            link: String,
            text: {
                type: String,
                default: '点击阅读'
            },
            isRead: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                verticle: ''
            }
        },
        computed:{
            btn_text(){
                return this.isRead?'已完成':this.text;
            }
        },
        mounted() {
            let percent = this.$el.querySelector('.title').clientHeight / this.$el.clientHeight;
            if (percent < 0.5) {
                this.verticle = {
                    lineHeight: '1.33rem'
                }
            }
        },
        methods: {
            router() {
                event.preventDefault();
                location.href=this.link;
            }
        }
    }
</script>