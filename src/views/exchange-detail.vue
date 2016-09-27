<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    border-bottom: pxTorem(1) solid $sliver;
}

.footer,
.head {
    line-height: pxTorem(35);
}
</style>
<template>
    <div class='pd10-l pd10-r  border-b-1 mg10-b'>
        <div class='head'>
            订单号：10086
        </div>
        <div class='body'>
            <v-exchange-item v-for='i in 2'></v-exchange-item>
        </div>
        <div class='footer'>
            <p>商品信息： </p>
            <p>BBW20138012423 </p>
            <p>使用说明： </p>
            <p>请到以下网址按照说明使用：www.test.com </p>
        </div>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vExchangeItem from 'components/v-exchange-item'
export default {

    name: 'exchange-detail',
    components: {
        vExchangeItem
    },
    data() {
        return {

        };
    },
    created(){
      utils.setTitle('订单详情');
    },
    methods: {
        getExchangeDetail() {

        }
    }
};
</script>
