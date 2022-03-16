require('./bootstrap');

import { createApp } from 'vue';
import HelloWorld from './vue/components/Welcome';
import CTABlock from './vue/components/CTA/CTABlock';

const app = createApp({}),
    ctaBlock = createApp({});

app.component('hello-world', HelloWorld);
app.mount('#hello-world');

ctaBlock.component('cta-block', CTABlock);
ctaBlock.mount('[data-cta-block]');