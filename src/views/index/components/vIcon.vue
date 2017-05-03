<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .icon-list {
        position: relative;
        display: flex;
        list-style: none; 
        margin-bottom: pxTorem(14);
        border-bottom: 1px solid #d3d4d6;
        color: #666;
        font-size: pxTorem(24); 
        li {
            @include active;
            @include flex-center;
            list-style: none;
            flex-direction: column;
            width: 25%;
            height: pxTorem(190);
            overflow: hidden;
            position: relative;
            text-align: center;
            background-color: $white;
            .v-badage {
                @include flex-center;
                width: pxTorem(50);
                height: pxTorem(50);
                position: absolute;
                right: pxTorem(45);
                top: pxTorem(0);
                background-color: $white;
                color: $red;
                border-radius: 50%;
                border: 2px solid $red;
                box-sizing: content-box;
                z-index: 1;
                transform: scale(0.5);
            }
        }
        p {
            width: 100%;
            height: pxTorem(30);
            overflow: hidden;
        }
        .icon {
            width: pxTorem(95);
            height: pxTorem(95);
            margin-bottom: pxTorem(15);
        }
        &.guide-account {
            li:nth-child(1) {
                z-index: 2;
            }
        }
        &.guide-integral {
            li:nth-child(2) {
                z-index: 2;
            }
        }
    }

    .guide {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        span {
            position: absolute;
            font-size: pxTorem(30);
            color: $white;
        }
        h1 {
            position: absolute;
            color: $white;
        }

        .square-cover {
            width: pxTorem(187.5);
            height: pxTorem(190); // background-color: $white;
        }
        .btn {
            @include flex-center;
            position: absolute;
            width: pxTorem(186);
            height: pxTorem(64);
            font-size: pxTorem(30);
            color: $white;
            background-color: #000;
            border: 1px solid $white;
            border-radius: pxTorem(32);
            &:active {
                background-color: #222;
            }
        }
    }

    .guide.account {
        h1 {
            left: pxTorem(260);
            top: pxTorem(-250);
        }
        span {
            right: pxTorem(10);
            top: pxTorem(-320);
        }
        .btn {
            left: pxTorem(313);
            top: pxTorem(358);
        }
        .dotted-1 {
            position: absolute;
            left: pxTorem(60);
            top: pxTorem(-200);
            width: pxTorem(189);
            height: pxTorem(196);
        }
        .dotted-2 {
            position: absolute;
            left: pxTorem(210);
            top: pxTorem(90);
            width: pxTorem(200);
            height: pxTorem(250);
            transform: rotateY(180deg);
        }
    }

    .guide.integral {
        h1 {
            left: pxTorem(150);
            top: pxTorem(-260);
        }
        span {
            right: pxTorem(10);
            top: pxTorem(-320);
        }
        .btn {
            left: pxTorem(290);
            top: pxTorem(358);
        }
        .dotted-1 {
            position: absolute;
            left: pxTorem(240);
            top: pxTorem(-160);
            width: pxTorem(86);
            height: pxTorem(163);
        }
        .dotted-2 {
            position: absolute;
            left: pxTorem(300);
            top: pxTorem(190);
            width: pxTorem(86);
            height: pxTorem(163);
            transform: rotateY(180deg);
        }
    }
</style>
<template>
    <ul :class='["icon-list",guide]'>
        <li v-for='item in layout.items' @click='routerLink(item,layout)'>
            <img class='icon' :src='item.pic_thumb_new'>
            <p>{{item.title}}</p>
        </li>
        <div v-if='guide==="guide-account"' class='guide account'>
            <div class='square-cover'></div>
            <h1>
                在这里查看您的个人信息<br>和积分获得消耗情况
            </h1>
            <img class='dotted-1' src='./images/dotted_1.png'>
            <img class='dotted-2' src='./images/dotted_1.png'>
            <span @click='jump()'>跳过</span>
            <div class='btn' @click='jump("guide-integral")'>朕知道了</div>
        </div>
        <div v-if='guide==="guide-integral"' class='guide integral'>
            <div class='square-cover'></div>
            <h1>
                在这里赚取积分，用来兑换<br>心仪商品、参与新颖活动
            </h1>
            <img class='dotted-1' src='./images/dotted_2.png'>
            <img class='dotted-2' src='./images/dotted_2.png'>
            <span @click='jump()'>跳过</span>
            <div class='btn' @click='jump()'>朕知道了</div>
        </div>

    </ul>
</template>
<script>
    export default {
        name: 'vIcon',
        props: {
            layout: Object,
            routerLink: Function,
            guide: String
        },
        methods: {
            jump(str = '') {
                this.$emit('update:guide', str);
            }
        }
    };
</script>