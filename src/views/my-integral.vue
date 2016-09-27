<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    line-height: 0.9rem;
}

.title {
    line-height: 1.5rem;
}

.record-list {
    > li {
        border-bottom: 1px solid $sliver;
    }
    .detail {
        line-height: 0.5rem;
    }
}

.popup-content {
    line-height: 0.9rem;
}
</style>
<template>
    <div class='mg10-t'>
        <div class='head text-center'>
            <p><strong>当前余额</strong></p>
            <p class='text-large'><strong>{{1200 | currency '¥'}}</strong></p>
            <p>
                <button class='btn btn-default mg5-r' @click='togglePopup'>赚取积分</button>
                <button class='btn btn-default ' v-link='{name:"exchange-list"}'>兑换记录</button>
            </p>
        </div>
        <div class='body pd10-l pd10-r'>
            <p class='title text-center text-sliver'>
                积分明细
            </p>
            <ul class='record-list'>
                <li v-for='i in 5' class='flex flex-space-between  pd5-t'>
                    <div class='detail'>
                        签到
                        <p class='text-sliver'>
                            2016-9-9 14:58:21
                        </p>
                    </div>
                    <div class='flex flex-center-v'>+10 </div>
                </li>
            </ul>
        </div>
        <v-popup :show.sync='popup'>
            <div class='popup-content pd10-l pd10-t pd10-r pd10-b'>
                您可以通过以下途径赚取积分：
                <ol>
                    <li>1、签到</li>
                    <li>2、分享</li>
                    <li>3、参与活动</li>
                </ol>
                <p class='text-center'>
                    <button class='btn btn-blue' @click='togglePopup'>知道了</button>
                </p>
            </div>
        </v-popup>
    </div>
</template>
<script>
import vPopup from 'components/v-popup'
export default {

    name: 'my-integral',
    components: {
        vPopup
    },
    data() {
        return {
            popup: false
        };
    },
    methods: {
        togglePopup() {
            this.popup = !this.popup;
        }
    }
};
</script>
