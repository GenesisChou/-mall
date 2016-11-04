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
            padding: pxTorem(40) 0 pxTorem(40) pxTorem(140);
            border-bottom: 1px solid $gray;
            .detail {
                margin-left: pxTorem(10);
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
                    <p> 仓库正在打包，请耐心等候！ </p>
                    <p>2016-11-01 14:04</p>
                </div>
            </li>
        </ul>
    </section>
</template>
