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

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { FullCalendar } from 'vue-full-calendar';

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data() {
            return {
                calendarOptions: {
                    initialView: 'dayGridMonth'
                }
            }
        }
    }
</script>