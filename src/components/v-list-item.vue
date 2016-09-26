<style lang='sass' scoped>@import '../assets/scss/variable.scss';
.v-list-item {
    height: pxTorem(95);
    .img {
        width: pxTorem(87);
        height: pxTorem(63);
        margin: 0 $gap*6;
    }
}
</style>
<template>
<div class='v-list-item flex flex-center-v border-b-1 bg-white' v-link='link'>
    <img class='img border-1' />
    <div>
        <strong>{{title}}</strong>
        <p>{{titleDupty}}</p>
    </div>
</div>
</template>
<script>
export default {

    name: 'v-list-item',
    props: {
        link: {
            type: Object,
            default: '',
        },
        title: {
            type: String,
            default: ''
        },
        titleDupty: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        };
    }
};
</script>
