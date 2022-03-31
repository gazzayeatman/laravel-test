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
                <button @click="deleteCustomer(customer.id)" class="btn btn-primary btn--danger">
                    Delete {{ customer.name }}
                </button>
                <button @click="$store.dispatch('customersDashboardStore/setEditCustomerModalState', true)" class="btn btn-primary">
                    Edit {{ customer.name }}
                </button>
            </div>
            <div class="detail-page__content">
                <div class="detail-page__section">
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
                </div>
                <div class="detail-page__section">
                    <h3 class="detail-page__sub-title">
                        Contacts
                    </h3>
                    <div v-if="customer.contacts && customer.contacts.length > 0" class="detail-page__detail-grid">
                        <div class="action-panel">
                            <button class="btn btn-primary"  @click="$store.dispatch('customersDashboardStore/setAddContactsModalState', true)">
                                Add a new contact
                            </button>
                        </div>
                        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".contact-card__wrapper">
                            <div v-masonry-tile class="contact-cards__wrapper" v-for="(contact, index) in customer.contacts">
                                <router-link class="contact-card__wrapper" :to="{ path: '/customers/view-contact/' + contact.id }">
                                    <div class="contact-card">
                                        <h3 class="contact-card__title">
                                            {{ contact.emailAddress }}
                                        </h3>
                                        <ul class="contact-card__list">
                                            <li class="contact-card__list-item">
                                                {{ contact.firstName }} {{ contact.lastName }}
                                            </li>
                                            <li class="contact-card__list-item">
                                                {{ contact.phoneNumber }}
                                            </li>
                                        </ul>
                                    </div>
                                </router-link >
                            </div>
                        </div>
                    </div>
                    <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
                        <div class="detail-page__detail-grid-content">
                            Nothing here?, Add a contact now
                        </div>
                        <div class="detail-page__detail-grid-action-panel">
                            <button class="btn btn-primary"  @click="$store.dispatch('customersDashboardStore/setAddContactsModalState', true)">
                                Add a new contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <add-location-modal :customer="customer" />
        <edit-customer-modal :customer="customer" />
        <add-contact-modal :customer="customer" />
    </div>
</template>
<script>
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';
    import AddLocationModal from '../../../modals/AddLocationModal.vue';
    import EditCustomerModal from '../../../modals/EditCustomerModal.vue';
    import AddContactModal from '../../../modals/AddContactModal.vue';
    import { deleteLocationMutation } from '../../LocationsDashboard/locations-dashboard-store';
    import { deleteCustomerMutation } from '../customers-dashboard-store';

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
                    this.$store.dispatch('customersDashboardStore/setCurrentCustomer', this.customerID);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'back-button': BackButton,
            'add-location-modal': AddLocationModal,
            'edit-customer-modal': EditCustomerModal,
            'add-contact-modal': AddContactModal
        }
    }
</script>