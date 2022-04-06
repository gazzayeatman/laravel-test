<template>
    <div class="back-button__wrapper">
        <button @click="$router.push(this.backLink)" class="btn btn-primary back-button">
            Back
        </button>
    </div>
</template>
<script>
     export default {
        data: {
            defaultLink: '../'
        },
        props: {
            'link': String
        },
        computed: {
            backLink() {
                return this.link ? this.link : this.defaultLink;
            }
        }
    }
</script>
