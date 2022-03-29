import { createStore } from 'vuex';
import { userDashboardStore } from './vue/apps/UserDashboard/user-dashboard-store';
import { locationsDashboardStore } from './vue/apps/LocationsDashboard/locations-dashboard-store';
import { customersDashboardStore } from './vue/apps/CustomersDashboard/customers-dashboard-store';
import { vehiclesDashboardStore } from './vue/apps/VehiclesDashboard/vehicles-dashboard-store';

const store = createStore({
        state: {
            apollo: false,
            currentUser: false,
            loginModalOpen: false
        },
        mutations: {
            setApolloClient(state, apollo) {
                state.apollo = apollo;
            },
            setCurrentUser(state, payload) {
                state.currentUser = payload;
            },
            setLoginModalOpen(state, payload) {
                state.loginModalOpen = payload;
            }
        },
        actions: {
            setApolloClient({commit}, apollo) {
                commit('setApolloClient', apollo);
            },
            setCurrentUser({commit}, payload) {
                commit('setCurrentUser', payload);
            },
            setLoginModalOpen({commit}, payload) {
                commit('setLoginModalOpen', payload);
            }
        },
        modules: {
            userDashboardStore,
            locationsDashboardStore,
            customersDashboardStore,
            vehiclesDashboardStore
        }
    });

export {
    store
};
