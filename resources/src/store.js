import { createStore } from 'vuex';
import { usersStore } from './vue/apps/UserDashboard/users-store';
import { locationsStore } from './vue/apps/LocationsDashboard/locations-store';
import { customersStore } from './vue/apps/CustomersDashboard/customers-store';
import { vehiclesStore } from './vue/apps/VehiclesDashboard/vehicles-store';
import { contactsStore } from './vue/apps/ContactsDashboard/contacts-store';

const store = createStore({
        state: {
            apollo: false,
            currentUser: false,
            loginModalOpen: false,
            temporaryBookingTimes: []
        },
        mutations: {
            setApolloClient(state, apollo) {
                state.apollo = apollo;
            },
            setCurrentUser(state, payload) {
                state.currentUser = payload;
            },
            setTemporaryBookingTimes(state, payload) {
                state.temporaryBookingTimes = payload;
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
            },
            setTemporaryBookingTimes({commit}, payload) {
                commit('setTemporaryBookingTimes', payload);
            },
        },
        modules: {
            usersStore,
            locationsStore,
            customersStore,
            vehiclesStore,
            contactsStore
        }
    });

export {
    store
};
