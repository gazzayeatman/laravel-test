<template>
    <div class="dialog__wrapper" v-if="$store.state['userDashboardStore'].editUserModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('userDashboardStore/setEditUserModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2>
                Edit {{ currentUser.name }}
            </h2>
            <form class="dialog__form">
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Email Address
                    </label>
                    <input id="email" type="email" class="input input--text" name="email" :placeholder="currentUser.email" autocomplete="off" autofocus />
                </div>
                 <div class="form__input-field">
                    <label class="form__input-label" for="name">
                        Name
                    </label>
                    <input id="name" type="name" class="input input--text" name="name" :placeholder="currentUser.name" autocomplete="off" />
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
        methods: {},
        computed: {
            currentUser() {
                return this.$store.state['userDashboardStore'].currentUser;
            }
        }
    }
</script>
