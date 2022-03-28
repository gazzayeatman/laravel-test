<template>
    <div class="dialog__wrapper" v-if="$store.state.loginModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('loginModalOpen')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Login
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Login
                    </label>
                    <input v-model="email" id="email" type="text" class="input input--text" name="email" autocomplete="off" autofocus />
                </div>
                 <div class="form__input-field">
                    <label class="form__input-label" for="password">
                        Password
                    </label>
                    <input v-model="password" id="password" type="password" class="input input--text" name="password" autocomplete="off" />
                </div>
                <div class="form__action-panel form__action-panel--right">
                    <div class="form__action-panel-group">
                        <button type="submit" class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            this.email = '';
            this.password = '';
        }
    }
</script>
