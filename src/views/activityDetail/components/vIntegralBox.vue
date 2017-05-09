<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-integral-box {
        @include list-inline;
        li {
            @include flex-center;
            width: pxTorem(44);
            height: pxTorem(54);
            margin-left: pxTorem(5);
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
            background-color: $white;
            border: pxTorem(2) solid #6a1333;
            color: #e65413;
        }
        li.pink {
            background-color: #f33748;
            border: none;
        }
        li.blue {
            background-color: #89deee;
            border: none;
        }
        li.linen {
            background-color: #ffe594;
            color: #e63805;
            border: none;
        }
        li.yellow{
            background-color:#fecb35;
            border:1px solid #ffb119;
        }
        li.shit{
            background-color:#9e6f01;
            border:1px solid #cb9e06;
        }
        li.orange{
            color:$white;
            background-color:#ff5004;
            border:1px solid #481110;
        }
    }
</style>
<template>
    <ul class='v-integral-box'>
        <li v-if='million' :class='color'>{{million}}</li>
        <li v-if='thousand' :class='color'>{{thousand}}</li>
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
                return this.integral % 100 / 10 >> 0;
            },
            hundred() {
                return this.integral % 1000 / 100 >> 0;
            },
            thousand() {
                return this.integral % 10000 / 1000 >> 0;
            },
            million() {
                return this.integral % 100000 / 10000 >> 0;
            }
        }
    };
</script>