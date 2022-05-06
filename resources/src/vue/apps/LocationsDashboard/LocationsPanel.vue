<template>
    <div class="detail-page__section">
        <h3 class="detail-page__sub-title">
            Locations
        </h3>
        <div v-if="customer.locations && customer.locations.length > 0" class="detail-page__detail-grid">
            <div class="action-panel">
                <button @click="$store.dispatch('locationsStore/setAddLocationModalOpen')" class="btn btn-primary">
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
                <button class="btn btn-primary" @click="$store.dispatch('locationsStore/setAddLocationModalOpen')">
                    Add a new location
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import BackButton from '../../compoments/BackButton.vue';
    import AddLocationModal from '../../modals/AddLocationModal.vue';
    import EditCustomerModal from '../../modals/EditCustomerModal.vue';
    import { deleteLocationMutation } from './locations-store';
    import { deleteCustomerMutation } from '../CustomersDashboard/customers-store';

    export default {
        props: {
            customer: {}
        },
        methods: {
            deleteCustomer(id) {
                this.$apollo.mutate({
                    mutation: deleteCustomerMutation,
                    variables: {
                        id: id
                    }
                }).then(() => {
                    this.$router.push('/customers') 
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            },
            deleteLocation(id) {
                this.$apollo.mutate({
                    mutation: deleteLocationMutation,
                    variables: {
                        id: id
                    }
                }).then(() => {
                    this.$store.dispatch('customersStore/setCurrentCustomer', this.customerID);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'back-button': BackButton,
            'add-location-modal': AddLocationModal,
            'edit-customer-modal': EditCustomerModal
        }
    }
</script>
