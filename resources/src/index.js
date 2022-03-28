require('./bootstrap');
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue';
import App from './vue/App.vue';
import UserDashboard from './vue/apps/UserDashboard/UserDashboard';
import LocationsDashboard from './vue/apps/LocationsDashboard/LocationsDashboard';
import CustomersDashboard from './vue/apps/CustomersDashboard/CustomersDashboard';
import ViewCustomer from './vue/apps/CustomersDashboard/components/ViewCustomer';
import Navbar from './vue/compoments/Navbar';
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
        { path: '/', component: App },
        { path: '/users', component: UserDashboard },
        { path: '/locations', component: LocationsDashboard },
        { path: '/customers', component: CustomersDashboard },
        { path: '/customers/view-customer/:id', component: ViewCustomer }
    ],
    router = createRouter({
        history: createWebHistory(),
        routes,
        strict: true
    });

    app.use(apolloProvider);
    app.use(store);
    app.use(router);
    app.config.globalProperties.emitter = emitter
    app.use(VueMasonryPlugin);
    app.component('app', App);
    app.component('navbar', Navbar);
    app.component('users-dashboard', UserDashboard);
    app.component('locations-dashboard', LocationsDashboard);
    app.component('customers-dashboard', CustomersDashboard);
    app.mount('#app');