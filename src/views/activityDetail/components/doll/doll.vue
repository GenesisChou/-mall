<style lang='scss' scoped>
@import '../../../../assets/scss/variable.scss';
.v-doll {
    min-height: pxTorem(1250);
    padding-bottom: pxTorem(84);
    background-image: url('./images/dollBackground.png');
    background-size: pxTorem(750);
}

.header {
    width: pxTorem(750);
    height: pxTorem(400);
}

.doll {
    position: relative;
    width: pxTorem(750);
    height: pxTorem(832);
    margin-top: pxTorem(-90);
    background-image: url('./images/dollPanel.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .integral-message {
        @include flex-center;
        position: absolute;
        width: 80%;
        left: 10%;
        top: pxTorem(90);
        font-size: pxTorem(38);
        color: #fdca46;
    }
    .notice {
        @include flex-center;
        position: absolute;
        width: 80%;
        left: 10%;
        top: pxTorem(194);
        font-weight: 500;
        color: $white;
        .number {
        	padding: 0 pxTorem(8) pxTorem(5) pxTorem(8);
            font-size: pxTorem(44);
            font-weight: 600;
            color: #104a97;
        }
    }
}

.describe {
    position: relative;
    padding: 0 pxTorem(40);
    .editor-style {
        padding-top: pxTorem(20);
        padding-bottom: pxTorem(40);
        color: #1d70c3;
    }
}
</style>
<template>
    <div class="v-doll">
        <header class="header">
            <img v-if="activityDetail.pic_icon" :src="activityDetail.pic_icon" class="img-responsive">
            <img v-else class="img-responsive" src="./images/dollDefaultBanner.png">
        </header>
        <main>
            <div class="doll">
                <header class="integral-message">
                    现有积分:
                    <v-integral-box :integral='user.integral>>0' color='yellow'>
                    </v-integral-box>
                </header>
                <footer class='notice'>
                    <template v-if='freeTimes>0'>
                        今天还有<span class='number'>{{freeTimes}}</span>次免费机会
                    </template>
                    <template v-else>
                        每次消耗<span class='number'>{{activityDetail.integral>>0}}</span>积分
                    </template>
                </footer>
            </div>
        </main>
        <article class="describe">
            <v-describe-title text='详细说明' color='palaceblue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content'></section>
            </v-simditor>
            <v-describe-title text='概率说明' color='palaceblue'></v-describe-title>
            <v-simditor>
                <section v-html='activityDetail.content_prob'></section>
            </v-simditor>
            <v-describe-title text='奖项列表' color='palaceblue'></v-describe-title>
        </article>
        <footer>
        	<v-aword-box :awords='activityDetail.items' color='palaceblue'></v-aword-box>
        </footer>
    </div>
</template>
<script>
import vDescribeTitle from '../vDescribeTitle';
import vIntegralBox from '../vIntegralBox';
import vAwordBox from '../vAwordBox';
export default {
    name: 'doll',
    components: {
        vDescribeTitle,
        vIntegralBox,
        vAwordBox
    },
    props: {
        freshFreeTimes: Function,
        activityDetail: Object,
        freeTimes: Number
    },
    data() {
        return {

        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>
