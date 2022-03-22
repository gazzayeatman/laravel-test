<template>
    <div>
        <user-dashboard />
    </div>
</template>
<script>
import UserDashboard from './vue/apps/UserDashboard/UserDashboard.vue';

export default {
    components: {
        'user-dashboard': UserDashboard
    }
}
</script>