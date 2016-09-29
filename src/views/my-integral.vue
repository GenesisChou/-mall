<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(388);
    .main {
        position: relative;
        height: pxTorem(288);
        background-image: url('../assets/images/my-integral/my-integral.png');
        background-repeat: no-repeat;
        background-size: 100%;
        .title {
            position: absolute;
            left: pxTorem(38);
            top: pxTorem(18);
        }
        .number {
            font-size: pxTorem(60);
        }
    }
    .event {
        height: pxTorem(100);
        font-size: pxTorem(30);
        .icon {
            width: pxTorem(50);
            height: pxTorem(47);
            margin-right: pxTorem(28);
        }
    }
}

.integral-detail {
    height: pxTorem(100);
}

.record-list {
    padding-top: pxTorem(30);
    > li {
        height: pxTorem(100);
        padding: 0 pxTorem(38);
        border-bottom: 1px solid $sliver;
    }
    .detail {
        line-height: 0.5rem;
    }
}

.modal-content {
    flex-direction: column;
    width: pxTorem(600);
    height: pxTorem(460);
    padding: pxTorem(50) pxTorem(68);
    li {
        line-height: pxTorem(55);
    }
}
</style>
<template>
    <div class='my-integral'>
        <div class='head text-center'>
            <div class='main  flex flex-center-v flex-center-h'>
                <p class='title text-white text-large'>当前积分余额:</p>
                <span class=' text-white number'>5000</span>
            </div>
            <div class='event flex flex-center-v '>
                <div class='flex-item flex flex-center-v flex-center-h' @click='toggleModal'>
                    <img class='icon' src='../assets/images/store.png'> <span class='text-large'>赚取积分</span>
                </div>
                <div class='flex-item flex flex-center-v flex-center-h' v-link='{name:"exchange-list"}'>
                    <img class='icon' src='../assets/images/record.png'><span class='text-large'>兑换记录</span>
                </div>
            </div>
        </div>
        <div class='body'>
            <div class='integral-detail flex flex-center-v flex-center-h text-gray bg-base text-large'>
                积分明细
            </div>
            <ul class='record-list'>
                <li v-for='i in 5' class='flex flex-space-between flex-center-v'>
                    <div class='detail'>
                        <span class='text-large'>签到</span>
                        <p class='text-gray text-small'>
                            2016-9-9 14:58:21
                        </p>
                    </div>
                    <div class='text-large flex flex-center-v'>+10 </div>
                </li>
            </ul>
        </div>
        <v-modal :show.sync='modal'>
            <div class='modal-content flex flex-space-between'>
                <ol class='text-large'>
                    <li>您可以通过以下途径赚取积分：</li>
                    <li>1、签到</li>
                    <li>2、分享</li>
                    <li>3、参与活动</li>
                </ol>
                <p class='text-center'>
                    <button class='btn btn-blue' @click='toggleModal'>知道了</button>
                </p>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vModal from 'components/v-modal'
import vPopup from 'components/v-popup'
export default {

    name: 'my-integral',
    components: {
        vPopup,
        vModal
    },
    data() {
        return {
            popup: false,
            modal: false
        };
    },
    created() {
        utils.setTitle('用户中心');
    },
    methods: {
        //获取用户信息
        getUserInfor() {

        },
        //获取兑换记录列表
        getRecordList() {

        },
        toggleModal() {
            // this.popup = !this.popup;
            this.modal = !this.modal;
        }
    }
};
</script>
