<template>
    <navbar />
    <login-modal />
    <router-view></router-view>
</template>
<script>
    import LoginModal from './modals/LoginModal.vue';

    export default {
        data() {
            return {
                me: false,
                apollo: false
            }
        },
        components: {
            'login-modal': LoginModal
        },
        mounted() {
            this.$store.dispatch('setApolloClient', this.$apollo);
        }
    }   
</script>
