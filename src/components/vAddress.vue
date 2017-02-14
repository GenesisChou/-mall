<style lang='scss' scoped>
    @import '../assets/scss/variable.scss';
    .v-address {
        float: left;
        input {
            float: left;
            width: pxTorem(150);
            height: pxTorem(70);
            line-height: pxTorem(70);
            margin-right: pxTorem(10);
            box-sizing: border-box;
            color: $gray;
            border: 0;
            font-size: pxTorem(26);
            border-bottom: 1px solid $gray-light;
            transition-duration: .5s;
            &:focus {
                border-bottom: 1px solid $red;
            }
            &:nth-child(4) {
                margin-right: 0;
            }
        }
    }
</style>
<template>
    <div class='v-address'>
        <input id='province' placeholder="请选择省" v-model='province' readonly @click='toggleProvince'>
        <input v-if='city_list.length>0' id='city' placeholder="请选择市" v-model='city' readonly @click='toggleCity'>
        <input v-if='city_list.length>0||country_list.length>0' id='country' placeholder="请选择区县" v-model='country' readonly @click='toggleCountry'>
        <v-list-choose :show='show_province' :toggle-modal='toggleProvince' :list='province_list' attribute='province' :callback='listEvent'
            :is-active='isActive'></v-list-choose>
        <v-list-choose :show='show_city' :toggle-modal='toggleCity' :list='city_list' attribute='city' :callback='listEvent' :is-active='isActive'></v-list-choose>
        <v-list-choose :show='show_country' :toggle-modal='toggleCountry' :list='country_list' attribute='country' :callback='listEvent'
            :is-active='isActive'></v-list-choose>
    </div>
</template>
<script>
    import vListChoose from 'components/vListChoose.vue';
    export default {
        name: 'vAddress',
        components: {
            vListChoose
        },
        props: {
            address: Object,
            id: Object,
            changeName: Function,
            changeId: Function
        },
        data() {
            return {
                show_province: false,
                show_city: false,
                show_country: false,
                province_list: [],
                city_list: [],
                country_list: []
            }
        },
        computed: {
            province() {
                return this.address.province;
            },
            city() {
                return this.address.city;
            },
            country() {
                return this.address.country;
            },
            province_id() {
                return this.id.province_id;
            },
            city_id() {
                return this.id.city_id;
            },
            country_id() {
                return this.id.country_id;
            }
        },
        watch: {
            province_id(value) {
                let name = '';
                if (value && this.province_list.length) {
                    this.getCityList(value);
                    this.changeId('city');
                    this.changeId('country');
                    name = this.getAddressName('province', value, this.province_list);
                }
                this.changeName('province', name);
            },
            city_id(value) {
                let name = '';
                if (value) {
                    this.getCountryList(value);
                    this.changeId('country')
                    name = this.getAddressName('city', value, this.city_list);
                }else{
                    this.country_list=[];
                }
                this.changeName('city', name);
            },
            country_id(value) {
                let name = '';
                if (value) {
                    name = this.getAddressName('country', value, this.country_list);
                }
                this.changeName('country', name);
            }
        },
        created() {
            this.getProvinceList();
            if (this.province_id) {
                this.getCityList(this.province_id);
            }
            if (this.city_id) {
                this.getCountryList(this.city_id);
            }
        },
        methods: {
            listEvent(obj) {
                let type = Object.keys(obj)[1];
                this.changeId(type, obj[type + 'id']);
            },
            isActive(obj) {
                let type = Object.keys(obj)[1];
                return this[type + '_id'] == obj[type + 'id'];
            },
            //获取省份
            getProvinceList() {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/province_list`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        this.province_list = data.data||[];
                        if (resolve) {
                            resolve();
                        }
                    });
                })
            },
            //获取城市
            getCityList(id) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/city_list/${id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        this.city_list = data.data||[];
                        if (resolve) {
                            resolve();
                        }
                    }, (response) => {});
                })
            },
            //获取区县
            getCountryList(id) {
                return new Promise(resolve => {
                    this.$http.post(`${APP.HOST}/country_list/${id}`, {
                        token: APP.TOKEN,
                        userid: APP.USER_ID
                    }).then((response) => {
                        let data = response.data;
                        this.country_list = data.data||[];
                        if (resolve) {
                            resolve();
                        }
                    });
                })
            },
            getAddressName(type, id, list) {
                let attribute = type + 'id',
                    result = '';
                list.forEach(item => {
                    if (item[attribute] == id) {
                        result = item[type];
                        return;
                    }
                })
                return result;
            },
            toggleProvince() {
                this.show_province = !this.show_province;
            },
            toggleCity() {
                this.show_city = !this.show_city;
            },
            toggleCountry() {
                this.show_country = !this.show_country;
            }


        }
    }
</script>