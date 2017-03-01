<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .header {
        position: relative;
        height: pxTorem(288);
        background-image: url('./images/myAccountBackground.png');
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
        .edit-user {
            padding: 0 pxTorem(20);
            color: $white;
            background-color: $red;
            border-radius: pxTorem(10);
        }
    }
    
    .block-text {
        height: pxTorem(100);
        line-height: pxTorem(100);
        text-align: center;
        background-color: $white;
    }
    
    .record-list {
        position: absolute;
        top: pxTorem(388);
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
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
        h6 {
            color: $gray;
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
            height: pxTorem(80);
            line-height: pxTorem(80);
            width: pxTorem(300);
        }
        img {
            width: pxTorem(410);
            height: pxTorem(157);
        }
        .iconfont {
            font-size: pxTorem(26);
        }
    }
</style>
<template>
    <div class='my-account '>
        <header class='header'>
            <div class='avater'>
                <img :src='user.headimg'>
            </div>
            <div class='message'>
                <p>{{user.nickname}}</p>
                <p>积分: {{user.integral>>0}}</p>
                <router-link :to='{name:"edit_user"}'  tag='div'>
                    <a v-if='user.is_submit!= 1' class='edit-user'>完善资料赚积分</a>
                    <a v-else class='edit-user'>修改资料</a>
                </router-link>
            </div>
            <i class='earn-integral' @click='toggleModal()'>
                赚取积分?
            </i>
        </header>
        <h4 class='block-text'>
            积分明细
        </h4>
        <ul class='record-list' ref='list'>
            <li v-for='item in integral_list'>
                <div class='pull-left'>
                    <h4>{{item.name}}</h4>
                    <h6>
                        {{item.create_time}}
                    </h6>
                </div>
                <span class='pull-right'>{{item.point|pointFormat}} </span>
            </li>
        </ul>
        <v-modal v-model='modal'>
            <div class='modal-content'>
                <header>
                    您可以通过以下途径赚取积分：<br> 1.点击右上角的'...' <br> 2.选择 <i class=' icon-share iconfont '></i> 或 <i class=' icon-timeline iconfont '></i>                    即可
                    <img src='./images/share.png'>
                </header>
                <footer>
                    <button class='btn btn-red' @click='toggleModal()'>知道了</button>
                </footer>
            </div>
        </v-modal>
    </div>
</template>
<script>
    export default {
        name: 'myAccount',
        data() {
            return {
                modal: false,
                params: {
                    p: 1,
                    r: APP.PERPAGE,
                    total: 0,
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id: APP.MEDIA_ID,
                },
                integral_list: [],
            }
        },
        filters: {
            pointFormat(point) {
                point = point >> 0;
                return point > 0 ? '+' + point : point;
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        mounted() {
            this.getIntegralList();
            let list = this.$refs.list,
                scroll = true;
            list.addEventListener('scroll', utils.debounce(() => {
                if (scroll &&
                    this.params.p < this.params.total &&
                    list.clientHeight + list.scrollTop >= list.scrollHeight - 100) {
                    scroll = false;
                    this.params.p++;
                    this.getIntegralList().then(() => {
                        scroll = true;
                    })
                }
            }, 500, 500))
        },
        methods: {
            toggleModal() {
                this.modal = !this.modal;
            },
            //——获取积分明细列表
            getIntegralList() {
                return new Promise((resolve) => {
                    this.$http.post(`${APP.HOST}/integral_list/${APP.USER_ID}`, this.params).then((response) => {
                        let data = response.data;
                        this.integral_list = this.integral_list.concat(data.data.list);
                        this.params.total = data.data.total;
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {

                    })

                })
            }
        }
    };
</script>