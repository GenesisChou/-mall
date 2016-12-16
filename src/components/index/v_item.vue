<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-item {
    width: 50%;
    height: pxTorem(375);
    float: left;
    padding: pxTorem(20) pxTorem(35);
    border: 1px solid $gray-light;
    background-color: $white;
    overflow: hidden;
}

header{
    position: relative;
    width: pxTorem(300);
    height: pxTorem(200);
    margin: 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
    span {
        position: absolute;
        left: pxTorem(-10);
        top: pxTorem(-10);
        width: pxTorem(115);
        height: pxTorem(40);
        line-height: pxTorem(40);
        padding: 0;
        color: red;
        background-color: $white;
        border: 1px solid red;
        box-sizing: content-box;
        border-radius: pxTorem(10);
        font-size: pxTorem(26);
        text-align: center;
    }
}

.detail {
    margin-top: pxTorem(30);
    h2 {
        height: pxTorem(42);
        font-size: pxTorem(32);
        color: #1d1e1d;
        font-weight: normal;
        margin-bottom: pxTorem(10);
    }
    span {
        display: inline-block;
        max-width: pxTorem(225);
        line-height: pxTorem(40);
        height: pxTorem(40);
        overflow: hidden;
        text-overflow: ellipsis;
        color: #878686;
        font-size: pxTorem(28);
        i {
            color: red;
            margin-right: pxTorem(8);
            font-style: normal;
            font-size: pxTorem(32);
        }
    }
    button {
        width: pxTorem(70);
        height: pxTorem(40);
        padding: 0;
        margin: 0;
        background: none;
        line-height: pxTorem(40);
        border: 1px solid #0000ff;
        border-radius: pxTorem(20);
        color: #0000ff;
        text-align: center;
        float: right;
        font-size: pxTorem(24);
    }
}
</style>
<template>
<div class='v-item' @click='router'>
    <header>
        <span v-if='item.script'>
                {{item.script}}
                </span>
        <img  :src='item.pic'>
    </header>
    <div class='detail'>
        <h2 class='text-ellipsis'>{{item.name}}</h2>
        <div>
            <span v-if='parseInt(item.subname)'><i>{{parseInt(item.subname)}}</i>积分</span>
            <span v-else>{{item.subname}}</span>
            <button>
                {{exchange_msg}}
            </button>
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
    data(){
      return {
        // img_obj:{
        //   src:this.item.pic,
        //   error:'fuck',
        //   loading:'http://image.lxway.com/upload/0/b2/0b2b7eb5ce674e66c6a728e85afae0f3_thumb.jpg'
        // }
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
                if (this.item.item_type == 3) {
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
