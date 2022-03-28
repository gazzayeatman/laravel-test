<template>
    <div class="dialog__wrapper" v-if="$store.state['locationsDashboardStore'].addLocationsModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('locationsDashboardStore/setAddLocationModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add a new location
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="unit-number">
                        Unit Number
                    </label>
                    <input v-model="unitNumber" id="unit-number" type="text" class="input input--text" name="unit-number" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="street-number">
                        Street Number
                    </label>
                    <input v-model="streetNumber" id="street-number" type="text" class="input input--text" name="sreeet-number" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="street-name">
                        Street Name
                    </label>
                    <input v-model="streetName" id="street-name" type="text" class="input input--text" name="street-name" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="suburb">
                        Suburb
                    </label>
                    <input v-model="suburb" id="suburb" type="text" class="input input--text" name="suburb" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="city">
                        City
                    </label>
                    <input v-model="city" id="city" type="text" class="input input--text" name="city" autocomplete="off" />
                </div>
                <div class="form__input-field" v-if="!customer">
                    <label class="form__input-label" for="customer">
                        Customer
                    </label>
                   <select name="customer" v-model="customerID">
                       <option :value="customer.id" v-for="customer in customers">
                           {{ customer.name }}
                        </option>
                    </select>
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
    import { getCustomersQuery } from '../apps/CustomersDashboard/customers-dashboard-store';
    import { addNewLocationMutation } from '../apps/LocationsDashboard/locations-dashboard-store';
    export default {
        data() {
            return {
                unitNumber: '',
                streetNumber: '',
                streetName: '',
                suburb: '',
                city: '',
                customerID: 0,
                customers: []
            }
        },
        props: {
            customer: {}
        },
        methods: {
            getCurrentCustomerID() {
                if (this.customer) {
                    return this.customer.id;
                }

                return this.customerID;
            },
            addLocation() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: addNewLocationMutation,
                    variables: {
                        name: this.name,
                        unitNumber: this.unitNumber,
                        streetNumber: this.streetNumber,
                        streetName: this.streetName,
                        suburb: this.suburb,
                        city: this.city,
                        customer_id: this.getCurrentCustomerID()
                    }
                }).then((result) => {
                    if (apollo.queries.locations) {
                        apollo.queries.locations.refetch();
                    }
                    
                    store.dispatch('locationsDashboardStore/setAddLocationModalClosed');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this location');
                });
            },
            handleFormSubmit() {
               this.addLocation();
            }
        },
        apollo: {
            customers: getCustomersQuery
        },
        computed: {
            modalOpened() {
                return this.$store.state['locationsDashboardStore'].getAddUserModalOpen;
            }
        }
    }
</script>
