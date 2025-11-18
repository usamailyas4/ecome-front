<template>
    <div v-if="orders.length>0" class="max-w-4xl mx-auto p-2 md:p-6 space-y-6">
        <div v-for="(order,index) in orders" :key="index" class="bg-white shadow rounded-xl p-5 border border-light">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-normal">Order #{{index+1}}</h2>
                    <p class="text-normal">Buyer: {{order.buyer.name}}</p>
                </div>
                <span 
                    class="px-3 py-1 text-xs text-white rounded-full"
                    :class="{
                        'bg-gray-500': order.status === 'Not Process',
                        'bg-yellow-500': order.status === 'processing',
                        'bg-blue-500': order.status === 'Shipped',
                        'bg-lime-500': order.status === 'Deliverd',
                        'bg-rose-500': order.status === 'Cancel',
                    }">
                    {{order.status}}
                </span>
            </div>
            <div class="text-sm text-normal mb-4">
                <p>Payment: <span class="font-medium text-primary">{{order.payment.success ? 'Paid':'Failed'}}</span></p>
                <p>Amount: <span class="font-bold">${{order.payment.transaction.amount}}</span></p>
            </div>
            <div class="space-y-3">
                <div v-for="item in order.products" class="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <img :src="'http://localhost:8080/api/v1/product/product-photo/' + item.product._id"
                            class="w-14 h-14 rounded object-cover border">
                        <div>
                            <p class="font-medium text-normal">{{ item.product.name }}</p>
                            <p class="text-xs text-normal">Qty: {{item.quantity}}</p>
                        </div>
                    </div>
                    <p class="font-semibold text-normal">${{item.product.price}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toastNote } from '../../../utills/generalUtills';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name:"Orders",
    data(){
        return{
            orders:[]
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
    async mounted(){
        this.isLoader = true
        const token = localStorage.getItem('token')
        try{
            const response = await axios.get('/order/orders', {
                headers:{
                    Authorization: token
                }
            })
            this.orders = response.data.orders
            this.isLoader = false
        }catch(error){
            const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
            toastNote(errorMessage, 'error')
            this.isLoader = false
        }
    }
}
</script>