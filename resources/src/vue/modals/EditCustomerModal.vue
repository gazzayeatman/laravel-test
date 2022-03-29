<template>
    <div class="dialog__wrapper" v-if="$store.state['customersDashboardStore'].editCustomerModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('customersDashboardStore/setEditCustomerModalState', false)" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Edit {{ customer.name }}
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="name">
                        Name
                    </label>
                    <input v-model="name" id="name" type="name" class="input input--text" name="name" :placeholder="customer.name" autocomplete="off" />
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
    import { updateCustomerMutation } from '../apps/CustomersDashboard/customers-dashboard-store';

    export default {
        data() {
            this.name = '';
        },
        props: {
            customer: {}
        },
        methods: {
            editCustomer() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: updateCustomerMutation,
                    variables: {
                        id: this.customer.id,
                        name: this.name
                    }
                }).then((result) => {
                    this.$store.dispatch('customersDashboardStore/setCurrentCustomer', this.customer.id);
                    store.dispatch('customersDashboardStore/setEditCustomerModalState');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.editCustomer();
            }
        },
        mounted() {
            this.name = this.customer.name;
        }
    }
</script>
