<style lang='scss' scoped>
@import '../assets/scss/variable.scss';
.v-support{
    height:pxTorem(120);
    line-height:pxTorem(120);
    text-align:center;
    font-size:pxTorem(32);
    color:$sliver;
}
</style>
<template>
    <div class='v-support'>
        由{{name}}提供技术支持 
    </div>
</template>
<script>
    export default {
        name:'vSupport',
        computed:{
            name(){
                return APP.NAME;
            }
        }
    }
</script>