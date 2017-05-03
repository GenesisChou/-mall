module.exports = {
    props: {
        layout: Object,
        routerLink: Function,
    },
    computed: {
        show_message() {
            return this.layout.show_title === 1 || this.layout.show_subtitle === 1 || this.layout.show_integral ===
                1;
        }
    },
    methods: {
        getIcon(item) {
            if (item.item_type === 2) {
                if (item.activity_sub_type === 1) {
                    return require('./components/images/game.png');
                }
                return require('./components/images/activity.png');
            }
            return require('./components/images/exchange.png');
        },
    }
};