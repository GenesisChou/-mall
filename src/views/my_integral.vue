<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.my-integral {
    height: 100%;
    display: flex;
    flex-direction: column;
}

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

.record-list {
    flex:1;
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
    flex-direction: column;
    width: pxTorem(600);
    padding: pxTorem(50) pxTorem(68);
    border-radius: pxTorem(5);
    p {
        line-height: 1rem;
    }
    button {
        margin-top: pxTorem(90);
    }
}
</style>
<template>
    <div class='my-integral'>
        <div class='head text-center'>
            <div class='main  flex flex-center-v flex-center-h'>
                <p class='title text-white text-large'>当前积分余额:</p>
                <span class=' text-white number'>{{parseInt(user.integral)}}</span>
            </div>
            <div class='event flex flex-center-v '>
                <div class='flex-item flex flex-center-v flex-center-h' @click='toggleModal()'>
                    <img class='icon' src='../assets/images/store.png'> <span class='text-large'>赚取积分</span>
                </div>
                <router-link :to='{name:"order_list"}' tag='div' class='flex-item flex flex-center-v flex-center-h'>
                    <img class='icon' src='../assets/images/record.png'><span class='text-large'>兑换记录</span>
                </router-link>
            </div>
        </div>
        <v-block-text text='积分明细' type='text-gray'></v-block-text>
        <ul class='record-list'>
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
        <v-modal>
            <div class='modal-content flex flex-space-between bg-white'>
                <div class='text-large'>
                    <p>您可以通过以下途径赚取积分：</p>
                    <p v-for='(item,$index) in integral_param'>{{($index+1+'、')+item.name+' +'+item.value}}</p>
                </div>
                <p class='text-center'>
                    <button class='btn btn-pink' @click='toggleModal()'>知道了</button>
                </p>
            </div>
        </v-modal>
    </div>
</template>
<script>
import vModal from 'components/v_modal.vue'
import vBlockText from 'components/v_block_text.vue'
import {
    mapState
} from 'vuex'
import {
    mapActions
} from 'vuex'
export default {
    name: 'my_integral',
    components: {
        vBlockText,
        vModal
    },
    computed: mapState(['user', 'integral_param', 'integral_list']),
    methods: mapActions(['getUserInfor','getIntegralParam', 'getIntegralList', 'toggleModal']),
    mounted() {
        this.getUserInfor();
        this.getIntegralList();
        this.getIntegralParam();
    }
};
</script>
