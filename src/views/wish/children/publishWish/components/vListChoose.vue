<style lang='scss' scoped>
    @import '../../../../../assets/scss/variable.scss';
    .v-list-choose {
        background-color: $white;
        max-height: pxTorem(600);
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        border-radius: pxTorem(10);
        &::-webkit-scrollbar {
            display: none;
        }
        li {
            @include flex-center-v;
            @include active($white, 5%);
            width: pxTorem(400);
            height: pxTorem(70);
            list-style: none;
            overflow: hidden;
            border-bottom: 1px solid $gray-light;
            &:last-child {
                border-bottom: none;
            }
            .radio {
                width: pxTorem(30);
                height: pxTorem(30);
                margin: 0 pxTorem(20);
                border-radius: 50%;
                box-shadow: inset 0 0 pxTorem(10) $gray-light;
            }
            .radio.active {
                box-shadow: none;
                border: pxTorem(10) solid $orange;
            }
        }
    }
</style>
<template>
    <v-modal v-model='show' :toggle-modal='toggleModal' type='select'>
        <ul class='v-list-choose' ref='list'>
            <li v-for='item in list' @click='event(item)'>
                <i :class='["radio",{active:isActive(item)}]'></i> <span>{{item.name}}</span>
            </li>
        </ul>
    </v-modal>
</template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'vListChoose',
        components: {
            vModal
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            toggleModal: Function,
            list: {
                type: Array,
                default: () => []
            },
            attribute: String,
            callback: Function,
            isActive: Function,
            value: Boolean
        },
        data() {
            return {};
        },
        methods: {
            event(item) {
                this.callback(item);
                this.toggleModal();
            }
        },
    };
</script>