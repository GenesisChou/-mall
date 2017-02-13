<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
   </style>
<template>
    <div class='v-picker'>
        <main class='wrapper'>
            <ul class='picker-item'>
                <li v-for='item in year_list'>
                    {{item}}
                </li>
            </ul>
            <ul class='picker-item'>
                <li v-for='item in month_list'>
                    {{item}}
                </li>
            </ul>
            <ul class='picker-item'>
                <li v-for='item in day_list'>
                    {{item}}
                </li>
            </ul>
        </main>
    </div>
</template>
<script>
    export default {
        name: 'vPicker',
        props: {
            list: Object
        },
        computed: {
            year_list() {
                return this.list.year || [];
            },
            month_list() {
                return this.list.month || [];
            },
            day_list() {
                return this.list.day || [];
            }
        }

    }
</script>