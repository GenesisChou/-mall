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
            font-size: pxTorem(32);
            color: #646565;
        }
        input {
            flex: 1;
            height: 100%;
            color: #646565;
            background: none;
            border: 0;
            font-size: pxTorem(28);
        }
        textarea {
            flex: 1;
            font-size: pxTorem(28);
            border: 0;
            color: #646565;
            text-align: justify;
        }
        .iconfont {
            display: none;
            text-align: center;
            width: pxTorem(60);
            font-size: pxTorem(36);
            color: #bababa;
            &.active {
                display: block;
            }
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
    .success{
        flex:1;
        background:$white;
        padding-top:pxTorem(180);
        img{
            display: block;
            width:pxTorem(201);
            height:pxTorem(201);
            margin:0 auto;
        }
        h1{
            margin:pxTorem(62) 0;
            font-size: pxTorem(42);
            color:#ff5f17;
            text-align: center;
        }
        h4{
            color:#a9aaae;
            padding:0 pxTorem(80);
            margin-bottom:pxTorem(220);
        }
        .btn{
            height: pxTorem(90);
            line-height: pxTorem(90);
            text-align: center;
            margin: 0 pxTorem(24);
            background:#ff5f17;
        }
    }
</style>
<template>
    <div class='publish'>
        <template v-if='true'>
            <div class='edit-user-content'>
                <ul class='main'>
                    <li>
                        <label for='name'>我的心愿名称</label>
                        <input id='name' placeholder='例如：希望得到万达优惠券'>
                        <i class='iconfont icon-close-circle'></i>
                    </li>
                    <li>
                        <label for='wish'>希望得到优惠券</label>
                        <input id='wish' placeholder="满减券">
                    </li>
                    <li>
                        <label for='detail'>心愿描述</label>
                        <textarea id='detail' placeholder="例如：满200减20优惠券，可以叠加 使用四啊计生局时候读熟地黄计算机 是与偶升级到几点几十点"> </textarea>
                    </li>
                </ul>
                <div class='operation'>
                    <button v-if='true' class='btn btn-orange '>确认</button>
                    <button v-else class='btn btn-gray' disabled='disabled'>确认</button>
                </div>
            </div>
            <v-support></v-support>
        </template>
        <div v-else class='success'>
            <img src="./images/success.png">
            <h1>提交成功</h1>
            <h4>您的心愿，将会进入我们的审核阶段，审核完成 后您可在福利心愿墙内查看，请及时关注，并邀 请您的好友支持哦！ </h4>
            <div class='btn btn-orange'>确认</div>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'publish',
        components: {},
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {}
    };
</script>