<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-mission {
        display: flex;
        align-items: center;
        justify-content: space-between;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: space-between;
        position: relative;
        height: pxTorem(110);
        overflow: hidden;
        border-top: 1px solid #a78179;
        font-weight: 500;
        .title {
            width: 70%;
            max-height: 80%;
            padding-left: pxTorem(35);
            overflow: hidden;
        }
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            width: pxTorem(115);
            height: pxTorem(50);
            margin-right: pxTorem(35);
            border-radius: pxTorem(10);
            font-size: pxTorem(24);
            background-color: $orange;
            color: $white;
            &.read {
                background-color: #4dd3d6;
            }
        }
    }
</style>
<template>
    <div class='v-mission' @click='router()'>
        <h4 ref='title' class='title'>
            {{title}}
        </h4>
        <a :class='{read:is_read}'>{{btn_text}}</a>
    </div>
</template>
<script>
    export default {
        name: 'vMission',
        props: {
            article: Object,
            callback: Function
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
                return this.article.is_read == 1;
            },
            btn_text() {
                return this.is_read ? '已完成' : this.button;
            }
        },
        methods: {
            router() {
                event.preventDefault();
                if (!this.is_read) {
                    this.callback(this.id);
                }
                location.href = this.url;
            }
        }
    }
</script>