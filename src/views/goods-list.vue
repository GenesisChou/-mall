<template>
<div class='goods-list'>
	<p>所有商品</p>

	<p v-link='{name:"goods-detail"}'>商品详情</p>
</div>
</template>

<script>
export default {

  name: 'goods-list',

  data () {
    return {

    };
  }
};
</script>

