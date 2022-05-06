<template>
    <div class="detail-page__section">
        <h3 class="detail-page__sub-title">
            Contacts
        </h3>
        <div v-if="customer.contacts && customer.contacts.length > 0" class="detail-page__detail-grid">
            <div class="action-panel">
                <button class="btn btn-primary"  @click="$store.dispatch('customersStore/setAddContactsModalState', true)">
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
                <button class="btn btn-primary"  @click="$store.dispatch('customersStore/setAddContactsModalState', true)">
                    Add a new contact
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import BackButton from '../../../compoments/BackButton.vue';
    import AddLocationModal from '../../../modals/AddLocationModal.vue';
    import EditCustomerModal from '../../../modals/EditCustomerModal.vue';
    import { deleteLocationMutation } from '../../LocationsDashboard/locations-store';
    import { deleteCustomerMutation } from '../../CustomersDashboard/customers-store';

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
