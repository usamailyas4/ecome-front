<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="bg-stone-200 mt-[5.7rem] min-h-[73vh]">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default{
  name: "App",
  components:{
    Header,
    Footer
  }
}
</script>