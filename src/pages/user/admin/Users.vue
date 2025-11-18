<template>
    <div class="max-w-4xl mx-auto p-2 md:p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Users</h1>
        <div class="bg-white rounded-xl shadow-md p-6">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b text-gray-600 text-sm">
                        <th class="py-3">Name</th>
                        <th class="py-3">Email</th>
                        <th class="py-3">Role</th>
                    </tr>
                </thead>
                <tbody class="text-gray-800">
                    <tr v-for="user in users" :key="user._id" class="border-b hover:bg-gray-50">
                        <td class="py-3 font-medium">{{ user.name }}</td>
                        <td class="py-3">{{ user.email }}</td>
                        <td class="py-3">
                            <select v-model="user.role" @change="updateRole(user._id, user.role)" class="px-2 py-1 border-none rounded border text-sm">
                                <option :value="0">User</option>
                                <option :value="1">Admin</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote } from '../../../utills/generalUtills.js';
import axios from 'axios';

export default{
    name:"User",
    data(){
        return{
            users:[]
        }
    },
    computed:{
        ...mapState(['Loader']),
        isLoader: {
            get() {
                return this.Loader
            },
            set(value) {
                this.$store.commit('setLoader', value)
            }
        },
    },
    methods:{
        async updateRole(id, role){
            this.isLoader = true
            const token = localStorage.getItem('token')
            try{
                const response = await axios.put(`/auth/user-role/${id}`, {role}, {
                    headers:{
                        Authorization: token
                    }
                })
                toastNote(response.data?.message?? "Success", 'success')
                this.isLoader = false
            }catch(error){
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        }
    },
    async mounted(){
        this.isLoader = true
        const token = localStorage.getItem('token')
        try{
            const response = await axios.get('/auth/users', {
                headers:{
                    Authorization: token
                }
            })
            this.users = response.data.users
            console.log(this.users)
            this.isLoader = false
        }catch(error){
            const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
            toastNote(errorMessage, 'error')
            this.isLoader = false
        }
    },
}
</script>