const userDashboardStore = {
    namespaced: true,
    state: {
        editUserModalOpen: false,
        addUserModalOpen: false,
        currentUser: false
    },
    mutations: {
        setEditUserModalOpen(state) {
            state.editUserModalOpen = true;
        },
        setEditUserModalClosed(state) {
            state.editUserModalOpen = false;
        },
        setAddUserModalOpen(state) {
            state.addUserModalOpen = true;
        },
        setAddUserModalClosed(state) {
            state.addUserModalOpen = false;
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
        },
        setAddUserModalOpen({commit}) {
            commit('setAddUserModalOpen');
        },
        setAddUserModalClosed({commit}) {
            commit('setAddUserModalClosed');
        }
    },
    getters: {
        getEditUserModalOpen() {
            return state.editUserModalOpen;
        },
        getAddUserModalOpen() {
            return state.addUserModalOpen;
        },
        getCurrentUser() {
            return state.currentUser;
        }
    }
};

export default userDashboardStore;
