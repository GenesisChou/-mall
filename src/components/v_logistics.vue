<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-logistics {
    font-size: pxTorem(28);
    header {
        height: pxTorem(90);
        padding: 0 pxTorem(100);
        border-bottom: 1px solid $gray;
    }
    .main {
        li {
            list-style: none;
            padding: pxTorem(40) 0 pxTorem(40) pxTorem(120);
            border-bottom: 1px solid $gray;
            .detail {
                margin-left: pxTorem(20);
                .msg {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    max-width: 90%;
                }
            }
        }
    }
}
</style>
<template>
    <section class='v-logistics bg-white'>
        <header class='flex flex-center-v flex-space-between'>
            <span>物流信息</span>
            <span>已发货</span>
        </header>
        <ul class='main'>
            <li class='flex'>
                <i class='iconfont icon-time  text-huge'></i>
                <div class='detail'>
                    <p class='msg'> 仓库正在打包，请耐心等候！ </p>
                    <p>2016-11-01 14:04</p>
                </div>
            </li>
            <li v-for='i in 2' class='flex'>
                <i class='iconfont icon-car  text-huge'></i>
                <div class='detail'>
                    <p class='msg'> 已出库,配送中 </p>
                    <p>2016-11-01 14:04</p>
                </div>
            </li>
        </ul>
    </section>
</template>
