<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.order{
    margin-bottom:pxTorem(22);
    padding:0 pxTorem(30);
    border-top:pxTorem(1) solid #7d7d7d;
    border-bottom:pxTorem(1) solid #7d7d7d;
}
.head {
    border-bottom:pxTorem(1) solid #c8c8c8;
}

.footer,
.head {
    line-height:pxTorem(66);
}
</style>
<template>
    <div  class='order bg-white'>
        <div class='head text-small'>
        	<slot name='head-content'></slot>
        </div>
        <div class='body'>
        	<slot name='body-content'></slot>
        </div>
        <div class='footer text-small'>
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
