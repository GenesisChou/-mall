<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    input {
        width: pxTorem(470);
        height: pxTorem(70);
        line-height: pxTorem(70);
        box-sizing: border-box;
        color: $gray;
        border: 0;
        font-size: pxTorem(26);
        border-bottom: 1px solid $gray-light;
        transition-duration: .5s;
        &:focus {
            border-bottom: 1px solid $red;
        }
    }
    .date-select{
        padding:pxTorem(100);
        background-color:$white;
    }
</style>
<template>
    <div class='v-date-picker'>
        <input type='text' v-model='value' readonly @click='toggleBirth'>
        <v-modal v-model='birth_show' :cover-close='false'>
            <div class='date-select'>
                <input type='date' :value='value' ref='date'>
                <button @click='updateDate' class='btn btn-red'>确定</button>
            </div>
        </v-modal>
    </div>
</template>
<script>
    import vModal from 'components/vModal.vue';
    export default {
        name: 'vDatePicker',
        components: {
            vModal
        },
        props: {
            value: String
        },
        data() {
            return {
                birth_show: false
            }
        },
        methods: {
            updateDate(){
                event.preventDefault();
                this.$emit('input',this.$refs.date.value);
                this.toggleBirth();
            },
            toggleBirth() {
                this.birth_show = !this.birth_show;
            }
        }
    }
</script>