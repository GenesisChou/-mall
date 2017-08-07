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
        height: pxTorem(700);
        background: $white;
        border-radius: pxTorem(10);
        transform: translate(-50%, -50%);
        z-index: 6;
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
            width: 100%;
            height: pxTorem(108);
            line-height: pxTorem(108);
            overflow: hidden;
            color: #252525;
            text-align: center;
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
        .desc {
            width: 100%;
            height: pxTorem(95);
            line-height: pxTorem(95);
            overflow: hidden;
            color: #ff5000;
            text-align: center;
        }
        .button {
            @include active(#ff5000,
            3%);
            margin: 0 auto;
            width: pxTorem(564);
            height: pxTorem(90);
            line-height: pxTorem(90);
            text-align: center;
            font-size: pxTorem(37);
            background: #ff5000;
            color: $white;
            border-radius: pxTorem(10);
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
                <li :class='[{active:mission.status===1},{finish:mission.status===3}]' v-for='(mission,$index) in missions' @click='showDialog(mission)'>
                    <h1>0{{$index+1}}</h1>
                    {{mission.name}}
                </li>
            </ul>
        </div>
        <div class='dialog'>
            <transition name='enlarge'>
                <div v-if='dialog_show' class='dialog-content'>
                    <div class='close' @click='dialog_show=false'></div>
                    <h1 class='title'>{{current_mission.name}}</h1>
                    <div class='pic'>
                        <img :src='current_mission.pic'>
                    </div>
                    <h4 class='desc'>{{current_mission.desc}}</h4>
                    <div class='button' @click='startMission(current_mission)'>做任务>></div>
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
                step: ''
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
                        this.completeMission(mission.id, mission.type, '', mission.status, mission.step).then(() => {
                            this.getMissions();
                        });
                    } else if (mission.type === 2) {
                        this.dialog_show = false;
                        this.$router.push({
                            name: 'product_detail',
                            query: {
                                product_id: mission.product_id,
                                mission: true
                            }
                        });
                    }
                }
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
                            resolve(data);
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
            }
        }
    };
</script>