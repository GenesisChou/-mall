<style lang='sass' scoped>
@import '../../assets/scss/variable.scss';
.v-item {
    width: pxTorem(340);
    /*height: pxTorem(350);*/
    padding: pxTorem(20);
    margin: pxTorem(11);
    border: 1px solid $gray-light;
    background-color: $white;
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
}

.detail {
    p:first-child {
        height: pxTorem(54);
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
            <p class='text-huge text-ellipsis'>{{item.name}}</p>
            <p class=' text-gray flex flex-space-between'>
                <span class='text-ellipsis flex-item'>{{subname}}</span>
                <img class='exchange' src="../../assets/images/blue-button.png">
            </p>
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
