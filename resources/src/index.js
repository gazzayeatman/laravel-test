require('./bootstrap');
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue';
import UserDashboard from './vue/apps/UserDashboard/UserDashboard';
import LocationsDashboard from './vue/apps/LocationsDashboard/LocationsDashboard';
import CustomersDashboard from './vue/apps/CustomersDashboard/CustomersDashboard';
import { VueMasonryPlugin } from 'vue-masonry';
import mitt from 'mitt';
import Store from './store';

const cache = new InMemoryCache(),
    apolloClient = new ApolloClient({
        uri: 'http://laravel.test/graphql',
        cache,
    }),
    apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    }),
    app = createApp({}),
    emitter = mitt();

    app.use(apolloProvider);
    app.use(Store);
    app.config.globalProperties.emitter = emitter
    app.use(VueMasonryPlugin);
    app.component('users-dashboard', UserDashboard);
    app.component('locations-dashboard', LocationsDashboard);
    app.component('customers-dashboard', CustomersDashboard);
    app.mount('#app');