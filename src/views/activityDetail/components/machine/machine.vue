<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-machine {
        position: relative;
        min-height: pxTorem(1250);
        padding-bottom: pxTorem(84);
        background-color: #64acff;
        ul,
        li {
            list-style: none;
        }
    }
    
    .header {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(400);
    }
    
    .banner-decoration {
        position: absolute;
        left: 0;
        top: 0;
        width: pxTorem(750);
        height: pxTorem(37);
        z-index: 2;
    }
    
    .default-banner {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(434);
        z-index: 2;
    }
    
    .background {
        position: absolute;
        width: pxTorem(750);
        height: pxTorem(1026);
        left: 0;
        top: pxTorem(90);
        z-index: 0;
    }
    
    .machine {
        position: relative;
        padding: pxTorem(32);
        margin: pxTorem(66) auto;
        width: pxTorem(740);
        height: pxTorem(525);
        background-image: url('./images/machinePanel.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .integral-message {
            position: absolute;
            top: pxTorem(-40);
            left: 50%;
            margin-left: pxTorem(-416/2);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: pxTorem(416);
            height: pxTorem(85);
            background-color: #fdc713;
            border-radius: pxTorem(10);
            box-shadow: 0 pxTorem(5) pxTorem(5) #fbab07;
            font-size: pxTorem(38);
            color: $white;
            z-index: 1;
        }
        .notice {
            position: absolute;
            bottom: pxTorem(-20);
            left: 50%;
            margin-left: pxTorem(-320/2);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: pxTorem(320);
            height: pxTorem(63);
            background-color: #76e6f7;
            border-radius: pxTorem(10);
            box-shadow: 0 pxTorem(5) pxTorem(5) #367fe5;
            font-weight: 500;
            color: #fc4c60;
            z-index: 1;
            .number {
                padding: 0 pxTorem(5);
                font-size: pxTorem(36);
                color: $white;
            }
        }
        .container {
            display: flex;
            display: -webkit-flex;
            position: relative;
            background-color: $white;
            width: 100%;
            height: 100%;
            border: pxTorem(30) solid #fdc713;
            border-radius: pxTorem(12);
            box-shadow: 0 0 pxTorem(8) rgba(0, 0, 0, .6);
        }
        .shadow {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        .group {
            flex: 1;
            -webkit-flex: 1;
            border-right: pxTorem(6) solid #fdc713;
            overflow: hidden;
            &:last-child {
                border: none;
            }
        }
        .awords {
            transform: translateY(pxTorem((410-600)/2));
            -webkit-transform: translateY(pxTorem((410-600)/2));
            li {
                height: pxTorem(200);
                padding-top: pxTorem(10);
                text-align: center;
            }
            img {
                width: pxTorem(180);
                height: pxTorem(140);
            }
        }
    }
    
    .operation {
        position: relative;
        width: pxTorem(750);
        height: pxTorem(138);
        text-align: center;
        margin-bottom: pxTorem(40);
        img {
            position: relative;
            width: pxTorem(243);
            height: pxTorem(138)
        }
        .line {
            position: absolute;
            top: 50%;
            left: pxTorem(30);
            width: pxTorem(690);
            height: pxTorem(4);
            background-color: #76e6f7;
            box-shadow: 0 pxTorem(5) pxTorem(5) #4a93f0;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
        }
        .line:before,.line:after {
            content:'';
            position: absolute;
            top:50%;
            width: pxTorem(14);
            height: pxTorem(14);
            border-radius: 50%;
            background-color:#76e6f7;
            box-shadow: 0 pxTorem(5) pxTorem(5) #4a93f0;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
        }
        .line:before{
            left:pxTorem(-7);
        }
        .line:after{
            right:pxTorem(-7);
        }
    }
    
    .describe {
        position: relative;
        padding: 0 pxTorem(40);
        .editor-style {
            padding-top: pxTorem(20);
            padding-bottom: pxTorem(40);
            color: $white;
        }
    }
</style>
<template>
    <div class='v-machine'>
        <img class='background' src='./images/machineBackground.png'>
        <header class='header'>
            <img v-if='activityDetail.pic_icon' :src='activityDetail.pic_icon' class='img-responsive'>
            <img v-else class='default-banner' src='./images/machineDefaultBanner.png'>
            <img class='banner-decoration' src='./images/machineDecoration.png'>
        </header>
        <main>
            <div class='machine'>
                <header class='integral-message'>
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='pink'></v-integral-box>
                </header>
                <ul class='container'>
                    <img class='shadow' src='./images/machineShadow.png'></img>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                        </ul>
                    </li>
                    <li class='group'>
                        <ul class='awords'>
                            <li v-for='aword in activityDetail.items'>
                                <img :src='aword.pic'>
                            </li>
                        </ul>
                    </li>


                </ul>
                <footer class='notice'>
                    <template v-if='!freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </footer>
            </div>
            <div class='operation'>
                <div class='line'></div>
                <img src='./images/machineButton.png'>
            </div>
        </main>
        <article class='describe'>
            <v-describe-title text='详细说明' color='blue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='blue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='blue'></v-describe-title>
        </article>
        <footer>
            <v-aword-box :awords='activityDetail.items' color='blue'></v-aword-box>
        </footer>
    </div>
</template>
<script>
    import vDescribeTitle from '../vDescribeTitle';
    import vIntegralBox from '../vIntegralBox.vue';
    import vAwordBox from '../vAwordBox';
    export default {
        name: 'machine',
        components: {
            vDescribeTitle,
            vIntegralBox,
            vAwordBox
        },
        props: {
            freshFreeTimes: Function,
            activityDetail: Object,
            id: Number,
            notice: String,
            toOrderDetail: Function,
            freeTimes: Number,
            toggleDialog: Function
        },
        data() {
            return {
                state: '', //游戏状态
                alert: {},
                is_win: '', //判断是否中奖
                activity_result: {},
                aword_height: 200
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            init() {
                this.state = 'ready';
                this.alert = {};
                this.is_win = '';
                this.activity_result = {};
            },
        }
    }
</script>