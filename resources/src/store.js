import { createStore } from 'vuex';
import { userDashboardStore } from './vue/apps/UserDashboard/user-dashboard-store';
import { locationsDashboardStore } from './vue/apps/LocationsDashboard/locations-dashboard-store';
import { customersDashboardStore } from './vue/apps/CustomersDashboard/customers-dashboard-store';
import gql from 'graphql-tag';

const getCurrentUserQuery = gql`
    {
        currentUser {
            name
            email
        }
    }
`,
    store = createStore({
        state: {
            apollo: false,
            currentUser: false
        },
        mutations: {
            setApolloClient(state, apollo) {
                state.apollo = apollo;
            },
            setCurrentUser(state, payload) {
                state.currentUser = payload;
            }
        },
        actions: {
            setApolloClient({commit}, apollo) {
                commit('setApolloClient', apollo);
            },
            setCurrentUser({commit}, payload) {
                commit('setCurrentUser', payload);
            }
        },
        modules: {
            userDashboardStore,
            locationsDashboardStore,
            customersDashboardStore
        }
    });

export {
    store,
    getCurrentUserQuery
};
