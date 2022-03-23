import { createStore } from 'vuex';
import { userDashboardStore } from './vue/apps/UserDashboard/user-dashboard-store';
import { locationsDashboardStore } from './vue/apps/LocationsDashboard/locations-dashboard-store';
import { customersDashboardStore } from './vue/apps/CustomersDashboard/customers-dashboard-store';

const store = createStore({
    state: {
        apollo: false
    },
    mutations: {
        setApolloClient(state, apollo) {
            state.apollo = apollo;
        }
    },
    actions: {
        setApolloClient({commit}, apollo) {
            commit('setApolloClient', apollo);
        }
    },
    getters: { },
    modules: {
        userDashboardStore,
        locationsDashboardStore,
        customersDashboardStore
    }
});

export default store;
