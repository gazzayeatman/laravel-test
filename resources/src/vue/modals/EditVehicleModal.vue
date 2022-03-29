<template>
    <div class="dialog__wrapper" v-if="$store.state['vehiclesDashboardStore'].EditVehicleModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('vehiclesDashboardStore/setEditVehicleModalState', false, false)" class="dialog__close-btn">
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
                    <input v-model="title" id="title" type="text" class="input input--text" name="title" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="registration">
                        Registration
                    </label>
                    <input v-model="registration" id="registration" type="text" class="input input--text" name="registration" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="loadWeight">
                        Load Weight
                    </label>
                    <input v-model="loadWeight" id="loadWeight" type="text" class="input input--text" name="loadWeight" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="liftWeight">
                        Lift Weight
                    </label>
                    <input v-model="liftWeight" id="liftWeight" type="text" class="input input--text" name="liftWeight" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="wofExpiry">
                        Wof Expiry
                    </label>
                    <input v-model="wofExpiry" id="wofExpiry" type="date" class="input input--date" name="wofExpiry" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="registrationExpiry">
                        Registration Expiry
                    </label>
                    <input v-model="registrationExpiry" id="registrationExpiry" type="date" class="input input--date" name="registrationExpiry" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="isActive">
                        Active?
                    </label>
                    <input v-model="isActive" id="isActive" type="checkbox" class="input input--checkbox" name="isActive" autocomplete="off" />
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
    import { updateVehicleMutation } from '../apps/VehiclesDashboard/vehicles-dashboard-store';

    export default {
        data() {
            return {
                title: '',
                registration: '',
                loadWeight: '',
                liftWeight: '',
                wofExpiry: '',
                registrationExpiry: '',
                isActive: ''
            }
        },
        computed: {
            currentVehicle() {
                return this.$store.state['vehiclesDashboardStore'].currentVehicle;
            }
        },
        methods: {
            addVehicle() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: updateVehicleMutation,
                    variables: {
                        title: this.title,
                        registration: this.registration,
                        loadWeight: this.loadWeight,
                        liftWeight: this.liftWeight,
                        wofExpiry: this.wofExpiry,
                        registrationExpiry: this.registrationExpiry,
                        isActive: this.isActive
                    }
                }).then((result) => {
                    apollo.queries.vehicles.refetch();
                    store.dispatch('vehiclesDashboardStore/EditVehiclesModalOpen', false);
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.addVehicle();
            }
        },
        mounted() {
            this.title = this.currentVehicle.title;
            this.registration = this.currentVehicle.registration;
            this.loadWeight = this.currentVehicle.loadWeight;
            this.liftWeight = this.currentVehicle.liftWeight;
            this.wofExpiry = this.currentVehicle.wofExpiry;
            this.registrationExpiry = this.currentVehicle.registrationExpiry;
            this.isActive = this.currentVehicle.isActive;

            console.log(this.currentVehicle);
        }
    }
</script>
