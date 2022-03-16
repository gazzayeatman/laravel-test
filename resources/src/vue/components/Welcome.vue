<template>
    <NavBar />
    <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center py-4 sm:pt-0">    
        <h1>{{ title }}</h1>
    </div>
    <Footer />
</template>
<script>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';

export default {
    setup: () => ({
        title: 'How To fab Install Vue 3 in Laravel 8 From Scratch'
    }),
    components: {
        NavBar,
        Footer
    }
}
</script>