<template>
    <div class="container">
        <h1>
            Users Dashboard
        </h1>
        <div class="action-panel">
            <button @click="$store.dispatch('userDashboardStore/setAddUserModalOpen')" class="btn btn-primary">
                Add User
            </button>
        </div>
        <div class="grid-view__wrapper" v-for="user of users.data">
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
                    <button @click="handleDelete" class="btn btn-primary btn--danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    <edit-user-modal />
    <add-user-modal />
</template>
<script>
import gql from 'graphql-tag';
import EditUserModal from '../../modals/EditUserModal.vue';
import AddUserModal from '../../modals/AddUserModal.vue';

export default {
    data() {
        return {
            users: []
        }
    },
    methods: {
    },
    components: {
        'edit-user-modal': EditUserModal,
        'add-user-modal': AddUserModal
    },
    apollo: {
        users: gql`
            {
                users {
                    data {
                        id
                        name
                        email
                    }
                }
            }
        `
    }
}

</script>