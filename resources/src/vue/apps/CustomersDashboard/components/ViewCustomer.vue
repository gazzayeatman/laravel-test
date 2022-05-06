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
                <button @click="$store.dispatch('customersStore/setEditCustomerModalState', true)" class="btn btn-primary">
                    Edit {{ customer.name }}
                </button>
            </div>
            <div class="detail-page__content">
                <locations-panel :customer="customer" />
                <contacts-panel :customer="customer" />
                <bookings-panel :customer="customer" />
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
    import LocationsPanel from '../../LocationsDashboard/components/LocationsPanel.vue';
    import ContactsPanel from '../../ContactsDashboard/components/ContactsPanel.vue';
    import BookingsPanel from '../../CustomersDashboard/components/BookingsPanel.vue';

    export default {
        computed: {
            customer() {
                return this.$store.state['customersStore'].currentCustomer;
            }
        },
        created() {
            const store = this.$store;

            this.customerID = useRoute().params.id;
            store.dispatch('customersStore/setCurrentCustomer', this.customerID);
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
            'edit-customer-modal': EditCustomerModal,
            'add-contact-modal': AddContactModal,
            'locations-panel': LocationsPanel,
            'contacts-panel': ContactsPanel,
            'bookings-panel': BookingsPanel
        }
    }
</script>