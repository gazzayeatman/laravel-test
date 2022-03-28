<template>
    <div class="container">
        <h2>
            Test
        </h2>
    </div>
</template>
<script>
    import { getCustomer} from '../customers-dashboard-store';
    import { useRoute } from 'vue-router';

    export default {
        data() {
            return {
                customerID: false,
                customer: false
            }
        },
        // setup() {
        //     customerID = useRoute().params.id;
        // },
        // mounted() {
        //     this.$apollo.query({
        //         customer: getCustomer,
        //         variables: {
        //             id: customerID
        //         }
        //     })
        // }
    }
</script>