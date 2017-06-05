<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-dialog .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 5;
    }
</style>
<template>
    <div class='v-dialog'>
        <div v-show='show' class='bg-cover'></div>
        <component :is='style' v-if='type==="success"' :close='close' :func='func' :dialog='dialog' :show='show'>
        </component>
        <faliure v-else :close='close' :func='func' :dialog='dialog' :show='show'>
        </faliure>
    </div>
</template>
<script>
    import faliure from './components/faliure';
    export default {
        name: 'vDialog',
        components: {
            common: require('./components/common'),
            dice: require('./components/dice'),
            reel: require('./components/reel'),
            money: require('./components/money'),
            soccer: require('./components/soccer'),
            eliminate: require('./components/eliminate'),
            stick: require('./components/stick'),
            mario: require('./components/mario'),
            gold: require('./components/gold'),
            cat: require('./components/cat'),
            twins: require('./components/twins'),
            cake: require('./components/cake'),
            pakour: require('./components/pakour'),
            faliure
        },
        props: {
            dialog: {
                type: Object,
                default () {
                    return {};
                }
            },
            toggleDialog: Function,
            show: Boolean,
        },
        watch: {
            show(value) {
                utils.toggleTouchMove(value);
            }
        },
        computed: {
            type() {
                return this.dialog.type || 'faliure';
            },
            style() {
                return this.dialog.style || 'common';
            },
            callback() {
                return this.dialog.callback;
            },
            callback_close() {
                return this.dialog.callback_close;
            },
        },
        methods: {
            func() {
                if (this.callback) {
                    this.callback();
                }
                this.toggleDialog();
            },
            close() {
                if (this.callback_close) {
                    this.callback_close();
                } else if (this.type === 'faliure' && this.callback) {
                    this.callback();
                }
                this.toggleDialog();
            }
        }
    };
</script>