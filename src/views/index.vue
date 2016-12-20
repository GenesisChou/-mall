<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.index {
  overflow:hidden;
  background-color:$gray-light;
}

.icon-list {
    padding: pxTorem(25) 0;
    margin: pxTorem(30) 0;
    overflow: hidden;
    background-color:$white;
    li{
        position:relative;
        width: 33.3%;
        float: left;
        padding-left:pxTorem(80);
        &:nth-child(1) div{
          background:linear-gradient(to bottom, #2190ff, #52b3ff 80%);
        }
        &:nth-child(2) div{
          background:linear-gradient(to bottom, #f41c29, #f1737b 80%);
        }
        &:nth-child(3) div{
          background:linear-gradient(to bottom, #ffa502, #ffd476 80%);
        }
    }
    div{
        display:table-cell;
        vertical-align:middle;
        height: pxTorem(90);
        width: pxTorem(90);
        border-radius: 50%;
        // padding-top: pxTorem(5);
        line-height: pxTorem(35);
        margin: auto;
        text-align: center;
        color: $white;

    }
    .label {
        position: absolute;
        left: pxTorem(-50);
        opacity: 0;
        color: $red;
        &.active {
            animation: checkAnimation 1s;
        }
    }
}

@keyframes checkAnimation {
    0% {
        opacity: 1;
        top: pxTorem(15);
    }
    100% {
        opacity: 0;
        top: pxTorem(-15);
    }
}
  .v-item:nth-child(1){
    border-top:0;
  }
  .v-item:nth-child(2){
    border-top:0;
  }
  .v-item:nth-child(2n-1){
    border-left:0;
  }
  .v-item:nth-child(2n){
    border-right:0;
  }
</style>
<template>
    <div class='index '>
        <keep-alive>
          <v-swipe></v-swipe>
        </keep-alive>
        <ul class='list-inline icon-list'>
            <router-link :to='{name:"my_integral"}' tag='li'>
                <div >
                    <p>积分</p>
                    <p>{{parseInt(user.integral)}}</p>
                </div>
            </router-link>
            <li  @click='checkIn'>
                <div >
                    <template v-if='!user.ischecked'>
                        <p>点击</p>
                        <p>签到</p>
                    </template>
                    <template v-else>
                        <p>您已</p>
                        <p>签到</p>
                    </template>
                    <span :class='["label",check_animation?"active":""]'>+10</span>
                </div>
            </li>
            <router-link :to='{name:"product_list"}' tag='li'>
                <div >
                    <p>所有</p>
                    <p>商品</p>
                </div>
            </router-link>
        </ul>

        <section>
            <!-- 热门推荐 -->
            <v-item v-for='item in hot_commend' :item='item' type='commend'></v-item>
            <!-- 热门 -->
            <v-item v-for='item in hot_items' :item='item' type='item'></v-item>
        </section>
        <v-back-top></v-back-top>
    </div>
</template>
<script>
import vSwipe from 'components/index/v_swipe.vue'
import vItem from 'components/index/v_item.vue'
import vBackTop from 'components/v_back_top.vue'
export default {
    name: 'index',
    components: {
        vSwipe,
        vItem,
        vBackTop
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    data() {
        return {
            hot_items: [],
            hot_commend: [],
            check_animation: false,
            params: {
                p: 1,
                r: APP.PERPAGE,
                total: 0,
                count: 0,
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID,
                pro_st:''
            },
            scroll:false,
            loading:false,
        }
    },
    mounted(){
      this.getHotCommend();
      this.getHotItems();
    },
    activated(){
      var position=utils.getSessionStorage('position:'+this.$route.name);
      if(position){
        window.scrollTo(0,position);
      }
      window.addEventListener('scroll',this.getScrollData);
    },
    deactivated(){
      window.removeEventListener('scroll',this.getScrollData);
    },
    methods: {
        getScrollData(){
           this.scroll=true;
              if (this.scroll&&utils.touchBottom()&&this.params.p < this.params.total&&!this.loading) {
                  this.params.p++;
                  this.scroll=false;
                  this.loading=true;
                  this.getHotItems(()=>{
                    this.loading=false;
                  });
              }
        },
        //签到
        checkIn() {
            if (!this.user.ischecked) {
                this.$http.post(`${APP.HOST}/checkin/${APP.USER_ID}`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID,
                    media_id:APP.MEDIA_ID
                }).then((response) => {
                    let data = response.data;
                    if (data.status == APP.SUCCESS) {
                        this.$store.dispatch('getUserInfor');
                        this.check_animation = true;
                    } else {
                        this.$store.dispatch('toggleAlert', {
                            msg: data.info
                        })
                    }
                }, (response) => {

                })
            }
        },

        //  热门商品和活动列表，用于首页列表
        getHotItems(callback) {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/hot_item`, this.params ).then((response) => {
                let data = response.data;
                this.$store.dispatch('toggleLoading');
                if(data.status==APP.SUCCESS){
                  if(callback){
                    callback();
                  }
                  this.params.total = data.data.total;
                  this.params.pro_st=data.data.pro_st;
                  this.hot_items = this.hot_items.concat(data.data.list);
                }
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            });
        },
        getHotCommend() {
            this.$store.dispatch('toggleLoading', {
                show: true
            });
            this.$http.post(`${APP.HOST}/hot_commend`, {
                token: APP.TOKEN,
                userid: APP.USER_ID,
                media_id:APP.MEDIA_ID
            }).then((response) => {
                let data=response.data;
                this.$store.dispatch('toggleLoading');
                this.hot_commend = data.data;
            }, (response) => {
                this.$store.dispatch('toggleLoading');
            });
        }
    }
};
</script>
