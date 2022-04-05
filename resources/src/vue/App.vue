<template>
    <navbar />
    <login-modal />
    <router-view :key="$route.fullPath"></router-view>
</template>
<script>
    import LoginModal from './modals/LoginModal.vue';
    import Navbar from './compoments/Navbar.vue';

    export default {
        data() {
            return {
                apollo: false
            }
        },
        components: {
            'login-modal': LoginModal,
            'navbar': Navbar
        },
        mounted() {
            this.$store.dispatch('setApolloClient', this.$apollo);
        }
    }
</script>
