<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-adv {
        width: pxTorem(750);
        padding: 0 pxTorem(10) pxTorem(26) pxTorem(10);
        margin-bottom:pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        &:active{
            background-color:darken($white,2%);
        }
        header {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            height: pxTorem(64);
            color: #ff5f17;
        }
        .icon {
            width: pxTorem(33);
            height: pxTorem(33);
            margin-right:pxTorem(20);
        }
        main {
            padding: pxTorem(10) pxTorem(20);
            background-color: #f7f7f7;
        }
        .banner {
            width: pxTorem(688);
            height: pxTorem(193);
        }
    }
</style>
<template>
    <div class='v-adv'  @click='routerLink'>
        <header >
            <img class='icon' src='./images/advStar.png'>
            <h2  class='text-ellipsis'>{{adv.name}}</h2>
        </header>
        <main>
            <img class='banner' :src='adv.pic'>
        </main>
    </div>
</template>
<script>
    export default {
        props: {
            adv: Object
        },
        methods:{
            routerLink(){
                location.href=this.adv.url;
            }
        }
    }
</script>