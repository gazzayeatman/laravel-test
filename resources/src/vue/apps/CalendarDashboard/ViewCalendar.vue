<template>
    <div class="container">
        <div class="detail-page__wrapper">
            <div class="detail-page__section">
                <div class="detail-page__header">
                    <h1 class="detail-page__title">
                        Calendar
                    </h1>
                </div>
                <div class="action-panel">
                    <div class="external-event"
                        v-for="(item, i) in draggables"
                        :key="i"
                        draggable="true"
                        @dragstart="onEventDragStart($event, item)">
                        <strong>
                            {{ item.title }}
                        </strong>
                        ({{ item.duration ? `${item.duration} min` : 'no duration' }})
                        <div>
                            {{ item.content }}
                        </div>
                    </div>
                </div>
                <div class="detail-page__content">
                    <vue-cal
                        :disable-views="['years', 'year', 'month', 'week']"
                        :time-from="6 * 60"
                        :time-to="20 * 60"
                        :time-step="30"
                        :events="getCurrentBookings()"
                        :snap-to-time="30"
                        :split-days="getCurrentVehicles()"
                        hideViewSelector
                        todayButton
                        stickySplitLabels
                        editableEvents
                        class="custom-calendar"
                    >
                    </vue-cal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import VueCal from 'vue-cal';
    import 'vue-cal/dist/vuecal.css';
    import { getVehiclesQuery } from '../VehiclesDashboard/vehicles-store';
    import { getBookingsQuery } from '../CustomersDashboard/customers-store';

    export default {
        components: {
            VueCal
        },
        apollo: {
            vehicles: getVehiclesQuery,
            bookings: getBookingsQuery
        },
        data() {
            return {
                vehicles: [],
                bookings: []
            }
        },
        methods: {
            formatTime(time, day) {
                const dateString = `${day} ${time}`,
                    date = new Date(dateString);

                return dateString;
            },
            getCurrentVehicles() {
                const currentVehicles = this.vehicles.filter((vehicle, key) => vehicle.isActive),
                    result = [];

                currentVehicles.forEach((vehicle, key) => {
                    result.push(
                        {
                            id: vehicle.id,
                            label: vehicle.registration
                        }
                    )
                });

                return result;
            },
            structureBookingData(booking, time) {
                return {
                    start: this.formatTime(time.startTime, time.date),
                    end: this.formatTime(time.endTime, time.date),
                    title: `${booking.orderNumber} - ${booking.name}`,
                    class: 'blue-event',
                    split: booking.vehicle.id
                }
            },
            getCurrentBookings() {
                const result = [];

                this.bookings.forEach((booking, key) => {
                    booking.bookingTimes.forEach((time, key) => {
                        result.push(this.structureBookingData(booking, time));
                    });
                });

                console.log(result);
                return result;
            }
        }
    }
</script>