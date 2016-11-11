<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.select-address {
    height: pxTorem(800);
    background: $white;
    .header {
        line-height: pxTorem(135);
    }
    .address-list {
        overflow: scroll;
        margin: 0 pxTorem(53);
        /*border-top: 1px solid $gray;*/
        li {
            height: pxTorem(107);
            list-style: none;
            border-top: 1px solid $gray-light;
            &:last-child {
                border-bottom: 0;
                /*height: pxTorem(80);*/
                line-height: pxTorem(80);
            }
            .address {
                overflow: hidden;
            }
            .iconfont:first-child {
                margin-right: pxTorem(10);
            }
            .iconfont:last-child {
                /*padding-left: pxTorem(30);*/
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
            <div class='select-address flex flex-column flex-space-between'>
                <header class='header text-center text-huge'>
                    请选择收货地址
                </header>
                <ul class='address-list flex-item'>
                    <li v-for='address in address_list' class='flex flex-space-between flex-center-v'>
                        <i v-if='address.id==selected_id' class='iconfont icon-correct-circle  text-huge text-red'></i>
                        <i v-else class='iconfont icon-correct-circle-hollow  text-huge'></i>
                        <div class='flex-item address' @click='selectAddress(address.id)'>
                            <p class='text-large text-ellipsis'>{{address.contact}},{{address.phone}}</p>
                            <p class='text-small text-gray text-ellipsis'>{{address.province}} {{address.city}} {{address.country}} {{address.address}}</p>
                        </div>
                        <div>
                            <i class='iconfont icon-edit  text-huge' @click='editAddress(address.id)'></i>
                            <!-- <i class='iconfont icon-error  text-huge' @click='deleteAddress(address.id)'></i> -->
                        </div>
                    </li>
                    <li class='flex flex-space-between ' @click='insertAddress'>
                        <i class='iconfont icon-plus-circle text-huge '></i>
                        <div class='flex-item'>
                            <span class='text-large title'>新增收货地址</span>
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
import vAddressEdit from 'components/v_address_edit.vue'
import vPopup from 'components/v_popup.vue'
export default {
    components: {
        vPopup,
        vAddressEdit
    },
    props: {
        togglePopup: Function,
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            popup: false,
            title: '修改收货地址',
            address_id: 0,
            selected_id: 0,
        };
    },
    watch: {
        show(value) {
            if (value) {
                this.address_list.forEach((address) => {
                    if (address.is_defaults) {
                        this.selected_id = address.id;
                        return;
                    }
                })
            }
        }
    },
    computed: {
        address_list() {
            return this.$store.state.address_list;
        },
        save_address() {
            return this.title == '修改收货地址' ? this.updateAddress : this.insertAddress;
        },
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
        // //删除地址
        // deleteAddress(id) {
        //     let address_list = this.address_list;
        //     this.$store.dispatch('toggleConfirm', {
        //         msg: '你确定要删除该地址吗?',
        //         show: true,
        //         callback: () => {
        //             let default_delete = this.deleteDefault(address_list, id);
        //             this.$http.post(`${APP.HOST}/address_delete/${id}`, {
        //                 token: APP.TOKEN,
        //                 userid: APP.USER_ID
        //             }).then((response) => {
        //                 let data = response.data;
        //                 this.$store.dispatch('toggleConfirm');
        //                 if (data.status == APP.SUCCESS) {
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
        //                     this.$store.dispatch('toggleAlert', {
        //                         msg: '删除地址失败'
        //                     })
        //                 }
        //             }, (response) => {});
        //         }
        //     })
        // },
        // //判断被删除的是否是默认地址
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
        selectAddress(id) {
            this.selected_id = id;
        },

        //设置默认地址
        save() {
            this.setDefaultAddress(this.selected_id, (response) => {
                let data = response.data;
                if (data.status == APP.SUCCESS) {
                    this.togglePopup();
                } else {
                    this.$store.dispatch('toggleConfirm', {
                        msg: data.info,
                        show: true
                    })
                }
            });
        },
        setDefaultAddress(id, callback) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });

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
        }
    }
}
</script>
</script>
