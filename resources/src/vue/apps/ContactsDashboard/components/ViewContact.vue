<template>
    <div class="container">
        <back-button />
        <div class="detail-page__wrapper">
            <div class="detail-page__section">
                <div class="detail-page__header">
                    <h2 class="detail-page__title">
                        {{ contact.firstName }} {{ contact.lastName }}
                    </h2>
                </div>
                <div class="action-panel">
                    <button @click="deleteContact(contact.id)" class="btn btn-primary btn--danger">
                        Delete
                    </button>
                    <button @click="$store.dispatch('contactsStore/setEditCustomerModalState', true)" class="btn btn-primary">
                        Edit
                    </button>
                </div>
                <div class="detail-page__content">
                    {{ contact.emailAddress }}
                    {{ contact.phoneNumber }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';
    import { deleteContact } from '../contacts-store';

    export default {
        computed: {
            contact() {
                return this.$store.state['contactsStore'].currentContact;
            }
        },
        created() {
            const store = this.$store;

            this.contactID = useRoute().params.id;
            store.dispatch('contactsStore/setCurrentContact', this.contactID);
        },
        methods: {
            deleteContact(id) {
                this.$apollo.mutate({
                    mutation: deleteContact,
                    variables: {
                        id: id
                    }
                }).then((result) => {
                    console.log(result.data.deleteContact);
                    this.$store.dispatch('contactsStore/setCurrentContact', false);
                    this.$router.push(`/customers/view-customer/${result.data.deleteContact.customer.id}`);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'back-button': BackButton,
        }
    }
</script>