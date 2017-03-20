<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
  </style>
<template>
    <div class='test'>
      </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            rotate() {
                this.show = !this.show;
            }
        },
        mounted() {
        }
    }
</script>