<template>
  <div class="bg-primary fixed w-full z-50">
    <div class="h-[91px] px-5 flex items-center justify-between">
      <div v-if="Loader" class="ripple"><div></div><div></div></div>
      <h1 class="text-light text-lg font-bold truncate">E-commerce App</h1>
      <nav class="hidden md:flex items-center gap-2">
        <router-link to="/">
          <h4 class="px-2 pb-1 text-light border-b-2 border-transparent hover:border-light">Home</h4>
        </router-link>

        <div @mouseenter="categoryDropDown = true" @mouseleave="categoryDropDown = false" class="relative">
          <h4 class="px-2 text-light border-b-2 border-transparent hover:border-light flex items-center gap-1 cursor-pointer">
            Categories
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </h4>
          <div v-show="categoryDropDown" class="bg-secondary w-44 absolute top-8 left-0 py-3 rounded shadow-lg">
            <div v-for="(category,index) in categories" :key="index" class="hover:bg-primary">
              <router-link :to="`/category/${category.slug}`" class="text-light py-2 px-6 block">{{ category.name }}</router-link>
            </div>
          </div>
        </div>

        <div v-if="!login" class="flex gap-2">
          <router-link to="/register">
            <h4 class="px-2 pb-1 text-light border-b-2 border-transparent hover:border-light">Register</h4>
          </router-link>
          <router-link to="/login">
            <h4 class="px-2 pb-1 text-light border-b-2 border-transparent hover:border-light">Login</h4>
          </router-link>
        </div>

        <div v-if="login" @mouseenter="dropDown = true" @mouseleave="dropDown = false" class="relative">
          <h4 class="px-2 text-light border-b-2 border-transparent hover:border-light flex items-center gap-1 cursor-pointer">
            <span class="truncate max-w-[120px] block">{{ user?.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </h4>
          <div v-show="dropDown" class="bg-secondary absolute top-8 left-0 py-3 rounded shadow-lg w-44">
            <router-link :to="user?.role == 1 ? '/admin/dashboard':'/dashboard'" class="text-light py-2 px-6 block hover:bg-primary">Dashboard</router-link>
            <h5 class="text-light py-2 px-6 block hover:bg-primary cursor-pointer" @click="handleLogout">Logout</h5>
          </div>
        </div>

        <router-link to="/cart">
          <h4 class="px-2 pb-1 flex items-center text-light border-b-2 border-transparent hover:border-light">
            Cart ({{cartCount}})
          </h4>
        </router-link>
      </nav>

      <!-- Mobile Hamburger Menu -->
      <div class="md:hidden flex items-center">
        <button @click="mobileMenu = !mobileMenu" class="text-light focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-show="mobileMenu" class="md:hidden bg-secondary w-full py-4 px-5 animate__animated animate__fadeIn">
      <router-link to="/" class="block py-2 text-light" @click="mobileMenu = false">Home</router-link>
      <div class="py-2">
        <h5 @click="mobileCategories = !mobileCategories" class="text-light cursor-pointer flex justify-between items-center">
          Categories
          <svg :class="{'rotate-180': mobileCategories}" class="w-4 h-4 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </h5>
        <div v-show="mobileCategories" class="pl-4 mt-2">
          <router-link 
            v-for="(category,index) in categories" 
            :key="index" 
            :to="`/category/${category.slug}`" 
            class="block py-1 text-light"
            @click="mobileMenu = false; mobileCategories = false"
          >
            {{ category.name }}
          </router-link>
        </div>
      </div>

      <div v-if="!login" class="mt-2">
        <router-link to="/register" class="block py-2 text-light" @click="mobileMenu = false">Register</router-link>
        <router-link to="/login" class="block py-2 text-light" @click="mobileMenu = false">Login</router-link>
      </div>

      <div v-if="login" class="mt-2">
        <router-link :to="user?.role == 1 ? '/admin/dashboard':'/dashboard'" class="block py-2 text-light" @click="mobileMenu = false">Dashboard</router-link>
        <h5 @click="handleLogout(), mobileMenu=false" class="py-2 text-light cursor-pointer">Logout</h5>
      </div>

      <router-link to="/cart" class="block py-2 text-light" @click="mobileMenu = false">Cart ({{cartCount}})</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote } from '../utills/generalUtills';

export default {
  name:"Header",
  data() {
    return {
      dropDown: false,
      categoryDropDown: false,
      mobileMenu: false,
      mobileCategories: false
    }
  },
  computed: {
    ...mapState(['Loader', 'login', 'user', 'categories', 'cartCount'])
  },
  methods: {
    handleLogout() {
      toastNote('Logout', 'warning');
      setTimeout(() => {
        this.$store.commit('setLogin', false);
        this.$store.commit('setUser', null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("login");
        this.$router.push('/login');
      }, 2500);
    }
  }
}
</script>
