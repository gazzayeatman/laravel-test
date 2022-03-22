require('./bootstrap');
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'
import { createApp } from 'vue';
import Welcome from './vue/components/Welcome';
import Store from './store';
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

const cache = new InMemoryCache(),
    apolloClient = new ApolloClient({
        uri: 'http://laravel.test/graphql',
        cache,
    }),
    apolloProvider = createApolloProvider({
        defaultClient: apolloClient,
    }),
    app = createApp({});

    new WaveUI(app, {
        // Some Wave UI options.
    })

    app.use(apolloProvider);
    app.use(Store);
    app.component('welcome', Welcome);
    app.mount('#app');