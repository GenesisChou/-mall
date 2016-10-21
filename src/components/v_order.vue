<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order{
    margin-bottom:pxTorem(22);
    padding:0 pxTorem(30);
    border-top:1px solid #7d7d7d;
    border-bottom:1px solid #7d7d7d;
}
.order-head {
    border-bottom:1px solid #c8c8c8;
}

.order-footer,
.order-head {
    line-height:pxTorem(66);
}
</style>
<template>
    <div  class='order bg-white'>
        <div class='order-head text-small'>
        	<slot name='head-content'></slot>
        </div>
        <div class='order-body'>
        	<slot name='body-content'></slot>
        </div>
        <div class='order-footer text-small'>
        	<slot name='footer-content'>

        	</slot>
        </div>
    </div>
</template>
<script>
import vorderItem from 'components/v_order_item'
export default {

    name: 'v-order',
    components:{
    	vorderItem
    },
    data() {
        return {

        };
    },
    route:{
        data(transition){

        }
    },
    data(){
        return{
            
        }
    }
};
</script>
