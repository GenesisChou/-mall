<style lang='scss' scoped>
@import '../assets/scss/variable.scss';
.v-support{
    display:flex;
    display:-webkit-flex;
    align-items:center;
    -webkit-align-items:center;
    justify-content:center;
    -webkit-justify-content:center;
    height:pxTorem(110);
    color:#a0a7ad;
    background-color:#f2f3f4;
    .logo{
        width:pxTorem(60);
        height:pxTorem(35);
        margin-right:pxTorem(15);
        transform:translateY(-5%);
    }
}
</style>
<template>
    <h4 class='v-support'>
        <img class='logo' :src='logo' > 由{{name}}提供技术支持 
    </h4>
</template>
<script>
    export default {
        name:'vSupport',
        computed:{
            name(){
                return APP.NAME;
            }
        },
        data(){
            return{
                logo:require('../assets/images/logo.png')
            }
        }
    }
</script>