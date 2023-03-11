<template>
    <div class="dialog__wrapper" v-if="$store.state['customersStore'].addCustomersModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('customersStore/setAddCustomersModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add a new customer
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="name">
                        Name
                    </label>
                    <input v-model="name" id="name" type="text" class="input input--text" name="name" autocomplete="off" />
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
    import { addNewCustomer } from '../apps/CustomersDashboard/customers-store';
    export default {
        data() {
            return {
                name: '',
            }
        },
        props: {
            apollo: {}
        },
        methods: {
            addCustomer() {
                const store = this.$store;

                this.apollo.mutate({
                    mutation: addNewCustomer,
                    variables: {
                        name: this.name
                    }
                }).then((result) => {
                    this.apollo.queries.customers.refetch();
                    store.dispatch('customersStore/setAddCustomersModalClosed');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this location');
                });
            },
            handleFormSubmit() {
               this.addCustomer();
            }
        }
    }
</script>
