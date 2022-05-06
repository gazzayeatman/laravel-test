<template>
    <div class="dialog__wrapper" v-if="$store.state['customersStore'].addBookingModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('customersStore/setAddBookingModalState', false)" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add new Booking
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="name">
                        Name
                    </label>
                    <input v-model="name" id="name" type="text" class="input input--text" name="name" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="orderNumber">
                        Order Number
                    </label>
                    <input v-model="name" id="orderNumber" type="text" class="input input--text" name="orderNumber" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="bookedVehicle">
                        Booked Vehicle
                    </label>
                    <select v-model="selectedDriver" id="bookedVehicle" class="input" name="bookedVehicle">
                        <option v-for="driver of drivers" :key="driver.id" :value="driver">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="bookedDriver">
                        Booked Driver
                    </label>
                    <select v-model="selectedDriver" id="bookedDriver" class="input" name="bookedDriver">
                        <option v-for="driver of drivers" :key="driver.id" :value="driver">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="bookingLocation">
                        Booking Location
                    </label>
                    <select v-model="selectedDriver" id="bookingLocation" class="input" name="bookingLocation">
                        <option v-for="driver of drivers" :key="driver.id" :value="driver">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="mainContact">
                        Main Contact
                    </label>
                    <select v-model="selectedDriver" id="mainContact" class="input" name="mainContact">
                        <option v-for="driver of drivers" :key="driver.id" :value="driver">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>
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
    import { addNewBookingMutation } from '../apps/CustomersDashboard/customers-store';

    export default {
        data() {
            this.title = '',
            this.orderNumber = '',
            this.selectedVehicle = false,
            this.selectedDriver = false,
            this.selectedLocation = false
            this.selectedMainContact = false
        },
        props: {
            drivers: {}
        },
        methods: {
            addBooking() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: addNewBookingMutation,
                    variables: {
                        name: this.name,
                        orderNumber: this.orderNumber,
                        inWaitingList: false,
                        vehicle: this.selectedVehicle.id,
                        location: this.selectedLocation.id,
                        driver: this.selectedDriver.id,
                        mainContact: this.selectedMainContact.id
                    }
                }).then((result) => {
                    store.dispatch('customersStore/setAddBookingModalState', false);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this booking');
                });
            },
            handleFormSubmit() {
               this.addBooking();
            }
        }
    }
</script>
