import { createStore } from 'vuex';
import { userDashboardStore } from './vue/apps/UserDashboard/user-dashboard-store';
import { locationsDashboardStore } from './vue/apps/LocationsDashboard/locations-dashboard-store';

const store = createStore({
    modules: {
        userDashboardStore,
        locationsDashboardStore
    }
});

export default store;
