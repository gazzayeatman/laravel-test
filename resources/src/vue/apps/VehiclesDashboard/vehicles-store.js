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
    getDrivers = gql`
        {
            drivers {
                id
                name
            }
        }
    `,
    vehiclesStore = {
        namespaced: true,
        state: {
            AddVehiclesModalOpen: false,
            EditVehicleModalOpen: false,
            currentVehicle: false,
            drivers: []
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
            },
            setDrivers(state, payload) {
                state.drivers = payload;
            }
        },
        actions: {
            setAddVehicleModalState({commit}, state) {
                commit('setAddVehicleModalState', state);
            },
            getDrivers({commit}, state) {
                this.state.apollo.query({
                    query: getDrivers,
                    variables: {

                    }
                })
                // commit('setDrivers', state);
            },
            setEditVehicleModalState({commit}, payload) {
                commit('setCurrentVehicle', payload.vehicle);
                commit('setEditVehicleModalState', payload.open);
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
    deleteVehicle,
    getDrivers
}
