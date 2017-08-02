<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .user {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
    }

    .header {
        display: flex;
        align-items: center;
        height: pxTorem(154);
        background: $white;
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: pxTorem(30);
        .avater {
            border-radius: 50%;
            width: pxTorem(116);
            height: pxTorem(116);
            margin: 0 pxTorem(44);
            overflow: hidden;
            border: pxTorem(6) solid #e58054;
        }
        .message {
            flex: 1;
        }
        span {
            font-size: pxTorem(20);
            color: #656565;
        }
        b {
            padding-left: pxTorem(15);
            font-size: pxTorem(26);
            font-weight: normal;
            color: #ff5000;
        }
    }
</style>
<template>
    <div class='user'>
        <header class='header'>
            <div class='avater'>
                <img class='img-responsive' :src='user.headimg'>
            </div>
            <div class='message'>
                <h4><strong>{{user.nickname}}</strong></h4>
                <span>积分:</span><b>{{user.integral>>0}}</b>
            </div>
        </header>
        <v-group>
            <v-cell icon='check' :callback='getRouter("earn_integral")'>每日签到</v-cell>
            <v-cell icon='earn-integral' :callback='getRouter("earn_integral")'>做任务 赚积分</v-cell>
        </v-group>
        <v-group>
            <v-cell icon='records' :callback='getRouter("order_list")'>兑换记录</v-cell>
            <v-cell icon='integral-list' :callback='getRouter("my_account")'>积分明细</v-cell>
        </v-group>
        <v-group>
            <v-cell icon='edit-user' :callback='getRouter("edit_user")'>修改资料</v-cell>
        </v-group>
        <v-group>
            <v-cell icon='wish-wall' :callback='getRouter("my_wish")'>我的心愿</v-cell>
        </v-group>
        <v-menu></v-menu>
    </div>
</template>
<script>
    import vMenu from 'components/vMenu';
    import vGroup from './components/vGroup.vue';
    import vCell from './components/vCell';
    export default {
        name: 'user',
        components: {
            vGroup,
            vCell,
            vMenu
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            getRouter(route) {
                return () => {
                    this.routerLink(route);
                };
            },
            routerLink(route = 'index') {
                this.$router.push({
                    name: route,
                });
            }
        }
    };
</script>