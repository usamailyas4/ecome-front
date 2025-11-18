<template>
  <div class="flex fixed z-20">
    <button @click="isOpen=true" class="absolute top-4 text-lg left-2 z-09 md:hidden bg-secondary text-light py-1 px-2 rounded-lg shadow">☰</button>

    <div v-if="isOpen" @click="closeMenu" class="fixed inset-0 bg-black bg-opacity-50 z-08 md:hidden"></div>

    <!-- Sidebar -->
    <div
      class="z-09 pt-8 bg-light min-h-screen max-h-screen static w-60 transform transition-transform duration-300 md:translate-x-0 md:fixed"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <h2 class="text-secondary text-center pb-3 mb-6 border-b-4 border-secondary">{{ title }}</h2>
      <ul class="">
        <li v-for="(item,index) in menu" :key="index">
            <RouterLink :to="item.link"  v-slot="{ isActive }" @click="closeMenu">
              <h5 class="block py-2 px-3 border-b border-secondary hover:text-light hover:bg-primary" :class="isActive ? 'bg-primary text-light':'text-normal'">{{item.name}}</h5>
            </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false
    }
  },
  props:{
    title:String,
    menu: Array
  },
  methods: {
    closeMenu() {
      this.isOpen = false
    }
  }
}
</script>
