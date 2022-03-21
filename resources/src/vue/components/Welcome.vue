<template>
    <div>    
        <h1>{{ title }}</h1>
        <UserDashboard />
    </div>
</template>
<script>
import UserDashboard from './UserDashboard.vue';

export default {
    setup: () => ({
        title: 'How To fab Install Vue 3 in Laravel 8 From Scratch'
    }),
    components: {
        UserDashboard
    }
}
</script>