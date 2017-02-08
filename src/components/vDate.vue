<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-date {
        background-color: $white;
        width: pxTorem(500);
        height: pxTorem(500);
        button {
            width: pxTorem(100);
        }
    }
</style>
<template>
    <v-modal :show='show' :toggle-modal='toggleModal'>
        <div class='v-date'>
            <div class='clearfix'>
                <button class='btn pull-left' @click='toggleModal'>取消</button>
                <button class='btn btn-red pull-right' @click='sure'>确认</button>
            </div>
            <h1>{{date}}</h1>
        </div>
    </v-modal>
</template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'v-date',
        components: {
            vModal
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            toggleModal: Function,
            value: Object,
            changeDate: Function
        },
        data() {
            return {
                date: {
                    year: '',
                    month: '',
                    day: ''
                }
            }
        },
        watch: {
            show(value) {
                if (!value) return;
                let d = new Date();
                this.date = {
                    year: this.value.year || d.getFullYear(),
                    month: this.value.month || d.getMonth() + 1,
                    day: this.value.day || d.getDate()
                };

            }
        },
        methods: {
            sure() {
                this.changeDate(this.date);
                this.toggleModal();
            },
        }
    }
</script>