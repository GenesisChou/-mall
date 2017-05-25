<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-modal {
        .bg-cover {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
            z-index: 5;
        }
        .content {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 6
        }
    }
</style>
<template>
    <div class='v-modal'>
        <div v-show='value' @click='close' class='bg-cover'>
        </div>
        <transition name='enlarge'>
            <div v-show='value' class='content'>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            coverClose: {
                type: Boolean,
                default: true
            },
            value: {
                type: Boolean,
                default: false
            },
            toggleModal: Function,
            transition: {
                type: String,
                default: ''
            }
        },
        watch: {
            value(v) {
                utils.toggleScroll();
            }
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