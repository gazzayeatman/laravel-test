require('./bootstrap');
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue';
import Vue3Material from 'vue3-material';
import Welcome from './vue/components/Welcome';
import Store from './store';

const cache = new InMemoryCache(),
    apolloClient = new ApolloClient({
        uri: 'http://laravel.test/graphql',
        cache,
    }),
    apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    }),
    app = createApp({});

    app.use(apolloProvider);
    app.use(Store);
    app.component('welcome', Welcome);
    app.mount('#app');