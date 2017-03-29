<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-item {
        @include active;
        @include clearfix;
        width: 50%;
        float: left;
        padding: pxTorem(20) pxTorem(37);
        background-color: $white;
    }

    .head {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        .img {
            width: pxTorem(300);
            height: pxTorem(200);
        }
        span {
            @include flex-center;
            position: absolute;
            left: 0;
            top: 0;
            width: pxTorem(70/0.67);
            height: pxTorem(34/0.67);
            color: $white;
            font-size: pxTorem(24);
            text-align: center;
            z-index: 1;
            transform: scale(0.67);
            transform-origin: 0 0 0;
        }
        .red-arrows {
            position: absolute;
            left: pxTorem(-27);
            top: 0;
            width: pxTorem(109);
            height: pxTorem(33);
        }
    }

    .message {
        position: relative;
        padding-top: pxTorem(15);
        overflow: hidden;
        h5 {
            height: pxTorem(40);
            line-height: pxTorem(40);
        }
        h6 {
            height: pxTorem(35);
            line-height: pxTorem(35);
            color: #a9aaae;
        }
        .integral {
            color: $orange;
            border-bottom: 1px solid #d3d4d6;
            padding-top: pxTorem(3);
            padding-bottom: pxTorem(12);
        }
        .icon {
            position: absolute;
            width: pxTorem(47);
            height: pxTorem(47);
            right: 0;
            bottom: pxTorem(10);
        }
    }
</style>
<template>
    <div class='v-item' @click='router'>
        <header class='head'>
            <span v-if='item.script'>
                {{item.script}}
            </span>
            <img v-if='item.script' class='red-arrows' src="./images/redArrows.png">
            <img class='img' :src='item.pic'>
        </header>
        <footer class='message'>
            <h5 class='text-ellipsis'>{{item.name}}</h5>
            <h6 class='text-ellipsis'>{{item.sub_name}}</h6>
            <p class='integral'>{{item.integral>>0}}积分 </p>
            <img class='icon' :src="icon">
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'vItem',
        props: {
            item: Object,
            type: String
        },
        data() {
            return {};
        },
        computed: {
            icon() {
                if (this.item.type === 2) {
                    if (this.item.item_type === 3) {
                        return require('./images/game.png');
                    }
                    return require('./images/activity.png');
                }
                return require('./images/exchange.png');
            },
            router_link() {
                if (this.item.type === 1) {
                    return {
                        name: 'product_detail',
                        query: {
                            product_id: this.item.item_id,
                            integral: this.item.integral >> 0
                        }
                    };
                }

                if (this.item.type === 2) {
                    return {
                        name: 'activity_detail',
                        query: {
                            activity_id: this.item.item_id,
                        }
                    };
                }
            }
        },
        methods: {
            router() {
                if (this.type === 'commend') {
                    this.$store.dispatch('commendView', this.item.id);
                }
                this.$router.push(this.router_link);
            },
        },
    };
</script>