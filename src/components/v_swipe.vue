<style lang='sass' scoped>
@import '../assets/scss/variable.scss';
.v-swipe {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: pxTorem(300);
}

.scroll,
.circles li {
    float: left;
    list-style: none;
}

.scroll {
    height: 100%;
    transition: transform .8s;
    li {
        float: left;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.circles {
    position: absolute;
    left: 50%;
    bottom: 0;
    padding: pxTorem(20);
    transform: translateX(-50%);
    li {
        padding: pxTorem(8);
        margin: 0 pxTorem(10);
        border-radius: 50%;
        background-color: $white;
        &.active {
            background-color: $gray-light;
        }
    }
}
</style>
<template>
    <div class='v-swipe bg-white'>
        <ul class='scroll' :style='{width:scroll_width}'>
            <li v-for='item in list' @click='bannerView(item)' :style='{width:item_width}'>
                <img :src="item.pic">
            </li>
        </ul>
        <ul class='circles'>
            <li v-for='(i,$index) in list' :class='$index==currentNumber?"active":""' @click='active($index)'></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
            return {
                scroll: '',
                timer: '',
                currentNumber: 0,
                list: [],
                device_width: document.documentElement.clientWidth,
            }
        },
        mounted() {
            this.scroll = document.querySelector('.scroll');
            this.getHotBanners();
        },
        computed: {
            //轮播总宽度
            scroll_width() {
                return this.list.length * this.device_width + 'px';
            },
            item_width() {
                return this.device_width + 'px';
            },
            //每次移动间隔
            gap() {
                return this.device_width;
            }
        },
        methods: {
            getHotBanners() {
                this.$http.post(`${APP.HOST}/hot_banner`, {
                    token: APP.TOKEN,
                    userid: APP.USER_ID
                }).then((response) => {
                    this.list = response.data.data;
                    this.start();

                }, (response) => {});
            },
            routerLink(banner) {
                if (banner.type == 1) {
                    console.log(window.location.href);
                    window.location.href = 'http://' + banner.url;
                } else if (banner.type == 2) {
                    this.$router.push({
                        name: "activity_detail",
                        query: {
                            activity_id: banner.item_id
                        }
                    })
                }
            },
            bannerView(banner) {
                this.$store.dispatch('bannerView', banner.id);
                this.routerLink(banner);
            },
            move(index) {
                this.scroll.style.transform = `translateX(-${index*this.gap}px)`;
            },
            start() {
                this.timer = setInterval(() => {
                    // console.log('swipe');
                    this.currentNumber = (this.currentNumber + 1) % this.list.length;
                    // this.currentNumber = this.currentNumber == (this.list.length - 1) ? 0 : this.currentNumber + 1;
                    this.move(this.currentNumber);
                }, 4000);

            },
            stop() {
                clearInterval(this.timer);
            },
            active($index) {
                this.stop();
                this.currentNumber = $index;
                this.move(this.currentNumber);
                setTimeout(this.start, 1000);
            },
        }
}
</script>
