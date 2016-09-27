<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    border-bottom: 1px solid $sliver;
}

.footer,
.head {
    line-height: 0.9rem;
}
</style>
<template>
    <div class='exchange-list'>
        <ul>
            <li v-for='i in 3' v-link='{name:"exchange-detail"}' class='pd10-l pd10-r border-t-1 border-b-1 mg10-b'>
                <div class='head'>
                    订单号：10086
                </div>
                <div class='body'>
                    <v-exchange-item></v-exchange-item>
                </div>
                <footer class='footer'>
                    已发放，点击查看详情记录
                </footer>
            </li>
        </ul>
    </div>
</template>
<script>
import vExchangeItem from 'components/v-exchange-item'
export default {

    name: 'exchange-list',
    components: {
        vExchangeItem
    },
    data() {
        return {

        };
    }
};
</script>
