<template>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg-grid-cols-4 mx-auto">
        <div v-if="productCount > 0" v-for="(product,index) in products" :key="index" class="bg-light rounded-2xl shadow-md overflow-hidden border border-light hover:shadow-lg">
            <div class="relative z-10">
                <img :src="imgUrl+product._id + '?t=' + Date.now()" alt="Product Image" class="w-full h-48 object-cover"/>
                <span class="absolute top-3 left-3 bg-secondary text-light text-xs font-semibold px-2 py-1 rounded-full shadow-sm">{{product.category.name}}</span>
                <div class="absolute top-3 right-3 flex gap-2">
                    <button class="bg-white/80 backdrop-blur px-2 py-1 rounded hover:scale-105" @click="$router.push('/admin/dashboard/products/'+product.slug)">✏️</button>
                    <button class="bg-white/80 backdrop-blur px-2 py-1 rounded hover:scale-105" @click="confirmDelete(product._id)">🗑️</button>
                </div>
            </div>
            <div class="p-4">
                <div>
                    <h5 class="font-semibold leading-tight text-normal">{{product.name}}</h5>
                </div>
                <p class="mt-3 text-sm text-normal line-clamp-2">{{product.description}}</p>
                <div class="mt-4 flex items-center justify-between">
                    <span class="bg-secondary text-light text-xs font-medium px-2 py-1 rounded-full">{{product.quantity}} in stock</span>
                    <div class="font-bold text-normal">$ {{ product.price }}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No Product yet</p>
        </div>
    </div>
    <ConfirmDelete :show="showModal" @confirm="handleDelete" @cancel="showModal = false" />
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote } from '../../../utills/generalUtills';
import ConfirmDelete from '../../../components/ConfirmDelete.vue';

export default{
    name:"Products",
    components:{
        ConfirmDelete
    },
    data(){
        return{
            showModal: false,
            selectedItem: '',
        }
    },
    computed:{
        ...mapState(['Loader', 'products', 'productCount', 'imgUrl']),
        isLoader: {
            get() {
                return this.Loader
            },
            set(value) {
                this.$store.commit('setLoader', value)
            }
        }
    },
    methods: {
        confirmDelete(id) {
            this.selectedItem = id;
            this.showModal = true;
        },
        async handleDelete(){
            this.isLoader = true
            const token = localStorage.getItem('token')
            try{
                const response = await axios.delete(`/product/product/${this.selectedItem}`, {
                    headers:{
                        Authorization: token
                    }
                })
                this.showModal = false;
                toastNote(response.data?.message?? "Success", 'success')
                const index = this.products.findIndex(p => p._id === this.selectedItem);
                this.products.splice(index, 1);
                this.isLoader = false
            } catch (error) {
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        }
    }
}
</script>