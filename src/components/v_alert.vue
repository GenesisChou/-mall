<style lang='sass' scoped>
@import '../assets/scss/variable';
.modal {
    position: fixed;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    border-radius: pxTorem(10);
    z-index: 11;
    .modal-content {
        width: pxTorem(600);
        border-radius: pxTorem(10);
        overflow: hidden;
        text-align: center;
        padding: pxTorem(20);
        background-color: $white;
        border-radius: pxTorem(10);
        .icon {
            width: pxTorem(60);
            height: pxTorem(60);
            font-size: pxTorem(40);
        }
          .pic {
              width: pxTorem(300);
              height: pxTorem(210);
          }
        .msg {
          padding: pxTorem(40) 0;
          margin: auto;
          font-size: pxTorem(32);
          text-align: center;
          width: pxTorem(400);
        }
        .btn {
          width: pxTorem(300);
          height: pxTorem(78);
          margin: 0 auto;
          margin-bottom: pxTorem(30);
          line-height: pxTorem(78);
          font-size: pxTorem(30);
        }
    }
}

.v-alert .bg-cover {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}
</style>
<template>
    <section v-show='show' class='v-alert'>
        <div class='bg-cover'>
            <div class='modal bg-white'>
                <div class='modal-content text-center text-large'>
                    <img v-if='type=="img"' class='pic' :src='img' alt="">
                    <i v-else :class='["icon","text-red","iconfont","text-bold",icon_class]'></i>
                    <p class='msg'>{{msg}}</p>
                    <button class='btn btn-red btn-large' @click='func()'>{{btnText}}</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'suprise'
        },
        msg: String,
        coverClose: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String,
            default: '关闭'
        },
        img:String,
        callback: Function
    },
    computed: {
        //get right icon-class from props's type
        icon_class() {
            if (this.type == 'suprise') {
                return 'icon-warn';
            } else if (this.type == 'correct') {
                return 'icon-correct-circle-hollow';
            } else if (this.type == 'error') {
                return 'icon-error-circle';
            }else if(this.type=='img'){
                return '';
            }
        }
    },
    methods: {
        func() {
            this.$store.dispatch('toggleAlert', {
                msg: this.msg,
                btn_text: this.btnText,
                type: this.type,
                cover_close: this.coverClose
            });
            if (this.callback) {
                this.callback();
            }
        }
    }
}
</script>
