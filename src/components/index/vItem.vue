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
        &:active {
            background-color: darken($white, 5%);
        }
    }
    
    header {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        img {
            width: pxTorem(300);
            height: pxTorem(200);
        }
        span {
            position: absolute;
            left: pxTorem(-60);
            top: pxTorem(25);
            width: pxTorem(200);
            height: pxTorem(30);
            line-height: pxTorem(30);
            color: $white;
            background-color: $red;
            font-size: pxTorem(20);
            text-align: center;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            z-index: 1;
        }
    }
    
    .detail {
        margin-top: pxTorem(30);
        h2 {
            height: pxTorem(42);
            color: #1d1e1d;
            margin-bottom: pxTorem(10);
        }
        span {
            float: left;
            margin-right: pxTorem(5);
            max-width: pxTorem(200);
            height: pxTorem(35);
            overflow: hidden;
            color: #878686;
            font-size: pxTorem(28);
            i {
                color: red;
                margin-right: pxTorem(8);
                font-style: normal;
                font-size: pxTorem(32);
            }
        }
        strong {
            padding: 0 pxTorem(10);
            background: $pink;
            border-radius: pxTorem(10);
            color: $white;
            text-align: center;
            font-size: pxTorem(24);
            float: left;
            font-weight: normal;
        }
    }
</style>
<template>
    <div class='v-item' @click='router'>
        <header>
            <span v-if='item.script'>
                {{item.script}}
                </span>
            <img :src='item.pic'>
        </header>
        <div class='detail'>
            <h2 class='text-ellipsis'>{{item.name}}</h2>
            <div>
                <span>{{item.sub_name}}</span>
                <strong>
                 {{item.label}}
                </strong>
            </div>
        </div>
    </div>
</template>
<script>
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
            router_link() {
                if (this.item.type == 1) {
                    return {
                        name: "product_detail",
                        query: {
                            product_id: this.item.item_id,
                            product_name: this.item.name,
                            integral: this.item.integral >> 0
                        }
                    };
                }

                if (this.item.type == 2) {
                    return {
                        name: "activity_detail",
                        query: {
                            activity_id: this.item.item_id,
                        }
                    };

                }
            }
        }
    }
</script>