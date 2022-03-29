<template>
    <router-view>
        <div class="container">
            <h1>
                Vehicles Dashboard
            </h1>
            <div class="action-panel">
                <button @click="$store.dispatch('vehiclesDashboardStore/setAddVehicleModalState', true)" class="btn btn-primary">
                    Add Vehicle
                </button>
            </div>
            <div class="grid-view__wrapper" v-for="vehicle of vehicles">
                <div class="grid-view">
                    <div class="grid-view__information">
                        <div class="grid-view__id">
                            {{ vehicle.id }}
                        </div>
                        <div class="grid-view__column">
                            {{ vehicle.title }}
                        </div>
                        <div class="grid-view__column">
                            {{ vehicle.registration }}
                        </div>
                    </div>
                    <div class="grid-view__actions">
                        <button @click="$store.dispatch('vehiclesDashboardStore/setEditVehicleModalState', { open: true, vehicle: vehicle})" class="btn btn-primary">
                            Edit
                        </button>
                        <button @click="deleteUser(user.id)" class="btn btn-primary btn--danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <edit-vehicle-modal />
            <add-vehicle-modal />
        </div>
    </router-view>
</template>
<script>
    import { getVehiclesQuery } from './vehicles-dashboard-store';
    import AddVehicleModal from '../../modals/AddVehicleModal.vue';
    import EditVehicleModal from '../../modals/EditVehicleModal.vue';

    export default {
        data() {
            return {
                vehicles: []
            }
        },
        apollo: {
            vehicles: getVehiclesQuery
        },
        components: {
            'add-vehicle-modal': AddVehicleModal,
            'edit-vehicle-modal': EditVehicleModal
        }
    }
</script>