<template>
    <div class="dialog__wrapper" v-if="$store.state['userDashboardStore'].addUserModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('userDashboardStore/setAddUserModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Add a new user
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Email Address
                    </label>
                    <input v-model="email" id="email" type="email" class="input input--text" name="email" autocomplete="off" autofocus />
                </div>
                <div class="form__input-field">
                    <label :model="name" class="form__input-label" for="name">
                        Name
                    </label>
                    <input v-model="name" id="name" type="name" class="input input--text" name="name" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="password">
                        Password
                    </label>
                    <input v-model="password" id="password" type="password" class="input input--text" name="password" autocomplete="off" />
                </div>
                <div class="form__input-field">
                    <label class="form__input-label" for="confirm-password">
                        Confirm Password
                    </label>
                    <input v-model="confirmPassword" id="confirm-password" type="password" class="input input--text" name="confirm-password" autocomplete="off" />
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
    import { addNewUserMutation } from '../apps/UserDashboard/user-dashboard-store';

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        },
        methods: {
            addUser() {
                const apollo = this.$store.state.apollo
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: addNewUserMutation,
                    variables: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                }).then((result) => {
                    apollo.queries.users.refetch();
                    store.dispatch('userDashboardStore/setAddUserModalClosed');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.addUser();
            }
        },
        computed: {
            modalOpened() {
                return this.$store.state['userDashboardStore'].getAddUserModalOpen;
            }
        }
    }
</script>
