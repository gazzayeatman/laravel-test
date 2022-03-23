<template>
    <div class="container">
        <h1>
            Customers Dashboard
        </h1>
        <div class="action-panel">
            <button @click="$store.dispatch('customersDashboardStore/setAddCustomersModalOpen')" class="btn btn-primary">
                Add Customer
            </button>
        </div>
        <div class="grid-view__wrapper" v-for="customer of customers">
            <div class="grid-view">
                <div class="grid-view__information">
                    <div class="grid-view__id">
                        {{ customer.id }}
                    </div>
                    <div class="grid-view__column">
                        {{ customer.name }}
                    </div>
                </div>
                <div class="grid-view__actions">
                    <button @click="$store.dispatch('customersDashboardStore/setEditUserModalOpen', user)" class="btn btn-primary">
                        Edit
                    </button>
                    <button @click="deleteUser(user.id)" class="btn btn-primary btn--danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <add-customer-modal />
    </div>
</template>
<script>
    import { getCustomersQuery } from './customers-dashboard-store';
    import AddCustomersModal from '../../modals/AddCustomersModal.vue';

    export default {
        data() {
            return {
                customers: []
            }
        },
        apollo: {
            customers: getCustomersQuery
        },
        components: {
            'add-customer-modal': AddCustomersModal
        },
        mounted() {
            this.$store.dispatch('setApolloClient', this.$apollo);
        }
    }
</script>