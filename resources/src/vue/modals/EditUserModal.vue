<template>
    <w-dialog v-model="$store.state.editUserModalOpen" :width="700">
        <button @click="$store.dispatch('setEditUserModalClosed')" class="w-card__close-btn">
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
    </w-dialog>
</template>

<script>
    export default {
        methods: {}
    }
</script>
