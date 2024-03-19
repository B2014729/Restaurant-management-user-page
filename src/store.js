import Vuex from 'vuex';

const state = {
    staff: null,
};

const store = new Vuex.Store({
    state,
    getters: {
        staff: (state) => {
            return state.staff;
        }
    },

    actions: {
        staff(context, user) {
            context.commit('setUser', user);
        }
    },

    mutations: {
        setUser(state, user) {
            state.staff = user;
        }
    }
});

export default store;