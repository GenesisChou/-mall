<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-introduction {
        padding: 0 pxTorem(30);
        margin-top: pxTorem(20);
        background-color: $white;
        border-bottom: 1px solid #d3d4d6;
        text-align: justify;
        h3 {
            line-height: pxTorem(76);
            color: #646565;
            border-bottom: 1px solid $gray-light;
        }
        .content {
            padding: pxTorem(20) 0;
        }
    }
</style>
<template>
    <section class='v-introduction'>
        <h3>{{title}}</h3>
        <div class='content'>
            <v-simditor>
                <article v-html='content'> </article>
            </v-simditor>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'vIntroduction',
        props: {
            title: String,
            content: String
        }
    };
</script>