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
                    <input name="booking-time-date" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')"  />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        Start Time
                    </label>
                    <input name="booking-start-time" type="text" onfocus="(this.type = 'time')" onblur="(this.type = 'text')" />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        End Time
                    </label>
                    <input name="booking-end-time" type="text" onfocus="(this.type = 'time')" onblur="(this.type = 'text')"  />
                </div>
            </div>
            <div class="booking-time-form__actions">
                <button type="button" @click="handleAddBookingTime()" class="booking-time-form__action">
                    Add a booking time
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bookingTimes: [{}]
            }
        },
        methods: {
            handleAddBookingTime() {
                this.bookingTimes.push({});
            },
            handleDeleteBookingTime(index) {
                this.bookingTimes = this.bookingTimes.splice(index, 1);
            }
        }
    }
</script>
