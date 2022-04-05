import gql from 'graphql-tag';

const getUsersQuery = gql`
    {
        users {
            id
            name
            email
            roles {
                id
                title
            }
        }
    }
`,
    getRolesQuery = gql`
        {
            roles {
                id
                title
            }
        }
    `,
    deleteUserMutation = gql`
        mutation ($id: ID!) {
            deleteUser(id: $id) {
                id
            }
        }
    `,
    addNewUserMutation = gql`
        mutation (
            $name: String!,
            $email: String!,
            $password: String!,
            $roles: [ID]
        ) {
            addNewUser(
                input: {
                    name: $name,
                    email: $email,
                    password: $password,
                    roles: {
                        sync: $roles
                    }
                }
            ) {
                id
                name
                email
            }
        }
    `,
    editUserMutation = gql`
        mutation (
            $id: ID!
            $name: String,
            $email: String,
            $roles: [ID]
        ) {
            updateUser(
                input: {
                    id: $id,
                    name: $name,
                    email: $email,
                    roles: {
                        sync: $roles
                    }
                }
            ) {
                name
                email
            }
        }
    `,
    usersStore = {
        namespaced: true,
        state: {
            editUserModalOpen: false,
            addUserModalOpen: false,
            currentUser: false,
            apollo: false,
            users: []
        },
        mutations: {
            setEditUserModalState(state, payload) {
                state.editUserModalOpen = payload;
            },
            setAddUserModalState(state, payload) {
                state.addUserModalOpen = payload;
            },
            setCurrentUser(state, user) {
                state.currentUser = user;
            },
            setUsers(state, users) {
                state.users = users;
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
            setAddUserModalOpen({commit}) {
                commit('setAddUserModalState', true);
            },
            setAddUserModalClosed({commit}) {
                commit('setAddUserModalState', false);
            }
        },
        getters: {
            getEditUserModalOpen() {
                return state.editUserModalOpen;
            },
            getAddUserModalOpen() {
                return state.addUserModalOpen;
            },
            getCurrentUser() {
                return state.currentUser;
            },
            getUsers() {
                return state.users;
            },
            getApolloClient() {
                return state.apollo;
            }
        }
    };

export {
    usersStore,
    getUsersQuery,
    deleteUserMutation,
    addNewUserMutation,
    editUserMutation,
    getRolesQuery
}
