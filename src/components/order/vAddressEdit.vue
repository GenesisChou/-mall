<style lang='scss' scoped>
@import '../../assets/scss/variable.scss';
.edit-address {
    height: pxTorem(800);
    background: $white;
    .header {
        line-height: pxTorem(135);
        margin: 0 pxTorem(53);
        border-bottom: 1px solid $gray-light;
    }
    .main {
        padding: 0 pxTorem(53);
        margin-top: pxTorem(80);
        list-style: none;
        >li {
            overflow: hidden;
        }
        >li:nth-child(2) {
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
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: pxTorem(158);
        line-height: pxTorem(158);
        padding: 0 pxTorem(73);
        .btn {
            text-indent: pxTorem(12);
            letter-spacing: pxTorem(12);
        }
    }
}

.modal-content {
    background-color: $white;
    max-height: pxTorem(600);
    overflow: scroll;
    border-radius: pxTorem(10);
    &::-webkit-scrollbar{
      display:none;
    }
    li {
        width: pxTorem(400);
        height: pxTorem(70);
        line-height: pxTorem(70);
        padding: 0 pxTorem(20);
        list-style: none;
        overflow: hidden;
        border-bottom: 1px solid $gray-light;
        &:last-child {
            border-bottom: 1px solid $gray-light;
        }
        span{
            /*margin-left: pxTorem(30);*/
        }
        .radio {
            display: inline-block;
            width: pxTorem(30);
            height: pxTorem(30);
            line-height: pxTorem(70);
            margin-right: pxTorem(20);
            border-radius: 50%;
            -webkit-box-shadow: inset 0 0 pxTorem(10) $gray-light;
            box-shadow: inset 0 0 pxTorem(10) $gray-light;
        }
        .radio.active {
            box-shadow: none;
            border: pxTorem(10) solid $red;
        }
    }
}
</style>
<template>
    <section class='v-address-edit'>
        <v-popup :callback='cancelEdit' :show='show' :toggle-popup='togglePopup'>
            <form class='edit-address '>
                <header class='header text-center text-huge'>
                    {{title}}
                </header>
                <ul class='main'>
                    <li>
                        <label for='contact'>收货人</label>
                        <input id='contact' placeholder="收货人姓名" v-model='receive_infor.contact'>
                    </li>
                    <li>
                        <label for='province'>选择地址</label>
                        <input id='province' @click='showAreaList("province")' placeholder="请选择省" v-model='receive_infor.province' readonly>
                        <input @click='showAreaList("city")' id='city' placeholder="请选择市" v-model='receive_infor.city' readonly>
                        <input @click='showAreaList("country")' id='country' placeholder="请选择区县" v-model='receive_infor.country' readonly>
                    </li>
                    <li>
                        <label for='address'>详细地址</label>
                        <textarea id='address' v-model='receive_infor.address' placeholder="请输入详细地址"></textarea>
                    </li>
                    <li>
                        <label for='phone'>手机号码</label>
                        <input id='phone' type='tel' placeholder="手机或固定电话" v-model='receive_infor.phone'>
                    </li>
                </ul>
                <footer class='footer text-center'>
                    <button class='btn btn-red btn-block btn-large' @click.prevent='save'>保存</button>
                </footer>
            </form>
        </v-popup>
        <v-modal :show='modal' :toggle-modal='toggleModal' :cover-close='true'>
            <div class='modal-content'>
                <ul v-if='current_type=="province"'>
                    <li  v-for='province in province_list' @click='selectAddress("province",province.province,province.provinceid)'>
                        <i :class='["radio",address_id.province==province.provinceid?"active":""]'></i> <span>{{province.province}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="city"'>
                    <li  v-for='city in city_list' @click='selectAddress("city",city.city,city.cityid)'>
                        <i :class='["radio",address_id.city==city.cityid?"active":""]'></i> <span>{{city.city}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="country"'>
                    <li  v-for='country in country_list' @click='selectAddress("country",country.area,country.areaid)'>
                        <i :class='["radio",address_id.country==country.areaid?"active":""]'></i> <span>{{country.area}}</span>
                    </li>
                </ul>
            </div>
        </v-modal>
    </section>
</template>
<script>
export default {
    name:'vAddressEdit',
    props: {
        togglePopup: Function,
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '新建收货地址'
        },
        id: Number
    },
    data() {
        return {
            modal: false,
            current_type: 'province',
            province_list: '',
            city_list: '',
            country_list: '',
            receive_infor: {
                province: '',
                city: '',
                country: '',
                address: '',
                phone: '',
                contact: ''
            },
            address_id: {
                province: '',
                city: '',
                country: ''
            }
        }
    },
    computed: {
        save() {
            if (this.id) {
                return this.updateAddress;
            }
            return this.insertAddress;
        },
        address_list() {
            return this.$store.state.address_list;
        },
        is_empty() {
            let temp = this.receive_infor;
            if (temp.province || temp.address || temp.phone || temp.contact) {
                return false;
            }
            return true;
        },
        is_defaults() {
            if (this.address_list.length == 0) {
                return 1;
            }
            let result = 0;
            this.address_list.forEach(address => {
                if (address.id == this.id) {
                    result = address.is_defaults;
                }
            })
            return result;
        }
    },
    watch: {
        //弹出窗口后为表单赋值
        show(value) {
            if (value) {
                this.getProvinceList();
                //id大于0代表此时是修改地址状态
                if (this.id > 0) {
                    this.address_list.forEach((address) => {
                        if (address.id == this.id) {
                            this.address_id.province = address.province_id;
                            this.address_id.city = address.city_id;
                            this.address_id.country = address.country_id;
                            this.getCityList(address.province_id);
                            this.getCountryList(address.city_id);
                            this.receive_infor.province = address.province;
                            this.receive_infor.city = address.city;
                            this.receive_infor.country = address.country;
                            this.receive_infor.address = address.address;
                            this.receive_infor.phone = address.phone;
                            this.receive_infor.contact = address.contact;
                            return;
                        }
                    })
                }
            }
        },
    },
    methods: {
        //添加地址
        insertAddress() {
            this.$store.dispatch('toggleLoading');

            this.$http.post(`${APP.HOST}/address_insert/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                province: this.receive_infor.province,
                city: this.receive_infor.city,
                country: this.receive_infor.country,
                address: this.receive_infor.address,
                phone: this.receive_infor.phone,
                contact: this.receive_infor.contact,
                is_defaults: this.is_defaults,
                province_id: this.address_id.province,
                city_id: this.address_id.city,
                country_id: this.address_id.country
            }).then((response) => {
                this.$store.dispatch('toggleLoading');
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    //重新获取地址列表
                    this.$store.dispatch('getAddressList');
                    setTimeout(() => {
                        this.togglePopup();
                        this.clearInput();
                    }, 500);
                } else {
                    //弹出错误
                    this.$store.dispatch('toggleAlert', {
                        msg: data.info
                    });
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');

            })
        },
        //更新地址
        updateAddress() {
            this.$store.dispatch('toggleLoading');

            this.$http.post(`${APP.HOST}/address_update/${this.id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                province: this.receive_infor.province,
                city: this.receive_infor.city,
                country: this.receive_infor.country,
                address: this.receive_infor.address,
                phone: this.receive_infor.phone,
                contact: this.receive_infor.contact,
                is_defaults: this.is_defaults,
                province_id: this.address_id.province,
                city_id: this.address_id.city,
                country_id: this.address_id.country
            }).then((response) => {
                this.$store.dispatch('toggleLoading');

                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    //重新获取地址列表
                    this.$store.dispatch('getAddressList');
                    // this.$store.dispatch('toggleAlert', {
                    //     msg: '编辑地址成功',
                    //     type: 'correct'
                    // });
                    setTimeout(() => {
                        this.togglePopup();
                        this.clearInput();
                    }, 500);
                } else {
                    //弹出错误
                    this.$store.dispatch('toggleAlert', {
                        msg: data.info
                    });
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');

            })
        },
        //取消编辑
        cancelEdit() {
            this.toggleConfirm();
        },
        //清除输入
        clearInput(type) {
            this.receive_infor.country = '';
            this.address_id.country = '';
            if (type == 'city') {
                return;
            }
            this.receive_infor.city = '';
            this.address_id.city = '';

            if (type == 'province') {
                return;
            }
            this.address_id.province = '';
            this.receive_infor.province = '';
            this.receive_infor.contact = '';
            this.receive_infor.address = '';
            this.receive_infor.phone = '';
        },
        showAreaList(type) {
            if (type == 'city') {
                if (!this.receive_infor.province) {
                    return;
                }
            }
            if (type == 'country') {
                if (!this.receive_infor.city) {
                    return;
                }
            }
            this.current_type = type;
            this.toggleModal();
        },
        selectAddress(type, name, id) {
            if (type == 'province') {
                if (!this.address_id.province || this.address_id.province != id) {
                    this.receive_infor.province = name;
                    this.address_id.province = id;
                    this.getCityList(id);
                    this.clearInput('province');
                }

            } else if (type == 'city') {
                if (!this.address_id.city || this.address_id.city != id) {
                    this.receive_infor.city = name;
                    this.address_id.city = id;
                    this.getCountryList(id);
                    this.clearInput('city');
                }
            } else if (type == 'country') {
                this.receive_infor.country = name;
                this.address_id.country = id;
            }
            this.toggleModal();
        },
        //获取省份
        getProvinceList() {
            this.$http.post(`${APP.HOST}/province_list`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.province_list = response.data.data;
            }, (response) => {});
        },
        //获取城市
        getCityList(id) {
            this.$http.post(`${APP.HOST}/city_list/${id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.city_list = response.data.data;
            }, (response) => {});
        },
        //获取区县
        getCountryList(id) {
            this.$http.post(`${APP.HOST}/area_list/${id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.country_list = response.data.data;
            }, (response) => {});
        },
        //关闭/显示confirm
        toggleConfirm() {
            if (!this.is_empty) {
                this.$store.dispatch('toggleConfirm', {
                    msg: '确认放弃编辑?',
                    callback: () => {
                        this.togglePopup();
                        this.clearInput();
                    }
                });
            } else {
                this.togglePopup();
            }
        },
        toggleModal() {
            this.modal = !this.modal;
        },
    }
}
</script>
