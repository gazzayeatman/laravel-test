<template>
    <div class="container">
        <h1>
            Users Dashboard
        </h1>
        <div class="action-panel">
            <a href="/users/add-user" class="btn btn-primary">
                Add User
            </a>
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
                    <button @click="$store.dispatch('setEditUserModalOpen')" class="btn btn-primary">
                        Edit
                    </button>
                    <button @click="handleDelete" class="btn btn-primary btn--danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    <edit-user-modal :modal-open="testVar" user />
</template>
<script>
import gql from 'graphql-tag';
import EditUserModal from '../modals/EditUserModal.vue';

export default {
    data() {
        return {
            users: [],
            testVar: false
        }
    },
    methods: {
        handleDelete() {
            // console.log('delete');
        }
    },
    components: {
        'edit-user-modal': EditUserModal
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