import gql from 'graphql-tag';

const getVehiclesQuery = gql`
    {
        vehicles {
            id
            title
            registration
            loadWeight
            liftWeight
            wofExpiry
            registrationExpiry
            isActive
        }
    }
`,
    addNewVehicleMutation = gql `
        mutation (
            $title: String
            $registration: String,
            $loadWeight: String,
            $liftWeight: String
            $wofExpiry: Date
            $registrationExpiry: Date
            $isActive: Boolean
        ) {
            addNewVehicle(
                title: $title,
                registration: $registration,
                loadWeight: $loadWeight,
                liftWeight: $liftWeight,
                wofExpiry: $wofExpiry,
                registrationExpiry: $registrationExpiry,
                isActive: $isActive
            ) {
                id
                title
                registration
                loadWeight
                liftWeight
                wofExpiry
                registrationExpiry
                isActive
            }
        }
    `,
    updateVehicleMutation = gql `
        mutation (
            $id: ID!
            $title: String
            $registration: String
            $loadWeight: String
            $liftWeight: String
            $wofExpiry: Date
            $registrationExpiry: Date
            $isActive: Boolean
        ) {
            updateVehicle(
                id: $id,
                title: $title,
                registration: $registration,
                loadWeight: $loadWeight,
                liftWeight: $liftWeight,
                wofExpiry: $wofExpiry,
                registrationExpiry: $registrationExpiry,
                isActive: $isActive
            ) {
                id
                title
                registration
                loadWeight
                liftWeight
                wofExpiry
                registrationExpiry
                isActive
            }
        }
    `,
    deleteVehicle = gql`
        mutation($id: ID!) {
            deleteVehicle(id: $id) {
                id
            }
        }
    `,
    vehiclesStore = {
        namespaced: true,
        state: {
            apollo: false,
            AddVehiclesModalOpen: false,
            EditVehicleModalOpen: false,
            currentVehicle: false
        },
        mutations: {
            setAddVehicleModalState(state, payload) {
                state.AddVehiclesModalOpen = payload;
            },
            setEditVehicleModalState(state, payload) {
                state.EditVehicleModalOpen = payload;
            },
            setCurrentVehicle(state, payload) {
                state.currentVehicle = payload;
                console.log(state.currentVehicle);
            }
        },
        actions: {
            setAddVehicleModalState({commit}, state) {
                commit('setAddVehicleModalState', state);
            },
            setEditVehicleModalState({commit}, payload) {
                commit('setCurrentVehicle', payload.vehicle);
                commit('setEditVehicleModalState', payload.open);
            },
            setApolloClient({commit}, apollo) {
                commit('setApolloClient', apollo);
            }
        },
        getters: {
            getApolloClient() {
                return state.apollo;
            },
            getCurrentVehicle() {
                return state.vehicle;
            }
        }
    };

export {
    vehiclesStore,
    getVehiclesQuery,
    addNewVehicleMutation,
    updateVehicleMutation,
    deleteVehicle
}
