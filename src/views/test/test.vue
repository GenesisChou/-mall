<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
</style>
<template>
    <div class='test'>
        <!--<v-spinner></v-spinner>-->
    </div>
</template>
<script>
    import vSpinner from 'components/vSpinner.vue';
    export default {
        components: {
            vSpinner
        },
        data() {
            return {
                show: true,
                dialog: {}
            };
        },
        methods: {},
        created() {
            // this.$store.dispatch('toggleLoading');
        }
    };
</script>