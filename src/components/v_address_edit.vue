<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.edit-address {
    background: $white;
    .header {
        line-height: pxTorem(135);
        /*border-bottom: 1px solid $sliver;*/
    }
    .main {
        padding: 0 pxTorem(53);
        label {
            width: pxTorem(204);
            font-size: pxTorem(30);
            text-align: left;
        }
        input {
            height: pxTorem(50);
            width: pxTorem(300);
            padding-left: pxTorem(18);
            border: 1px solid $gray;
            font-size: pxTorem(26);
            &:disabled {
                background-color: $white;
            }
        }
        >.flex {
            height: pxTorem(87);
            border-bottom: 1px solid $gray;
            &:nth-child(1) {
                border-top: 1px solid $gray;
            }
        }
    }
    .footer {
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
    max-height: pxTorem(400);
    overflow: scroll;
    border-radius: pxTorem(10);
    li {
        width: pxTorem(350);
        height: pxTorem(70);
        padding: 0 pxTorem(20);
        list-style: none;
        overflow: hidden;
        border-bottom: 1px solid $gray-light;
        &:last-child {
            border-bottom: 1px solid $gray-light;
        }
        .radio {
            width: pxTorem(30);
            height: pxTorem(30);
            line-height: pxTorem(70);
            margin-right: pxTorem(20);
            border-radius: 50%;
            -webkit-box-shadow: inset 0 0 pxTorem(10) $gray-light;
            -moz-box-shadow: inset 0 0 pxTorem(10) $gray-light;
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
            <form class='edit-address'>
                <header class='header text-center text-huge'>
                    {{title}}
                </header>
                <section class='main'>
                    <div class='flex flex-center-v'>
                        <label for='name'>收货人</label>
                        <input id='name' placeholder="收货人姓名" v-model='receive_infor.contact'>
                    </div>
                    <div class='flex flex-center-v' @click='showAreaList("province")'>
                        <label for='province'>选择省</label>
                        <input id='province' placeholder="请选择省" v-model='receive_infor.province' disabled>
                    </div>
                    <div class='flex flex-center-v' @click='showAreaList("city")'>
                        <label for='city'>选择市</label>
                        <input id='city' placeholder="请选择市" v-model='receive_infor.city' disabled>
                    </div>
                    <div class='flex flex-center-v' @click='showAreaList("country")'>
                        <label for='country'>选择区/县</label>
                        <input id='country' placeholder="请选择区县" v-model='receive_infor.country' disabled>
                    </div>
                    <div class='flex flex-center-v'>
                        <label for='address'>详细地址</label>
                        <input id='address' placeholder="请输入详细地址" v-model='receive_infor.address'>
                    </div>
                    <div class='flex flex-center-v'>
                        <label for='phone'>手机号码</label>
                        <input id='phone' type='number' placeholder="手机或固定电话" v-model='receive_infor.phone'>
                    </div>
                </section>
                <footer class='footer text-center'>
                    <button class='btn btn-red btn-block btn-large' @click.prevent='save'>保存</button>
                </footer>
            </form>
        </v-popup>
        <v-modal :show='modal' :toggle-modal='toggleModal' :cover-close='true'>
            <div class='modal-content'>
                <ul v-if='current_type=="province"'>
                    <li class='flex flex-center-v'   v-for='province in province_list' @click='selectAddress("province",province.province,province.provinceid)'>
                        <i :class='["radio",address_id.province==province.provinceid?"active":""]'></i> <span>{{province.province}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="city"'>
                    <li class='flex flex-center-v'  v-for='city in city_list' @click='selectAddress("city",city.city,city.cityid)'>
                        <i :class='["radio",address_id.city==city.cityid?"active":""]'></i> <span>{{city.city}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="country"'>
                    <li class='flex flex-center-v'  v-for='country in area_list' @click='selectAddress("country",country.area,country.areaid)'>
                        <i :class='["radio",address_id.country==country.areaid?"active":""]'></i> <span>{{country.area}}</span>
                    </li>
                </ul>
            </div>
        </v-modal>
    </section>
</template>
<script>
import vModal from 'components/v_modal.vue'
import vPopup from 'components/v_popup.vue'
export default {
    components: {
        vPopup,
        vModal
    },
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
            area_list: '',
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
        is_defaults(){
            if(this.address_list.length==0){
                return 1;
            }
            let result=0;
            this.address_list.forEach(address=>{
                if(address.id==this.id){
                    result=address.is_defaults;
                }
            })
            return result;
        }
    },
    watch: {
        //弹出口开始获取省份列表
        show(value) {
            if (value) {
                this.getProvinceList();
                if (this.id > 0) {
                    this.address_list.forEach((address) => {
                        if (address.id == this.id) {
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
            this.$http.post(`${APP.HOST}/address_insert/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                province: this.receive_infor.province,
                city: this.receive_infor.city,
                country: this.receive_infor.country,
                address: this.receive_infor.address,
                phone: this.receive_infor.phone,
                contact: this.receive_infor.contact,
                is_defaults: this.is_defaults
            }).then((response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    //重新获取地址列表

                    this.$store.dispatch('getAddressList');
                    this.$store.dispatch('toggleAlert', {
                        msg: '新建地址成功',
                        type: 'correct'
                    });
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

            })
        },
        //更新地址
        updateAddress() {
            this.$http.post(`${APP.HOST}/address_update/${this.id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                province: this.receive_infor.province,
                city: this.receive_infor.city,
                country: this.receive_infor.country,
                address: this.receive_infor.address,
                phone: this.receive_infor.phone,
                contact: this.receive_infor.contact,
                is_defaults: this.is_defaults
            }).then((response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    //重新获取地址列表
                    this.$store.dispatch('getAddressList');
                    this.$store.dispatch('toggleAlert', {
                        msg: '编辑地址成功',
                        type: 'correct'
                    });
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

            })
        },
        //取消编辑
        cancelEdit() {
            this.toggleConfirm();
        },
        //清除输入
        clearInput(type) {
            this.receive_infor.country = '';
            if (type == 'city') {
                return;
            }
            this.receive_infor.city = '';
            if (type == 'province') {
                return;
            }
            this.receive_infor.province = '';
            this.receive_infor.contact = '';
            this.receive_infor.address = '';
            this.receive_infor.phone = '';
        },
        showAreaList(type) {
            if (type == 'city' && !this.address_id.province) {
                return;
            }
            if (type == 'country' && !this.address_id.city) {
                return;
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
                    this.getAreaList(id);
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
        getAreaList(id) {
            this.$http.post(`${APP.HOST}/area_list/${id}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.area_list = response.data.data;
            }, (response) => {});
        },
        //关闭/显示confirm
        toggleConfirm() {
            if (!this.is_empty) {
                this.$store.dispatch('toggleConfirm', {
                    msg: '确认放弃编辑?',
                    show: true,
                    callback: () => {
                        this.$store.dispatch('toggleConfirm', {
                            show: false
                        });
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
