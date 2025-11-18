<template>
    <h2 class="text-normal mb-4">Manage Categories</h2>
    <div class="mb-4">
        <form @submit.prevent="handleCategory">
            <input type="text" class="!p-4 !mb-2" placeholder="Category Name" v-model="categoryName">
            <button type="submit" class="primary w-32">{{isUpdate ? 'Update':'Add'}}</button>
        </form>
    </div>
    <div>
        <table class="table w-[100%]">
            <thead>
                <tr>
                    <th class="border-b border-light p-2 text-left">Name</th>
                    <th class="border-b border-light p-2 w-[40%]">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="categories.length > 0" v-for="(category,index) in categories" :key="index">
                    <td class="border-b border-light p-2">{{ category.name }}</td>
                    <td class="flex gap-1 border-b border-light p-2 justify-center">
                        <button class="primary" @click="updateCategory(category)">Edit</button>
                        <button class="primary" @click="confirmDelete(category._id)">Delete</button>
                    </td>
                </tr>
                <div v-else>
                    <p>No Category Found</p>
                </div>
            </tbody>
        </table>
    </div>
    <ConfirmDelete :show="showModal" @confirm="deleteCategory" @cancel="showModal = false" />
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote } from '../../../utills/generalUtills';
import axios from 'axios';
import ConfirmDelete from '../../../components/ConfirmDelete.vue';

export default{
    name:"AddCategory",
    components:{
        ConfirmDelete
    },
    data(){
        return{
            categoryName:'',
            showModal: false,
            selectedItem: '',
            isUpdate:false
        }
    },
    computed:{
        ...mapState(['categories', 'Loader']),
        isLoader: {
            get() {
                return this.Loader
            },
            set(value) {
                this.$store.commit('setLoader', value)
            }
        }
    },
    methods:{
        async handleCategory(){
            this.isLoader = true
            const token = localStorage.getItem('token')
            if(this.isUpdate){
                try{
                    const response = await axios.put(`/category/update-category/${this.selectedItem}`, {name: this.categoryName}, {
                        headers:{
                            Authorization: token
                        }
                    })
                    toastNote(response.data?.message?? "Success", 'success')

                    const index = this.categories.findIndex(p => p._id === this.selectedItem);
                    this.categories.splice(index, 1);
                    this.categories.push(response.data.category)

                    this.categoryName = ''
                    this.selectedItem = ''
                    this.isLoader = false
                    this.isUpdate = false
                } catch (error) {
                    const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                    toastNote(errorMessage, 'error')
                    this.isLoader = false
                }
            }else{
                try{
                    const response = await axios.post('/category/create-category', {name: this.categoryName}, {
                        headers:{
                            Authorization: token
                        }
                    })
                    toastNote(response.data?.message?? "Success", 'success')
                    this.categories.push(response.data.category)
                    this.categoryName = ''
                    this.isLoader = false
                } catch (error) {
                    const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                    toastNote(errorMessage, 'error')
                    this.isLoader = false
                }
            }
        },
        confirmDelete(id) {
            this.selectedItem = id;
            this.showModal = true;
        },
        async deleteCategory(){
            this.isLoader = true
            const token = localStorage.getItem('token')
            try{
                const response = await axios.delete(`/category/delete-category/${this.selectedItem}`, {
                    headers:{
                        Authorization: token
                    }
                })
                this.showModal = false;
                toastNote(response.data?.message?? "Success", 'success')
                const index = this.categories.findIndex(p => p._id === this.selectedItem);
                this.categories.splice(index, 1);
                this.isLoader = false

            } catch (error) {
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        },
        async updateCategory(category){
            this.categoryName = category.name
            this.isUpdate = true
            this.selectedItem = category._id
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }
}
</script>