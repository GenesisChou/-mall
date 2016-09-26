
<template>
<div class='bg-gray'>
    <v-search placeholder='请输入关键字进行过滤'></v-search>
    <div class='border-t-1'>
        <v-list-item v-for='i in 7' :link={name: 'goods-detail'} title='商品名称' title-dupty='200积分'></v-list-item>
    </div>
    <div class='pd10-t pd10-b text-center text-sliver'>上滑加载更多</div>
</div>
</template>
<script>
import vSearch from 'components/v-search'
import vListItem from 'components/v-list-item'
export default {

    name: 'goods-list',
    components: {
        vListItem,
        vSearch
    },
    data() {
        return {

        };
    }
};
</script>
