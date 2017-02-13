<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .main {
        padding: 0 pxTorem(53);
        margin-top: pxTorem(80);
        list-style: none;
        >li {
            overflow: hidden;
        }
        .code {
            input {
                width: pxTorem(300);
            }
            button {
                width: pxTorem(100);
                height: pxTorem(50);
                line-height: pxTorem(50);
                transform: translate(pxTorem(30), pxTorem(10));
                -webkit-transform: translate(pxTorem(30), pxTorem(10));
            }
        }
        .select-address {
            input {
                float: left;
                width: pxTorem(150);
                margin-right: pxTorem(10);
                &:nth-child(4) {
                    margin-right: 0;
                }
            }
        }
        label {
            float: left;
            width: pxTorem(150);
            height: pxTorem(70);
            line-height: pxTorem(70);
            font-size: pxTorem(30);
            text-align: left;
        }
        input {
            width: pxTorem(470);
            height: pxTorem(70);
            line-height: pxTorem(70);
            box-sizing: border-box;
            color: $gray;
            border: 0;
            font-size: pxTorem(26);
            border-bottom: 1px solid $gray-light;
            transition-duration: .5s;
            &:focus {
                border-bottom: 1px solid $red;
            }
        }
        .address {
            input {
                width: 100%;
            }
        }
        textarea {
            width: pxTorem(470);
            height: pxTorem(110);
            margin-top: pxTorem(8);
            line-height: pxTorem(50);
            font-size: pxTorem(26);
            border: 0;
            border-bottom: 1px solid $gray-light;
            color: $gray;
            transition-duration: .5s;
            &:focus {
                border-bottom: 1px solid $red;
            }
        }
    }
    
    .operation {
        padding: pxTorem(100) pxTorem(25) 0 pxTorem(150);
        button {
            width: pxTorem(100);
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
                    <input id='birth' @click='toggleBirth' readonly v-model='birthday'>
                </li>
                <li>
                    <label for='phone'>手机号</label>
                    <input id='phone' type='tel' placeholder="手机或固定电话" v-model='phone'>
                </li>
                <li class='code'>
                    <label for='code'>验证码</label>
                    <input id='code' v-model='verification_code'>
                    <button class='btn btn-red' @click='getVerificationCode'>验证</button>
                </li>
                <li class='select-address'>
                    <label for='province'>收货地址</label>
                    <v-address :address='{province,city,country}' :id='{province_id,city_id,country_id}' :change-id='changeId' :change-name='changeName'></v-address>
                </li>
                <li>
                    <label for='address'></label>
                    <textarea id='address' placeholder="请输入详细地址" v-model='address'></textarea>
                </li>
                <li class='operation'>
                    <button class='btn pull-left' @click='reset'>重置</button>
                    <button class='btn btn-red pull-right' @click='submit'>确认</button>
                </li>
            </ul>
        </form>
        <v-date-picker :show='show_birth' :toggle-modal='toggleBirth' :value='birth' :callback='changeBirth'></v-date-picker>
    </div>
</template>
<script>
    import vDatePicker from 'components/vDatePicker.vue';
    import vAddress from 'components/vAddress.vue';
    export default {
        name: 'editUser',
        components: {
            vDatePicker,
            vAddress,
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
                verification_code: '',
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
        },
        mounted() {
            this.birth = {
                year: this.user.year || '',
                month: this.user.month || '',
                day: this.user.day || ''
            };
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
            //重置表单
            reset() {
                event.preventDefault();
                this.$refs.form.reset();
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
                    this.$store.dispatch('toggleAlert', {
                        msg: data.info
                    })
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
                    if (data.status != APP.SUCCESS) {
                        this.$store.dispatch('toggleAlert', {
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
            changeBirth(value) {
                this.birth = value;
            },
            toggleBirth() {
                this.show_birth = !this.show_birth;
            },
        }
    }
</script>