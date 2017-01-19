<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    header {
        >div {
            height: pxTorem(460);
        }
        h4 {
            text-align: center;
        }
        h2 {
            font-size: pxTorem(34);
            text-align: center;
            &:nth-child(1) {
                height: pxTorem(100);
                line-height: pxTorem(100);
            }
            &:nth-child(2) {
                margin: pxTorem(30) 0 pxTorem(10) 0;
            }
        }
    }
    
    .check-button {
        width: pxTorem(278);
        height: pxTorem(284);
        margin: auto;
        background-image: url('../assets/images/check.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }
    
    .calendar {
        width: pxTorem(364);
        height: pxTorem(326);
        margin: auto;
        padding-top: pxTorem(90);
        text-align: center;
        background-image: url('../assets/images/calendar.png');
        background-repeat: no-repeat;
        background-size: 100%;
        strong {
            font-size: pxTorem(150);
        }
        span {
            font-size: pxTorem(35);
        }
    }
    
    .date {
        margin: pxTorem(70) pxTorem(37);
        padding: pxTorem(28) pxTorem(50);
        font-size: pxTorem(24);
        // border: 1px solid $gray-light;
        border-radius: pxTorem(10);
        color: $gray;
        li {
            width: 14.28%;
            height: 100%;
            text-align: center;
            &:nth-child(1) {
                .circle {
                    background-color: $sliver;
                    color: $white;
                    border: 1px solid $sliver;
                }
            }
            &:nth-child(2) {
                color: $red;
                .circle {
                    background-color: $white;
                    color: $red;
                    border: 1px solid $red;
                }
                .circle.active {
                    position: relative;
                    background-color: $red;
                    color: $white;
                }
            }
        }
    }
    
    .circle {
        margin: 0 auto pxTorem(20) auto;
        width: pxTorem(68);
        height: pxTorem(68);
        line-height: pxTorem(66);
        background-color: $white;
        border-radius: 50%;
        border: 1px solid $gray;
        font-size: pxTorem(20);
    }
    
    .rotate-leave-active {
        animation: rotate-back 1s linear;
    }
    
    .rotate-enter-active {
        animation: rotate-front 1s linear;
    }
    
    @keyframes rotate-back {
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(90deg);
            visibility: hidden;
        }
        100% {
            transform: rotateY(180deg);
            visibility: hidden;
        }
    }
    
    @keyframes rotate-front {
        0% {
            transform: rotateY(180deg);
            visibility: hidden;
        }
        50% {
            transform: rotateY(270deg);
            visibility: hidden;
        }
        100% {
            transform: rotateY(360deg);
        }
    }
</style>
<template>
    <div v-if='loaded' class='check-in'>
        <header>
            <div v-if='user.ischecked'>
                <h2>您已连续签到</h2>
                <div class='calendar'>
                    <strong>{{user.checkin_days}}</strong>
                    <span> 天</span>
                </div>
            </div>
            <div v-else>
                <h2></h2>
                <div @click='checkIn' class='check-button'>
                </div>
            </div>
            <h2>
                <span v-if='!user.ischecked'>今日</span>
                <span v-else>明日</span> 签到可领取
                <span class='text-red'>{{integral}}</span> 积分
            </h2>
            <h4>连续签到有更多惊喜哦</h4>
        </header>
        <ul class='date list-inline'>
            <li v-for='(item,$index) in check_in_params'>
                <div :class='["circle",{active:$index==1&&user.ischecked}]'>{{item.integral}}</div>
                <h6>{{item.day}}</h6>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'check_in',
        data() {
            return {
                check_in_params: [],
                loaded: false,
                checked: true
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            integral() {
                if (this.check_in_params.length == 0) return 0;
                if (!this.user.ischecked) {
                    return this.check_in_params[1]['integral'].substring(1);
                }
                return this.check_in_params[2]['integral'].substring(1);
            }
        },
        watch: {
            check_in_params() {
                this.loaded = true;
            }
        },
        created() {
            this.getCheckInParams();
        },
        methods: {
            //签到
            checkIn() {
                if (!this.user.ischecked) {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID,
                        media_id: APP.MEDIA_ID
                    }).then((response) => {
                        let data = response.data;
                        this.$store.dispatch('toggleLoading');
                        if (data.status == APP.SUCCESS) {
                            this.$store.dispatch('getUserInfor');
                        } else {
                            this.$store.dispatch('toggleAlert', {
                                msg: data.info
                            })
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    })
                }
            },
            //获取签到记录
            getCheckInParams() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/get_checkin_param/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data;
                    this.check_in_params = data.data;
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })
            }


        }
    }
</script>