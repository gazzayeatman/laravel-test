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
            driver {
                id
                name
            }
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
            $driver: ID
            $isActive: Boolean
        ) {
            addNewVehicle(
                input: {
                    title: $title,
                    registration: $registration,
                    loadWeight: $loadWeight,
                    liftWeight: $liftWeight,
                    wofExpiry: $wofExpiry,
                    registrationExpiry: $registrationExpiry,
                    driver: {
                        sync: $driver
                    },
                    isActive: $isActive
                }
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
            $driver: ID
            $isActive: Boolean
        ) {
            updateVehicle(
                input: {
                    id: $id,
                    title: $title,
                    registration: $registration,
                    loadWeight: $loadWeight,
                    liftWeight: $liftWeight,
                    wofExpiry: $wofExpiry,
                    registrationExpiry: $registrationExpiry,
                    driver: {
                        connect: $driver
                    },
                    isActive: $isActive
                }
                
            ) {
                id
                title
                registration
                loadWeight
                liftWeight
                wofExpiry
                registrationExpiry
                isActive
                driver {
                    id
                    name
                }
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
            setDrivers({commit}, state) {
                commit('setDrivers', state);
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
