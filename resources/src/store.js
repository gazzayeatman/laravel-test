import { createStore } from 'vuex';
import { userDashboardStore } from './vue/apps/UserDashboard/user-dashboard-store';

const store = createStore({
    modules: {
        userDashboardStore
    }
});

export default store;
