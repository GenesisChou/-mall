<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-wish {
        position: relative;
        width: pxTorem(703);
        margin-bottom: pxTorem(23);
        background: $white;
        border-radius: pxTorem(20);
        box-shadow: 0 0 pxTorem(20) rgba(0, 0, 0, .1);
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 100%;
        height: pxTorem(215); // padding: pxTorem(27) 0;
    }

    .avater {
        width: pxTorem(120);
        height: pxTorem(120);
        margin-left: pxTorem(20);
        margin-right: pxTorem(16);
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .message {
        width: pxTorem(200);
        height: 100%;
        padding-top: pxTorem(96);
        .title {
            left: pxTorem(160);
            top: pxTorem(56);
            position: absolute;
            strong {
                float: left;
                position: relative;
                font-size: pxTorem(31);
                line-height: pxTorem(40);
                margin-right: pxTorem(10);
                max-width: pxTorem(160);
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .date {
                float: left;
                font-size: pxTorem(21);
                font-weight: normal; // width: 100%;
                line-height: pxTorem(40);
                color: rgba(0, 0, 0, .48);
            }
        }
        p {
            width: pxTorem(200);
            height: pxTorem(72);
            padding-right: pxTorem(10);
            font-size: pxTorem(22);
            color: #a9aaae;
            overflow: hidden;
        }
    }

    .right {
        width: pxTorem(324);
        margin-right: pxTorem(20);
        h5 {
            text-align: center;
        }
        .number {
            font-size: pxTorem(45);
            color: #ff5f17;
            margin-right: pxTorem(12);
            &.blue {
                color: #00a1e0;
            }
        }
        .button {
            @include active($white, 3%);
            display: flex;
            justify-content: center;
            align-items: center;
            width: pxTorem(152);
            height: pxTorem(46);
            font-size: pxTorem(20);
            border-radius: pxTorem(10);
            color: #ff7f45;
            background: $white;
            border: 1px solid #ff7f45;
        }
        .button-group {
            display: flex;
            .button:last-child {
                margin-left: pxTorem(20);
            }
        }
    }
</style>
<template>
    <div class='v-wish'>
        <div class='main'>
            <div class='avater'>
                <img :src='wish.headimg'>
            </div>
            <div class='message'>
                <div class='title'>
                    <strong>{{wish.nickname}} </strong><span class='date'>{{wish.create_time|date_format}}</span>
                </div>
                <p>{{wish.name}}{{wish.type|getType}}{{wish.desc}}</p>
            </div>
            <div class='right'>
                <h5>
                    已经有
                </h5>
                <h5>
                    <span :class='["number",{blue:type===2}]'>{{wish.score}}</span>人支持
                </h5>
                <div v-if='type===1' class='button-group'>
                    <div class='button' v-if='wish.is_support===2' @click='support'>支持Ta心愿</div>
                    <div class='button' v-else>已支持</div>
                    <router-link :to='{name:"wish_detail",query:{wish_id:wish.id}}' tag='div' class='button'>
                        邀请好友支持
                    </router-link>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'vWish',
        props: {
            wish: Object,
            type: {
                type: Number,
                default: 1
            },
            callback: Function
        },
        filters: {
            date_format(value) {
                const temp = value.split(' ')[0].split('-');
                let month = temp[1],
                    day = temp[2];
                month = temp[1] >= 10 ? temp[1] : Math.floor(temp[1]);
                day = temp[2] >= 10 ? temp[2] : Math.floor(temp[2]);
                return `${month}月${day}日`;
            },
            getType(value) {
                const types = ['满减券', '代金券', '礼品券', '折扣券', '体验券'];
                return types[value - 1];
            },
        },
        methods: {
            support() {
                this.$store.dispatch('toggleLoading');
                this.$http.post(`${APP.HOST}/wish_support/${this.wish.id}`, {
                    token: APP.TOKEN,
                    media_id: APP.MEDIA_ID,
                    user_id: APP.USER_ID,
                    open_id: APP.OPEN_ID,
                }).then((response) => {
                    this.$store.dispatch('toggleLoading');
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        if (this.callback && typeof this.callback === 'function') {
                            this.callback(this.wish);
                        }
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        });
                    }
                });
            }
        }
    };
</script>