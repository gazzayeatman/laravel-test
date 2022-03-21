import { createStore } from 'vuex';

const store = createStore({
    state: {
        editUserModalOpen: false
    },
    mutations: {
        setEditUserModalOpen(state) {
            state.editUserModalOpen = true;
        },
        setEditUserModalClosed(state) {
            state.editUserModalOpen = false;
        }
    },
    actions: {
        setEditUserModalOpen({commit}) {
            commit('setEditUserModalOpen');
        },
        setEditUserModalClosed({commit}) {
            commit('setEditUserModalClosed');
        }
    },
    getters: {
        getEditUserModalOpen() {
            return state.editUserModalOpen;
        }
    }
});

export default store;
