<template>
    <div class="dialog__wrapper" v-if="$store.state.editUserModalOpen !== false">
        <div class="dialog">
            <button @click="$store.dispatch('setEditUserModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2>
                Edit {{ $store.state.currentUser.name }}
            </h2>
            <form class="dialog__form">
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Email Address
                    </label>
                    <input id="email" type="email" class="input input--text" name="email" required autocomplete="email" autofocus />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {}
    }
</script>
