import gql from 'graphql-tag';

const getCustomersQuery = gql`
    {
        customers {
            id
            name
            locations {
                id
            }
            contacts {
                id
                firstName
                lastName
            }
        }
    }
`,
    getCustomer = gql`
        query($id: ID!) {
            customer(id: $id) {
                id
                name
                locations {
                    id
                    unitNumber
                    streetNumber
                    streetName
                    suburb
                    city
                }
                contacts {
                    id
                    firstName
                    lastName
                }
            }
        }
    `,
    addNewCustomer = gql`
         mutation (
            $name: String
        ) {
            addNewCustomer(
                name: $name
            ) {
                name
            }
        }
    `,
    customersDashboardStore = {
        namespaced: true,
        state: {
            customers: [],
            addCustomersModalOpen: false
        },
        mutations: {
            setAddCustomersModalState(state, payload) {
                state.addCustomersModalOpen = payload
            }
        },
        actions: {
            setAddCustomersModalOpen({commit}) {
                commit('setAddCustomersModalState', true);
            },
            setAddCustomersModalClosed({commit}) {
                commit('setAddCustomersModalState', false);
            }
        }
    };

export {
    customersDashboardStore,
    getCustomersQuery,
    addNewCustomer,
    getCustomer
}
