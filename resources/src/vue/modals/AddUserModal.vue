<template>
    <div class="dialog__wrapper" v-if="$store.state['usersStore'].addUserModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('usersStore/setAddUserModalClosed')" class="dialog__close-btn">
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
                <div class="form__input-field form__input-group" v-if="roles.length > 0">
                    <span class="form__input-label">
                        Roles
                    </span>
                    <div v-for="role of roles" :key="role.id" class="form__clickable-group">
                        <input class="input input--checkbox" type="checkbox" name="roles" :value="role.id" v-model="selectedRoles"/>
                        <label class="form__input-label form__input-label--checkbox">
                            {{ role.title }}
                        </label>
                    </div>
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
    import { addNewUserMutation, getRolesQuery } from '../apps/UserDashboard/users-store';

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                roles: [],
                selectedRoles: []
            }
        },
        methods: {
            addUser() {
                const apollo = this.$store.state.apollo,
                    store = this.$store,
                    selectedRolesInt = this.selectedRoles.map(Number);

                this.$apollo.mutate({
                    mutation: addNewUserMutation,
                    variables: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        roles: selectedRolesInt
                    }
                }).then((result) => {
                    this.$apollo.queries.users.refetch();
                    store.dispatch('usersStore/setAddUserModalClosed');
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
                return this.$store.state['usersStore'].getAddUserModalOpen;
            }
        },
        apollo: {
            roles: getRolesQuery
        }
    }
</script>
