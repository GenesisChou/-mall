<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .select-address {
        height: pxTorem(800);
        background: $white;
        .header {
            line-height: pxTorem(135);
        }
        .address-list {
            overflow-y: scroll;
            margin: 0 pxTorem(53);
            max-height: pxTorem(535);
            &::-webkit-scrollbar {
                display: none;
            }
            /*margin-bottom: pxTorem(25);*/
            li {
                height: pxTorem(107);
                list-style: none;
                border-top: 1px solid $gray-light;
                overflow: hidden;
                &:last-child {
                    border-bottom: 0;
                    /*height: pxTorem(80);*/
                    line-height: pxTorem(80);
                }
                .address {
                    overflow: hidden;
                    float: left;
                    max-width: pxTorem(523);
                    margin-top: pxTorem(15);
                }
                .iconfont {
                    line-height: pxTorem(107);
                    &:first-child {
                        float: left;
                        margin-right: pxTorem(10);
                    }
                    &:last-child {
                        float: right;
                    }
                }
                .new-address {
                    float: left;
                    line-height: pxTorem(107);
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
</style>
<template>
    <section class='v-address-select'>
        <v-popup :show='show' :toggle-popup='togglePopup'>
            <div class='select-address'>
                <header class='header text-center text-huge'>
                    请选择收货地址
                </header>
                <ul class='address-list'>
                    <li v-for='address in address_list'>
                        <i v-if='address.id==selected_id' class='iconfont icon-correct-circle  text-huge text-red'></i>
                        <i v-else class='iconfont icon-correct-circle-hollow  text-huge'></i>
                        <div class='address' @click='selectAddress(address.id)'>
                            <h4 class='text-ellipsis'>{{address.contact}},{{address.phone}}</h4>
                            <h6 class='text-gray text-ellipsis'>{{address.province}} {{address.city}} {{address.country}} {{address.address}}</h6>
                        </div>
                        <i class='iconfont icon-edit  text-huge' @click='editAddress(address.id)'></i>
                        <!-- <i class='iconfont icon-error  text-huge' @click='deleteAddress(address.id)'></i> -->
                    </li>
                    <li @click='insertAddress'>
                        <i class='iconfont icon-plus-circle text-huge '></i>
                        <div class='new-address'>
                            新增收货地址
                        </div>
                        <i class='iconfont icon-arrows-right  text-huge text-bold'></i>
                    </li>
                </ul>
                <footer class='footer'>
                    <button class='btn btn-large btn-red btn-block' @click='save'>保存</button>
                </footer>
            </div>
        </v-popup>
        <v-address-edit :show='popup' :toggle-popup='toggleEdit' :title='title' :id='parseInt(address_id)'></v-address-edit>
    </section>
</template>
<script>
    import vAddressEdit from 'components/order/vAddressEdit.vue'
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
            //删除地址
            // deleteAddress(id) {
            //     let address_list = this.address_list;
            //     this.$store.dispatch('toggleConfirm', {
            //         msg: '你确定要删除该地址吗?',
            //         callback: () => {
            //             this.$store.dispatch('toggleLoadinge', {
            //                 show: true
            //             });
            //             let default_delete = this.deleteDefault(address_list, id);
            //             this.$http.post(`${APP.HOST}/address_delete/${id}`, {
            //                 token: APP.TOKEN,
            //                 userid: APP.USER_ID
            //             }).then((response) => {
            //                 let data = response.data;
            //                 this.$store.dispatch('toggleConfirm');
            //                 if (data.status == APP.SUCCESS) {
            //                     this.$store.dispatch('toggleLoadinge');
            //                     this.$store.dispatch('toggleAlert', {
            //                             msg: '删除地址成功'
            //                         })
            //                         //若被删除的是默认地址,则选取删除后地址列表第一项为默认地址
            //                     if (default_delete) {
            //                         this.$store.dispatch('getAddressList', (address_list) => {
            //                             this.setDefaultAddress(address_list[0].id);
            //                             this.selectAddress(address_list[0].id);
            //                         });
            //                     } else {
            //                         this.$store.dispatch('getAddressList');
            //                     }
            //                 } else {
            //                     this.$store.dispatch('toggleLoadinge');

            //                     this.$store.dispatch('toggleAlert', {
            //                         msg: '删除地址失败'
            //                     })
            //                 }
            //             }, (response) => {});
            //         }
            //     })
            // },
            //判断被删除的是否是默认地址
            // deleteDefault(address_list, id) {
            //     let result = false;
            //     for (var i = 0, len = address_list.length; i < len; i++) {
            //         let address = address_list[i];
            //         if (address.id == id && address.is_defaults == 1 && len > 1) {
            //             result = true;
            //             break;
            //         }
            //     }
            //     return result;
            // },
        }
    }
</script>
</script>