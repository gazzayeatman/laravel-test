<template>
    <div class="container">
        <h1>
            Customers Dashboard
        </h1>
        <div class="action-panel">
            <button @click="$store.dispatch('customersStore/setAddCustomersModalOpen')" class="btn btn-primary">
                Add Customer
            </button>
        </div>
        <div v-masonry="containerId" transition-duration="0.3s" item-selector=".customer-card__wrapper">
            <div v-masonry-tile class="customer-cards__wrapper" v-for="(customer, index) in customers">
                <router-link class="customer-card__wrapper" :to="{ path: '/customers/view-customer/' + customer.id }">
                    <div class="customer-card">
                        <span class="customer-card__tag" v-if="customer.locations.length > 0">
                            Locations: {{ customer.locations.length }}
                        </span>
                        <h3 class="customer-card__title">
                            {{ customer.name }}
                        </h3>
                    </div>
                </router-link >
            </div>
        </div>
        <add-customer-modal />
    </div>
</template>
<script>
    import { getCustomersQuery } from './customers-store';
    import AddCustomersModal from '../../modals/AddCustomersModal.vue';

    export default {
        data() {
            return {
                customers: []
            }
        },
        apollo: {
            customers: {
                query: getCustomersQuery,
                fetchPolicy: 'no-cache'
            }
        },
        components: {
            'add-customer-modal': AddCustomersModal
        }
    }
</script>