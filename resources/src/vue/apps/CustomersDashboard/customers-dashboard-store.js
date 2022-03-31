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
                    emailAddress
                    phoneNumber
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
    updateCustomerMutation = gql`
        mutation (
            $id: ID!
            $name: String
        ) {
            updateCustomer(
                id: $id
                name: $name
            ) {
                name
            }
        }
    `,
    addNewContactMutation = gql`
        mutation (
            $firstName: String,
            $lastName: String,
            $phoneNumber: String,
            $emailAddress: String,
            $customer_id: ID!
        ) {
            addNewContact(
                firstName: $firstName
                lastName: $lastName,
                emailAddress: $emailAddress,
                phoneNumber: $phoneNumber,
                customer_id: $customer_id
            ) {
                firstName,
                lastName,
                phoneNumber,
                emailAddress
            }
        }
    `,
    deleteCustomerMutation = gql`
        mutation(
            $id: ID!
        ) {
            deleteCustomer(id: $id) {
                id
            }
        }
    `,
    customersDashboardStore = {
        namespaced: true,
        state: {
            customers: [],
            addCustomersModalOpen: false,
            editCustomerModalOpen: false,
            addContactsModalOpen: false,
            currentCustomer: false
        },
        mutations: {
            setAddCustomersModalState(state, payload) {
                state.addCustomersModalOpen = payload;
            },
            setEditCustomerModalState(state, payload) {
                state.editCustomerModalOpen = payload;
            },
            setAddContactsModalState(state, payload) {
                state.addContactsModalOpen = payload;
            },
            setCurrentCustomer(state, payload) {
                state.currentCustomer = payload;
            }
        },
        actions: {
            setAddCustomersModalOpen({commit}) {
                commit('setAddCustomersModalState', true);
            },
            setAddCustomersModalClosed({commit}) {
                commit('setAddCustomersModalState', false);
            },
            setEditCustomerModalState({commit}, payload) {
                commit('setEditCustomerModalState', payload);
            },
            setAddContactsModalState({commit}, payload) {
                commit('setAddContactsModalState', payload);
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
    getCustomer,
    updateCustomerMutation,
    addNewContactMutation,
    deleteCustomerMutation
}
