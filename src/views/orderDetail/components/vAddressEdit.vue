<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .edit-address {
        display: flex;
        flex-direction: column; // height: pxTorem(640);
        background: $gray-light;
        .header {
            text-align: center;
            line-height: pxTorem(114);
            border-bottom: 1px solid $gray-light;
            color: #3d4244;
            background-color: $white;
        }
        .main {
            flex: 1;
            padding: 0 pxTorem(53);
            margin-bottom: pxTorem(30);
            list-style: none;
            background-color: $white;
            li {
                @include flex-center-v;
                height: pxTorem(95);
                overflow: hidden;
                border-bottom: 1px solid $gray-light;
                &:last-child {
                    border-bottom: none;
                }
            }
            li.address {
                .form-control {
                    flex: 1;
                    height:100%;
                    position: relative;
                }
                .iconfont {
                    position: absolute;
                    right: pxTorem(13);
                    top: 50%;
                    font-size: pxTorem(24);
                    font-weight: bold;
                    color: $sliver;
                    transform: scale(0.7) translateY(-50%);
                    &.third {
                        right: 0;
                    }
                }
                input {
                    width: pxTorem(150);
                }
            }
            label {
                width: pxTorem(150);
                font-size: pxTorem(32);
                color: #646565;
            }
            input {
                flex: 1;
                height:100%;
                color: #646565;
                background: none;
                border: 0;
                font-size: pxTorem(28);
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
    }

    .modal-content {
        background-color: $white;
        max-height: pxTorem(600);
        overflow: scroll;
        border-radius: pxTorem(10);
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            @include active($white, 5%);
            width: pxTorem(400);
            height: pxTorem(70);
            line-height: pxTorem(70);
            padding: 0 pxTorem(20);
            list-style: none;
            overflow: hidden;
            border-bottom: 1px solid $gray-light;
            &:last-child {
                border-bottom: none;
            }
            .radio {
                display: inline-block;
                width: pxTorem(30);
                height: pxTorem(30);
                line-height: pxTorem(70);
                margin-right: pxTorem(20);
                border-radius: 50%;
                box-shadow: inset 0 0 pxTorem(10) $gray-light;
            }
            .radio.active {
                box-shadow: none;
                border: pxTorem(10) solid $orange;
            }
        }
    }
</style>
<template>
    <section class='v-address-edit'>
        <v-popup :callback='cancelEdit' :show='show' :toggle-popup='togglePopup'>
            <form class='edit-address '>
                <header class='header'>
                    <h1>{{title}}</h1>
                </header>
                <ul class='main'>
                    <li v-if='state.show_contact'>
                        <label for='contact'>收货人</label>
                        <input id='contact' placeholder="收货人姓名" v-model='receive_infor.contact'>
                    </li>
                    <li v-if='state.show_phone'>
                        <label for='phone'>联系电话</label>
                        <input id='phone' type='tel' placeholder="手机或固定电话" v-model='receive_infor.phone'>
                    </li>
                    <li v-if='state.show_address' class='address'>
                        <label for='province'>选择地址</label>
                        <div class='form-control'>
                            <input id='province' @click='showAreaList("province")' placeholder="请选择省" v-model='receive_infor.province' readonly>
                            <i v-if='!receive_infor.province' class=' iconfont icon-arrows-down'></i>
                        </div>
                        <div class='form-control'>
                            <input @click='showAreaList("city")' id='city' placeholder="请选择市" v-model='receive_infor.city' readonly>
                            <i v-if='!receive_infor.city' class=' iconfont icon-arrows-down'></i>
                        </div>
                        <div class='form-control'>
                            <input @click='showAreaList("country")' id='country' placeholder="请选择县" v-model='receive_infor.country' readonly>
                            <i v-if='!receive_infor.country' class=' iconfont icon-arrows-down third'></i>
                        </div>
                    </li>
                    <li v-if='state.show_address'>
                        <label for='address'>详细地址</label>
                        <input id='address' placeholder="请输入详细地址" v-model='receive_infor.address'>
                    </li>
                </ul>
                <div class='space'></div>
                <footer class='footer'>
                    <button class='btn btn-orange' @click.prevent='save'>{{btnText||'保存'}}</button>
                </footer>
            </form>
        </v-popup>
        <v-modal v-model='modal' type='select'>
            <div class='modal-content'>
                <ul v-if='current_type=="province"'>
                    <li v-for='province in province_list' @click='selectAddress("province",province.province,province.provinceid)'>
                        <i :class='["radio",address_id.province==province.provinceid?"active":""]'></i> <span>{{province.province}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="city"'>
                    <li v-for='city in city_list' @click='selectAddress("city",city.city,city.cityid)'>
                        <i :class='["radio",address_id.city==city.cityid?"active":""]'></i> <span>{{city.city}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="country"'>
                    <li v-for='country in country_list' @click='selectAddress("country",country.country,country.countryid)'>
                        <i :class='["radio",address_id.country==country.countryid?"active":""]'></i> <span>{{country.country}}</span>
                    </li>
                </ul>
            </div>
        </v-modal>
    </section>
</template>
<script>
    import vModal from 'components/vModal.vue';
    import vPopup from 'components/vPopup.vue';
    export default {
        name: 'vAddressEdit',
        components: {
            vPopup,
            vModal,
        },
        props: {
            orderUser: Object,
            btnText: String,
            state: {
                type: Object,
                default: function () {
                    return {
                        show_contact: true,
                        show_phone: true,
                        show_address: true
                    };
                }
            },
            togglePopup: Function,
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '新建收货地址'
            },
            id: Number,
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
            };
        },
        computed: {
            address_list() {
                return this.$store.state.address_list;
            },
            is_empty() {
                const temp = this.receive_infor;
                if (temp.province || temp.address || temp.phone || temp.contact) {
                    return false;
                }
                return true;
            },
            is_defaults() {
                if (this.address_list.length === 0) {
                    return 1;
                }
                let result = 0;
                this.address_list.forEach(address => {
                    if (address.id === this.id) {
                        result = address.is_defaults;
                    }
                });
                return result;
            },
            user() {
                return this.$store.state.user;
            }
        },
        watch: {
            //弹出窗口后为表单赋值
            show(value) {
                if (value) {
                    this.getProvinceList();
                    if (this.orderUser) {
                        this.receive_infor.province = this.orderUser.province;
                        this.address_id.province = this.orderUser.province_id;
                        this.receive_infor.city = this.orderUser.city;
                        this.address_id.city = this.orderUser.city_id;
                        this.receive_infor.country = this.orderUser.country;
                        this.address_id.country = this.orderUser.country_id;
                        this.receive_infor.address = this.orderUser.address;
                        this.receive_infor.phone = this.orderUser.phone;
                        this.receive_infor.contact = this.orderUser.contact;
                        if (this.orderUser.province_id) {
                            this.getCityList(this.orderUser.province_id);
                        }
                        if (this.orderUser.city_id) {
                            this.getCountryList(this.orderUser.city_id);
                        }
                        return;
                    }
                    //id大于0代表此时是修改地址状态
                    if (this.id > 0) {
                        this.address_list.forEach((address) => {
                            if (address.id === this.id) {
                                this.address_id.province = address.province_id;
                                this.address_id.city = address.city_id;
                                this.address_id.country = address.country_id;
                                if (address.province_id) {
                                    this.getCityList(address.province_id);
                                }
                                if (address.city_id) {
                                    this.getCountryList(address.city_id);
                                }
                                this.receive_infor.province = address.province;
                                this.receive_infor.city = address.city;
                                this.receive_infor.country = address.country;
                                this.receive_infor.address = address.address;
                                this.receive_infor.phone = address.phone;
                                this.receive_infor.contact = address.contact;
                                return;
                            }
                        });
                    }
                }
            },
        },
        methods: {
            save() {
                if (this.orderUser) {
                    if (this.user.is_submit === 2) {
                        this.$store.dispatch('toggleLoading');
                        this.$http.post(`${APP.HOST}/update_user/${this.id}`, {
                            token: APP.TOKEN,
                            user_id: APP.USER_ID,
                            province: this.receive_infor.province,
                            province_id: this.address_id.province,
                            city: this.receive_infor.city,
                            city_id: this.address_id.city,
                            country: this.receive_infor.country,
                            country_id: this.address_id.country,
                            address: this.receive_infor.address,
                            phone: this.receive_infor.phone,
                            contact: this.receive_infor.contact
                        }).then((response) => {
                            const data = response.data;
                            this.$store.dispatch('toggleLoading');
                            if (data.status === APP.SUCCESS) {} else {
                                this.$store.dispatch('toggleAlert', {
                                    msg: data.info
                                });
                            }
                        }, (response) => {
                            this.$store.dispatch('toggleLoading');
                        });
                    }
                    this.$emit('update:orderUser', {
                        province: this.receive_infor.province,
                        province_id: this.address_id.province,
                        city: this.receive_infor.city,
                        city_id: this.address_id.city,
                        country: this.receive_infor.country,
                        country_id: this.address_id.country,
                        address: this.receive_infor.address,
                        phone: this.receive_infor.phone,
                        contact: this.receive_infor.contact
                    });
                    this.togglePopup();
                } else if (this.id) {
                    this.updateAddress();
                } else {
                    this.insertAddress();
                }
            },
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
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
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
                });
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
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
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
                });
            },
            //取消编辑
            cancelEdit() {
                this.toggleConfirm();
            },
            //清除输入
            clearInput(type) {
                this.receive_infor.country = '';
                this.address_id.country = '';
                if (type === 'city') {
                    return;
                }
                this.receive_infor.city = '';
                this.address_id.city = '';
                if (type === 'province') {
                    return;
                }
                this.address_id.province = '';
                this.receive_infor.province = '';
                this.receive_infor.contact = '';
                this.receive_infor.address = '';
                this.receive_infor.phone = '';
            },
            showAreaList(type) {
                if (type === 'city') {
                    if (!this.receive_infor.province || !this.city_list.length) {
                        return;
                    }
                }
                if (type === 'country') {
                    if (!this.receive_infor.city || !this.country_list.length) {
                        return;
                    }
                }
                this.current_type = type;
                this.toggleModal();
            },
            selectAddress(type, name, id) {
                if (type === 'province') {
                    if (!this.address_id.province || this.address_id.province !== id) {
                        this.receive_infor.province = name;
                        this.address_id.province = id;
                        this.getCityList(id);
                        this.clearInput('province');
                    }
                } else if (type === 'city') {
                    if (!this.address_id.city || this.address_id.city !== id) {
                        this.receive_infor.city = name;
                        this.address_id.city = id;
                        this.getCountryList(id);
                        this.clearInput('city');
                    }
                } else if (type === 'country') {
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
                this.$http.post(`${APP.HOST}/country_list/${id}`, {
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
    };
</script>