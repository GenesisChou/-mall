<style lang='sass'>
@import '../assets/scss/variable.scss';
#lotteryContainer {
    position: absolute;
    width: pxTorem(300);
    height:pxTorem(100);
    /*left: 300px;*/
    /*top: 300px;*/
}

#drawPercent {
    color: #F60;
}
</style>
<template>
    <div class='test'>
        <v-spinner></v-spinner>
        <button class='btn btn-blue' @click='loading=true'>show loading</button>
        <br>
        <br>
        <button class='btn btn-blue' @click='modal=true'>show modal</button>
        <br>
        <br>
        <button class='btn btn-blue' @click='confirm=true'>show confirm</button>
        <v-loading :show.sync='loading'></v-loading>
        <v-modal :show.sync='modal'>
            <div>modal</div>
        </v-modal>
        <button id="freshBtn">刷新</button>
        <label>已刮开 <span id="drawPercent">0%</span> 区域。</label>
        <div id="lotteryContainer"></div>
    </div>
</template>
<script>
import Lottery from 'libs/lottery'
import vSpinner from 'components/v_spinner'
import vModal from 'components/v_modal'
import vLoading from 'components/v_loading'
import vConfirm from 'components/v_confirm'
export default {
    components: {
        vSpinner,
        vLoading,
        vModal,
        vConfirm
    },
    data() {
        return {
            loading: false,
            modal: false,
            confirm: false
        }
    },
    methods: {
        okTest() {
            alert('你点击了');
            this.confirm = !this.confirm;
        }
    },
    ready() {
        var lottery = new Lottery('lotteryContainer', '#CCC', 'color', this.pxTorem(400),this.pxTorem(200), drawPercent);
        lottery.init('how are you ', 'text');
        document.getElementById('freshBtn').onclick = function() {
            drawPercentNode.innerHTML = '0%';
            lottery.init('http://www.baidu.com/img/bdlogo.gif', 'image');
        }

        var drawPercentNode = document.getElementById('drawPercent');

        function drawPercent(percent) {
            drawPercentNode.innerHTML = percent + '%';
        }
    },
    methods: {
        pxTorem(value) {
            let clientWidth = document.documentElement.clientWidth;
            return value * clientWidth / 750;
        }
    }
}
</script>
