<template>
    <div class="container">
        <back-button :link="backURL" />
        <div class="detail-page__wrapper">
            <div class="detail-page__header">
                <h2 class="detail-page__title">
                    {{ booking.name }}
                </h2>
            </div>
            <!-- <div class="action-panel">
                <button @click="deleteCustomer(customer.id)" class="btn btn-primary btn--danger">
                    Delete {{ customer.name }}
                </button>
                <button @click="$store.dispatch('customersStore/setEditCustomerModalState', true)" class="btn btn-primary">
                    Edit {{ customer.name }}
                </button>
            </div> -->
            <div class="detail-page__content">
            </div>
        </div>
    </div>
</template>
<script>
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';

    export default {
        computed: {
            booking() {
                return this.$store.state['customersStore'].currentBooking;
            },
            backURL() {
                return `/customers/view-customer/${this.booking.customer.id}`;
            }
        },
        created() {
            const store = this.$store;

            this.bookingID = useRoute().params.id;
            store.dispatch('customersStore/setCurrentBooking', this.bookingID);
        },
        methods: {

        },
        components: {
            'back-button': BackButton
        }
    }
</script>