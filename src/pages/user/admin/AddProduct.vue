<template>
    <h2 class="text-normal mb-4">Add Products</h2>
    <div class="mb-4">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
            <select v-model="formData.category">
                <option value="">select category</option>
                <option v-for="(cat,index) in categories" :value="cat._id">{{ cat.name }}</option>
            </select>
            <div class="flex flex-col mt-2">
                <label class="text-normal text-lg font-medium">Add Photo</label>
                <div class="flex gap-4">
                    <label type="button" class="flex gap-1 cursor-pointer w-[25%] justify-center border border-light bg-transparent rounded-2xl p-6 text-2xl text-normal">
                        <input type="file" class="hidden"  @change="handleFileChange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        Upload
                    </label>
                    <img v-if="preview" :src="preview" alt="Preview" class="h-[100px] w-[150px] rounded-2xl object-cover">
                </div>
            </div>
            <input type="text" placeholder="name" v-model="formData.name">
            <textarea placeholder="Description" v-model="formData.description"></textarea>
            <input type="number" min="1" placeholder="price" v-model="formData.price">
            <input type="number" min="1" placeholder="quantity" v-model="formData.quantity">
            <select v-model="formData.shipping">
                <option value="">Select Shipping</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <button type="submit" class="primary">{{isUpdate ? 'Update Product':'Add Product'}}</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { toastNote } from '../../../utills/generalUtills';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name:"AddProduct",
    data(){
        return{
            formData:{
                name:'',
                description:'',
                photo:null,
                price:null,
                quantity:null,
                category:'',
                shipping:null

            },
            preview: null,
            isUpdate:false,
            targetId:''
        }
    },
    computed:{
        ...mapState(['categories', 'Loader', 'imgUrl']),
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
        handleFileChange(e) {
            this.formData.photo = e.target.files[0];

            if (this.formData.photo) {
                this.preview = URL.createObjectURL(this.formData.photo);
            } else {
                this.preview = null;
            }
        },
        async handleSubmit(){
            this.isLoader = true
            const productData = new FormData();
            for (const key in this.formData) {
                productData.append(key, this.formData[key]);
            }
            const token = localStorage.getItem('token')
            if(this.isUpdate){
                try{
                    const response = await axios.put(`/product/product/${this.targetId}`, productData, {
                        headers:{
                            Authorization: token
                        }
                    })
                    toastNote(response.data?.message?? "Success", 'success')
                    this.formData = {
                        name:'',
                        description:'',
                        photo:null,
                        price:null,
                        quantity:null,
                        category:'',
                        shipping:null
                    }
                    this.preview = null;
                    this.$store.dispatch('getProducts')
                    this.isLoader = false
                    setTimeout(() => {
                        this.$router.push('/admin/dashboard/products')
                    }, 2000);
                } catch (error) {
                    const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                    toastNote(errorMessage, 'error')
                    this.isLoader = false
                }
            }else{
                try{
                    const response = await axios.post('/product/add-product', productData, {
                        headers:{
                            Authorization: token
                        }
                    })
                    toastNote(response.data?.message?? "Success", 'success')
                    this.formData = {
                        name:'',
                        description:'',
                        photo:null,
                        price:null,
                        quantity:null,
                        category:'',
                        shipping:null
                    }
                    this.preview = null;
                    this.isLoader = false
                    this.$store.dispatch('getProducts')
                } catch (error) {
                    const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                    toastNote(errorMessage, 'error')
                    this.isLoader = false
                }
            }
        }
    },
    created() {
        this.$watch(
            () => this.$route.params.slug,
            async (newSlug, oldSlug) => {
                if(newSlug){
                    this.isLoader = true
                    try{
                        const response = await axios.get(`/product/single-product/${newSlug}`)
                        const product = response.data.product
                        this.formData = {
                            name:product.name,
                            description:product.description,
                            price:product.price,
                            quantity:product.quantity,
                            category:product.category._id,
                            shipping:product.shipping
                        }
                        this.preview = this.imgUrl+product._id
                        this.isUpdate = true
                        this.targetId = product._id
                        this.isLoader = false
                    } catch (error) {
                        const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                        toastNote(errorMessage, 'error')
                        this.isLoader = false
                    }
                }
            },
            { immediate: true }
        )
    }
}
</script>