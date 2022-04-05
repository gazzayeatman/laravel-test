<template>
    <div class="dialog__wrapper" v-if="$store.state['usersStore'].editUserModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('usersStore/setEditUserModalClosed')" class="dialog__close-btn">
                <span class="sr-only">
                    Close
                </span>
            </button>
            <h2 class="dialog__title">
                Edit {{ currentUser.name }}
            </h2>
            <form class="dialog__form" @submit.prevent="handleFormSubmit">
                <div class="form__input-field">
                    <label class="form__input-label" for="email">
                        Email Address
                    </label>
                    <input v-model="email" id="email" type="email" class="input input--text" name="email" :placeholder="currentUser.email" autocomplete="off" autofocus />
                </div>
                 <div class="form__input-field">
                    <label class="form__input-label" for="name">
                        Name
                    </label>
                    <input v-model="name" id="name" type="name" class="input input--text" name="name" :placeholder="currentUser.name" autocomplete="off" />
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
    import { editUserMutation, getRolesQuery } from '../apps/UserDashboard/users-store';

    export default {
        data() {
            this.name = '';
            this.email = '';
            this.roles = [];
            this.selectedRoles = [];
        },
        computed: {
            currentUser() {
                return this.$store.state['usersStore'].currentUser;
            }
        },
        methods: {
            editUser() {
                const apollo = this.$store.state.apollo,
                    store = this.$store,
                    selectedRolesInt = this.selectedRoles.map(Number);

                this.$apollo.mutate({
                    mutation: editUserMutation,
                    variables: {
                        id: this.currentUser.id,
                        name: this.name,
                        email: this.email,
                        roles: selectedRolesInt
                    }
                }).then((result) => {
                    store.dispatch('usersStore/setEditUserModalClosed');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.editUser();
            }
        },
        beforeUpdate() {
            if (this.currentUser) {
                this.selectedRoles = [];
                this.currentUser.roles.map((role) => this.selectedRoles.push(role.id));
            }
        },
        apollo: {
            roles: getRolesQuery
        },
        mounted() {
            this.name = this.currentUser.name;
            this.email = this.currentUser.email;
        }
    }
</script>
