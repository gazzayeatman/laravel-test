import gql from 'graphql-tag';

const getContact = gql`
    query($id: ID!) {
        contact(id: $id) {
            id
            firstName
            lastName
            phoneNumber
            emailAddress
        }
    }
`,
    deleteContact = gql`
        mutation(
            $id: ID!
        ) {
            deleteContact(id: $id) {
                id
                customer {
                    id
                }
            }
        }
    `,
    contactsStore = {
        namespaced: true,
        state: {
            contacts: [],
            currentContact: false
        },
        mutations: {
            setCurrentContact(state, contact) {
                state.currentContact = contact;
            }
        },
        actions: {
            setCurrentContact({commit}, payload) {
                if (!payload) {
                    commit('setCurrentContact', false);
                }

                this.state.apollo.query(
                    {
                        query: getContact,
                        fetchPolicy: 'no-cache',
                        variables: {
                            id: payload
                        }
                    }
                ).then((result) => {
                    commit('setCurrentContact', result.data.contact);
                }).catch((err) => console.log(err));
            }
        }
    };

export {
    contactsStore,
    deleteContact
}
