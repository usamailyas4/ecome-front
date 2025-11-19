<template>
    <div class="flex flex-col md:flex-row">
        <div class="w-[100%] md:w-[20%] py-4 px-4 md:pr-0">
            <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-4 md:mb-0">
                <h5 class="font-bold">Search</h5>
                <div class="mt-2 mb-6">
                    <input type="text" placeholder="Search by Title" v-model="byTitle">
                </div>
                <h5 class="font-bold">Filter by category</h5>
                <div v-if="categories.length>0" class="flex flex-col gap-2 mt-2 mb-6">
                    <label v-for="(category,index) in categories" :key="index" class="flex gap-2">
                        <input type="checkbox" :value="category._id" v-model="filterCategories">
                        <h5>{{ category.name }}</h5>
                    </label>
                </div>

                <h5 class="font-bold">Filter by Proce</h5>
                <div class="flex flex-col gap-2 mt-2 mb-6">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="price" value="0-29" v-model="selectedRange" />
                        <span>Under $30</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="price" value="30-59" v-model="selectedRange" />
                        <span>$30 - $59</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="price" value="60-89" v-model="selectedRange" />
                        <span>$60 - $89</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="price" value="90-120" v-model="selectedRange" />
                        <span>$90 - $120</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="price" value="120+" v-model="selectedRange" />
                        <span>Above $120</span>
                    </label>
                </div>
                <button type="button" class="primary w-[100%]" @click="[filterCategories=[], selectedRange=null, byTitle='']">Reset</button>
            </div>
        </div>
        <div class="w-[100%] md:w-[80%] px-8 py-4">
            <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg-grid-cols-4">
                <div v-if="filteredProducts.length > 0" v-for="(product,index) in filteredProducts.slice(0, count)" :key="index" class="bg-light rounded-2xl h-fit shadow-md overflow-hidden border border-light hover:shadow-lg">
                    <router-link :to="`/product/${product.slug}`">
                        <div class="relative z-10">
                            <img :src="imgUrl+product._id + '?t=' + Date.now()" alt="Product Image" class="w-full h-48 object-cover"/>
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
            <div v-if="productList.length > count && filteredProducts.length > count" class="mt-6 text-center">
                <div class="flex items-center justify-center h-40">
                    <div class="w-10 h-10 border-4 border-light border-t-primary rounded-full animate-spin"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex/dist/vuex.cjs.js';
export default{
    name: "Home",
    data(){
        return{
            productList:[],
            filterCategories:[],
            byTitle:'',
            selectedRange:null,
            count:6
        }
    },
    computed:{
        ...mapState(['categories', 'products', 'productCount', 'Loader', 'imgUrl']),
        isLoader: {
            get() {
                return this.Loader
            },
            set(value) {
                this.$store.commit('setLoader', value)
            }
        },
        filteredProducts() {
            let filtered = this.productList || []

            if(this.byTitle){
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(this.byTitle.toLowerCase())
                )
            }

            if (this.filterCategories.length > 0) {
                filtered = filtered.filter(product => 
                this.filterCategories.includes(product.category._id)
                )
            }

            if (this.selectedRange) {
                filtered = filtered.filter(product => {
                const price = product.price
                const range = this.selectedRange

                if (range === "0-29") return price < 30
                if (range === "30-59") return price >= 30 && price <= 59
                if (range === "60-89") return price >= 60 && price <= 89
                if (range === "90-120") return price >= 90 && price <= 120
                if (range === "120+") return price > 120
                })
            }

            return filtered
        }
    },
    methods: {
        ...mapActions(['getProducts']),
        handleScroll() {
            const bottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

            if (bottom) {
                this.loadMore();
             }
        },
        loadMore(){
            setTimeout(() => {
                this.count += 6
            }, 500);
        }
    },
    async mounted(){
        await this.getProducts()
        this.productList = this.products
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}
</script>