<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .publish {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        background-color: #f2f3f4;
    }

    .edit-user-content {
        flex: 1;
        padding-top: pxTorem(30);
    }

    .main {
        flex: 1;
        padding: 0 pxTorem(30);
        list-style: none;
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        li {
            @include flex-center-v;
            height: pxTorem(95);
            overflow: hidden;
            border-bottom: 1px solid $gray-light;
            &:last-child {
                align-items: flex-start;
                padding-top: pxTorem(22.5);
                height: pxTorem(150);
                border-bottom: none;
            }
        }
        label {
            width: pxTorem(240);
            font-size: pxTorem(28);
            // background:red;
            color: #646565;
        }
        input {
            flex: 1;
            height: 100%;
            padding:0;
            color: #646565;
            background: none;
            border: 0;
            font-size: pxTorem(28);
        }
        textarea {
            flex: 1;
            padding:0;
            font-size: pxTorem(28);
            border: 0;
            color: #646565;
            text-align: justify;
        }
    }

    .operation {
        @include flex-center;
        height: pxTorem(120);
        padding: 0 pxTorem(30);
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        .btn {
            width: 100%;
            height: pxTorem(72);
        }
    }


    .select {
        line-height: pxTorem(95);
        span {
            color: #646565;
            font-size: pxTorem(28);
        }
        .icon-arrows-down {
            margin-left: pxTorem(6);
            font-size: pxTorem(36);
            font-size: pxTorem(24);
            font-weight: bold;
            color: $sliver;
        }
        .placeholder {
            color: #a9aaae;
        }
    }

    .success {
        flex: 1;
        background: $white;
        padding-top: pxTorem(180);
        img {
            display: block;
            width: pxTorem(201);
            height: pxTorem(201);
            margin: 0 auto;
        }
        h1 {
            margin: pxTorem(62) 0;
            font-size: pxTorem(42);
            color: #ff5f17;
            text-align: center;
        }
        h4 {
            color: #a9aaae;
            padding: 0 pxTorem(80);
            margin-bottom: pxTorem(220);
        }
        .btn {
            height: pxTorem(90);
            line-height: pxTorem(90);
            text-align: center;
            margin: 0 pxTorem(24);
            background: #ff5f17;
        }
    }
</style>
<template>
    <div class='publish'>
        <template v-if='!publish_status'>
            <div class='edit-user-content'>
                <ul class='main'>
                    <li>
                        <label for='name'>我的心愿名称</label>
                        <input id='name' placeholder='例如：希望得到万达优惠券' v-model='name'>
                    </li>
                    <li>
                        <label for='wish'>希望得到优惠券</label>
                        <div class='select' @click='toggleDialog'>
                            <span class='placeholder' v-if='!type'>
                            请选择优惠券类型
                            </span>
                            <span v-else>{{ticket_name}}</span>
                            <i class=' iconfont icon-arrows-down'></i>
                        </div>
                    </li>
                    <li>
                        <label for='detail'>心愿描述</label>
                        <textarea id='detail' placeholder="例如：满200减20优惠券，可以叠加" v-model='desc'> </textarea>
                    </li>
                </ul>
                <div class='operation'>
                    <button v-if='name&&type&&desc' class='btn btn-orange' @click='publish'>确认</button>
                    <button v-else class='btn btn-gray' disabled='disabled'>确认</button>
                </div>
            </div>
            <v-list-choose :show='dialog_show' :list='options' :callback='changeType' :toggle-modal='toggleDialog' :is-active='isActive'></v-list-choose>
            <v-support></v-support>
        </template>
        <div v-else class='success'>
            <img src="./images/success.png">
            <h1>提交成功</h1>
            <h4>您的心愿，将会进入我们的审核阶段，审核完成 后您可在福利心愿墙内查看，请及时关注，并邀 请您的好友支持哦！ </h4>
            <div class='btn btn-orange' @click='leave'>确认</div>
        </div>
    </div>
</template>
<script>
    import vListChoose from './components/vListChoose.vue';
    export default {
        name: 'publishWish',
        components: {
            vListChoose
        },
        data() {
            return {
                name: '',
                type: '',
                desc: '',
                publish_status: false,
                dialog_show: false,
                options: [{
                        type: 1,
                        name: '满减券'
                    },
                    {
                        type: 2,
                        name: '代金券'
                    },
                    {
                        type: 3,
                        name: '礼品券'
                    },
                    {
                        type: 4,
                        name: '折扣券'
                    },
                    {
                        type: 5,
                        name: '体验券'
                    },
                ]
            };
        },
        computed: {
            ticket_name() {
                if (this.type) {
                    return this.options[this.type - 1].name;
                }
                return '';
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$store.dispatch('updatePageView');
            next();
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.name = '';
                this.type = '';
                this.desc = '';
                this.publish_status = false;
            },
            leave() {
                this.$router.go(-1);
                // this.$router.replace({
                //     name: 'wish_wall',
                //     query: {
                //         t: new Date()
                //     }
                // });
            },
            publish() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/submit_wish`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                    name: this.name,
                    type: this.type,
                    desc: this.desc
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.publish_status = true;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    }
                });
            },
            changeType(item) {
                this.type = item.type;
            },
            toggleDialog() {
                this.dialog_show = !this.dialog_show;
            },
            isActive(item) {
                return this.type === item.type;
            }
        }
    };
</script>