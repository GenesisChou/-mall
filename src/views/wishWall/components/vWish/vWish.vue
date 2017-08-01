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
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .message {
        // margin: 0 pxTorem(20);
        strong {
            position: relative;
            font-size: pxTorem(31);
        }
        .date {
            position: absolute;
            left:110%;
            top:22%;
            font-size: pxTorem(22);
            font-weight: normal;
            width: 100%;
        }
        p {
            width: pxTorem(200);
            max-height: pxTorem(108);
            overflow: hidden;
            font-size: pxTorem(22);
            color: #a9aaae;
        }
    }

    .right {
        margin-right: pxTorem(20);
        h5 {
            text-align: center;
        }
        .number {
            font-size: pxTorem(45);
            color: #ff5f17;
            margin-right: pxTorem(12);
        }
        .button {
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
                <strong>{{wish.nickname}} <span class='date'>{{wish.create_time|date_format}}</span></strong>
                <p>{{wish.desc}}</p>
            </div>
            <div class='right'>
                <h5>
                    已经有
                </h5>
                <h5>
                    <span class='number'>{{wish.score}}</span>人支持
                </h5>
                <div class='button-group'>
                    <div class='button '>支持Ta心愿</div>
                    <div class='button '>邀请好友支持</div>
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
            wish: Object
        },
        filters: {
            date_format(value) {
                const date = new Date(value);
                return `${date.getMonth()}月${date.getDate()}日`;
            }
        }
    };
</script>