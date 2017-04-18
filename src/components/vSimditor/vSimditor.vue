<style lang='scss' scoped>
    @import './style/simditor.css';
    .editor-style {
        text-align: justify;
        overflow: hidden;
    }
</style>
<template>
    <div class='editor-style'>
        <slot></slot>
    </div>
</template>
<script>