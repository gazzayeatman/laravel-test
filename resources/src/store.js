import { createStore } from 'vuex';

const store = createStore({
    state: {
        editUserModalOpen: false,
        currentUser: false
    },
    mutations: {
        setEditUserModalOpen(state) {
            state.editUserModalOpen = true;
        },
        setEditUserModalClosed(state) {
            state.editUserModalOpen = false;
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        }
    },
    actions: {
        setEditUserModalOpen({commit}, user) {
            commit('setEditUserModalOpen');
            commit('setCurrentUser', user);
        },
        setEditUserModalClosed({commit}) {
            commit('setEditUserModalClosed');
            commit('setCurrentUser', false)
        }
    },
    getters: {
        getEditUserModalOpen() {
            return state.editUserModalOpen;
        },
        getCurrentUser() {
            return state.currentUser;
        }
    }
});

export default store;
