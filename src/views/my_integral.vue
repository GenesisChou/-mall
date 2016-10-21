<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.head {
    height: pxTorem(388);
    .main {
        position: relative;
        height: pxTorem(288);
        background-image: url('../assets/images/my_integral/my_integral.png');
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
        border-bottom: 1px solid $gray-light;
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
    border-radius: pxTorem(5);
    p {
        line-height: pxTorem(55);
    }
}
</style>
<template>
    <div class='my_integral'>
        <div class='head text-center'>
            <div class='main  flex flex-center-v flex-center-h'>
                <p class='title text-white text-large'>当前积分余额:</p>
                <span class=' text-white number' v-text='user.integral|parseInt'></span>
            </div>
            <div class='event flex flex-center-v '>
                <div class='flex-item flex flex-center-v flex-center-h' @click='toggleModal'>
                    <img class='icon' src='../assets/images/store.png'> <span class='text-large'>赚取积分</span>
                </div>
                <div class='flex-item flex flex-center-v flex-center-h' v-link='{name:"order_list"}'>
                    <img class='icon' src='../assets/images/record.png'><span class='text-large'>兑换记录</span>
                </div>
            </div>
        </div>
        <div class='body'>
            <div class='integral-detail flex flex-center-v flex-center-h text-gray bg-base text-large'>
                积分明细
            </div>
            <ul class='record-list'>
                <li v-for='item in integral_list' class='flex flex-space-between flex-center-v'>
                    <div class='detail'>
                        <span class='text-large'>{{item.name}}</span>
                        <p class='text-gray text-small'>
                            {{item.create_time}}
                        </p>
                    </div>
                    <div class='text-large flex flex-center-v'>{{getPoint(item.point)}} </div>
                </li>
            </ul>
        </div>
        <v-modal :show.sync='modal'>
            <div class='modal-content flex flex-space-between bg-white'>
                <div class='text-large'>
                    <p>您可以通过以下途径赚取积分：</p>
                    <p>1、签到</p>
                    <p>2、分享</p>
                    <p>3、参与活动</p>
                </div>
                <p class='text-center'>
                    <button class='btn btn-blue' @click='toggleModal'>知道了</button>
                </p>
            </div>
        </v-modal>
    </div>
</template>
<script>
import utils from 'libs/utils'
import vModal from 'components/v_modal'
import filters from 'libs/filters'
export default {

    name: 'my_integral',
    components: {
        vModal,
    },
    data() {
        return {
            modal: false,
            integral_list: [],
            user: {}
        };
    },
    route: {
        data(transition) {
            this.gerUserInfor();
            this.getIntegralList();
        },

    },
    methods: {
        gerUserInfor() {
            this.$http.post(`${APP.HOST}/get_user/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('user', data.data)
            }, (response) => {

            })

        },
        //获取积分明细
        getIntegralList() {
            this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                let data = response.data;
                this.$set('integral_list', data.data);
            })
        },
        getPoint(point) {
            point = parseInt(point);
            if (point > 0) {
                point = `+${point}`;
            } else if (!point) {
                point = `+0`;
            }
            return point;
        },
        toggleModal() {
            this.modal = !this.modal;
        }
    },
    filters
};
</script>
