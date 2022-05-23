<template>
    <div class="booking-time-form__wrapper">
        <div class="booking-time-form">
            <h3 class="booking-time-form__title">
                Booking Times
            </h3>
            <div class="booking-time-form__fields-wrapper">
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        Booking Date
                    </label>
                    <input type="date" name="booking-time-date" />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        Start Time
                    </label>
                    <input type="time" name="booking-start-time" />
                </div>
                <div class="booking-time-form__field-wrapper">
                    <label class="booking-time-form__label">
                        End Time
                    </label>
                    <input type="time" name="booking-end-time" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            this.bookingTimes = [];
        }
    }
</script>
