<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
    .my-integral {
        height: 100%;
    }
    
    .header {
        position: relative;
        height: pxTorem(288);
        background-image: url('../assets/images/my_integral.png');
        background-repeat: no-repeat;
        background-size: 100%;
        font-size: pxTorem(30);
        padding-top: pxTorem(64);
        color: $white;
        .avater {
            background-color: $white;
            border-radius: 50%;
            width: pxTorem(160);
            height: pxTorem(160);
            margin-left: pxTorem(134);
            margin-right: pxTorem(30);
            overflow: hidden;
            border: pxTorem(10) solid $white;
            float: left;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .message {
            float: left;
            padding-top: pxTorem(30);
            line-height: pxTorem(50);
        }
        .earn-integral {
            position: absolute;
            top: pxTorem(20);
            right: pxTorem(20);
            font-style: normal;
        }
    }
    
    .record-list {
        position: absolute;
        top: pxTorem(388);
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        overflow: scroll;
        padding-top: pxTorem(30);
        background-color: $gray-light;
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            height: pxTorem(100);
            padding: 0 pxTorem(38);
            border-bottom: 1px solid #c8c8c8;
            list-style: none;
            overflow: hidden;
            div {
                line-height: pxTorem(45);
                padding-top: pxTorem(5);
            }
            span {
                line-height: pxTorem(100);
            }
        }
    }
    
    .modal-content {
        width: pxTorem(600);
        padding: pxTorem(50) pxTorem(68);
        border-radius: pxTorem(10);
        background-color: $white;
        header {
            font-size: pxTorem(28);
            line-height: 1rem;
        }
        footer {
            text-align: center;
            padding-top: pxTorem(50);
        }
        button {
            width: pxTorem(300);
        }
        img {
            width: pxTorem(410);
            height: pxTorem(157);
        }
    }
</style>
<template>
    <div class='my-integral '>
        <header class='header'>
            <div class='avater'>
                <img :src='user.headimg'>
            </div>
            <div class='message'>
                <p>{{user.nickname}}</p>
                <p>积分: {{user.integral>>0}}</p>
            </div>
            <i class='earn-integral' @click='toggleModal()'>
                赚取积分?
            </i>
        </header>
        <v-block-text text='积分明细' type='bg-white'></v-block-text>
        <ul class='record-list'>
            <li v-for='item in integral_list'>
                <div class='pull-left'>
                    <h4>{{item.name}}</h4>
                    <h6 class='text-gray'>
                        {{item.create_time}}
                    </h6>
                </div>
                <span class='pull-right'>{{item.point|pointFormat}} </span>
            </li>
            <v-support v-if='support_show'></v-support>
        </ul>
        <v-modal :toggle-modal='toggleModal' :show='modal'>
            <div class='modal-content'>
                <header>
                    <p>您可以通过以下途径赚取积分：</p>
                    <p>1.点击右上角的'...'</p>
                    <p>2.选择 <i class=' icon-share iconfont text-normal '></i> 或 <i class=' icon-timeline iconfont text-normal '></i>                        即可
                    </p>
                    <img src='../assets/images/share.png'>
                </header>
                <footer>
                    <button class='btn btn-red btn-large' @click='toggleModal()'>知道了</button>
                </footer>
            </div>
        </v-modal>
    </div>
</template>
<script>
    export default {
        name: 'my_integral',
        data() {
            return {
                modal: false,
                integral_param: '',
                integral_list: '',
                support_show: false
            }
        },
        filters: {
            pointFormat(point) {
                point = point >> 0;
                return point>0?'+'+point:point;
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        activated() {
            this.getIntegralList().then(() => {
                this.support_show = true;
            });
        },
        methods: {
            toggleModal() {
                this.modal = !this.modal;
            },
            //——获取积分明细列表
            getIntegralList() {
                return new Promise((resolve) => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        this.integral_list = response.data.data;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');

                    })

                })
            }
        }
    };
</script>