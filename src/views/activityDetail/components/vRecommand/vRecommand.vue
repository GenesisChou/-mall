<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-recommand {
        position: relative;
        width: pxTorem(722);
        margin: pxTorem(48) auto;
        border-radius: pxTorem(10);
        border-width: pxTorem(4);
        white-space: nowrap; // display:flex;
        li {
            list-style: none;
        }
        h6 {
            height: pxTorem(36);
            line-height: pxTorem(36);
        }
        .title {
            padding-left: pxTorem(26);
            line-height: pxTorem(47);
            color: $white;
        }
        .recommand {
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center; // width: pxTorem(155);
            // height: pxTorem(175);
            margin: 0 pxTorem(12);
            padding: pxTorem(5) pxTorem(5) 0 pxTorem(5);
            img {
                width: pxTorem(144);
                height: pxTorem(144);
            }
            h6 {
                color: $white;
                font-size: pxTorem(22);
            }
            &.red {
                background-color: #fe7a6f;
            }
            &.green {
                background-color: #78cc1e;
            }
            &.aquamarine {
                background-color: #2ba7a9;
            }
            &.blue {
                background-color: #29cfff;
            }
            &.navy {
                background-color: #399fae;
            }
            &.brown {
                background-color: #a26a01;
            }
            &.palaceblue {
                background-color: #1081e1;
            }
            &.emerald {
                background-color: #019a88;
            }
            &.army {
                background-color: #1d7233;
            }
            &.purple {
                background-color: #9901aa;
            }
            &.orange {
                background-color: #e76241;
            }
            &.yellow {
                background-color: #e8af00;
            }
        }
    }
</style>
<template>
    <ul class='v-recommand'>
        <li :class='["recommand",color]' v-for='recommand in recommands' @click='routerLink(recommand)'>
            <img :src='recommand.pic'>
            <h6>
                {{(recommand.title||recommand.name)|filter}}
            </h6>
        </li>
    </ul>
</template>
<script>
    export default {
        props: {
            recommands: {
                default: () => [],
                type: Array
            },
            color: String
        },
        filters: {
            filter(str) {
                if (str) {
                    return str.length < 5 ? str : str.substr(0, 5) + '...';
                }
                return '...';
            }
        },
        methods: {
            routerLink(recommand) {
                if (recommand) {
                    const type = recommand.type,
                        link = recommand.url;
                    if (type >= 1 && type <= 3) {
                        const item_id = recommand.item_id,
                            routes = [{
                                name: 'product_detail',
                                query: {
                                    product_id: item_id
                                }
                            }, {
                                name: 'activity_detail',
                                query: {
                                    activity_id: item_id
                                }
                            }, {
                                name: 'subject_detail',
                                query: {
                                    subject_id: item_id
                                }
                            }];
                        if (item_id) {
                            this.$router.push({
                                name: routes[type - 1].name,
                                query: routes[type - 1].query
                            });
                        }
                    } else if (link && (type === 4 || type === 5)) {
                        location.href = link;
                    }
                }
            }
        }
    };
</script>