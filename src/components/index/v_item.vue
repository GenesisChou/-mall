<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-item {
    width: pxTorem(340);
    /*height: pxTorem(350);*/
    padding: pxTorem(20);
    margin: pxTorem(11);
    border: 2px solid $gray-light;
    background-color: $white;
    .pic {
        position: relative;
        width: pxTorem(300);
        height: pxTorem(200);
        margin-bottom: pxTorem(30);
        border: 1px solid $gray;
        background-image:url('../../assets/images/index/v-item.png');
        background-size:100%;
        background-repeat:no-repeat;
        .label {
            position: absolute;
            left: -2%;
            top: -2%;
            width: pxTorem(115);
            height: pxTorem(40);
            line-height: pxTorem(40);
            color: $red;
            border: 1px solid $red;
            border-radius: 5%;
        }
    }
    .exchange{
    	width: pxTorem(100);
    	height: pxTorem(40);
    	line-height: pxTorem(40);
    	text-align:center;
    	color:blue;
    	border:1px solid blue;
    	border-radius: 5%;
    }
}
</style>
<template>
    <div class='v-item'>
        <div class='pic'>
            <span class='label bg-white text-center'>
	   			热门活动
	   		</span>
        </div>
        <div class='detail'>
            <p class='text-huge text-ellipsis'>刮刮卡</p>
            <p class=' text-gray flex flex-space-between'>
                <span class='text-ellipsis flex-item'>200积分</span>
                <span class='exchange'>兑换</span>
            </p>
        </div>
    </div>
</template>
