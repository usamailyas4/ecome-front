<template>
    <div class="flex items-center justify-center p-4 md:p-16">
        <div class="max-w-5xl w-full bg-white rounded-2xl shadow-sm overflow-hidden p-4 md:p-10">
            <h2>Shopping Cart</h2>
            <div v-if="cartItems.length">
                <div class="overflow-x-auto mt-6">
                    <table class="table-auto w-full min-w-[600px] border-separate border-spacing-y-3">
                        <thead>
                        <tr class="bg-secondary text-light font-semibold text-left">
                            <th class="px-4 py-3 rounded-l-lg"></th>
                            <th class="px-4 py-3">Product Image</th>
                            <th class="px-4 py-3">Name</th>
                            <th class="px-4 py-3">Price</th>
                            <th class="px-4 py-3">Quantity</th>
                            <th class="px-4 py-3 rounded-r-lg">Total</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(record, index) in cartItems" :key="index" class="bg-white shadow-sm rounded-xl">
                            <td class="text-secondary px-4 py-3">
                            <div class="w-fit cursor-pointer" @click="confirmDelete(record.item._id)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            </td>
                            <td class="px-4 py-3">
                            <img :src="'http://localhost:8080/api/v1/product/product-photo/' + record.item._id" alt="product image" class="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                            </td>
                            <td class="px-4 py-3 font-medium text-normal">{{ record.item.name }}</td>
                            <td class="px-4 py-3 text-normal">$ {{ record.item.price }}</td>
                            <td class="px-4 py-3 text-normal">{{ record.qty }}</td>
                            <td class="px-4 py-3 font-semibold text-primary text-right">
                            $ {{ record.qty * record.item.price }}
                            </td>
                        </tr>

                        <tr class="bg-light font-semibold">
                            <td colspan="5" class="px-4 py-3 text-right rounded-l-lg">Grand Total:</td>
                            <td class="px-4 py-3 text-right text-primary rounded-r-lg">
                            ${{ cartTotal }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="!login" class="p-3 bg-light border-4 rounded-lg border-normal cursor-pointer flex items-center gap-2 text-primary" @click="$router.push('/login')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                    </svg>
                    <h4 class="text-primary">proceed to checkout</h4>
                </div>
                <div v-else class="mt-4 border-t border-light p-4">
                    <div id="dropin-container"></div>
                    <button @click="handlePayment" class="primary">Checkout</button>
                </div>
            </div>
            <div v-else class="text-center mt-6 bg-light py-6 px-4 rounded-2xl">
                <h2 class="text-normal">Empty cart</h2>
            </div>
            <ConfirmDelete :show="showModal" @confirm="deleteItem" @cancel="showModal = false" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import ConfirmDelete from '../components/ConfirmDelete.vue';
import dropin from "braintree-web-drop-in";
import axios from 'axios';
import { toastNote } from '../utills/generalUtills';

export default{
    name:"Cart",
    components:{
        ConfirmDelete
    },
    data(){
        return{
            showModal: false,
            selectedItem: '',
            dropinInstance: null,
        }
    },
    computed:{
        ...mapState(['cartItems', 'login', 'Loader']),
        isLoader: {
            get() {
                return this.Loader
            },
            set(value) {
                this.$store.commit('setLoader', value)
            }
        },
        cartTotal() {
            return this.cartItems.reduce((total, record) => total + record.item.price * record.qty, 0);
        }
    },
    async mounted() {
        if(this.login){
            try {
                const { data } = await axios.get("/product/braintree/token");
                this.dropinInstance = await dropin.create({
                    authorization: data.clientToken,
                    container: "#dropin-container",
                });
            } catch (err) {
                console.error("Braintree init error:", err);
            }
        }
    },
    methods:{
        confirmDelete(id) {
            this.selectedItem = id
            this.showModal = true
        },
        deleteItem(){
            this.$store.commit('removeCartItem', this.selectedItem)
            this.showModal = false
        },
        async handlePayment() {
            if (!this.dropinInstance) return;
            this.isLoader = true
            const token = localStorage.getItem('token')
            const cart = this.cartItems
            try {
                const { nonce } = await this.dropinInstance.requestPaymentMethod();
                console.log(nonce)
                const response = await axios.post("/product/braintree/payment", {
                nonce,
                cart,
                }, {
                        headers:{
                            Authorization: token
                        }
                    });

                console.log("Payment Success:", response.data);
                toastNote(response.data?.message?? "Success", 'success')
                this.$store.commit('setCart', null);
                localStorage.removeItem("cart")
                localStorage.removeItem("cartCount")
                setTimeout(() => {
                    this.$router.push('/dashboard/orders')
                }, 2000);
                this.isLoader = false
            } catch (error) {
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        },
    }
}
</script>