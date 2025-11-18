<template>
    <div class="max-w-5xl mx-auto p-2 md:p-6">
        <div class="bg-white rounded-xl shadow-md p-6">
            <div class="w-full overflow-x-auto">
                <table class="w-full min-w-[650px] text-left border-collapse">
                    <thead>
                        <tr class="border-b text-gray-600 text-sm">
                            <th class="py-3">Order ID</th>
                            <th class="py-3">Customer</th>
                            <th class="py-3">Payment</th>
                            <th class="py-3">Amount</th>
                            <th class="py-3">Status</th>
                            <th class="py-3">Items</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-800">
                        <template v-for="(order,index) in orders" :key="index">
                            <tr class="border-b">
                                <td class="py-3 font-medium">#{{ index + 1 }}</td>
                                <td class="py-3">{{ order.buyer.name }}</td>

                                <td class="py-3" :class="order.payment.success ? 'text-green-600' : 'text-red-600'">
                                    {{ order.payment.success ? 'Paid' : 'Failed' }}
                                </td>

                                <td class="py-3 font-semibold">
                                    ${{ order.payment.transaction.amount }}
                                </td>

                                <td class="py-3">
                                    <span v-if="!order.showItems" class="px-2 py-1 rounded-full text-normal text-xs">
                                        {{ order.status }}
                                    </span>

                                    <select
                                        v-else
                                        v-model="order.status"
                                        @change="changeStatus(order.status, order._id)"
                                        class="px-2 py-1 w-[90%] rounded border text-sm">
                                        <option value="Not Process">Not Process</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Deliverd">Deliverd</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
                                </td>

                                <td class="py-3">
                                    <button class="text-primary text-sm hover:underline" @click="order.showItems = !order.showItems">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            class="size-6 transition-transform duration-300"
                                            :class="order.showItems ? 'rotate-180' : ''">
                                            <path fill-rule="evenodd"
                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                                                clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="order.showItems" class="bg-gray-50">
                                <td colspan="6" class="p-4">
                                    <div class="space-y-3">

                                        <div
                                            v-for="item in order.products"
                                            :key="item.product._id"
                                            class="flex justify-between items-center bg-white p-3 rounded border sm:gap-0 gap-3">

                                            <div class="flex items-center space-x-3 w-full sm:w-auto">
                                                <img :src="'http://localhost:8080/api/v1/product/product-photo/' + item.product._id"
                                                    class="w-12 h-12 rounded border" />

                                                <div>
                                                    <p class="font-medium text-sm sm:text-base">{{ item.product.name }}</p>
                                                    <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                                                </div>
                                            </div>

                                            <p class="font-semibold w-full sm:w-auto text-right sm:text-right">
                                                ${{ item.product.price }}
                                            </p>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toastNote } from '../../../utills/generalUtills';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name:"AdminOrders",
    data(){
        return{
            orders:[],
            close:false
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
            const response = await axios.get('/order/all-orders', {
                headers:{
                    Authorization: token
                }
            })
            this.orders = response.data.orders.map(order => ({
                ...order,
                showItems: false,
                edit: false 
            }))
            this.isLoader = false
        }catch(error){
            const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
            toastNote(errorMessage, 'error')
            this.isLoader = false
        }
    },
    methods:{
        async changeStatus(status, id){
            this.isLoader = true
            const token = localStorage.getItem('token')
            try{
                const response = await axios.put(`/order/order-status/${id}`, {status}, {
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
    }
}
</script>