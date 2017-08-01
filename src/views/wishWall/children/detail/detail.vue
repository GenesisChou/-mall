<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .detail {
        width: 100%;
        min-height: 100%;
        background: #f2f4f3;
        padding-top: pxTorem(15);
    }

    .summary {
        display: flex;
        align-items: center;
        height: pxTorem(244); // padding: pxTorem(27) 0;
        padding: 0 pxTorem(30);
        margin-bottom: pxTorem(28);
        background: $white;
        border-bottom: 1px solid #d3d4d6;
    }

    .avater {
        width: pxTorem(128);
        height: pxTorem(128);
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .message {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0 pxTorem(20);
        justify-content: center;
        strong {
            font-size: pxTorem(32);
        }
        .date {
            font-size: pxTorem(24);
            font-weight: normal;
        }
        p {
            width: 100%;
            margin-top: pxTorem(10);
            height: pxTorem(72);
            overflow: hidden;
            font-size: pxTorem(24);
            color: #a9aaae;
        }
    }

    .operation {
        width: 100%;
        padding-top: pxTorem(60);
        padding-bottom: pxTorem(36);
        background: $white;
        h1 {
            text-align: center;
        }
        .number {
            margin-left: pxTorem(10);
            margin-right: pxTorem(20);
            font-size: pxTorem(62);
            color: #ff5f17;
        }
        .button-group {
            display: flex;
            justify-content: center;
            .button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: pxTorem(254);
                height: pxTorem(74);
                border-radius: pxTorem(5);
                font-size: pxTorem(32);
                &.support {
                    background: #ff5f17;
                    color: $white;
                    margin-right: pxTorem(26);
                }
                &.invite {
                    border: 1px solid #ff5f17;
                    color: #ff5f17;
                }
            }
        }
    }

    .notice {
        border-top: 1px solid #fbfbfb;
        background: $white;
        border-bottom: 1px solid #d3d4d6;
        h4 {
            line-height: pxTorem(80);
            text-align: center;
        }
        .content {
            display: flex;
            align-items: center;
            height: pxTorem(113);
            padding: 0 pxTorem(30);
            img {
                width: pxTorem(102);
                height: pxTorem(102);
            }
            .message {
                flex: 1;
                h6 {
                    color: #a9aaae;
                }
            }
            .button {
                width: pxTorem(155);
                height: pxTorem(50);
                text-align: center;
                line-height: pxTorem(50);
                font-size: pxTorem(24);
                border-radius: pxTorem(10);
                color: $white;
                background: #ff5f17;
            }
        }
    }

    .supporters {
        margin-top: pxTorem(15);
        background: $white;
        .title {
            position: relative;
            padding: pxTorem(40) 0;
            text-align: center;
        }
    }
    .support{
        display: flex;
        height: pxTorem(148);
        padding:0 pxTorem(30);
        align-items: center;
        .avater{
            width: pxTorem(100);
            height: pxTorem(100);
            margin-right:pxTorem(30);
        }
        h6{
            color:#a9aaae;
        }
        .success{
            width: pxTorem(50);
            height: pxTorem(50);
            margin-left: pxTorem(30);
        }
    }
</style>
<template>
    <div class='detail'>
        <div class='summary'>
            <div class='avater'>
                <img src='./images/avater.png'>
            </div>
            <div class='message'>
                <strong>钜予雨雨雨 <span class='date'>7月26日</span></strong>
                <p>我要爱奇艺会员推我推我推我推我 我要上榜我要上榜 快让</p>
            </div>
        </div>
        <div class='operation'>
            <h1>已经有<span class='number'>158</span>支持</h1>
            <div class='button-group'>
                <div class='button support'>支持</div>
                <div class='button invite'>邀请好友支持</div>
            </div>
        </div>
        <div class='notice'>
            <h4>您许下的心愿我们已帮您完成，请前往兑换</h4>
            <div class='content'>
                <img src='./images/food.png'>
                <div class='message'>
                    <h5>阿根廷啊下还好似乎是的</h5>
                    <h6>阿根廷啊下还好似乎是的</h6>
                </div>
                <div class='button'>去兑换</div>
            </div>
        </div>
        <div class='supporters'>
            <h4 class='title'>最近支持他的好友</h4>
            <ul>
                <li class='support'>
                    <img class='avater' src='./images/juyu.png'>
                    <div class='message'>
                        <h2>玩具鱼拉拉阿拉 副本</h2>
                        <h6>2016-09-11 14:58:21</h6>
                    </div>
                    <img class='success' src='./images/success.png'>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import vWish from '../../components/vWish';
    export default {
        name: 'detail',
        components: {
            vWish
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {}
    };
</script>