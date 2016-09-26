<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.item{
  border-bottom:1px solid $sliver;
  .img{
    width:pxTorem(64);
    height:pxTorem(64);
  }
  .content{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .number{
    align-self:flex-end;
  }
}
</style>
<template >
  <div class='item flex pd10-t pd10-b'>
    <img class='img border-1' />
    <div class='content pd10-l'>
        <strong class='text-large'>商品名称</strong>
        <span> 200积分 </span>
    </div>
    <div class='number'>
      ×1
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>
