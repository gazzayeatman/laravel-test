<template>
    <navbar />
    <router-view></router-view>
</template>
<script>
    import { getCurrentUserQuery } from '../store';

    export default {
        data() {
            return {
                me: false,
                apollo: false
            }
        },
        apollo: {
            me: getCurrentUserQuery
        },
        mounted() {
            this.$store.dispatch('setApolloClient', this.$apollo);
        }
    }   
</script>
