<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .integral-details {
        min-height: 100%;
        background-color: #f2f3f4;
    }
    .block-text {
        margin-top: pxTorem(14);
        line-height: pxTorem(88);
        text-align: center;
        background-color: $white;
        color: $orange;
        border-bottom: 1px solid #f2f3f4;
        font-size: pxTorem(34);
    }

    .record-list {
        position: absolute;
        top: pxTorem(185);
        left: 0;
        right: 0;
        bottom: pxTorem(110);
        z-index: 1;
        padding: 0 pxTorem(30);
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        background-color: $white;
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            @include flex-center-v;
            justify-content: space-between;
            height: pxTorem(100);
            list-style: none;
        }
        h3 {
            color: #646565;
        }
        h6 {
            color: #a9aaae;
        }
        span {
            font-size: pxTorem(30);
            color: #646565;
            &.pull-right {
                color: $orange;
            }
        }
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
<template>
    <div class='integral-details'>
        <!-- <header class='header'>
            <div class='avater'>
                <img class='img-responsive' :src='user.headimg'>
            </div>
            <p>{{user.nickname}}</p>
            <p>积分: {{user.integral>>0}}</p>
            <router-link :to='{name:"edit_user"}' class='edit-user' tag='div'>
                <template v-if='user.is_submit==1'>修改资料</template>
                <template v-else>完善资料赚积分</template>
            </router-link>
        </header> -->
        <v-text></v-text>
        <h4 class='block-text'>
            积分明细
        </h4>
        <ul class='record-list' ref='list'>
            <li v-for='item in integral_list'>
                <div class='pull-left'>
                    <h3>{{item.name}}</h3>
                    <h6> {{item.create_time}} </h6>
                </div>
                <span class='pull-right'>{{item.point|pointFormat}} </span>
            </li>
        </ul>
        <footer class='footer'>
            <v-support></v-support>
        </footer>
    </div>
</template>
<script>
    import vText from '../index/components/vText';
    export default {
        name: 'integralDetails',
        components: {
            vText
        },
        data() {
            return {
                // modal: false,
                params: {
                    p: 1,
                    r: APP.PERPAGE,
                    total: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                },
                integral_list: [],
            };
        },
        filters: {
            pointFormat(point) {
                point = point >> 0;
                return point > 0 ? '+' + point : point;
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        mounted() {
            this.getIntegralList();
            const list = this.$refs.list;
            let scroll = true;
            list.addEventListener('scroll', utils.debounce(() => {
                if (scroll &&
                    this.params.p < this.params.total &&
                    list.clientHeight + list.scrollTop >= list.scrollHeight - 100) {
                    scroll = false;
                    this.params.p++;
                    this.getIntegralList().then(() => {
                        scroll = true;
                    });
                }
            }, 500, 500));
        },
        beforeRouteLeave(to, from, next) {
            this.$store.dispatch('updatePageView');
            next();
        },
        methods: {
            //——获取积分明细列表
            getIntegralList() {
                return new Promise((resolve) => {
                    this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, this.params).then((response) => {
                        const data = response.data;
                        this.integral_list = this.integral_list.concat(data.data.list);
                        this.params.total = data.data.total;
                        if (resolve && typeof resolve === 'function') {
                            resolve();
                        }
                    }, (response) => {

                    });
                });
            }
        }
    };
</script>