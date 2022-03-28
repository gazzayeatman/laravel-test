<template>
    <div class="container">
        <back-button />
        <div class="detail-page__wrapper">
            <div class="detail-page__header">
                <h2 class="detail-page__title">
                    {{ customer.name }}
                </h2>
            </div>
            <div class="detail-page__content">
                <h3 class="detail-page__sub-title">
                    Locations
                </h3>
                <div v-if="customer.locations > 0" class="detail-page__detail-grid">

                </div>
                <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
                    <div class="detail-page__detail-grid-content">
                        Nothing here?, Add a location now
                    </div>
                    <div class="detail-page__detail-grid-action-panel">
                        <button class="btn btn-primary"  @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')">
                            Add a new location
                        </button>
                    </div>
                </div>
                <h3 class="detail-page__sub-title">
                    Contacts
                </h3>
                <div v-if="customer.contacts > 0" class="detail-page__detail-grid">

                </div>
                <div v-else class="detail-page__detail-grid detail-page__detail-grid--empty">
                    <div class="detail-page__detail-grid-content">
                        Nothing here?, Add a contact now
                    </div>
                    <div class="detail-page__detail-grid-action-panel">
                        <button class="btn btn-primary"  @click="$store.dispatch('locationsDashboardStore/setAddLocationModalOpen')">
                            Add a new contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <add-location-modal />
    </div>
</template>
<script>
    import { getCustomer } from '../customers-dashboard-store';
    import { useRoute } from 'vue-router';
    import BackButton from '../../../compoments/BackButton.vue';
    import AddLocationModal from '../../../modals/AddLocationModal.vue';

    export default {
        data() {
            return {
                customerID: false,
                customer: false
            }
        },
        created() {
            this.customerID = useRoute().params.id;

            this.$apollo.query(
                {
                    query: getCustomer,
                    variables: {
                        id: this.customerID
                    }
                }
            ).then((result) => {
                this.customer = result.data.customer;
                console.log(this.customer);
            })
            .catch((err) => console.log(err));
        },
        components: {
            'back-button': BackButton,
            'add-location-modal': AddLocationModal
        }
    }
</script>