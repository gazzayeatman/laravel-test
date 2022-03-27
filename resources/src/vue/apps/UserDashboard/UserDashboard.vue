<template>
    <router-view>
        <div class="container">
            <h1>
                Users Dashboard
            </h1>
            <div class="action-panel">
                <button @click="$store.dispatch('userDashboardStore/setAddUserModalOpen')" class="btn btn-primary">
                    Add User
                </button>
            </div>
            <div class="grid-view__wrapper" v-for="user of users">
                <div class="grid-view">
                    <div class="grid-view__information">
                        <div class="grid-view__id">
                            {{ user.id }}
                        </div>
                        <div class="grid-view__column">
                            {{ user.email }}
                        </div>
                        <div class="grid-view__column">
                            {{ user.name }}
                        </div>
                    </div>
                    <div class="grid-view__actions">
                        <button @click="$store.dispatch('userDashboardStore/setEditUserModalOpen', user)" class="btn btn-primary">
                            Edit
                        </button>
                        <button @click="deleteUser(user.id)" class="btn btn-primary btn--danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <edit-user-modal />
        <add-user-modal />
    </router-view>
</template>
<script>
    import EditUserModal from '../../modals/EditUserModal.vue';
    import AddUserModal from '../../modals/AddUserModal.vue';
    import { getUsersQuery } from './user-dashboard-store';
    import { deleteUserMutation } from './user-dashboard-store';

    export default {
        data() {
            return {
                users: []
            }
        },
        methods: {
            deleteUser(id) {
                this.$apollo.mutate({
                    mutation: deleteUserMutation,
                    variables: {
                        id: id
                    }
                }).then((result) => {
                    this.$apollo.queries.users.refetch();
                }).catch((error) => {
                    console.log(error);
                    alert('there was an error deleting this user');
                });
            }
        },
        components: {
            'edit-user-modal': EditUserModal,
            'add-user-modal': AddUserModal
        },
        apollo: {
            users: getUsersQuery
        }
    }
</script>