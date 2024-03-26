import Vuex from 'vuex';

const state = {
    staff: null,
};

const store = new Vuex.Store({
    state,
    getters: {
        staff: (state) => {
            return state.staff;
        },
    },

    actions: {
        staff(context, user) {
            context.commit('setStaff', user);
        },
    },

    mutations: {
        setStaff(state, user) {
            state.staff = user;
        },
    }
});

export default store;