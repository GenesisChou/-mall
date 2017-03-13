<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .header {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: center;
        -webkit-justify-content: center;
        width: 100%;
        height: pxTorem(398);
        background-color: $white;
        background-image: url('./images/myAccountBackground.png');
        background-repeat: no-repeat;
        background-size: 100%;
        color: $white;
        text-align: center;
        .avater {
            background-color: #f4f4f4;
            border-radius: 50%;
            width: pxTorem(134);
            height: pxTorem(134);
            margin-bottom: pxTorem(10);
            overflow: hidden;
            border: pxTorem(6) solid #f4f4f4;
        }
        .edit-user {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: center;
            -webkit-justify-content: center;
            width: pxTorem(217);
            height: pxTorem(66);
            margin-top: pxTorem(20);
            color: $white;
            background-color: rgba(255, 255, 255, .35);
            border-radius: pxTorem(33);
            border: 1px solid $white;
        }
    }
    
    .block-text {
        line-height: pxTorem(88);
        text-align: center;
        background-color: $white;
        color: $orange;
        border-bottom: 1px solid #d4d4d6;
    }
    
    .record-list {
        position: absolute;
        top: pxTorem(508);
        left: 0;
        right: 0;
        bottom: pxTorem(110);
        z-index: 1;
        padding: 0 pxTorem(30);
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        background-color: $white;
        border-bottom: 1px solid #d4d4d6;
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            display: flex;
            display: -webkit-flex;
            align-items: center;
            -webkit-align-items: center;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            height: pxTorem(100);
            list-style: none;
        }
        h3 {
            color: #646565;
        }
        h6 {
            color: #a9aaae;
        }
        span {
            font-size: pxTorem(30);
            color: #646565;
        }
    }
</style>
<template>
    <div class='my-account '>
        <header class='header'>
            <div class='avater'>
                <img class='img-responsive' :src='user.headimg'>
            </div>
            <p>{{user.nickname}}</p>
            <p>积分: {{user.integral>>0}}</p>
            <router-link :to='{name:"edit_user"}' tag='div'>
                <a v-if='user.is_submit!= 1' class='edit-user'>完善资料赚积分</a>
                <a v-else class='edit-user'>修改资料</a>
            </router-link>
        </header>
        <h4 class='block-text'>
            积分明细
        </h4>
        <main>
            <ul class='record-list' ref='list'>
                <li v-for='item in integral_list'>
                    <div class='pull-left'>
                        <h3>{{item.name}}</h3>
                        <h6> {{item.create_time}} </h6>
                    </div>
                    <span class='pull-right'>{{item.point|pointFormat}} </span>
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    export default {
        name: 'myAccount',
        data() {
            return {
                // modal: false,
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
            // toggleModal() {
            //     this.modal = !this.modal;
            // },
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