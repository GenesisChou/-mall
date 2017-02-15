<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-list-item {
        display: table;
        width: 100%;
        height: pxTorem(220);
        border-bottom: 1px solid $gray-light;
        background-color: $white;
        .img {
            display: table-cell;
            width: pxTorem(280);
            vertical-align: middle;
            text-align: center;
            img {
                width: pxTorem(180);
                height: pxTorem(140);
            }
        }
        .describe {
            display: table-cell;
            vertical-align: middle;
            h1 {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-bottom: pxTorem(7);
            }
            h5.gray {
                color: $gray;
            }
            h5.red {
                color: $red;
            }
        }
    }
    
    .v-list-item.active:active {
        background-color: darken($white, 5%);
    }
</style>
<template>
    <div :class='["v-list-item",{active:active}]'>
        <div class='img'>
            <img :src='img' />
        </div>
        <div class='describe'>
            <h1>{{title}}</h1>
            <h5 :class='color'>{{titleDupty}}</h5>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'vListItem',
        /*
            @title:主标题
            @titleDuty:副标题
            @color:副标题颜色
            @img:图片链接
            @active:点击时是否变色
        */
        props: {
            title: String,
            titleDupty: String,
            color: {
                type: String,
                default: 'gray'
            },
            img: String,
            active: {
                type: Boolean,
                default: true
            }
        },
    };
</script>