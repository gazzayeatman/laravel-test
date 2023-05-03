<template>
    <div class="dialog__wrapper" v-if="$store.state['customersStore'].addBookingTimesModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('customersStore/setAddBookingTimesModalState', false)" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add new booking times
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <booking-times-field />
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
    import { addNewBookingTimeToBookingMutation } from '../apps/CustomersDashboard/customers-store';
    import BookingTimesField from '../compoments/BookingTimesField.vue';

    export default {
        props: {
            booking: {}
        },
        methods: {
            addBookingTimes() {
                const store = this.$store,
                    bookingTimes = this.$store.state.temporaryBookingTimes,
                    bookingTimesToSend = [];

                    bookingTimes.forEach((time) => {
                        bookingTimesToSend.push(
                            {
                                date: time.date,
                                startTime : `${time.startTime}:00`,
                                endTime: `${time.endTime}:00`
                            }
                        )
                    });
                
                console.log(this.booking);

                this.$apollo.mutate({
                    mutation: addNewBookingTimeToBookingMutation,
                    variables: {
                        booking: this.booking.id,
                        bookingTimes: JSON.stringify(bookingTimesToSend)
                    }
                }).then((result) => {
                    store.dispatch('customersStore/setAddBookingTimesModalState', false);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this booking');
                });
            },
            handleFormSubmit() {
               this.addBookingTimes();
            }
        },
        components: {
            'booking-times-field': BookingTimesField
        }
    }
</script>
