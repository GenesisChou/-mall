<style lang='sass' scoped>@import '../assets/scss/variable.scss';

.head {
    padding: $gap*4 0;
    .event {
        flex: 1;
        .circle {
            width: pxTorem(49);
            height: pxTorem(49);
            border: pxTorem(1) solid $black;
            border-radius: 50%;
        }

    }
}
</style>
<template>
<div class='index bg-gray  pd10-t'>
	<div class='head bg-white flex border-t-1 border-b-1'>
		<div class='event flex flex-center-h flex-center-v border-r-1' v-link='{name:"my-integral"}'>
			<img class='mg5-r circle '>
			<div class='content'>
				<p>我的积分</p>
				<small>当前余额:1200</small>
			</div>
		</div>
		<div class='event flex flex-center-h flex-center-v'>
			<div class='mg5-r circle text-small flex flex-center-h flex-center-v'>
				点击
				<br> 签到
			</div>
			<div class='content'>
				<p>未签到</p>
				<small>连续签到:20天</small>
			</div>
		</div>
	</div>

	<div class='mg10-t'>
		<v-cell :link={name: 'activity-list'} :icon='' msg-left='热门活动' msg-right='所有活动'></v-cell>
		<v-list-item v-for='i in 3' :link={name: 'activity-detail'} title='刮刮卡' title-dupty='这是活动副标题'></v-list-item>
	</div>

	<div class=' mg10-t'>
		<v-cell :link={name: 'goods-list'} :icon='' msg-left='热门商品' msg-right='所有商品'></v-cell>
		<v-list-item v-for='i in 3' :link={name: 'goods-detail'} title='商品名称' title-dupty='200积分'></v-list-item>
	</div>

</div>
</template>

<script>
import vCell from 'components/v-cell'
import vListItem from 'components/v-list-item'
export default {

	name: 'index',
	components: {
		vCell,
		vListItem
	},
	data() {
		return {

		};
	}
};
</script>
