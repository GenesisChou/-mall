<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-item{
    width:50%;
    display: inline-block;
}
.container {
    width: pxTorem(340);
    /*height: pxTorem(350);*/
    padding: pxTorem(20);
    margin: pxTorem(11) auto;
    border: 1px solid $gray-light;
    background-color: $white;
    overflow: hidden;
    .pic {
        position: relative;
        width: pxTorem(300);
        height: pxTorem(200);
        margin-bottom: pxTorem(30);
        border: 1px solid $gray-light;
        img {
            width: 100%;
            height: 100%;
        }
        .label {
            position: absolute;
            left: -2%;
            top: -2%;
            width: pxTorem(115);
            height: pxTorem(40);
            line-height: pxTorem(40);
            color: red;
            border: 1px solid red;
            border-radius: pxTorem(8);
        }
    }
}

.exchange {
    width: pxTorem(100);
    height: pxTorem(40);
    line-height: pxTorem(40);
    /*margin-top:pxTorem(2);*/
    background: url('../../assets/images/blue-button.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    color: rgb(29, 60, 247);
    text-align: center;
    text-indent: pxTorem(12);
    letter-spacing: pxTorem(12);
}

.detail {
    >p {
        height: pxTorem(54);
        font-size: pxTorem(32);
    }
    span{
        line-height: pxTorem(40);
    }
}
</style>
<template>
    <div class='v-item' @click='router'>
        <div class='container'>
            <div class='pic'>
                <span v-if='item.script' class='label bg-white text-center'>
                {{item.script}}
            </span>
                <img :src='item.pic'>
            </div>
            <div class='detail'>
                <p class='text-ellipsis'>{{item.name}}</p>
                <div class=' text-gray '>
                    <span >{{subname}}</span>
                    <div class='pull-right exchange'>
                        {{exchange_msg}}
                    </div>
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
            }
        },
        subname() {
            let subname = this.item.subname;
            if (parseInt(subname)) {
                return parseInt(subname) + '积分';
            }
            return subname;
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
