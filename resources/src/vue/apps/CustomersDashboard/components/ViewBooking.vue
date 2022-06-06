<template>
    <div class="container">
        <back-button :link="backURL" />
        <div class="detail-page__wrapper">
            <div class="detail-page__header">
                <h2 class="detail-page__title">
                    {{ booking.name }}
                </h2>
                <span class="detail-page__header-tag">
                    {{ booking.orderNumber }}
                </span>
            </div>
            <div class="action-panel">
                <button @click="deleteBooking(booking.id)" class="btn btn-primary btn--danger">
                    Delete {{ booking.name }}
                </button>
                <button @click="$store.dispatch('customersStore/setEditCustomerModalState', true)" class="btn btn-primary">
                    Edit {{ booking.name }}
                </button>
            </div>
            <div class="detail-page__content">
                <div class="detail-page__content">
                    <div class="detail-page__info-panel-wrapper">
                        <div v-if="booking.driver" class="detail-page__info-panel">
                            {{ booking.driver.firstName }} {{ booking.driver.lastName }}
                        </div>
                        <div v-if="booking.mainContact" class="detail-page__info-panel">
                            {{ booking.mainContact.firstName }} {{ booking.mainContact.lastName }}
                        </div>
                        <div v-if="booking.customer" class="detail-page__info-panel">
                            {{ booking.customer.name }}
                        </div>
                        <div v-if="booking.location" class="detail-page__info-panel">
                            <span v-if="booking.location.unitNumber">
                                {{ booking.location.unitNumber }}
                            </span>
                            {{ booking.location.streetNumber }}
                            {{ booking.location.streetName }}
                            {{ booking.location.suburb }}
                            {{ booking.location.city }}
                        </div>
                        <div v-if="booking.bookingTimes.length > 0" class="detail-page__booking-times-wrapper">
                            <div v-for="(time, index) in booking.bookingTimes" class="detail-page__booking-time" :key="index">
                                {{ time.date }}
                                {{ time.startTime }}
                                {{ time.endTime }}
                            </div>
                        </div>
                    </div>
                </div>
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
                const customerID = this.booking.customer.id;
                
                return `/customers/view-customer/${customerID}`;
            }
        },
        created() {
            const store = this.$store,
                bookingID = useRoute().params.id;

            store.dispatch('customersStore/setCurrentBooking', bookingID);
        },
        components: {
            'back-button': BackButton
        }
    }
</script>