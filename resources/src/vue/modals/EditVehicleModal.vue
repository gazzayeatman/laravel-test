<template>
    <div class="dialog__wrapper" v-if="$store.state['vehiclesStore'].EditVehicleModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('vehiclesStore/setEditVehicleModalState', false, false)" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Edit {{ currentVehicle.title }}: {{ currentVehicle.registration }}
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="title">
                        Title
                    </label>
                    <input v-model="title" id="title" type="text" class="input input--text" name="title" autocomplete="off" :placeholder="currentVehicle.title" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="registration">
                        Registration
                    </label>
                    <input v-model="registration" id="registration" type="text" class="input input--text" name="registration" autocomplete="off" :placeholder="currentVehicle.registration" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="loadWeight">
                        Load Weight
                    </label>
                    <input v-model="loadWeight" id="loadWeight" type="text" class="input input--text" name="loadWeight" autocomplete="off" :placeholder="currentVehicle.loadWeight" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="liftWeight">
                        Lift Weight
                    </label>
                    <input v-model="liftWeight" id="liftWeight" type="text" class="input input--text" name="liftWeight" autocomplete="off" :placeholder="currentVehicle.liftWeight" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="wofExpiry">
                        Wof Expiry
                    </label>
                    <input v-model="wofExpiry" id="wofExpiry" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')" class="input input--date" name="wofExpiry" autocomplete="off" :placeholder="currentVehicle.wofExpiry" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="registrationExpiry">
                        Registration Expiry
                    </label>
                    <input v-model="registrationExpiry" id="registrationExpiry" type="text" onfocus="(this.type = 'date')" onblur="(this.type = 'text')" class="input input--date" name="registrationExpiry" autocomplete="off" :placeholder="currentVehicle.registrationExpiry" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="mainDriver">
                        Main Driver
                    </label>
                    <select v-model="selectedDriver" id="mainDriver" class="input input--select" name="mainDriver">
                        <option v-for="driver of drivers" :key="driver.id" :value="driver">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="isActive">
                        Active?
                    </label>
                    <input v-model="isActive" id="isActive" type="checkbox" class="input input--checkbox" name="isActive" autocomplete="off" :checked="currentVehicle.isActive" />
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
    import { updateVehicleMutation } from '../apps/VehiclesDashboard/vehicles-store';

    export default {
        data() {
            this.title = '',
            this.registration = '',
            this.loadWeight = '',
            this.liftWeight = '',
            this.wofExpiry = '',
            this.registrationExpiry = '',
            this.selectedDriver = false,
            this.isActive = ''
        },
        computed: {
            currentVehicle() {
                return this.$store.state['vehiclesStore'].currentVehicle;
            }
        },
        props: {
            drivers: {}
        },
        methods: {
            editVehicle() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: updateVehicleMutation,
                    variables: {
                        id: this.currentVehicle.id,
                        title: this.title,
                        registration: this.registration,
                        loadWeight: this.loadWeight,
                        liftWeight: this.liftWeight,
                        wofExpiry: this.wofExpiry,
                        registrationExpiry: this.registrationExpiry,
                        driver: this.selectedDriver.id,
                        isActive: this.isActive
                    }
                }).then((result) => {
                    store.dispatch('vehiclesStore/setEditVehicleModalState', { open: false, vehicle: result.data.updateVehicle });
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.editVehicle();
            }
        },
        beforeUpdate() {
            if (this.currentVehicle) {
                this.title = this.currentVehicle.title;
                this.registration = this.currentVehicle.registration;
                this.loadWeight = this.currentVehicle.loadWeight;
                this.liftWeight = this.currentVehicle.liftWeight;
                this.wofExpiry = this.currentVehicle.wofExpiry;
                this.registrationExpiry = this.currentVehicle.registrationExpiry;
                this.selectedDriver = this.currentVehicle.driver,
                this.isActive = this.currentVehicle.isActive;
            }
        }
    }
</script>
