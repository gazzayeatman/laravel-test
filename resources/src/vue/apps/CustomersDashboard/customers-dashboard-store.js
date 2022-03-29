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
            addCustomersModalOpen: false,
            currentCustomer: false
        },
        mutations: {
            setAddCustomersModalState(state, payload) {
                state.addCustomersModalOpen = payload
            },
            setCurrentCustomer(state, payload) {
                state.currentCustomer = payload
            }
        },
        actions: {
            setAddCustomersModalOpen({commit}) {
                commit('setAddCustomersModalState', true);
            },
            setAddCustomersModalClosed({commit}) {
                commit('setAddCustomersModalState', false);
            },
            setCurrentCustomer({commit}, payload) {
                if (!payload) {
                    commit('setCurrentCustomer', false);
                }

                this.state.apollo.query(
                    {
                        query: getCustomer,
                        fetchPolicy: 'no-cache',
                        variables: {
                            id: payload
                        }
                    }
                ).then((result) => {
                    commit('setCurrentCustomer', result.data.customer);
                }).catch((err) => console.log(err));
            }
        }
    };

export {
    customersDashboardStore,
    getCustomersQuery,
    addNewCustomer,
    getCustomer
}
