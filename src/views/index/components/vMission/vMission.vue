<style lang='scss' scoped>
    @import '../../../../assets/scss/variable.scss';
    .v-mission {
        background: $white;
        padding-top: pxTorem(15);
    }

    .content {
        display: flex;
        height: pxTorem(108);
    }

    .thumb {
        width: pxTorem(187);
        height: pxTorem(108);
        text-align: center;
        line-height: pxTorem(108);
        img {
            width: pxTorem(86);
            height: pxTorem(71);
        }
    }

    .missions {
        flex: 1;
        display: flex;
        list-style: none;
        li {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: pxTorem(108);
            list-style: none;
            color: #b2aca4;
            background: #f7dfc2;
            font-size: pxTorem(20);
            &.border {
                position: relative;
                &:after {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    width: 1px;
                    height: pxTorem(80);
                    margin-top: pxTorem(-40);
                    background: #b2aca4;
                }
            }
            h1 {
                font-size: pxTorem(38);
            }
        }
        li.finish {
            position: relative;
            color: #f48f18;
            &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: pxTorem(50);
                height: pxTorem(50);
                background: url('./images/finish.png');
                background-size: 100% 100%;
            }
        }
        li.active {
            color: $white;
            background: #f48f18;
        }
    }

    .dialog-content {
        position: fixed;
        left: 50%;
        top: 50%;
        width: pxTorem(630);
        background: $white;
        border-radius: pxTorem(10);
        transform: translate(-50%, -50%);
        z-index: 6;
        .tag {
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            width: pxTorem(45);
            height: pxTorem(63);
            font-size: pxTorem(32);
            background: url('./images/tag.png');
            background-size: 100% 100%;
            color: $white;
        }
        .close {
            width: pxTorem(80);
            height: pxTorem(74);
            position: absolute;
            right: pxTorem(-30);
            top: pxTorem(-30);
            background: url('./images/close.png');
            background-size: 100% 100%;
        }
        .title {
            color: #252525;
        }
        .notice {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: pxTorem(126);
            font-size: pxTorem(28);
        }
        .pic {
            width: pxTorem(358);
            height: pxTorem(358);
            margin: 0 auto;
            padding: pxTorem(20);
            background: #f1f1f1;
            border-radius: pxTorem(10);
            img {
                width: 100%;
                height: 100%;
                border-radius: pxTorem(10);
            }
        }
        .pics {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            list-style: none;
            li {
                width: pxTorem(178);
                height: pxTorem(228);
                margin: 0 pxTorem(6);
                list-style: none;
                div {
                    width: pxTorem(178);
                    height: pxTorem(178);
                    background: #f1f1f1;
                    padding: pxTorem(10);
                    border-radius: pxTorem(10);
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: pxTorem(10);
                    }
                }
                span {
                    display: block;
                    width: pxTorem(178);
                    height: pxTorem(50);
                    padding-top: pxTorem(10);
                    overflow: hidden;
                    font-size: pxTorem(24);
                    color: #ff5000;
                    text-align: center;
                }
            }
        }
        .desc {
            height: pxTorem(67);
            line-height: pxTorem(67);
            overflow: hidden;
            color: #ff5000;
            text-align: center;
        }
        .button {
            @include active(#ff5000,
            3%);
            width: pxTorem(564);
            height: pxTorem(90);
            margin: 0 auto pxTorem(46) auto;
            line-height: pxTorem(90);
            text-align: center;
            font-size: pxTorem(37);
            background: #ff5000;
            color: $white;
            border-radius: pxTorem(10);
            .icon-arrows-right {
                font-weight: bold;
                font-size: pxTorem(36);
                &:last-child {
                    margin-left: pxTorem(-30);
                    margin-right: 0;
                }
            }
        }
    }

    .bg-cover {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .7);
        z-index: 5;
    }
</style>
<template>
    <div class='v-mission'>
        <div class='content'>
            <div class='thumb'>
                <img src='./images/mission.png'>
            </div>
            <ul class='missions'>
                <li :class='[{active:mission.status===1},{finish:mission.status===3},{border:$index===1&&step===1&&mission.status===2}]'
                    v-for='(mission,$index) in missions' @click='showDialog(mission)'>
                    <h1>0{{$index+1}}</h1>
                    {{mission.name}}
                </li>
            </ul>
        </div>
        <div class='dialog'>
            <transition name='enlarge'>
                <div v-if='dialog_show' class='dialog-content'>
                    <div class='close' @click='dialog_show=false'></div>
                    <template v-if='state==="success"'>
                        <div class='notice'>
                            <h1 class='title'>任务完成</h1>
                            恭喜你获得以下奖励
                        </div>
                        <ul v-if='awards.length>1' class='pics'>
                            <li v-for='(i,$index) in 6'>
                                <template v-if='awards[$index]'>
                                    <div>
                                        <img :src='awards[$index].pic_thumb_new'>
                                    </div>
                                    <span>{{awards[$index].name}}</span>
                                </template>
                            </li>
                        </ul>
                        <div v-else class='pic'>
                            <img :src='awards[0].pic_thumb_new'>
                        </div>
                        <h4 v-if='awards.length===1' class='desc'>{{awards[0].name}}</h4>
                        <div v-if='step===3' class='button' @click='closeDialog'>我知道了</div>
                        <div v-else class='button' @click='continueMission'>继续做任务
                            <i class='iconfont icon-arrows-right'></i>
                            <i class='iconfont icon-arrows-right'></i>
                        </div>
                    </template>
                    <template v-else>
                        <div class='tag'>{{current_mission.step}}</div>
                        <div class='notice'>
                            <h1 class='title'>{{current_mission.name}}</h1>
                        </div>
                        <div class='pic'>
                            <img :src='current_mission.pic'>
                        </div>
                        <h4 class='desc'>{{current_mission.desc}}</h4>
                        <div v-if='step===3&&current_mission.type!==2' class='button' @click='startMission(current_mission)'>点击领取</div>
                        <div v-else class='button' @click='startMission(current_mission)'>做任务
                            <i class='iconfont icon-arrows-right'></i>
                            <i class='iconfont icon-arrows-right'></i>
                        </div>
                    </template>
                </div>
            </transition>
            <div v-if='dialog_show' class='bg-cover'></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Vmisson',
        data() {
            return {
                missions: [{}, {}, {}],
                dialog_show: false,
                step: 1,
                state: '',
                awards: []
            };
        },
        created() {
            this.getMissions();
        },
        computed: {
            current_mission() {
                return this.missions[this.step - 1];
            }
        },
        watch: {
            $route(value) {
                if (value.name === 'index') {
                    this.getMissions();
                }
            }
        },
        methods: {
            getMissions() {
                this.$http.post(`${APP.HOST}/newbie_task_list`, {
                    token: APP.TOKEN,
                    user_id: APP.USER_ID,
                    media_id: APP.MEDIA_ID
                }).then((response) => {
                    const data = response.data;
                    if (data.status === APP.SUCCESS) {
                        this.missions = data.data;
                    }
                });
            },
            startMission(mission) {
                if (mission) {
                    if (mission.type === 1) {
                        this.completeMission(mission.id, mission.type, '', mission.status, mission.step).then(data => {
                            this.state = 'success';
                            this.awards = data.items;
                            this.getMissions();
                        });
                    } else if (mission.type === 2) {
                        this.dialog_show = false;
                        this.$router.push({
                            name: 'product_detail',
                            query: {
                                product_id: mission.product_id,
                                mission: JSON.stringify(mission)
                            }
                        });
                    }
                }
            },
            continueMission() {
                this.step++;
                this.state = '';
            },
            completeMission(id, type, product_id = '', status, step) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/fulfil_newbie_task`, {
                        token: APP.TOKEN,
                        user_id: APP.USER_ID,
                        media_id: APP.MEDIA_ID,
                        origin: APP.ORIGIN,
                        id,
                        type,
                        product_id,
                        status,
                        step
                    }).then((response) => {
                        const data = response.data;
                        if (data.status === APP.SUCCESS && typeof resolve === 'function') {
                            resolve(data.data);
                        }
                    });
                });
            },
            showDialog(mission) {
                /*
                    mission status
                    1:未完成可操作
                    2:未完成不能操作
                    3:已完成
                */
                if (mission && mission.status === 1) {
                    this.dialog_show = true;
                    this.step = mission.step;
                }
            },
            closeDialog() {
                this.dialog_show = false;
                this.state = '';
            },
        }
    };
</script>