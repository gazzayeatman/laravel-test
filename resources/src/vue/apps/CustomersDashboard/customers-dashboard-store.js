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
            $main_contact_id: Int
        ) {
            addNewCustomer(
                name: $name,
                main_contact_id: $main_contact_id
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
