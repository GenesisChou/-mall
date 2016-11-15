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
    <section v-if='status!=1' class='v-logistics bg-white'>
        <header class='flex flex-center-v flex-space-between'>
            <span>物流信息</span>

            <span >已发货</span>
        </header>
        <ul class='main'>
            <li v-for='item in logistics' class='flex'>
                <i class='iconfont icon-car  text-huge'></i>
                <div class='detail'>
                    <p class='msg'>{{item.AcceptStation}} </p>
                    <p>{{item.AcceptTime}}</p>
                </div>
            </li>
        </ul>
    </section>
</template>
<script>
export default {
    props:{
        orderId:Number,
        status:Number

    },
    mounted(){
        if(this.status==3){
            this.getOderExpress();
        }
    },
    data(){
        return{
            logistics:[]
        }
    },
    methods: {
        //获取物流信息
        getOderExpress() {
            this.$http.post(`${APP.HOST}/order_express_trace/${this.orderId}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.logistics= response.data.data;
            }, (response) => {

            })
        },
    }
}
</script>
