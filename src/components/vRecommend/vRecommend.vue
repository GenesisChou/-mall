<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .title {
        position: relative;
        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            color: $white;
            font-size: pxTorem(34);
            img {
                width: pxTorem(34);
                height: pxTorem(35);
                margin-right: pxTorem(20);
            }
            .red {
                color: #fe7a6f;
            }
            .gray {
                color: #cdcdcd;
            }
        }
        .line {
            position: absolute;
            top: 50%;
            width: pxTorem(218);
            // height: pxTorem(3);
            height:1.5px;
            transform: translateY(-50%);
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            &.left {
                left: pxTorem(27);
            }
            &.right {
                right: pxTorem(27);
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
            &.gray {
                background-color: #a9aaae;
            }
        }
    }

    .recommends {
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
        .recommend {
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
            &.gray {
                background-color: #cdcdcd;
            }
        }
    }
</style>
<template>
    <div v-if='recommends.length>0' class='v-recommend'>
        <div class='title'>
            <h2>
                <img v-if='textColor==="red"' src='./images/recommendRed.png'>
                <img v-else-if='textColor==="gray"' src='./images/recommendGray.png'>
                <img v-else src='./images/recommend.png'>
                <span :class='textColor'>为您推荐</span>
            </h2>
            <div :class='["line","left",color]'></div>
            <div :class='["line","right",color]'></div>
        </div>
        <ul class='recommends'>
            <li :class='["recommend",color]' v-for='recommend in recommends' @click='routerLink(recommend)'>
                <img :src='recommend.pic'>
                <h6>
                    {{(recommend.title||recommend.name)|filter}}
                </h6>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            recommends: {
                default: () => [],
                type: Array
            },
            color: String,
            textColor: String
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
            routerLink(recommend) {
                if (recommend) {
                    const type = recommend.type,
                        link = recommend.url;
                    if (type >= 1 && type <= 3) {
                        const item_id = recommend.item_id,
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