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
    getBookingsQuery = gql`
        {
            bookings {
                id
                name
                orderNumber
                vehicle {
                    id
                }
                location {
                    id
                }
                driver {
                    id
                }
                mainContact {
                    id
                }
            }
        }
    `,
    addNewBookingMutation = gql`
        mutation (
            $name: String,
            $orderNumber: String,
            $inWaitingList: Boolean,
            $vehicle: ID
            $location: ID
            $driver: ID
            $mainContact: ID
        ) {
            addNewBooking(
                input: {
                    name: $name,
                    orderNumber: $orderNumber,
                    inWaitingList: $inWaitingList,
                    vehicle: {
                        connect: $vehicle
                    },
                    location: {
                        connect: $location
                    }
                    driver: {
                        connect: $driver
                    }
                    mainContact: {
                        connect: $mainContact
                    }
                }
            )
        }
    `,
    customersStore = {
        namespaced: true,
        state: {
            customers: [],
            addCustomersModalOpen: false,
            editCustomerModalOpen: false,
            addContactsModalOpen: false,
            addBookingModalOpen: false,
            editBookingModalOpen: false,
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
            setAddBookingModalState(state, payload) {
                state.addBookingModalOpen = payload;
            },
            setEditBookingModalState(state, payload) {
                state.editBookingModalOpen = payload;
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
            setAddBookingModalState({commit}, payload) {
                commit('setAddBookingModalState', payload);
            },
            setEditBookingsModalOpen({commit}, payload) {
                commit('setEditBookingModalState', payload);
            },
            setEditBookingsModalClosed({commit}, payload) {
                commit('setEditBookingModalState', payload);
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
    customersStore,
    getCustomersQuery,
    addNewCustomer,
    getCustomer,
    updateCustomerMutation,
    addNewContactMutation,
    deleteCustomerMutation,
    getBookingsQuery,
    addNewBookingMutation
}
