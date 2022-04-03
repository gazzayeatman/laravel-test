<template>
    <div class="dialog__wrapper" v-if="$store.state['customersStore'].addContactsModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('customersStore/setAddContactsModalState', false)" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add a new contact
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="emailAddress">
                        Email Address
                    </label>
                    <input v-model="emailAddress" id="emailAddress" type="email" class="input input--text" name="emailAddress" autocomplete="off" autofocus />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="firstName">
                        First Name
                    </label>
                    <input v-model="firstName" id="firstName" type="text" class="input input--text" name="firstName" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="lastName">
                        Last Name
                    </label>
                    <input v-model="lastName" id="lastName" type="text" class="input input--text" name="lastName" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="phoneNumber">
                        Phone Number
                    </label>
                    <input v-model="phoneNumber" id="phoneNumber" type="text" class="input input--text" name="phoneNumber" autocomplete="off" />
                </div>
                <div class="form__action-panel form__action-panel--right">
                    <div class="form__action-panel-group">
                        <button type="submit" class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { addNewContactMutation } from '../apps/CustomersDashboard/customers-store';

    export default {
        data() {
            return {
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
            }
        },
        props: {
            customer: {}
        },
        methods: {
            addContact() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: addNewContactMutation,
                    variables: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        emailAddress: this.emailAddress,
                        phoneNumber: this.phoneNumber,
                        customer_id: this.customer.id
                    }
                }).then((result) => {
                    this.$store.dispatch('customersStore/setCurrentCustomer', this.customer.id);
                    store.dispatch('customersStore/setAddContactsModalState', false);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.addContact();
            }
        }
    }
</script>
