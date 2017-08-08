module.exports = {
    state: {
        guide_state: '',
        surprise_show: false
    },
    mutations: {
        updateGuideState(state, str) {
            state.guide_state = str;
        },
        toggleSurprise(state, type) {
            state.surprise_show = type;
        }
    },
    actions: {
        updateGuideState(context, str) {
            context.commit('updateGuideState', str);
        },
        toggleSurprise(context, type) {
            context.commit('toggleSurprise', type);
        }
    },
};