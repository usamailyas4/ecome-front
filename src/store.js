import axios from 'axios';
import { createStore } from 'vuex'
import { toastNote } from './utills/generalUtills';

const store = createStore({
    state() {
        return{
            Loader: false,
            login: JSON.parse(localStorage.getItem('login')) || false,
            user: JSON.parse(localStorage.getItem('user')) || null,
            categories: [],
            produts:null,
            productCount:0,
            cartItems:JSON.parse(localStorage.getItem('cart')) || [],
            cartCount:JSON.parse(localStorage.getItem('cartCount')) || 0,
        }
    },
    mutations: {
        setCart(state, value){
            if(value == null){
                state.cartItems = []
                state.cartCount = 0
            }else{
                const existingItem = state.cartItems.find(cartItem => cartItem.item._id === value._id)
                if (existingItem) {
                    // If exists, increase qty
                    existingItem.qty += 1
                } else {
                    // Otherwise push as a new entry
                    state.cartItems.push({
                    item: value,
                    qty: 1
                    })
                }
                state.cartCount ++
            }
            localStorage.setItem('cart',JSON.stringify(state.cartItems));
            localStorage.setItem('cartCount',JSON.stringify(state.cartCount));
        },
        removeCartItem(state, id) {
            const index = state.cartItems.findIndex(cartItem => cartItem.item._id === id)
            if (index !== -1) {
                state.cartCount -= state.cartItems[index].qty
                state.cartItems.splice(index, 1)
                
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
                localStorage.setItem('cartCount', JSON.stringify(state.cartCount))
            }
        },
        setLoader(state, value) {
        state.Loader = value
        },
        setLogin(state, value) {
            localStorage.setItem('login',JSON.stringify(value));
            state.login = value
        },
        setUser(state, user) {
            localStorage.setItem('user',JSON.stringify( user));
            state.user = user
        },
        setCategories(state, categories){
            state.categories = categories
        },
        setProducts(state, products){
            state.products = products
        },
        setproductCount(state, productCount){
            state.productCount = productCount
        }
    },
    actions:{
        async getCategories({ commit }) {
            commit('setLoader', true)
            try {
                const response = await axios.get('/category/categories')
                commit('setCategories', response.data?.categories?? [])
                commit('setLoader', false)
            } catch (error) {
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                commit('setLoader', false)
            }
        },
        async getProducts({ commit }) {
            commit('setLoader', true)
            try{
                const response = await axios.get('/product/get-product')
                commit('setProducts', response.data?.products?? [])
                commit('setproductCount', response.data?.products?.length?? 0)
                commit('setLoader', false)
            } catch (error) {
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                commit('setLoader', false)
            }
        }
    }
})
export default store