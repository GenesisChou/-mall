<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .select-address {
        display: flex;
        flex-direction: column;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        height: pxTorem(640);
        background: $white;
        .header {
            text-align: center;
            line-height: pxTorem(114);
            border-bottom: 1px solid $gray-light;
            color: #3d4244;
            background-color: $white;
        }
        .address-list {
            flex: 1;
            -webkit-flex: 1;
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
            margin: 0 pxTorem(53);
            max-height: pxTorem(535);
            &::-webkit-scrollbar {
                display: none;
            }
            /*margin-bottom: pxTorem(25);*/
            li {
                height: pxTorem(107);
                list-style: none;
                border-bottom: 1px solid $gray-light;
                overflow: hidden;
                &:last-child {
                    border-bottom: 0;
                    line-height: pxTorem(80);
                    .iconfont {
                        color: $orange;
                    }
                    .icon-arrows-right {
                        font-weight: bold;
                    }
                }
                .address {
                    overflow: hidden;
                    float: left;
                    max-width: pxTorem(523);
                    margin-top: pxTorem(15);
                    h6 {
                        color: $gray;
                    }
                }
                .iconfont {}
                .new-address {
                    float: left;
                    line-height: pxTorem(107);
                }
            }
            .iconfont {
                font-size: pxTorem(36);
                line-height: pxTorem(107);
                &:first-child {
                    float: left;
                    margin-right: pxTorem(10);
                }
                &:last-child {
                    float: right;
                }
                &.icon-correct-circle {
                    color: $orange;
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
            }
        }
    }
</style>
<template>
    <section class='v-address-select'>
        <v-popup :show='show' :toggle-popup='togglePopup'>
            <div class='select-address'>
                <header class='header'>
                    <h1>
                        请选择收货地址
                    </h1>
                </header>
                <ul class='address-list'>
                    <li v-for='address in address_list'>
                        <i v-if='address.id==selected_id' class='iconfont icon-correct-circle'></i>
                        <i v-else class='iconfont icon-correct-circle-hollow'></i>
                        <div class='address' @click='selectAddress(address.id)'>
                            <h4 class='text-ellipsis'>{{address.contact}},{{address.phone}}</h4>
                            <h6 class='text-ellipsis'>{{address.province}} {{address.city}} {{address.country}} {{address.address}}</h6>
                        </div>
                        <i class='iconfont icon-edit ' @click='editAddress(address.id)'></i>
                        <!-- <i class='iconfont icon-error ' @click='deleteAddress(address.id)'></i> -->
                    </li>
                    <li @click='insertAddress'>
                        <i class='iconfont icon-plus-circle '></i>
                        <div class='new-address'>
                            新增收货地址
                        </div>
                        <i class='iconfont icon-arrows-right'></i>
                    </li>
                </ul>
                <footer class='footer'>
                    <button class='btn btn-orange' @click='save'>保存</button>
                </footer>
            </div>
        </v-popup>
        <v-address-edit :show='popup' :toggle-popup='toggleEdit' :title='title' :id='parseInt(address_id)'></v-address-edit>
    </section>
</template>
<script>
    import vAddressEdit from './vAddressEdit.vue'
    export default {
        name: 'vAddressSelect',
        components: {
            vAddressEdit
        },
        props: {
            togglePopup: Function,
            show: {
                type: Boolean,
                default: false
            },
            defaultId: Number
        },
        data() {
            return {
                popup: false,
                title: '修改收货地址',
                address_id: 0,
                selected_id: 0,
            };
        },
        computed: {
            address_list() {
                return this.$store.state.address_list;
            },
            save_address() {
                return this.title == '修改收货地址' ? this.updateAddress : this.insertAddress;
            },
        },
        watch: {
            show(value) {
                if (value) {
                    this.address_list.forEach((address) => {
                        if (address.is_defaults == 1) {
                            this.selected_id = address.id;
                            return;
                        }
                    })
                }
            }
        },
        methods: {
            toggleEdit() {
                this.popup = !this.popup;
            },
            //修改地址
            editAddress(id) {
                this.title = '修改收货地址';
                this.address_id = id;
                this.toggleEdit();
            },
            //添加地址
            insertAddress() {
                this.title = '新建收货物地址';
                this.address_id = 0;
                this.toggleEdit();
            },

            selectAddress(id) {
                this.selected_id = id;
            },

            //设置默认地址
            save() {
                if (this.defaultId != this.selected_id) {
                    this.setDefaultAddress(this.selected_id, (response) => {
                        let data = response.data;
                        if (data.status == APP.SUCCESS) {
                            this.togglePopup();
                        } else {
                            this.$store.dispatch('toggleConfirm', {
                                msg: data.info,
                            })
                        }
                    });
                } else {
                    this.togglePopup();
                }
            },
            setDefaultAddress(id, callback) {
                this.$store.dispatch('toggleLoading');

                this.$http.post(`${APP.HOST}/set_default_address/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    id: id
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');

                    if (callback) {
                        callback(response);
                    }
                    if (response.data.status == APP.SUCCESS) {
                        this.$store.dispatch('getAddressList');
                    }

                }, (response) => {
                    this.$store.dispatch('toggleLoading');

                })
            },
            deleteAddress(id) {
                let address_list = this.address_list;
                this.$store.dispatch('toggleConfirm', {
                    msg: '你确定要删除该地址吗?',
                    callback: () => {
                        this.$store.dispatch('toggleLoadinge', {
                            show: true
                        });
                        let default_delete = this.deleteDefault(address_list, id);
                        this.$http.post(`${APP.HOST}/address_delete/${id}`, {
                            token: APP.TOKEN,
                            userid: APP.USER_ID
                        }).then((response) => {
                            let data = response.data;
                            this.$store.dispatch('toggleConfirm');
                            if (data.status == APP.SUCCESS) {
                                this.$store.dispatch('toggleLoadinge');
                                this.$store.dispatch('toggleAlert', {
                                    msg: '删除地址成功'
                                })
                                //若被删除的是默认地址,则选取删除后地址列表第一项为默认地址
                                if (default_delete) {
                                    this.$store.dispatch('getAddressList', (address_list) => {
                                        this.setDefaultAddress(address_list[0].id);
                                        this.selectAddress(address_list[0].id);
                                    });
                                } else {
                                    this.$store.dispatch('getAddressList');
                                }
                            } else {
                                this.$store.dispatch('toggleLoadinge');

                                this.$store.dispatch('toggleAlert', {
                                    msg: '删除地址失败'
                                })
                            }
                        }, (response) => {});
                    }
                })
            },
            deleteDefault(address_list, id) {
                let result = false;
                for (var i = 0, len = address_list.length; i < len; i++) {
                    let address = address_list[i];
                    if (address.id == id && address.is_defaults == 1 && len > 1) {
                        result = true;
                        break;
                    }
                }
                return result;
            },
        }
    }
</script>
</script>