<template>
    <div class="container">
        <back-button />
        <div class="detail-page__wrapper">
            <div class="detail-page__header">
                <h2 class="detail-page__title">
                    {{ customer.name }}
                </h2>
            </div>
            <div class="action-panel">
                <button @click="$store.dispatch('customersDashboardStore/setEditCustomerModalOpen')" class="btn btn-primary">
                    Edit {{ customer.name }}
                </button>
            </div>
            <div class="detail-page__content">
                <h3 class="detail-page__sub-title">
                    Locations
                </h3>
                <div v-if="customer.locations && customer.locations.length > 0" class="detail-page__detail-grid">
                    <div class="action-panel">
                        <button @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')" class="btn btn-primary">
                            Add Location
                        </button>
                    </div>
                    <div class="grid-view__wrapper" v-for="location of customer.locations">
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
                                <button @click="deleteLocation(location.id)" class="btn btn-primary btn--danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
                    <div class="detail-page__detail-grid-content">
                        Nothing here?, Add a location now
                    </div>
                    <div class="detail-page__detail-grid-action-panel">
                        <button class="btn btn-primary" @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')">
                            Add a new location
                        </button>
                    </div>
                </div>
                <!-- <h3 class="detail-page__sub-title">
                    Contacts
                </h3>
                <div v-if="customer.contacts > 0" class="detail-page__detail-grid">

                </div>
                <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
                    <div class="detail-page__detail-grid-content">
                        Nothing here?, Add a contact now
                    </div>
                    <div class="detail-page__detail-grid-action-panel">
                        <button class="btn btn-primary"  @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')">
                            Add a new contact
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
        <add-location-modal :customer="customer" />
    </div>
</template>
<script>
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';
    import AddLocationModal from '../../../modals/AddLocationModal.vue';
    import { deleteLocationMutation } from '../../LocationsDashboard/locations-dashboard-store';

    export default {
        computed: {
            customer() {
                return this.$store.state['customersDashboardStore'].currentCustomer;
            }
        },
        created() {
            const store = this.$store;

            this.customerID = useRoute().params.id;

            store.dispatch('customersDashboardStore/setCurrentCustomer', this.customerID);
        },
        methods: {
            deleteLocation(id) {
                this.$apollo.mutate({
                    mutation: deleteLocationMutation,
                    variables: {
                        id: id
                    }
                }).then(() => {
                    this.$store.dispatch('customersDashboardStore/setCurrentCustomer', this.customerID);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'back-button': BackButton,
            'add-location-modal': AddLocationModal
        }
    }
</script>