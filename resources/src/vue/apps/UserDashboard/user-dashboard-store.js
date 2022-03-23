import gql from 'graphql-tag';

const getUsersQuery = gql`
    {
        users {
            id
            name
            email
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
            $password: String!
        ) {
            addNewUser(
                name: $name,
                email: $email,
                password: $password
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
            $email: String
        ) {
            updateUser(
                id: $id,
                name: $name,
                email: $email,
            ) {
                name
                email
            }
        }
    `,
    userDashboardStore = {
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
            setApolloClient(state, apollo) {
                state.apollo = apollo;
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
            },
            setApolloClient({commit}, apollo) {
                commit('setApolloClient', apollo);
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
    userDashboardStore,
    getUsersQuery,
    deleteUserMutation,
    addNewUserMutation,
    editUserMutation
}
