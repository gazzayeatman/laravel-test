<template>
    <div class="container">
        <h1>
            Locations Dashboard
        </h1>
        <div class="action-panel">
            <button @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')" class="btn btn-primary">
                Add Location
            </button>
        </div>
        <div class="grid-view__wrapper" v-for="location of locations">
            <div class="grid-view">
                <div class="grid-view__information">
                    <div class="grid-view__id">
                        {{ location.id }}
                    </div>
                    <div class="grid-view__column">
                        {{ location.unitNumber }} {{ location.streetNumber }} {{ location.streetName }} {{ location.suburb }} {{ location.city }} 
                    </div>
                    <div class="grid-view__column" v-if="location.customer && location.customer.name">
                        {{ location.customer.name }} 
                    </div>
                </div>
                <div class="grid-view__actions">
                    <!-- <button @click="$store.dispatch('locationsDashboardStore/setEditUserModalOpen', user)" class="btn btn-primary">
                        Edit
                    </button> -->
                    <button @click="deleteUser(user.id)" class="btn btn-primary btn--danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <add-location-modal />
    </div>
</template>
<script>
    import { getLocationsQuery } from './locations-dashboard-store';
    import AddLocationModal from '../../modals/AddLocationModal.vue';

    export default {
        data() {
            return {
                locations: []
            }
        },
        apollo: {
            locations: getLocationsQuery
        },
        components: {
            'add-location-modal': AddLocationModal
        },
        mounted() {
            this.$store.dispatch('setApolloClient', this.$apollo);
        }
    }
</script>