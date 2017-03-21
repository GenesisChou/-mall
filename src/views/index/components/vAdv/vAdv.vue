<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-adv {
        @include active;
        width: pxTorem(750);
        padding: 0 pxTorem(10) pxTorem(26) pxTorem(10);
        margin-bottom: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        header {
            @include flex-center-v;
            height: pxTorem(64);
            padding-left: pxTorem(27);
            color: #ff5f17;
        }
        .icon {
            width: pxTorem(33);
            height: pxTorem(33);
            margin-right: pxTorem(20);
        }
        main {
            padding: pxTorem(10) 0;
            text-align: center;
            background-color: #f7f7f7;
        }
        .banner {
            width: pxTorem(702);
            height: pxTorem(192);
        }
    }
</style>
<template>
    <div class='v-adv' @click='routerLink'>
        <header>
            <img class='icon' src='./images/advStar.png'>
            <h2 class='text-ellipsis'>{{adv.name}}</h2>
        </header>
        <main>
            <img class='banner' :src='adv.pic'>
        </main>
    </div>
</template>
<script>
    export default {
        props: {
            adv: Object
        },
        methods: {
            routerLink() {
                //1 外链    2 活动    3 商品     4 专题
                const type = this.adv.type,
                    id = this.adv.item_id;
                let router = null;
                this.$store.dispatch('bannerView', id);
                switch (type) {
                    case 1:
                        location.href = this.adv.url;
                        break;
                    case 2:
                        this.$router.push({
                            name: "activity_detail",
                            query: {
                                activity_id: id,
                            }
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: "product_detail",
                            query: {
                                product_id: id,
                            }
                        });
                        break;
                    case 4:
                        this.$router.push({
                            name: "subject_detail",
                            query: {
                                subject_id: id,
                            }
                        });
                        break;
                }
            }
        }
    }
</script>