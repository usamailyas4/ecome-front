<template>
    <div class="flex items-center justify-center p-16">
        <div class="max-w-5xl w-full bg-white rounded-2xl shadow-sm overflow-hidden">
            <div v-if="product" class="grid grid-cols-1 md:grid-cols-2">
                <div class="max-h-[500px] min-h-400">
                    <img :src="'http://localhost:8080/api/v1/product/product-photo/'+product._id" alt="Product Image" class="w-full h-full object-cover"/>
                </div>

                <div class="p-8 flex flex-col justify-between">
                    <div>
                        <h1 class="text-normal truncate">{{product.name}}</h1>
                        <p class="text-normal mt-1">{{ product.category.name }}</p>

                        <div class="mt-4">
                            <span class="text-3xl font-bold text-normal">$ {{ product.price }}</span>
                        </div>

                        <p class="mt-6 text-normal leading-relaxed">{{ product.description }}</p>
                    </div>

                    <div class="mt-8 flex items-center justify-between">
                        <span class="bg-secondary text-light text-xs font-medium px-3 py-3 rounded-2xl">In Stock ({{product.quantity}})</span>
                        <button class="primary" @click="$store.commit('setCart', product)">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div class="mt-6 p-8">
                <div class=" border-t border-light mb-6"></div>
                <h2>Related products</h2>
                <div class="mt-4 overflow-x-auto">
                    <div class="flex gap-4 min-w-max">
                        <div v-if="relatedProducts" v-for="(product,index) in relatedProducts" :key="index" class="bg-light rounded-2xl h-fit shadow-md overflow-hidden border border-light hover:shadow-lg flex-shrink-0 w-60 sm:w-64 md:w-60 lg:w-72">
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
                            <h1>No Related Product</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toastNote } from '../utills/generalUtills.js';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name: "Product",
    data(){
        return{
            product:null,
            relatedProducts:null
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
                        this.product = product
                        if (product && product.category && product._id && product.category._id) {
                            const related = await axios.get(`/product/related-product/${product._id}/${product.category._id}`)
                            this.relatedProducts = related.data.products
                        } else {
                            this.relatedProducts = []
                        }
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
    }
}
</script>