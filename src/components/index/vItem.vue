<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-item {
        width: 50%;
        height: pxTorem(450);
        float: left;
        padding: pxTorem(20) pxTorem(35);
        border: 1px solid $gray-light;
        background-color: $white;
        overflow: hidden;
        &:active {
            background-color: darken($white, 5%);
        }
    }
    
    .head {
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
            z-index: 1;
        }
    }
    
    .message {
        margin-top: pxTorem(30);
        h2 {
            color: #1d1e1d;
        }
        span {
            color: #878686;
            font-size: pxTorem(28);
        }
        strong {
            padding: 0 pxTorem(10);
            background: $pink;
            border-radius: pxTorem(10);
            color: $white;
            font-size: pxTorem(24);
            float: right;
            font-weight: normal;
        }
    }
</style>
<template>
    <div class='v-item' @click='router'>
        <header class='head'>
            <span v-if='item.script'>
                {{item.script}}
                </span>
            <img :src='item.pic'>
        </header>
        <footer class='message'>
            <h2 class='text-ellipsis'>{{item.name}}</h2>
            <h4 class='text-ellipsis'>{{item.sub_name}}</h4>
            <span>{{item.integral>>0}}积分</span>
            <strong>
                 {{item.label}}
             </strong>
        </footer>
    </div>
</template>
<script>
    export default {
        name:'vItem',
        props: {
            item: Object,
            type: String
        },
        computed: {
            sub_name() {
                if (this.type == 'commend' && this.item.sub_name) {
                    return this.item.sub_name;
                }
                return `${this.item.integral>>0}积分`;
            },
            router_link() {
                if (this.item.type == 1) {
                    return {
                        name: "product_detail",
                        query: {
                            product_id: this.item.item_id,
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
        },

        methods: {
            router() {
                if (this.type == 'commend') {
                    this.$store.dispatch('commendView', this.item.id);
                }

                this.$router.push(this.router_link);
            },

        },
    }
</script>