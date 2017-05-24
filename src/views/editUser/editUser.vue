<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .edit-user {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        padding-top: pxTorem(30);
        background-color: #f2f3f4;
    }

    .edit-user-content {
        flex: 1;
    }

    .main {
        flex: 1;
        padding: 0 pxTorem(30);
        list-style: none;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        li {
            @include flex-center-v;
            height: pxTorem(95);
            overflow: hidden;
            border-bottom: 1px solid $gray-light;
            &:last-child {
                align-items: flex-start;
                padding-top: pxTorem(22.5);
                height: pxTorem(150);
                border-bottom: none;
            }
        }
        label {
            width: pxTorem(150);
            font-size: pxTorem(32);
            color: #646565;
        }
        input {
            flex: 1;
            color: #646565;
            background: none;
            border: 0;
            font-size: pxTorem(28);
        }
        textarea {
            flex: 1;
            font-size: pxTorem(28);
            border: 0;
            color: #646565;
            text-align: justify;
        }
        .code {
            .btn {
                text-align: center;
                width: pxTorem(100);
            }
        }
        .iconfont {
            display: none;
            text-align: center;
            width: pxTorem(60);
            font-size: pxTorem(36);
            color: #bababa;
            &.active {
                display: block;
            }
        }
    }

    .footer {
        padding: pxTorem(20) 0;
        text-align: center;
        background-color: $white;
        .btn {
            width: pxTorem(690);
            height: pxTorem(72);
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
    }

    .operation {
        @include flex-center;
        height: pxTorem(120);
        padding: 0 pxTorem(30);
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        .btn {
            width: 100%;
            height: pxTorem(72);
        }
    }

    img.money {
        width: pxTorem(68);
        height: pxTorem(47);
        margin-right: pxTorem(20);
    }
</style>
<template>
    <div v-if='content_show' class='edit-user'>
        <div class='edit-user-content'>
            <div>
                <ul class='main'>
                    <li>
                        <label for='contact'>姓名</label>
                        <input id='contact' placeholder="姓名" v-model='contact' @blur='toggleClear' @focus='toggleClear'>
                        <i class='iconfont icon-close-circle' @click='contact=""'></i>
                    </li>
                    <li>
                        <label for='phone'>联系电话</label>
                        <input id='phone' type='tel' placeholder="手机或固定电话" v-model='phone' @blur='toggleClear' @focus='toggleClear'>
                        <i class='iconfont icon-close-circle' @click='phone=""'></i>
                    </li>
                    <li class='code'>
                        <label for='code'>验证码</label>
                        <input id='code' v-model='verification_code' placeholder="请输入验证码">
                        <div :class='["btn",in_vertication?"btn-gray":"btn-orange"]' @click='getVerificationCode'>
                            <template v-if='in_vertication'>{{countdown}}S</template>
                            <template v-else>验证</template>
                        </div>
                    </li>
                    <li class='address'>
                        <label for='province'>收货地址</label>
                        <v-address :address='{province:this.province,city:this.city,country:this.country}' :id='{province_id,city_id,country_id}'
                            :change-id='changeId' :change-name='changeName'></v-address>
                    </li>
                    <li>
                        <label for='address'>详细地址</label>
                        <textarea id='address' placeholder="请填写详细地址 不少于5个字" v-model='address'></textarea>
                    </li>
                </ul>
                <div class='operation'>
                    <button v-if='submit_avaliable' class='btn btn-orange ' @click='submit'>确认</button>
                    <button v-else class='btn btn-gray' disabled='disabled'>确认</button>
                </div>
            </div>
            <v-warn v-model='warn_show' :warn='warn'></v-warn>
            <v-notice v-model='notice_show'>
                <img v-if='notice.type=="img"' class='money' src='./images/money.png'>
                <h3>{{notice.msg}}</h3>
            </v-notice>
        </div>
        <v-support></v-support>
    </div>
</template>
<script>
    import vWarn from './components/vWarn.vue';
    import vNotice from './components/vNotice.vue';
    import vAddress from './components/vAddress.vue';
    export default {
        name: 'editUser',
        components: {
            vAddress,
            vWarn,
            vNotice,
        },
        data() {
            return {
                province: '',
                city: '',
                country: '',
                address: '',
                phone: '',
                contact: '',
                province_id: '',
                city_id: '',
                country_id: '',
                in_vertication: false,
                verification_code: '',
                countdown: 60,
                warn: {},
                warn_show: false,
                notice: {},
                notice_show: false,
                content_show: false
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            is_submit() {
                return this.$store.state.user.is_submit === 1;
            },
            submit_avaliable() {
                if (this.province &&
                    // this.address.length >= 5 &&
                    this.phone &&
                    this.contact &&
                    this.verification_code) {
                    return true;
                }
                return false;
            },
        },
        created() {
            this.$store.dispatch('getUserInfor', () => {
                this.init();
            });
        },
        methods: {
            /*初始化地址列表 scen1:原地刷新 由watch实现初始化 scen2:从其他页面进入 由created实现初始化 */
            init() {
                this.contact = this.user.contact;
                this.phone = this.user.phone;
                this.province = this.user.province_name;
                this.province_id = this.user.province_id;
                this.city = this.user.city_name;
                this.city_id = this.user.city_id;
                this.country = this.user.country_name;
                this.country_id = this.user.country_id;
                this.address = this.user.address;
                this.content_show = true;
            },
            cancel() {
                this.$router.go(-1);
            },
            //提交表单
            submit() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/user_submit/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    province: this.province,
                    city: this.city,
                    country: this.country,
                    address: this.address,
                    phone: this.phone,
                    contact: this.contact,
                    province_id: this.province_id,
                    city_id: this.city_id,
                    country_id: this.country_id,
                    verification_code: this.verification_code
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data,
                        msg = data.data.message;
                    if (data.status === APP.SUCCESS) {
                        if (this.is_submit) {
                            this.toggleNotice({
                                msg
                            });
                        } else {
                            this.toggleNotice({
                                msg,
                                type: 'img'
                            });
                        }
                        this.$store.dispatch('getUserInfor');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 2000);
                    } else {
                        this.toggleWarn({
                            msg: data.info
                        });
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                });
            },
            //获取验证码
            getVerificationCode() {
                this.$http.post(`${APP.HOST}/verification_sm/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    phone: this.phone
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.in_vertication = true;
                        let time = 0;
                        const timer = setInterval(() => {
                            time += 1000;
                            this.countdown--;
                            if (time > 60 * 1000) {
                                this.in_vertication = false;
                                this.countdown = 60;
                                clearInterval(timer);
                            }
                        }, 1000);
                    } else {
                        this.toggleWarn({
                            msg: data.info
                        });
                    }
                });
            },
            changeName(type, name) {
                const list = ['province', 'city', 'country'];
                list.forEach(item => {
                    if (item === type) {
                        this[item] = name;
                        return;
                    }
                });
            },
            changeId(type, id = '') {
                const list = ['province', 'city', 'country'];
                list.forEach(item => {
                    if (item === type) {
                        this[item + '_id'] = id;
                        return;
                    }
                });
            },
            toggleClear(state) {
                event.target.parentElement.querySelector('.iconfont').classList.toggle('active');
            },
            toggleWarn(warn = {}) {
                this.warn = warn;
                this.warn_show = !this.warn_show;
            },
            toggleNotice(notice = {}) {
                this.notice = notice;
                this.notice_show = !this.notice_show;
            }
        }
    };
</script>