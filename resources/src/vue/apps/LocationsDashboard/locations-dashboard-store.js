import gql from 'graphql-tag';

const getLocationsQuery = gql`
    {
        locations {
            id
            unitNumber
            streetNumber
            streetName
            suburb
            city
            customer {
                id
                name
            }
        }
    }
`,
    addNewLocationMutation = gql`
        mutation (
            $unitNumber: String,
            $streetNumber: String,
            $streetName: String,
            $suburb: String,
            $city: String,
            $customer_id: ID
        ) {
            addNewLocation(
                unitNumber: $unitNumber,
                streetNumber: $streetNumber,
                streetName: $streetName,
                suburb: $suburb,
                city: $city,
                customer_id: $customer_id
            ) {
                id
                unitNumber
                streetNumber
                streetName
                suburb
                city
                customer {
                    id
                    name
                }
            }
        }
    `,
    locationsDashboardStore = {
        namespaced: true,
        state: {
            locations: [],
            addLocationsModalOpen: false,
            apollo: false
        },
        mutations: {
            setAddLocationsModalState(state, payload) {
                state.addLocationsModalOpen = payload
            },
            setApolloClient(state, apollo) {
                state.apollo = apollo;
            }
        },
        actions: {
            setEditUserModalOpen({commit}, user) {
                commit('setEditUserModalState', true);
                commit('setCurrentUser', user);
            },
            setEditUserModalClosed({commit}) {
                commit('setEditUserModalState', false);
                commit('setCurrentUser', false)
            },
            setAddLocationModalOpen({commit}) {
                commit('setAddLocationsModalState', true);
            },
            setAddLocationModalClosed({commit}) {
                commit('setAddLocationsModalState', false);
            },
            setApolloClient({commit}, apollo) {
                commit('setApolloClient', apollo);
            }
        },
        getters: {
            getAddLocationModalOpen() {
                return state.addLocationsModalOpen;
            }
        }
    };

export {
    locationsDashboardStore,
    getLocationsQuery,
    addNewLocationMutation
}
