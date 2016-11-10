<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.my-integral {
    height: 100%;
}

.header {
    .user-msg {
        height: pxTorem(288);
        background-image: url('../assets/images/my_integral/my_integral.png');
        background-repeat: no-repeat;
        background-size: 100%;
        font-size: pxTorem(30);
        .avater {
            background-color: $white;
            border-radius: 50%;
            width: pxTorem(160);
            height: pxTorem(160);
            margin: 0 pxTorem(30) 0 pxTorem(134);
            overflow: hidden;
            border: pxTorem(10) solid $white;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .event {
        height: pxTorem(100);
        font-size: pxTorem(30);
        background-color: #f5cfd8;
        .icon {
            width: pxTorem(50);
            height: pxTorem(47);
            margin-right: pxTorem(28);
        }
    }
}

.record-list {
    flex: 1;
    overflow: scroll;
    padding-top: pxTorem(30);
    > li {
        height: pxTorem(100);
        padding: 0 pxTorem(38);
        border-bottom: 1px solid $gray-light;
        list-style: none;
    }
    .detail {
        line-height: 0.5rem;
    }
}

.modal-content {
    width: pxTorem(600);
    padding: pxTorem(50) pxTorem(68);
    border-radius: pxTorem(10);
    p {
        line-height: 1rem;
    }
    button {
        width: pxTorem(300);
        margin-top: pxTorem(50);
    }
}
</style>
<template>
    <div class='my-integral flex flex-column'>
        <header class='header'>
            <section class='user-msg  flex flex-center-v '>
                <div class='avater'>
                    <img :src='user.headimg'>
                </div>
                <div class='text-white'>
                    <p>{{user.nickname}}</p>
                    <p>积分: {{parseInt(user.integral)}}</p>
                </div>
            </section>
            <div class='event flex flex-center-v '>
                <div class='flex-item flex flex-center-v flex-center-h' @click='toggleModal()'>
                    <img class='icon' src='../assets/images/store.png'> <span class='text-large text-red'>积分赚取</span>
                </div>
                <router-link :to='{name:"order_list"}' tag='div' class='flex-item flex flex-center-v flex-center-h'>
                    <img class='icon' src='../assets/images/record.png'><span class='text-large'>兑换记录</span>
                </router-link>
            </div>
        </header>
        <v-block-text text='积分明细' type='bg-white'></v-block-text>
        <ul class='record-list bg-base'>
            <li v-for='item in integral_list' class='flex flex-space-between flex-center-v'>
                <div class='detail'>
                    <span class='text-large'>{{item.name}}</span>
                    <p class='text-gray text-small'>
                        {{item.create_time}}
                    </p>
                </div>
                <div class='text-large flex flex-center-v'>{{parseInt(item.point)>0?'+'+parseInt(item.point):parseInt(item.point)}} </div>
            </li>
        </ul>
        <v-modal :toggle-modal='toggleModal' :show='modal'>
            <div class='modal-content flex flex-space-between flex-column bg-white'>
                <div class='text-large'>
                    <p>您可以通过以下途径赚取积分：</p>
                    <p v-for='(item,$index) in integral_param'>{{($index+1+'、')+item.name+' +'+item.value}}</p>
                </div>
                <p class='text-center'>
                    <button class='btn btn-red btn-large' @click='toggleModal()'>知道了</button>
                </p>
            </div>
        </v-modal>
    </div>
</template>
<script>
import vModal from 'components/v_modal.vue'
import vBlockText from 'components/v_block_text.vue'
export default {
    name: 'my_integral',
    components: {
        vBlockText,
        vModal
    },
    data() {
        return {
            modal: false,
            integral_param:'',
            integral_list:''
        }
    },
    computed:{
        user(){
            return this.$store.state.user;
        }
    },
    methods: {
        toggleModal() {
            this.modal = !this.modal;
        },
        //——获取积分赚取方式
        getIntegralParam() {
            this.$http.post(`${APP.HOST}/get_integral_param`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.integral_param = response.data.data;
            }, (response) => {

            })
        },
        //——获取积分明细列表
        getIntegralList() {
            this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, {
                token: APP.TOKEN,
                userid: APP.USER_ID
            }).then((response) => {
                this.integral_list = response.data.data;
            })
        },
    },
    mounted() {
        // this.$store.dispatch('getUserInfor');
        this.getIntegralList();
        this.getIntegralParam();
    }
};
</script>
