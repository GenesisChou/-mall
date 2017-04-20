<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-adv {
        width:pxTorem(750);
        height:pxTorem(330);
        margin-bottom:pxTorem(15);
        img{
            width:100%;
            height:100%;
        }
    }
</style>
<template>
    <div class='v-adv' @click='routerLink'>
        <img :src='adv.pic'>
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
                    id = this.adv.id,
                    item_id = this.adv.item_id;
                this.$store.dispatch('bannerView', id);
                switch (type) {
                    case 1:
                        location.href = this.adv.url;
                        break;
                    case 2:
                        this.$router.push({
                            name: 'activity_detail',
                            query: {
                                activity_id: item_id,
                            }
                        });
                        break;
                    case 3:
                        this.$router.push({
                            name: 'product_detail',
                            query: {
                                product_id: item_id,
                            }
                        });
                        break;
                    case 4:
                        this.$router.push({
                            name: 'subject_detail',
                            query: {
                                subject_id: item_id,
                            }
                        });
                        break;
                }
            }
        }
    };
</script>