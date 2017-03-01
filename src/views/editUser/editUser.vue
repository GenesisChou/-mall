<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .edit-user {
        padding-top: pxTorem(30);
    }
    
    .main {
        flex: 1;
        -webkit-flex: 1;
        padding: 0 pxTorem(30);
        list-style: none;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        li {
            display: flex;
            align-items: center;
            display: -webkit-flex;
            -webkit-align-items: center;
            height: pxTorem(95);
            overflow: hidden;
            border-bottom: 1px solid $gray-light;
            &:last-child {
                align-items: flex-start;
                -webkit-align-items: flex-start;
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
            -webkit-flex: 1;
            color: #646565;
            background: none;
            border: 0;
            font-size: pxTorem(28);
        }
        textarea {
            flex: 1;
            -webkit-flex: 1;
            font-size: pxTorem(28);
            border: 0;
            color: #646565;
            text-align: justify;
        }
        .code {
            .btn {
                width: pxTorem(100);
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
        display: flex;
        display: -webkit-flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        height: pxTorem(120);
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        .btn {
            width: pxTorem(517);
            height: pxTorem(72);
        }
    }
</style>
<template>
    <div v-if='content_show' class='edit-user'>
        <form ref='form'>
            <ul class='main'>
                <li>
                    <label for='contact'>姓名</label>
                    <input id='contact' placeholder="姓名" v-model='contact'>
                </li>
                <li>
                    <label for='birth'>出生年月</label>
                    <input type='date' v-model='birthday'>
                </li>
                <li>
                    <label for='phone'>手机号</label>
                    <input id='phone' type='tel' placeholder="手机或固定电话" v-model='phone'>
                </li>
                <li class='code'>
                    <label for='code'>验证码</label>
                    <input id='code' v-model='verification_code' placeholder="请输入验证码">
                    <button v-if='!in_vertication' class='btn btn-orange' @click='getVerificationCode'>验证</button>
                    <button v-else class='btn btn-gray' @click='getVerificationCode'>{{countdown}}秒</button>
                </li>
                <li class='address'>
                    <label for='province'>收货地址</label>
                    <v-address :address='{province,city,country}' :id='{province_id,city_id,country_id}' :change-id='changeId' :change-name='changeName'></v-address>
                </li>
                <li>
                    <label for='address'>详细地址</label>
                    <textarea id='address' placeholder="请填写详细地址 不少于5个字" v-model='address'></textarea>
                </li>
            </ul>
            <div class='operation'>
                <button class='btn btn-orange ' @click='submit'>确认</button>
            </div>

        </form>
        <v-warn v-model='warn_show' :warn='warn'>></v-warn>
    </div>
</template>
<script>
    import vWarn from './components/vWarn.vue';
    import vAddress from './components/vAddress.vue';
    export default {
        name: 'editUser',
        components: {
            vAddress,
            vWarn
        },
        data() {
            return {
                show_birth: false,
                birth: {
                    year: '',
                    month: '',
                    day: ''
                },
                province: '',
                city: '',
                country: '',
                address: '',
                phone: '',
                contact: '',
                birthday: '',
                province_id: '',
                city_id: '',
                country_id: '',
                in_vertication: false,
                verification_code: '',
                countdown: 60,
                warn: {},
                warn_show: false
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            content_show() {
                return !utils.isEmptyObject(this.user);
            },
            is_submit() {
                return this.$store.state.user.is_submit == 1;
            },
            default_address() {
                return this.user.default_address || {};
            },
            birth_format() {
                if (this.birth.year && this.birth.month && this.birth.day) {
                    return `${this.birth.year}-${this.birth.month}-${this.birth.day}`;
                }
                return '';
            }
        },
        watch: {
            default_address(value) {
                this.init(value);
            }
        },
        created() {
            this.init(this.default_address);
            this.birth = {
                year: this.user.year || '',
                month: this.user.month || '',
                day: this.user.day || ''
            }
        },
        methods: {
            //初始化地址列表
            //scen1:原地刷新 由watch实现初始化 
            //scen2:从其他页面进入 由created实现初始化 
            init(default_address) {
                //防止重复初始化
                if (utils.isEmptyObject(default_address)) return;
                const address_config = [
                    'province',
                    'city',
                    'country',
                    'address',
                    'phone',
                    'contact',
                    'province_id',
                    'city_id',
                    'country_id'
                ];
                address_config.forEach(config => {
                    this[config] = default_address[config];
                })
                this.birthday = this.user.birthday;
            },
            //取消 一群傻屌
            cancel() {
                event.preventDefault();
                this.$router.go(-1)
                // this.$refs.form.reset();
            },
            //提交表单
            submit() {
                event.preventDefault();
                this.$store.dispatch('toggleLoading')
                this.$http.post(`${APP.HOST}/user_submit/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    province: this.province,
                    city: this.city,
                    country: this.country,
                    address: this.address,
                    phone: this.phone,
                    contact: this.contact,
                    birthday: this.birthday,
                    province_id: this.province_id,
                    city_id: this.city_id,
                    country_id: this.country_id,
                    verification_code: this.verification_code
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.toggleWarn({
                            msg: data.info,
                            btn_text: '确定',
                            callback: () => {
                                this.$store.dispatch('getUserInfor');
                                this.$router.go(-1)
                            }
                        })
                    } else {
                        this.toggleWarn({
                            msg: data.info
                        })
                    }
                }, (response) => {
                    this.$store.dispatch('toggleLoading');
                })


            },
            //获取验证码
            getVerificationCode() {
                event.preventDefault();
                this.$http.post(`${APP.HOST}/verification_sm/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    phone: this.phone
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.in_vertication = true;
                        let time = 0,
                            timer = setInterval(() => {
                                time += 1000;
                                this.countdown--;
                                if (time > 60 * 1000) {
                                    this.in_vertication = false;
                                    this.countdown = 60;
                                    clearInterval(timer);
                                }
                            }, 1000)
                    } else {
                        this.toggleWarn({
                            msg: data.info
                        })
                    }
                })
            },
            changeName(type, name) {
                let list = ['province', 'city', 'country'];
                list.forEach(item => {
                    if (item == type) {
                        this[item] = name;
                        return;
                    }
                })
            },
            changeId(type, id) {
                let list = ['province', 'city', 'country'];
                list.forEach(item => {
                    if (item == type) {
                        this[item + '_id'] = id;
                        return;
                    }
                })
            },
            toggleWarn(warn) {
                this.warn = warn;
                this.warn_show = !this.warn_show;
            }
        }
    }
</script>