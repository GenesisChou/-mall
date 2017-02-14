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
        border-radius: pxTorem(90);
        font-size: pxTorem(26);
        text-align: center;
        &:active {
            color: darken($white, 10%);
        }
        &.btn-sliver {
            background-color: $sliver;
            color: $white;
        }
    }
</style>
<template>
    <div class='v-mission'>
        <h4 ref='title' class='title' :style='verticle'>
            {{title}}
        </h4>
        <button @click='router()' :class='["btn",is_read?"btn-sliver":"btn-red"]'>{{btn_text}}></button>
    </div>
</template>
<script>
    export default {
        name: 'vMission',
        props: {
            article: Object,
            callback: Function
        },
        data() {
            return {
                verticle: ''
            }
        },
        computed: {
            id() {
                return this.article.id;
            },
            title() {
                return this.article.title;
            },
            url() {
                return this.article.url;
            },
            button() {
                return this.article.button;
            },
            is_read() {
                return this.article.is_read;
            },
            btn_text() {
                return this.is_read ? '已完成' : this.button;
            }
        },
        mounted() {
            let percent = this.$refs.title.clientHeight / this.$el.clientHeight;
            if (percent < 0.5) {
                this.verticle = {
                    lineHeight: '1.33rem'
                }
            }
        },
        methods: {
            router() {
                event.preventDefault();
                if (!this.is_read) {
                    this.callback(this.id);
                }
                // location.href = this.url;
            }
        }
    }
</script>