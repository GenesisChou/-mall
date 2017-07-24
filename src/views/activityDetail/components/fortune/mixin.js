 import vDescribeTitle from '../vDescribeTitle';
 import vIntegralBox from '../vIntegralBox.vue';
 import vAwardBox from '../vAwardBox';
 import vRecommend from 'components/vRecommend';
 module.exports = {
     components: {
         vDescribeTitle,
         vIntegralBox,
         vAwardBox,
         vRecommend,
     },
     props: {
         freshFreeTimes: Function,
         freeTimes: Number,
         activityDetail: Object,
         id: Number,
         notice: String,
         toOrderDetail: Function,
         toggleDialog: Function,
         isOff: Boolean
     },
     data() {
         return {
             state: '', //游戏状态
             current_index: '', //当前激活索引
             turn: '', // 旋转次数 
             grid_num: '', // 格子数 
             stop_position: '',
             alert: {},
             activity_result: {},
         };
     },
     computed: {
         awards() {
             return this.activityDetail.table_items;
         },
         is_win() {
             return this.activity_result.is_win || false;
         },
         user() {
             return this.$store.state.user;
         },
         theme_type() {
             if (this.activityDetail.theme_type === 1) {
                 return 'one';
             }
             if (this.activityDetail.theme_type === 2) {
                 return 'two';
             }
         }
     },
     created() {
         this.init();
     },
     watch: {
         state(value) {
             if (value === 'start') {
                 this.stop_position = this.getPosition(this.activity_result.name);
                 const result = this.activity_result,
                     _this = this,
                     stop_position = this.stop_position, //停止位置
                     move_times = this.getMoveTimes(stop_position), //总循环次数
                     speed_min = 500, //最小速度
                     speed_max = 20, //最大速度
                     speed_buffer = 10, //速度缓冲区
                     speed_interval = Math.abs(speed_max - speed_min) / speed_buffer; //速度提升间隔
                 let time = 0,
                     interval = 500;

                 this.freshFreeTimes();
                 if (result.is_win) {
                     this.alert = {
                         type: 'success',
                         img: result.pic_thumb_new,
                         msg: '获得' + result.name,
                         callback: this.toOrderDetail(result.id),
                         callback_close: () => {
                             this.init(this.stop_position);
                         },
                         btn_text: '查看'
                     };
                 } else {
                     this.alert = {
                         msg: '很遗憾,未中奖',
                         btn_text: '再来一次',
                         callback: () => {
                             this.init(this.stop_position);
                         },
                     };
                 }
                 setTimeout(() => {
                     step();
                 }, interval);

                 function step() {
                     if (time < speed_buffer) {
                         // interval = _this.speedUp(interval, speed_interval);
                         // speed up
                         interval -= speed_interval;
                     } else if (time > move_times - speed_buffer) {
                         // interval = _this.speedDown(interval, speed_interval);
                         // speed down
                         interval += speed_interval;
                     }
                     if (time >= move_times) {
                         _this.state = 'stop';
                         return;
                     }
                     time++;
                     _this.move();
                     setTimeout(step, interval);
                 }
             } else if (value === 'stop') {
                 this.toggleDialog(this.alert);
             }
         }
     },
     methods: {
         init(position = 0) {
             this.state = 'ready';
             this.current_index = position;
             this.turn = 8;
             this.grid_num = 8;
             this.activity_result = {};
         },
         start() {
             if (this.user.show_authorize !== 1) {
                 utils.login(APP.MEDIA_ID, 2, 'activity_detail', this.activity_id, APP.ORIGIN);
                 return;
             }
             if (this.state !== 'ready') return;
             this.state = 'block';
             this.$http.post(`${APP.HOST}/turntable_activity/${this.id}`, {
                 token: APP.TOKEN,
                 user_id: APP.USER_ID,
                 origin: APP.ORIGIN
             }).then((response) => {
                 const data = response.data;
                 if (data.status === APP.SUCCESS) {
                     if (data.data.error_code == APP.INTEGRAL_LACK) {
                         this.toggleDialog({
                             faliure: 'lack',
                             callback: () => {
                                 this.init();
                             }
                         });
                         return;
                     }
                     this.activity_result = data.data;
                     this.state = 'start';
                 } else {
                     this.toggleDialog({
                         msg: data.info,
                         callback: () => {
                             this.init();
                         }
                     });
                 }
             }, (response) => {});
         },
         move() {
             this.current_index = (this.current_index + 1) % this.grid_num;
         },
         getPosition(name) {
             let stop_position = 0;
             this.awards.forEach((award, index) => {
                 if (award.name === name) {
                     stop_position = index;
                     return true;
                 }
             });
             return stop_position;
         },
         getMoveTimes(stop_position) {
             let step = stop_position - this.current_index;
             if (step < 0) {
                 step = this.grid_num + step;
             }
             return step + this.turn * this.grid_num;
         },
     }
 };