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
            align-items: center;
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
        display: flex;
        align-items: center;
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
                    <div class='flex'>
                        <label for='name'>收货人</label>
                        <input id='name' placeholder="收货人姓名" v-model='reciveInfor.name'>
                    </div>
                    <div class='flex' @click='showAreaList("province")'>
                        <label for='province'>选择省</label>
                        <input id='province' placeholder="请选择省" v-model='reciveInfor.province' disabled>
                    </div>
                    <div class='flex' @click='showAreaList("city")'>
                        <label for='city'>选择市</label>
                        <input id='city' placeholder="请选择市" v-model='reciveInfor.city' disabled>
                    </div>
                    <div class='flex' @click='showAreaList("county")'>
                        <label for='county'>选择区/县</label>
                        <input id='county' placeholder="请选择区县" v-model='reciveInfor.county' disabled>
                    </div>
                    <div class='flex'>
                        <label for='address'>详细地址</label>
                        <input id='address' placeholder="请输入详细地址" v-model='reciveInfor.address'>
                    </div>
                    <div class='flex'>
                        <label for='phone'>手机号码</label>
                        <input id='phone' type='number' placeholder="手机或固定电话" v-model='reciveInfor.phone'>
                    </div>
                </section>
                <footer class='footer text-center'>
                    <button class='btn btn-red btn-block btn-large' @click.prevent='saveEdit'>保存</button>
                </footer>
            </form>
        </v-popup>
        <v-modal :show='modal' :toggle-modal='toggleModal' :cover-close='true'>
            <div class='modal-content'>
                <ul v-if='current_type=="province"'>
                    <li v-for='(province,$index) in province_list' @click='chooseArea($index,"province")'>
                        <!-- <input type="radio"> -->
                        <i :class='["radio",$index==2?"active":""]'></i> <span>{{province}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="city"'>
                    <li v-for='(city,$index) in city_list' @click='chooseArea($index,"city")'>
                        <!-- <input type="radio"> -->
                        <i class='radio'></i> <span>{{city}}</span>
                    </li>
                </ul>
                <ul v-if='current_type=="county"'>
                    <li v-for='(county,$index) in county_list' @click='chooseArea($index,"county")'>
                        <!-- <input type="radio"> -->
                        <i class='radio'></i> <span>{{county}}</span>
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
        reciveInfor: {
            type: Object,
            default: function() {
                return {

                }
            }
        },
        saveEdit: {
            type: Function,
            default: function() {
                this.togglePopup();
            }
        },
        title: {
            type: String,
            default: '新建收货地址'
        }

    },
    data() {
        return {
            modal: false,
            current_type: 'province',
            province_list: ['浙江', '江苏', '福建','广东','广西','云南','山东','河北','辽宁','吉林','黑龙江'],
            city_list: ['杭州', '温州', '宁波'],
            county_list: ['西湖区', '上城区', '下城区']
        }
    },
    methods: {
        //取消编辑
        cancelEdit() {
            this.toggleConfirm();
        },
        //清除输入
        clearInput() {
            this.reciveInfor.name = '';
            this.reciveInfor.province = '';
            this.reciveInfor.city = '';
            this.reciveInfor.county = '';
            this.reciveInfor.address = '';
            this.reciveInfor.phone = '';
        },
        showAreaList(type) {
            this.current_type = type;
            this.toggleModal();
        },
        //关闭/显示confirm
        toggleConfirm() {
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
        },
        toggleModal() {
            this.modal = !this.modal;
        },
        chooseArea($index, type) {
            if (type == 'province') {
                this.reciveInfor.province = this.province_list[$index];
            } else if (type == 'city') {
                this.reciveInfor.city = this.city_list[$index];
            } else if (type == 'county') {
                this.reciveInfor.county = this.county_list[$index];
            }
            this.toggleModal();
        }
    }
}
</script>
