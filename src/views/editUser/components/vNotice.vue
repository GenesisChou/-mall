<style lang='scss' scoped>
    @import '../../../assets/scss/variable.scss';
    .v-modal {
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            // background: rgba(0, 0, 0, .5);
            z-index: 5;
        }
        .content {
            @include flex-center;
            position: fixed;
            left: 50%;
            top: 50%;
            width:pxTorem(315);
            height:pxTorem(67);
            margin-left:pxTorem(-315/2);
            margin-top:pxTorem(-67/2);
            background-color:#4e4e4e;
            border-radius:pxTorem(10);
            color:$white;
            z-index: 6
        }
    }
</style>
<template>
    <div class='v-modal'>
        <transition name='scale'>
            <div v-show='value' class='content '>
                <slot></slot>
            </div>
        </transition>
        <div v-show='value' @click='close' class='bg-cover'></div>
    </div>
</template>
<script>
    export default {
        props: {
            coverClose: {
                type: Boolean,
                default: true
            },
            value: Boolean,
            toggleModal: Function
        },
        methods: {
            close() {
                if (this.coverClose && event.target.className === 'bg-cover') {
                    if (this.toggleModal) {
                        this.toggleModal();
                    } else {
                        this.$emit('input', false);
                    }
                }
            }
        }

    };
</script>