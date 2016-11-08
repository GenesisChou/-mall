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
                padding-left: pxTorem(30);
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
                    <li v-for='(address,$index) in address_list' class='flex flex-space-between flex-center-v'>
                        <i v-if='address.default' class='iconfont icon-correct-circle  text-huge'></i>
                        <i v-else class='iconfont icon-correct-circle-hollow  text-huge'></i>
                        <div class='flex-item address' @click='chooseAddress($index)'>
                            <p class='text-large text-ellipsis'>张三,139000000</p>
                            <p class='text-small text-gray text-ellipsis'>浙江省 杭州市 西湖区 坚果互动全球研发中心</p>
                        </div>
                        <i class='iconfont icon-edit  text-huge' @click='toggleEdit'></i>
                    </li>
                    <li class='flex flex-space-between ' @click='toggleEdit("add")'>
                        <i class='iconfont icon-plus-circle text-huge '></i>
                        <div class='flex-item'>
                            <span class='text-large title'>新增收货地址</span>
                        </div>
                        <i class='iconfont icon-arrows-right  text-huge text-bold'></i>
                    </li>
                </ul>
                <footer class='footer'>
                    <button class='btn btn-large btn-red btn-block' @click='saveAddress'>保存</button>
                </footer>
            </div>
        </v-popup>
        <v-address-edit :show='popup' :toggle-popup='toggleEdit' :title='title'></v-address-edit>
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
        },
    },
    data() {
        return {
            popup: false,
            title: '修改收货地址',
            address_list: [{
                default: true
            }, {
                default: false
            }, {
                default: false
            }]
        };
    },
    computed: {
        address_list() {
            return this.$store.address_list;
        }
    },
    mounted() {
        this.$store.dispatch('getAddressList');
    },
    methods: {
        toggleEdit(type) {
            this.title = type === 'add' ? '新建收货地址' : '修改收货地址';
            this.popup = !this.popup;
        },
        chooseAddress($index) {
            this.address_list.map((address, index) => {
                return address.default = (index == $index);
            })
        },
        saveAddress() {
            this.togglePopup();
        }
    }
}
</script>
</script>
