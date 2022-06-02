<template>
    <div class="detail-page__section">
        <h3 class="detail-page__sub-title">
            Bookings
        </h3>
        <div v-if="customer.bookings && customer.bookings.length > 0" class="detail-page__detail-grid">
            <div class="action-panel">
                <button v-if="canAddBooking" class="btn btn-primary"  @click="$store.dispatch('customersStore/setAddBookingModalState', true)">
                    Add a new booking
                </button>
            </div>
            <div v-masonry="containerId" transition-duration="0.3s" item-selector=".contact-card__wrapper">
                <div v-masonry-tile class="contact-cards__wrapper" v-for="(booking, index) in customer.bookings" :key="index">
                    <router-link class="contact-card__wrapper" :to="{ path: '/customers/view-customer/view-booking/' + booking.id }">
                        <div class="contact-card">
                            <h3 class="contact-card__title">
                                {{ booking.name }}
                            </h3>
                        </div>
                    </router-link >
                </div>
            </div>
        </div>
        <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
            <div v-if="canAddBooking">
                <div class="detail-page__detail-grid-content">
                    Nothing here?, Add a booking now
                </div>
                <div class="detail-page__detail-grid-action-panel">
                    <button v-if="canAddBooking" class="btn btn-primary"  @click="$store.dispatch('customersStore/setAddBookingModalState', true)">
                        Add a new booking
                    </button>
                </div>
            </div>
            <div v-else>
                <div class="detail-page__detail-grid-content">
                    There are no bookings to display
                </div>
            </div>
        </div>
        <add-booking-modal :customer="customer" :locations="customer.locations" :drivers="this.drivers" :vehicles="this.vehicles" />
    </div>
</template>
<script>
    import { getVehiclesQuery, getDrivers } from '../../VehiclesDashboard/vehicles-store';
    import BackButton from '../../../compoments/BackButton.vue';
    import AddBookingModal from '../../../modals/AddBookingModal.vue';

    export default {
        data() {
            return {
                vehicles: [],
                drivers: []
            }
        },
        apollo: {
            vehicles: getVehiclesQuery,
            drivers: getDrivers
        },
        props: {
            customer: {},
            canAddBooking: false
        },
        components: {
            'back-button': BackButton,
            'add-booking-modal': AddBookingModal
        }
    }
</script>
