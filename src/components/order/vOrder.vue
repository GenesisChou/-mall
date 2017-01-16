<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-order {
    margin-bottom: pxTorem(20);
    border-top: 1px solid $gray-light;
    border-bottom: 1px solid $gray-light;
    background: $white;
    &:active{
        background-color:darken($white,10%);
    }
}
header.v-order-header{
    font-size: pxTorem(24);
    line-height: pxTorem(66);
    padding: 0 pxTorem(30);
}
section.v-order-message {
    padding: pxTorem(26) 0;
    margin: 0 pxTorem(30);
    overflow: hidden;
    border-top: 1px solid $gray-light;
    img{
        float: left;
        margin-left: pxTorem(10);
        width: pxTorem(160);
        height: pxTorem(120);
    }
    div{
        margin-left: pxTorem(200);
        overflow: hidden;
        h2{
          font-weight:normal;
          font-size:pxTorem(36);
          margin-bottom:pxTorem(10);
        }
        p{
          font-size:pxTorem(28);
          color:$gray;
        }
        span{
          float:right;
        }
    }
}
</style>
<template>
<div class='v-order'>
    <header class='v-order-header'>
        订单号：{{id}}
    </header>
    <section class='v-order-message'>
        <img  v-lazy='img' />
        <div>
            <h2 class='text-ellipsis'>{{name}}</h2>
            <p> {{integral}}积分
                <span>x1</span>
            </p>
        </div>
    </section>
    <slot> </slot>
</div>
</template>
<script>
export default {
    props: {
        order:Object,
        img:String,
        id:String,
        integral:Number,
        name:String
    }
}
</script>
