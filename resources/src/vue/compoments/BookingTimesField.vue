<template>
    <div class="booking-time-form__wrapper">
        <div class="booking-time-form">
            <h3 class="booking-time-form__title">
                Booking Times
            </h3>
            <div class="booking-time-form__fields-wrapper" v-for="booking, index in this.bookingTimes" :key="index">
                <button v-if="index > 0" type="button" class="booking-time-form__close-button" @click="handleDeleteBookingTime(index)">
                    <span class="sr-only">
                        Delete this booking time
                    </span>
                </button>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        Booking Date
                    </label>
                    <input name="booking-time-date" type="text" v-model="booking.date" onfocus="(this.type = 'date')" onblur="(this.type = 'text')"  />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        Start Time
                    </label>
                    <input name="booking-start-time" v-model="booking.startTime" min="08:00" max="18:00" type="text" onfocus="(this.type = 'time')" onblur="(this.type = 'text')" />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        End Time
                    </label>
                    <input name="booking-end-time" type="text" min="08:00" max="18:00" v-model="booking.endTime" onfocus="(this.type = 'time')" onblur="(this.type = 'text')"  />
                </div>
            </div>
            <div class="booking-time-form__actions">
                <button type="button" @click="handleAddBookingTime()" class="booking-time-form__action">
                    Add an booking time
                </button>
                 <button type="button" @click="handleConfirmBookingTimes()" class="booking-time-form__action">
                    Confirm booking times
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookingTimes: [{
                    date: '',
                    startTime: '',
                    endTime: ''
                }]
            }
        },
        methods: {
            handleAddBookingTime() {
                this.bookingTimes.push(
                    {
                        date: '',
                        startTime: '',
                        endTime: ''
                    }
                );
            },
            handleDeleteBookingTime(index) {
                this.bookingTimes.splice(index, 1);
                this.$store.dispatch('setTemporaryBookingTimes', this.bookingTimes);
            },
            handleConfirmBookingTimes() {
                this.$store.dispatch('setTemporaryBookingTimes', this.bookingTimes);
            }
        }
    }
</script>
