import gql from 'graphql-tag';

const getCustomersQuery = gql`
    {
        customers {
            id
            name
        }
    }
`,
    addNewCustomer = gql`
         mutation (
            $name: String,
            $contact: Int,
        ) {
            addNewCustomer(
                name: $name,
                contact: $contact
            ) {
                id
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
    addNewCustomer
}
