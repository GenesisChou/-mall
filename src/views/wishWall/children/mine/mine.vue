<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .slide {
        height: pxTorem(200);
    }

    .tab-content {
        padding: pxTorem(26) pxTorem(24) pxTorem(100) pxTorem(24);
        background: $white;
    }

    .tabs {
        display: flex;
        border-bottom: 1px solid #d3d4d6;
        li {
            position: relative;
            flex: 1;
            height: pxTorem(80);
            line-height: pxTorem(80);
            font-size: pxTorem(30);
            color: #bababa;
            text-align: center;
            list-style: none;
            &.active {
                color: #ff5000;
            }
        }
        li:nth-child(2){
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: 1px;
                height: pxTorem(48);
                margin-top: pxTorem(-24);
                background: #f2f3f4;
            }
        }
    }
</style>
<template>
    <div class='mine'>
        <div class='slide'></div>
        <ul class='tabs'>
            <li class='active'>克支持心愿</li>
            <li>已支持心愿</li>
        </ul>
        <div class='tab-content'>
            <v-wish>
            </v-wish>
            <v-wish></v-wish>
            <v-wish></v-wish>
            <v-wish></v-wish>
        </div>
        <v-menu></v-menu>
    </div>
</template>
<script>
    import vMenu from 'components/vMenu';
    import vWish from '../../components/vWish';
    export default {
        name: 'mine',
        components: {
            vMenu,
            vWish
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {}
    };
</script>