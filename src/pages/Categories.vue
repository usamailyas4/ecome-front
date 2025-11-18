<template>
    <div class="w-[100%] px-8 py-4">
        <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg-grid-cols-4">
            <div v-if="products.length > 0" v-for="(product,index) in products.slice(0, count)" :key="index" class="bg-light rounded-2xl h-fit shadow-md overflow-hidden border border-light hover:shadow-lg">
                <router-link :to="`/product/${product.slug}`">
                    <div class="relative z-10">
                        <img :src="'http://localhost:8080/api/v1/product/product-photo/'+product._id + '?t=' + Date.now()" alt="Product Image" class="w-full h-48 object-cover"/>
                        <span class="absolute top-3 left-3 bg-secondary text-light text-xs font-semibold px-2 py-1 rounded-full shadow-sm">{{product.category.name}}</span>
                    </div>
                </router-link>
                <div class="p-4">
                    <div class="">
                        <h5 class="font-semibold leading-tight text-normal">{{product.name}}</h5>
                    </div>
                    <p class="mt-3 text-sm text-normal line-clamp-2">{{product.description}}</p>
                    <div class="mt-4 flex items-center justify-between">
                        <span class="bg-secondary text-light text-xs font-medium px-2 py-1 rounded-full">{{product.quantity}} in stock</span>
                        <div class="text-md font-bold text-normal">$ {{ product.price }}</div>
                    </div>
                    <div class="mt-4">
                        <button class="primary w-[100%]" @click="$store.commit('setCart', product)">Add to cart</button>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <p>No Product yet</p>
            </div>
        </div>
        <div v-if="products.length > count" class="mt-6 text-center">
            <button class="primary w-[20%]" @click="loadMore">Load</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name:"Categories",
    data(){
        return{
            count:6,
            products:[]
        }
    },
    methods:{
        loadMore(){
            this.isLoader = true
            setTimeout(() => {
                this.count += 6
                this.isLoader = false
            }, 2000);
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
        }
    },
    created() {
        this.$watch(
            () => this.$route.params.slug,
            async (newSlug, oldSlug) => {
                this.count = 6
                this.isLoader = true
                if(newSlug){
                    this.isLoader = true
                    try{
                        const response = await axios.get(`/product/category-product/${newSlug}`)
                        this.products = response.data.products
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