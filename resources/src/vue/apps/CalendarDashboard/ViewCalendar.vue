<template>
    <div class="container">
        <div class="detail-page__wrapper">
            <div class="detail-page__section">
                <div class="detail-page__header">
                    <h2 class="detail-page__title">
                        Calendar
                    </h2>
                </div>
                <div class="action-panel">

                </div>
                <div class="detail-page__content">
                    <vue-cal
                        show-week-numbers
                        :disable-views="['years', 'year', 'month', 'week']"
                        time-from="6 * 60"
                        :time-to="20 * 60"
                        :time-step="15"
                        :events="getCurrentBookings()"
                        :snap-to-time="15"
                        :split-days="getCurrentVehicles()"
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
            getCurrentVehicles() {
                const currentVehicles = this.vehicles.filter((vehicle, key) => vehicle.isActive),
                    result = [];

                currentVehicles.forEach((vehicle, key) => {
                    result.push(
                        {
                            id: key,
                            label: vehicle.registration
                        }
                    )
                });

                return result;
            },
            getCurrentBookings() {
                // {
                //     start: '2018-11-20 14:00',
                //     end: '2018-11-20 17:30',
                //     title: 'Boring event',
                //     content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
                //     class: 'blue-event',
                //     deletable: false,
                //     resizable: false,
                //     draggable: false
                // },
                const result = [],
                    currentBookings = this.bookings.forEach((booking, key) => {
                        console.log(booking);
                        // result.push(
                        //     {
                        //         start: bookingTimes
                        //     }
                        // )
                    });
            }
        }
    }
</script>