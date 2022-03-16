<template>
    <div class="cta-block">
        <h3 class="cta-block__title">
            Call to action
        </h3>
        <p class="cta-block__content">
            {{ content }}
        </p>
        <button v-on:click="handleClick">
            Click me
        </button>
    </div>
</template>
<script>
    import './_cta.scss';

    export default {
        setup: () => ({
            content: 'Lorem'
        }),
        methods: {
            handleClick: () => {
                console.log('totes');
            }
        }
    }
</script>