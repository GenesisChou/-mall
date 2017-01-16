<style lang='sass' scoped>
    @import '../assets/scss/variable.scss';
</style>
<template>
    <div class='test'>
        <img src="" alt="">
        <v-load-more></v-load-more>
        <button class='btn btn-red' @click='toggleAlert'>alert</button>
    </div>
</template>
<script>
    import vLoadMore from 'components/vLoadMore.vue'
    import fortune from 'components/activities/fortune';
    import shake from 'components/activities/shake';
    export default {
        components: {
            fortune,
            shake,
            vLoadMore,
        },
        data() {
            return {}
        },
        created() {},
        methods: {
            toggleAlert() {
                this.$store.dispatch('toggleAlert', {
                    msg: "test",
                    // close_btn:true
                })
            },
            toggleConfirm() {
                this.$store.dispatch('toggleConfirm', {
                    show: true,
                    msg: 'hello world'
                })
            }
        }
    }
</script>