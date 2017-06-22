<style lang='scss' scoped>
    @import '../../assets/scss/variable.scss';
</style>
<template>
    <div class='my-awards'>
    </div>
</template>
<script>
    export default {
        name: 'myAwards',
        data() {
            return {
                activity_id: '',
                awards_list: []
            };
        },
        created() {
            this.activity_id = this.$route.query.activity_id;
            this.getAwards();
        },
        methods: {
            getAwards() {
                return new Promise(resolve => {
                    this.$store.dispatch('toggleLoading');
                    this.$http.post(`${APP.HOST}/user_activity_prize/${this.activity_id}`, {
                        token: APP.TOKEN,
                        media_id: APP.MEDIA_ID,
                        user_id: APP.USER_ID,
                        open_id: APP.OPEN_ID
                    }).then((response) => {
                        this.$store.dispatch('toggleLoading');
                        const data = response.data;
                        if (data.status === APP.SUCCESS) {
                            if (resolve && typeof resolve === 'function') {
                                resolve(data.data);
                            }
                        }
                    }, (response) => {
                        this.$store.dispatch('toggleLoading');
                    });
                });
            }
        }
    };
</script>