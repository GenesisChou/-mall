<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
    .v-integral-box {
        li {
            display:flex;
            align-items:center;
            justify-content:center;
            display:-webkit-flex;
            -webkit-align-items:center;
            -webkit-justify-content:center;
            width: pxTorem(44);
            height: pxTorem(54);
            margin-left: pxTorem(10);
            color: $white;
            font-size: pxTorem(34);
            border-radius: pxTorem(10);
            border: pxTorem(2) solid #fed30b;
        }
        li.black {
            background-color: #000;
        }
        li.red {
            background-color: #860000;
        }
        li.white {
            background-color: #fff9d5;
            border: pxTorem(2) solid #6b3906;
            color: #e65413;
        }
    }
</style>
<template>
    <ul class='v-integral-box list-inline'>
        <li :class='color'>{{hundred}}</li>
        <li :class='color'>{{ten}}</li>
        <li :class='color'>{{one}}</li>
    </ul>
</template>
<script>
    export default {
        props: {
            integral: Number,
            color: String
        },
        computed: {
            one() {
                return this.integral % 10;
            },
            ten() {
                return this.integral / 100 % 10 >> 0
            },
            hundred() {
                return this.integral / 100 >> 0;
            }
        }
    }
</script>