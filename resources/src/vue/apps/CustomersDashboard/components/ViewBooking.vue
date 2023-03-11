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
                            <h3 class="detail-page__info-panel-title">
                                Driver
                            </h3>
                            {{ booking.driver.name }}
                        </div>
                        <div v-if="booking.vehicle" class="detail-page__info-panel">
                            <h3 class="detail-page__info-panel-title">
                                Booked Vehicle
                            </h3>
                            {{ booking.vehicle.title }}
                        </div>
                        <div v-if="booking.mainContact" class="detail-page__info-panel">
                            <h3 class="detail-page__info-panel-title">
                                Booking Main Contact
                            </h3>
                            {{ booking.mainContact.firstName }} {{ booking.mainContact.lastName }}
                        </div>
                        <div v-if="booking.customer" class="detail-page__info-panel">
                            <h3 class="detail-page__info-panel-title">
                                Customer
                            </h3>
                            {{ booking.customer.name }}
                        </div>
                        <div v-if="booking.location" class="detail-page__info-panel">
                            <h3 class="detail-page__info-panel-title">
                                Booking Location
                            </h3>
                            <span v-if="booking.location.unitNumber">
                                {{ booking.location.unitNumber }}
                            </span>
                            {{ booking.location.streetNumber }}
                            {{ booking.location.streetName }}
                            {{ booking.location.suburb }}
                            {{ booking.location.city }}
                        </div>
                    </div>
                    <div v-if="booking.bookingTimes.length > 0" class="detail-page__booking-times-wrapper">
                        <h3 class="detail-page__info-panel-title">
                            Booking Times
                        </h3>
                        <div class="detail-page__detail-grid-action-panel">
                            <button @click="$store.dispatch('customersStore/setAddBookingTimesModalState', true)" type="submit" class="btn btn-primary">
                                Add a new booking time
                            </button>
                        </div>
                        <div v-for="(time, index) in booking.bookingTimes" class="detail-page__booking-time-wrapper" :key="index">
                            <div class="detail-page__booking-time">
                                <span class="detail-page__booking-time-detail">
                                    <strong>
                                        {{ dayOfTheWeek(time.date) }}:
                                    </strong>
                                    {{ formattedDate(time.date) }}
                                </span>
                                <span class="detail-page__booking-time-detail detail-page__booking-time-detail--time">
                                    <strong>
                                        Start Time
                                    </strong>
                                    {{ time.startTime }}
                                </span>
                                <span class="detail-page__booking-time-detail detail-page__booking-time-detail--time">
                                    <strong>
                                        End Time
                                    </strong>
                                    {{ time.endTime }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <add-booking-times-modal-open :booking="booking" />
        </div>
    </div>
</template>
<script>
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';
    import { deleteBookingMutation } from '../customers-store';
    import addBookingTimesModalOpen from '../../../modals/AddBookingTimesModal.vue';

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
        methods: {
            dayOfTheWeek(day) {
                const result = new Date(day),
                    daysOfWeek = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'
                    ];

                return daysOfWeek[result.getDay()];
            },
            formattedDate(day) {
                const date = new Date(day),
                    result = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
                
                return result;
            },
            deleteBooking(id) {
                this.$apollo.mutate({
                    mutation: deleteBookingMutation,
                    variables: {
                        id: id
                    }
                }).then(() => {
                    this.$router.push(this.backURL); 
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'back-button': BackButton,
            'add-booking-times-modal-open': addBookingTimesModalOpen
        }
    }
</script>