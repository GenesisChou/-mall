<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .main {
        padding: 0 pxTorem(53);
        margin-top: pxTorem(80);
        list-style: none;
        >li {
            overflow: hidden;
        }
        .code {
            input {
                width: pxTorem(300);
            }
            button {
                width: pxTorem(100);
                height: pxTorem(50);
                line-height: pxTorem(50);
                transform: translate(pxTorem(30), pxTorem(10));
                -webkit-transform: translate(pxTorem(30), pxTorem(10));
            }
        }
        .select-address {
            input {
                float: left;
                width: pxTorem(150);
                margin-right: pxTorem(10);
                &:nth-child(4) {
                    margin-right: 0;
                }
            }
        }
        label {
            float: left;
            width: pxTorem(150);
            height: pxTorem(70);
            line-height: pxTorem(70);
            font-size: pxTorem(30);
            text-align: left;
        }
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
        .address {
            input {
                width: 100%;
            }
        }
        textarea {
            width: pxTorem(470);
            height: pxTorem(110);
            margin-top: pxTorem(8);
            line-height: pxTorem(50);
            font-size: pxTorem(26);
            border: 0;
            border-bottom: 1px solid $gray-light;
            color: $gray;
            transition-duration: .5s;
            &:focus {
                border-bottom: 1px solid $red;
            }
        }
    }
    
    .operation {
        padding: pxTorem(100) pxTorem(25) 0 pxTorem(150);
        button {
            width: pxTorem(100);
        }
    }
</style>
<template>
    <div class='edit-user'>
        <form>
            <ul class='main'>
                <li>
                    <label for='contact'>姓名</label>
                    <input id='contact' placeholder="姓名">
                </li>
                <li>
                    <label for='birth'>出生年月</label>
                    <input id='birth' @click='toggleBirth' readonly v-model='birth_format'>
                </li>
                <li>
                    <label for='phone'>手机号</label>
                    <input id='phone' type='number' placeholder="手机或固定电话">
                </li>
                <li class='code'>
                    <label for='code'>验证码</label>
                    <input id='code'>
                    <button class='btn btn-red'>验证</button>
                </li>
                <li class='select-address'>
                    <label for='province'>收货地址</label>
                    <input id='province' placeholder="请选择省" readonly>
                    <input id='city' placeholder="请选择市" readonly>
                    <input id='country' placeholder="请选择区县" readonly>
                </li>
                <li>
                    <label for='address'></label>
                    <textarea id='address' placeholder="请输入详细地址"></textarea>
                </li>
                <li class='operation'>
                    <button class='btn pull-left' @click='reset'>重置</button>
                    <button class='btn btn-red pull-right' @click='submit'>确认</button>
                </li>
            </ul>
        </form>
        <v-date :show='show_birth' :toggle-modal='toggleBirth' :value='birth' :change-date='changeBirth'></v-date>
    </div>
</template>
<script>
    import vDate from 'components/vDate.vue';
    export default {
        name: 'edit-user',
        data() {
            return {
                form: '',
                show_birth: false,
                birth: {
                    year: '',
                    month: '',
                    day: ''
                }
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            birth_format() {
                if (this.birth.year && this.birth.month && this.birth.day) {
                    return `${this.birth.year}-${this.birth.month}-${this.birth.day}`;
                }
                return '';
            }
        },
        components: {
            vDate
        },
        mounted() {
            this.form = this.$el.querySelector('form');
            this.birth = {
                year: this.user.year || '',
                month: this.user.month || '',
                day: this.user.day || ''
            };
        },
        methods: {
            changeBirth(value) {
                this.birth = value;
            },
            toggleBirth() {
                this.show_birth = !this.show_birth;
            },
            reset() {
                event.preventDefault();
                this.form.reset();
            },
            submit() {
                event.preventDefault();
                this.$store.dispatch('toggleAlert', {
                    msg: '提交成功'
                });
            }
        }
    }
</script>