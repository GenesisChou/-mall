<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-address {
    padding: pxTorem(55) 0;
    font-size: pxTorem(28);
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;
    .location {
        width: pxTorem(110);
    }
    .arrows {
        width: pxTorem(105);
    }
    .address-content {
        line-height: pxTorem(55);
        label {
            margin-right: pxTorem(10);
        }
    }
    .popup-content {
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
                border-top: 1px solid $gray;
                &:last-child {
                    border-bottom: 0;
                }
                .address {
                    overflow: hidden;
                }
                .icon-finish {
                    margin-right: pxTorem(10);
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
}
</style>
<template>
    <section class='v-address bg-white flex'>
        <div class='location flex flex-center-v flex-center-h'>
            <i class='iconfont icon-location  text-huge'></i>
        </div>
        <div class='address-content ' @click='togglePopup'>
            <p class='flex flex-space-between'>
                <span> <label>收货信息:</label>张三</span>
                <span>1390000000</span>
            </p>
            <div class='flex'>
                <label>收货地址:</label>
                <div class='flex-item'>浙江省 杭州市 西湖区 坚果互动科技全球研发中心</div>
            </div>
        </div>
        <div class='arrows flex flex-center-v flex-center-h'>
            <i class='iconfont icon-arrows-right text-bold text-huge'></i>
        </div>
        <v-popup :show='popup' :toggle-popup='togglePopup'>
            <div class='popup-content flex flex-column flex-space-between'>
                <header class='header text-center text-huge'>
                    请选择收货地址
                </header>
                <ul class='address-list flex-item'>
                    <li v-for='i in 3' class='flex flex-space-between flex-center-v'>
                        <i class='iconfont icon-finish  text-huge'></i>
                        <div class='flex-item address'>
                            <p class='text-large'>张三,139000000</p>
                            <p class='text-small text-gray text-ellipsis'>浙江省 杭州市 西湖区 坚果互动全球研发中心</p>
                        </div>
                        <i class='iconfont icon-order  text-huge'></i>
                    </li>
                    <li class='flex flex-space-between flex-center-v'>
                        <i class='iconfont icon-plus-circle  text-huge'></i>
                        <div class='flex-item'>
                            <span class='text-large'>新增收货地址</span>
                        </div>
                        <i class='iconfont icon-arrows-right  text-huge text-bold'></i>
                    </li>
                </ul>
                <footer class='footer'>
                    <button class='btn btn-large btn-red btn-block'>保存</button>
                </footer>
            </div>
        </v-popup>
    </section>
</template>
<script>
import vPopup from 'components/v_popup.vue'
export default {
    components: {
        vPopup
    },
    data() {
        return {
            popup: false
        }
    },
    methods: {
        togglePopup() {
            this.popup = !this.popup;
        }
    }
}
</script>
