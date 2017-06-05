const template = `
    <component :is='theme_type' :free-times='freeTimes' :fresh-free-times='freshFreeTimes' :activity-detail='activityDetail'
        :id='id' :notice='notice' :to-order-detail='toOrderDetail' :toggleDialog='toggleDialog'>
    </component>
`;
module.exports = {
    name: 'machine',
    template,
    components: {
        one: require('./machine_1'),
        two: require('./machine_2')
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
    computed: {
        theme_type() {
            if (this.activityDetail.theme_type === 1) {
                return 'one';
            }
            if (this.activityDetail.theme_type === 2) {
                return 'two';
            }
        }
    }
};