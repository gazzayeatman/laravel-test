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
            bookings {
                id
                name
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
                    contacts {
                        id
                        firstName
                        lastName
                    }
                }
                contacts {
                    id
                    firstName
                    lastName
                    emailAddress
                    phoneNumber
                }
                bookings {
                    id
                    name
                }
            }
        }
    `,
    getBooking = gql`
        query($id: ID) {
            booking(id: $id) {
                id
                name
                orderNumber
                inWaitingList
                vehicle {
                    id
                    title
                }
                location {
                    id
                    unitNumber
                    streetNumber
                    streetName
                    suburb
                    city
                }
                driver {
                    id
                    name
                }
                mainContact {
                    id
                    emailAddress
                    firstName
                    lastName
                }
                customer {
                    id
                    name
                }
                bookingTimes {
                    id
                    date
                    startTime
                    endTime
                }
            }
        }
    `,
    addNewCustomer = gql`
         mutation (
            $name: String
        ) {
            addNewCustomer(
                input: {
                    name: $name
                }
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
                input: {
                    id: $id
                    name: $name
                }
            ) {
                name
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
    deleteBookingMutation = gql`
        mutation(
            $id: ID!
        ) {
            deleteBooking(id: $id) {
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
            $customer: ID,
            $bookingTimes: [CreateBookingTimeInput]

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
                    customer: {
                        connect: $customer
                    },
                    bookingTimes: {
                        create: $bookingTimes
                    }
                }
            ) {
                id
                bookingTimes {
                    date
                }
            }
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
            currentCustomer: false,
            currentBooking: false,
            availableContacts: []
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
            },
            setCurrentBooking(state, payload) {
                state.currentBooking = payload;
            },
            setAvailableContacts(state, payload) {
                state.availableContacts = payload;
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
            },
            setCurrentBooking({commit}, payload) {
                if (!payload) {
                    commit('setCurrentBooking', false);
                }

                this.state.apollo.query(
                    {
                        query: getBooking,
                        fetchPolicy: 'no-cache',
                        variables: {
                            id: payload
                        }
                    }
                ).then((result) => {
                    commit('setCurrentBooking', result.data.booking);
                }).catch((err) => console.log(err));
            },
            setAvailableContacts({commit}, payload) {
                commit('setAvailableContacts', payload);
            }
        }
    };

export {
    customersStore,
    getCustomersQuery,
    addNewCustomer,
    getCustomer,
    updateCustomerMutation,
    deleteCustomerMutation,
    getBookingsQuery,
    addNewBookingMutation,
    deleteBookingMutation
}
