<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-item {
    width: 50%;
    float:left;
    padding: pxTorem(20) pxTorem(35);
    border: 1px solid #f3f3f3;
    background-color: #ffffff;
}


    .pic {
        position: relative;
        width: pxTorem(300);
        height: pxTorem(200);
        margin:0 auto;
        img {
            width: 100%;
            height: 100%;
        }
        .label {
            position: absolute;
            left:pxTorem(-10);
            top:pxTorem(-10);
            width: pxTorem(115);
            height: pxTorem(42);
            color: red;
            border: 1px solid red;
            border-radius: pxTorem(10);
            font-size:pxTorem(26);
            padding:0;
        }
    }

.exchange {
    width: pxTorem(70);
    height: pxTorem(40);
    line-height: pxTorem(40);
    border: 1px solid #0000ff;
    border-radius: pxTorem(20);
    color: #0000ff;
    text-align: center;
    // text-indent: pxTorem(3);
    // letter-spacing: pxTorem(3);
    font-size:pxTorem(24);
}

.detail {
  margin-top: pxTorem(30);
    >p {
        height: pxTorem(54);
        font-size: pxTorem(32);
        color:#1d1e1d;
    }
    span {
        display: inline-block;
        max-width: pxTorem(225);
        line-height: pxTorem(40);
        height: pxTorem(40);
        font-size:pxTorem(24);
        overflow: hidden;
        text-overflow: ellipsis;
        color:#878686;
        i{
          color:red;
          margin-right:pxTorem(8);
          font-style:normal;
          font-size:pxTorem(32);
        }
    }
}
</style>
<template>
    <div class='v-item' @click='router'>
            <div class='pic'>
                <span v-if='item.script' class='label bg-white text-center'>
                {{item.script}}
                </span>
                <img :src='item.pic'>
            </div>
            <div class='detail'>
                <p class='text-ellipsis'>{{item.name}}</p>
                <div >
                    <span v-if='parseInt(item.subname)'><i>{{parseInt(item.subname)}}</i>积分</span>
                    <span v-else>{{item.subname}}</span>
                    <div class='pull-right exchange'>
                        {{exchange_msg}}
                    </div>
                </div>
            </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        item: Object,
        type: String
    },
    methods: {
        router() {
            if (this.type == 'commend') {
                this.$store.dispatch('commendView', this.item.id);
            }

            this.$router.push(this.router_link);
        }
    },
    computed: {
        exchange_msg() {
            if (this.item.type == 1) {
                return '兑换';
            }
            if (this.item.type == 2) {
                if (this.item.item_type == 1) {
                    return '刮卡';
                }
                if (this.item.item_type == 2) {
                    return '问答';
                }
                if(this.item.item_type==3){
                    return '游戏';
                }
            }
        },
        router_link() {
            if (this.item.type == 1) {
                return {
                    name: "product_detail",
                    query: {
                        product_id: this.item.item_id
                    }
                };
            }

            if (this.item.type == 2) {
                return {
                    name: "activity_detail",
                    query: {
                        activity_id: this.item.item_id
                    }
                };

            }
        }
    }
}
</script>
