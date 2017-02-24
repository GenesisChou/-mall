<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-mission {
        position: relative;
        height: pxTorem(110);
        margin-left: pxTorem(35);
        margin-right: pxTorem(35);
        overflow: hidden;
        border-top: 1px solid #a78179;
        font-weight: 500;
        .title {
            width: 70%;
            padding-top: pxTorem(7.5);
            padding-right: pxTorem(50);
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-justify-content: center;
            position: absolute;
            right: 0;
            top: 50%;
            width: pxTorem(115);
            height: pxTorem(50);
            margin-top: pxTorem(-25);
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
        <h4 ref='title' class='title' :style='style'>
            {{title}}
        </h4>
        <a  :class='{read:is_read}'>{{btn_text}}</a>
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
                style: ''
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
                return this.article.is_read==1;
            },
            btn_text() {
                return this.is_read ? '已完成' : this.button;
            }
        },
        mounted() {
            let percent = this.$refs.title.clientHeight / this.$el.clientHeight;
            if (percent < 0.5) {
                this.style = {
                    lineHeight: utils.pxTorem(110),
                    paddingTop: 0
                }
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