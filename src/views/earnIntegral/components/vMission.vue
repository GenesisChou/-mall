<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-mission {
        @include flex-center-v;
        @include justify-content(space-between);
        position: relative;
        height: pxTorem(110);
        margin:0 pxTorem(30);
        border-top: 1px solid #d4d4d6;
        .title {
            width: 70%;
            font-weight:500;
        }
        div {
            @include flex-center;
            width: pxTorem(115);
            height: pxTorem(50);
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
        <div :class='{read:is_read}'>{{btn_text}}</div>
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
                this.callback(this.id).then(() => {
                    location.href = this.url;
                });
            },

        }
    }
</script>