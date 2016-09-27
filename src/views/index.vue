<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
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
.popup-content {
    .img {
        width: pxTorem(30);
        height: pxTorem(30);
        border: pxTorem(1) solid $black;
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
                <div class='mg5-r circle text-small flex flex-center-h flex-center-v' @click='togglePopup()'>
                    点击
                    <br> 签到
                </div>
                <div class='content'>
                    <p >未签到</p>
                    <small>连续签到:20天</small>
                </div>
            </div>
        </div>
        <div class='mg10-t'>
            <v-cell v-link='{name:"activity-list"}' :icon='' msg-left='热门活动' msg-right='所有活动'></v-cell>
            <v-list-item v-for='i in 3' v-link='{name:"activity-detail"}' title='刮刮卡' title-dupty='这是活动副标题'></v-list-item>
        </div>
        <div class=' mg10-t'>
            <v-cell v-link='{name:"goods-list"}' :icon='' msg-left='热门商品' msg-right='所有商品'></v-cell>
            <v-list-item v-for='i in 3' v-link='{name:"goods-detail"}' title='商品名称' title-dupty='200积分'></v-list-item>
        </div>
    </div>
    <v-popup :show.sync='popup'>
        <div class='popup-content pd10-l pd10-t pd10-r pd10-b text-center'>
            
            <img class='img' />
            <p style='line-height:1.5rem'>签到成功，积分+10</p>
            <button class='btn btn-blue' @click='togglePopup(signIn)'>确定</button>
        </div>
    </v-popup>
</template>
<script>
import vPopup from 'components/v-popup'
import vCell from 'components/v-cell'
import vListItem from 'components/v-list-item'
export default {

    name: 'index',
    components: {
        vCell,
        vListItem,
        vPopup
    },
    data() {
        return {
            popup:false,
            signState:false
        };
    },
    methods:{
        togglePopup(method){
            if(method){
                method();
            }
            this.popup=!this.popup;
        },
        signIn(){
        }
    }
};
</script>
