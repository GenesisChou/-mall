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
        li.red-dot {
            position: relative;
            &:after {
                content: '';
                position: absolute;
                right: 25%;
                top: 15%;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #ff0000;
            }
        }

        p {
            width: 100%;
            height: pxTorem(30);
            overflow: hidden;
        }
        .icon {
            position: relative;
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
            position: relative;
            width: pxTorem(187.5);
            height: pxTorem(190);
            &:after {
                content: '';
                position: absolute;
                right: pxTorem(-20);
                top: pxTorem(-25);
                width: pxTorem(23);
                height: pxTorem(29);
                background: url('./images/border.png');
                background-size: 100% 100%;
                transform: rotateY(180deg);
            }
            &:before {
                content: '';
                position: absolute;
                right: pxTorem(-20);
                bottom: pxTorem(-25);
                width: pxTorem(23);
                height: pxTorem(29);
                background: url('./images/border.png');
                background-size: 100% 100%;
                transform: rotate(180deg);
            }
        }
        .button {
            position: absolute;
            width: pxTorem(173);
            height: pxTorem(63);
            background: url('./images/button.png');
            background-size: 100% 100%;
        }
    }

    .guide.account {
        h1 {
            left: pxTorem(220);
            top: pxTorem(-170);
            line-height: pxTorem(48);
            font-weight: 500;
        }
        span {
            right: pxTorem(10);
            top: pxTorem(-320);
            font-weight: 500;
        }
        .button {
            left: pxTorem(120);
            top: pxTorem(370);
        }
        .arrows-left {
            position: absolute;
            left: pxTorem(110);
            top: pxTorem(-130);
            width: pxTorem(80);
            height: pxTorem(119);
        }
        .arrows-right {
            position: absolute;
            left: pxTorem(70);
            top: pxTorem(220);
            width: pxTorem(122);
            height: pxTorem(124);
        }
    }

    .guide.integral {
        h1 {
            left: pxTorem(30);
            top: pxTorem(-186);
            line-height: pxTorem(48);
            font-weight: 500;
        }
        span {
            right: pxTorem(10);
            top: pxTorem(-320);
            font-weight: 500;
        }
        .button {
            left: pxTorem(320);
            top: pxTorem(358);
        }
        .arrows-right-small {
            position: absolute;
            left: pxTorem(240);
            top: pxTorem(-92);
            width: pxTorem(70);
            height: pxTorem(82);
        }
        .arrows-right {
            position: absolute;
            left: pxTorem(300);
            top: pxTorem(220);
            width: pxTorem(96);
            height: pxTorem(117);
        }
        .square-cover {
            left: 25%;
        }
        .space {
            position: relative;
            width: 100%;
            height: 100%;
            &:after {
                content: '';
                position: absolute;
                left: pxTorem(-20);
                top: pxTorem(-25);
                width: pxTorem(23);
                height: pxTorem(29);
                background: url('./images/border.png');
                background-size: 100% 100%;
            }
            &:before {
                content: '';
                position: absolute;
                left: pxTorem(-20);
                bottom: pxTorem(-25);
                width: pxTorem(23);
                height: pxTorem(29);
                background: url('./images/border.png');
                background-size: 100% 100%;
                transform: rotateX(180deg);
            }
        }
    }
</style>
<template>
    <ul :class='["icon-list",guide_state]'>
        <li :class='{"red-dot":user.unfinished_order_count>0&&item.is_inner_url === 1&&item.url==="order_list"}' v-for='item in layout.items'
            @click='routerLink(item,layout)'>
            <img class='icon' :src='item.pic_thumb_new'>
            <p>{{item.title}}</p>
        </li>
        <div v-if='guide_state==="guide-account"' class='guide account'>
            <div class='square-cover'></div>
            <h1>
                在这里查看您的个人信息<br>和积分获得消耗情况
            </h1>
            <img class='arrows-left' src='./images/arrowsLeft.png'>
            <img class='arrows-right' src='./images/arrowsRightLarge.png'>
            <span @click='jump()'>跳过</span>
            <div class='button' @click='jump("guide-integral")'></div>
        </div>
        <div v-if='guide_state==="guide-integral"' class='guide integral'>
            <div class='square-cover'>
                <div class='space'></div>
            </div>
            <h1>
                在这里赚取积分，用来兑换<br>心仪商品、参与新颖活动
            </h1>
            <img class='arrows-right-small' src='./images/arrowsRightSmall.png'>
            <img class='arrows-right' src='./images/arrowsRight.png'>
            <span @click='jump()'>跳过</span>
            <div class='button' @click='jump()'></div>
        </div>

    </ul>
</template>
<script>
    export default {
        name: 'vIcon',
        props: {
            layout: Object,
            routerLink: Function,
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            guide_state() {
                return this.$store.state.index.guide_state;
            }
        },
        methods: {
            jump(str = '') {
                this.$store.dispatch('updateGuideState', str);
            }
        }
    };
</script>