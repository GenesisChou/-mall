module.exports = {
    state: {
        guide_state: ''
    },
    mutations: {
        updateGuideState(state, str) {
            state.guide_state = str;
        }
    },
    actions: {
        updateGuideState(context, str) {
            context.commit('updateGuideState', str);
        }
    },
};