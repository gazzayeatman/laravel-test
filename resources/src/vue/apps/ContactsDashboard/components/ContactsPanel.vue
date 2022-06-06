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
                <div v-masonry-tile class="contact-cards__wrapper" v-for="(contact, index) in customer.contacts" :key="index">
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
        <add-contact-modal :customer="customer" />
    </div>
</template>
<script>
    import BackButton from '../../../compoments/BackButton.vue';
    import { deleteLocationMutation } from '../../LocationsDashboard/locations-store';
    import AddContactModal from '../../../modals/AddContactModal.vue';

    export default {
        props: {
            customer: {}
        },
        methods: {
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
            'add-contact-modal': AddContactModal,
        }
    }
</script>
