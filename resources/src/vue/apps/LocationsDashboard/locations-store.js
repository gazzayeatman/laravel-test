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
    deleteLocationMutation = gql`
        mutation ($id: ID!) {
            deleteLocation(id: $id) {
                id
            }
        }
    `,
    locationsStore = {
        namespaced: true,
        state: {
            locations: [],
            addLocationsModalOpen: false
        },
        mutations: {
            setAddLocationsModalState(state, payload) {
                state.addLocationsModalOpen = payload
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
            }
        },
        getters: {
            getAddLocationModalOpen() {
                return state.addLocationsModalOpen;
            }
        }
    };

export {
    locationsStore,
    getLocationsQuery,
    addNewLocationMutation,
    deleteLocationMutation
}
