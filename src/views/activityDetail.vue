<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
</style>
<template>
    <div class='activity-detail'>
        <keep-alive>
            <!-- is：活动类型 freshFreeTimes:刷新免费活动次数 ：notice:剩余次数／消耗积分提示 ：toOrderDetail:订单详情跳转 -->
            <component :is='activity_type' :free-times='free_times>>0' :fresh-free-times='freshFreeTimes' :activity-detail='activity_detail'
                :id='activity_id>>0' :notice='notice' :to-order-detail='toOrderDetail' :toggleDialog='toggleDialog'>
            </component>
        </keep-alive>
        <v-dialog v-model='dialog_show' :dialog='dialog'></v-dialog>
    </div>
</template>
<script>
    import vDialog from 'components/activities/vDialog.vue';
    import {
        quiz,
        scrap,
        game,
        shake,
        fortune
    } from 'components/activities'
    export default {

        name: 'activityDetail',
        components: {
            vDialog,
            quiz,
            scrap,
            game,
            shake,
            fortune
        },
        data() {
            return {
                type: '',
                activity_id: '',
                activity_detail: '',
                free_times: '',
                activity_type: '',
                dialog_show: false,
                dialog: {}
            }
        },
        computed: {
            notice() {
                return this.free_times > 0 ? `您还剩余${this.free_times}次免费机会` :
                    `消耗积分${this.activity_detail.integral >> 0}`;
            },
            aword_list() {
                return this.activity_detail.items;
            },
            activity_type() {
                /*  1:刮刮卡
                    2:有奖问答
                    3:游戏
                    4:摇一摇
                    5:大转盘 */
                let type = this.type,
                    result = '';
                const type_list = ['scrap', 'quiz', 'game', 'shake', 'fortune'];
                type_list.forEach((name, index) => {
                    if (type == index + 1) {
                        result = name;
                        return;
                    }
                })
                return result;
            }
        },
        watch: {
            activity_id() {
                this.getActivityDetail().then(data => {
                    this.type = data.data.type;
                });
                this.getFreeTimes();
            },
        },
        created() {
            this.activity_id = this.$route.query.activity_id;
        },
        methods: {
            //获取活动详情
            getActivityDetail() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/activity_detail_l/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        let data = response.data;
                        this.activity_detail = data.data;
                        if (resolve) {
                            resolve(data);
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    })

                })
            },
            //获取免费活动次数
            getFreeTimes() {
                this.$http.post(`${APP.HOST}/get_free_times/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    activity_id: this.activity_id
                }).then((response) => {
                    let data = response.data;
                    this.free_times = data.data.free_times;
                })
            },
            //刷新免费次数 刷新用户信息
            freshFreeTimes() {
                this.$store.dispatch('getUserInfor');
                this.getFreeTimes();
            },
            //中奖后的路由跳转
            toOrderDetail(order_id) {
                return function () {
                    this.$router.push({
                        name: 'order_detail',
                        query: {
                            order_id: order_id
                        }
                    })
                }
            },
            toggleDialog(dialog) {
                this.dialog = dialog;
                this.dialog_show = !this.dialog_show;
            }
        }
    };
</script>