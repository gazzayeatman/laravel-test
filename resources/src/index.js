require('../js/bootstrap');
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue';
import App from './vue/App.vue';
import UserDashboard from './vue/apps/UserDashboard/UserDashboard';
import CustomersDashboard from './vue/apps/CustomersDashboard/CustomersDashboard';
import VehiclesDashboard from './vue/apps/VehiclesDashboard/VehiclesDashboard';
import ViewCustomer from './vue/apps/CustomersDashboard/components/ViewCustomer';
import ViewBooking from './vue/apps/CustomersDashboard/components/ViewBooking';
import ViewContact from './vue/apps/ContactsDashboard/components/ViewContact';
import { VueMasonryPlugin } from 'vue-masonry';
import { createRouter, createWebHistory } from 'vue-router';
import mitt from 'mitt';
import { store } from './store';

const cache = new InMemoryCache(),
    apolloClient = new ApolloClient({
        uri: 'http://laravel.test/graphql',
        cache,
    }),
    apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    }),
    app = createApp({}),
    emitter = mitt(),
    routes = [
        { path: '/users', component: UserDashboard },
        { path: '/customers', component: CustomersDashboard },
        { path: '/customers/view-customer/:id', component: ViewCustomer },
        { path: '/customers/view-customer/view-booking/:id', component: ViewBooking },
        { path: '/customers/view-contact/:id', component: ViewContact },
        { path: '/vehicles', component: VehiclesDashboard }
    ],
    router = createRouter({
        history: createWebHistory(),
        routes
    });

    app.use(apolloProvider);
    app.use(store);
    app.use(router);
    app.config.globalProperties.emitter = emitter;
    app.use(VueMasonryPlugin);
    app.component('app', App);
    app.component('users-dashboard', UserDashboard);
    app.component('customers-dashboard', CustomersDashboard);
    app.component('vehicles-dashboard', VehiclesDashboard);
    app.mount('#app');