<style lang='sass' scoped>

@import '../assets/scss/variable.scss';

	.top{
		display: flex;
		padding:$gap*4 0;
		background: white;
		border-top:1px solid black;
		border-bottom: 1px solid black;
		.my-integral,.sign{
			display: flex;
			flex:1;
			align-items: center;
			justify-content: center;
			img{
				width: 1.3rem;
				height: 1.3rem;
				border:1px solid black;
			}

		}
		.my-integral{
			border-right:1px solid black;
		}
	}
</style>
<template>

<div class='bg-gray  pd10-t'>
	<div class='top '>
		<div class='my-integral' v-link='{name:"my-integral"}'>
			<img class='mg5-r img-circle' >
			<div class='content'>
				<p>我的积分</p>
				<small>当前余额:1200</small>
			</div>
		</div>
		<div class='sign'>
			<img class='mg5-r img-circle'   >
			<div class='content'>
				<p>未签到</p>
				<small>连续签到:20天</small>
			</div>
		</div>
	</div>

	<div class='bg-white mg10-t'>
		<v-cell :link={name:'activity-list'} :icon='' msg-left='热门活动' msg-right='所有活动' ></v-cell>
		<v-list-item v-for='i in 3' :link={name:'activity-detail'} title='刮刮卡' title-dupty='这是活动副标题'></v-list-item>
	</div>

		<div class='bg-white mg10-t'>
		<v-cell :link={name:'goods-list'} :icon=''  msg-left='热门商品' msg-right='所有商品'></v-cell>
		<v-list-item v-for='i in 3' :link={name:'goods-detail'} title='商品名称' title-dupty='200积分'></v-list-item>
	</div>

</div>
</template>

<script>
import vCell from 'components/v-cell'
import vListItem from 'components/v-list-item'
export default {

  name: 'index',
  components:{
  	vCell,vListItem
  },
  data () {
    return {

    };
  }
};
</script>
