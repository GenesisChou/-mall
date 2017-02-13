<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-date {
        background-color: $white;
        button {
            width: pxTorem(100);
        }
    }
    
    .wrapper {
        display: flex;
        display: -webkit-flex;
        position: relative;
        width: pxTorem(630);
        height: pxTorem(630);
        background-color: $white;
        .picker-item {
            flex: 1;
            -webkit-flex: 1;
            overflow: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        li {
            list-style: none;
            text-align: center;
            height: pxTorem(70);
            line-height: pxTorem(70);
        }
        &:after {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: pxTorem(75);
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            background-color: $red;
            opacity: 0.2;
        }
    }
</style>
<template>
    <v-modal :show='show' :toggle-modal='toggleModal'>
        <div class='v-date'>
            <header class='clearfix'>
                <button class='btn pull-left' @click='toggleModal'>取消</button>
                <button class='btn btn-red pull-right' @click='sure'>确认</button>
            </header>
            <h4>{{date_format}}</h4>
            <main class='wrapper'>
                <ul class='picker-item year'>
                    <li v-for='item in year_list'>
                        {{item}}
                    </li>
                </ul>
                <ul class='picker-item month'>
                    <li v-for='item in month_list'>
                        {{item}}
                    </li>
                </ul>
                <ul class='picker-item day'>
                    <li v-for='item in day_list'>
                        {{item}}
                    </li>
                </ul>
            </main>
        </div>
    </v-modal>
</template>
<script>
    import vModal from 'components/vModal.vue';
    // import vPicker from 'components/vPicker.vue';
    export default {
        name: 'v-date',
        components: {
            vModal,
            // vPicker
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            toggleModal: Function,
            value: Object,
            callback: Function
        },
        data() {
            return {
                date: {
                    year: '',
                    month: '',
                    day: ''
                },
                year_list: this.getList(1970, 2017),
                month_list: this.getList(1, 12),
                day_list: this.getList(1, 31),
            }
        },
        computed: {
            date_format() {
                return `${this.date.year}-${this.date.month}-${this.date.day}`;
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
                let temp = document.querySelector('.v-date')
                console.log(temp);
            },
        },
        mounted() {
            // this.$refs.year.addEventListener('scroll',()=>{
            //     console.log('fu')
            // })
        },
        methods: {
            sure() {
                this.callback(this.date);
                this.toggleModal();
            },
            getList(start, end) {
                var result = [];
                for (var i = start; i <= end; i++) {
                    result.push(i);
                }
                return result;
            }
        }
    }
</script>