<style lang='scss' scoped>
    @import '../../../../../../assets/scss/variable.scss';
    .v-pk {
        position: relative;
        margin: pxTorem(30) 0;
        &:after {
            clear: both;
            content: '';
            display: block;
        }
    }

    .participant {
        display: flex;
        align-items: center;
        width: pxTorem(354);
        height: pxTorem(154);
        background: $white;
        box-shadow: 0 0 pxTorem(5) rgba(0, 0, 0, .1);
    }

    .left {
        float: left;
        border-top-right-radius: pxTorem(10);
        border-bottom-right-radius: pxTorem(10);
    }

    .right {
        float: right;
        border-top-left-radius: pxTorem(10);
        border-bottom-left-radius: pxTorem(10);
        .message {
            text-align: right;
            overflow: hidden;
            p {
                float: right;
                text-align: right;
            }
            span {
                float: right;
            }
        }
        .operation {
            flex-direction: row-reverse;
            .button {
                margin-right: 0;
                margin-left: pxTorem(10);
            }
        }
    }

    .icon {
        width: pxTorem(138);
        height: pxTorem(138);
        margin: 0 pxTorem(10);
        border-radius: pxTorem(20);
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .detail {
        flex: 1;
    }

    .message {
        p {
            width: pxTorem(140);
            height: pxTorem(38);
            font-weight: bold;
            overflow: hidden;
        }
        span {
            width: pxTorem(140);
            height: pxTorem(36);
            color: #a9aaae;
            font-size: pxTorem(20);
            overflow: hidden;
        }
    }

    .operation {
        display: flex;
        align-items: center;
        .button {
            width: pxTorem(95);
            height: pxTorem(36);
            margin-right: pxTorem(10);
            line-height: pxTorem(36);
            text-align: center;
            color: $white;
            background: #ff5f17;
            border-radius: pxTorem(18);
            font-size: pxTorem(24);
        }
        strong {
            font-size: pxTorem(32);
            color: #ff5f17;
            span {
                padding-left: pxTorem(4);
                font-size: pxTorem(22);
            }
        }
    }

    .vs {
        position: absolute;
        left: 50%;
        top: 50%;
        width: pxTorem(90);
        height: pxTorem(90);
        margin-left: pxTorem(-45);
        margin-top: pxTorem(-45);
        border-radius: 50%;
        box-shadow: 0 0 pxTorem(5) rgba(0, 0, 0, .1);
        background: $white url('./images/vs.png') no-repeat center center;
        background-size: pxTorem(44) pxTorem(66);
    }
</style>
<template>
    <div v-if='mate.length>1' class='v-pk'>
        <div class='participant left'>
            <div class='icon'>
                <img :src='mate[0].pic'>
            </div>
            <div class='detail'>
                <div class='message'>
                    <p>{{mate[0].title}}</p>
                    <span>{{mate[0].sub_title}}</span>
                </div>
                <div class='operation'>
                    <div class='button'>支持</div>
                    <strong class='votes'>{{mate[0].score}}<span>票</span></strong>
                </div>
            </div>
        </div>
        <div class='participant right'>
            <div class='detail'>
                <div class='message'>
                    <p>{{mate[1].title}}</p>
                    <span>{{mate[1].sub_title}}</span>
                </div>
                <div class='operation'>
                    <div class='button'>支持</div>
                    <strong class='votes'>{{mate[1].score}}<span>票</span></strong>
                </div>
            </div>
            <div class='icon'>
                <img :src='mate[1].pic'>
            </div>
        </div>
        <div class='vs'></div>
    </div>
</template>
<script>
    export default {
        name: 'vPk',
        props: {
            pk: Object
        },
        data() {
            return {
                mate: []
            };
        },
        created() {
            this.mate = this.pk.items;
        }
    };
</script>