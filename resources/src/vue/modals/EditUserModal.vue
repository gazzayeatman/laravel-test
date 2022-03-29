<template>
    <div class="dialog__wrapper" v-if="$store.state['userDashboardStore'].editUserModalOpen">
        <div class="dialog">
            <button @click="$store.dispatch('userDashboardStore/setEditUserModalClosed')" class="dialog__close-btn">
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
    import { editUserMutation } from '../apps/UserDashboard/user-dashboard-store';

    export default {
        data() {
            this.name = '';
            this.email = '';
        },
        computed: {
            currentUser() {
                return this.$store.state['userDashboardStore'].currentUser;
            }
        },
        methods: {
            editUser() {
                const apollo = this.$store.state.apollo,
                    store = this.$store;

                this.$apollo.mutate({
                    mutation: editUserMutation,
                    variables: {
                        id: this.currentUser.id,
                        name: this.name,
                        email: this.email
                    }
                }).then((result) => {
                    apollo.queries.users.refetch();
                    store.dispatch('userDashboardStore/setEditUserModalClosed');
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error adding this user');
                });
            },
            handleFormSubmit() {
               this.editUser();
            }
        },
        mounted() {
            this.name = this.currentUser.name;
            this.email = this.currentUser.email;
        }
    }
</script>
