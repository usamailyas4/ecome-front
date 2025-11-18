<template>
    <footer class="bg-secondary relative z-50 text-center py-2 mt-auto">
        <h4 class="text-light">All Right Reserved</h4>
        <nav class="flex justify-center gap-2 mt-2">
            <router-link to="/about"><h6 class="px-2 text-light border-b-2 border-transparent hover:border-light text-center inline-block">About</h6></router-link>
            <div class="border-r border-light"></div>
            <router-link to="/contact"><h6 class="px-2 text-light border-b-2 border-transparent hover:border-light text-center inline-block">Contact</h6></router-link>
            <div class="border-r border-light"></div>
            <router-link to="/policy"><h6 class="px-2 text-light border-b-2 border-transparent hover:border-light text-center inline-block">Privach Policy</h6></router-link>
        </nav>
    </footer>
</template>
<script>
export default{
    name:"Footer"
}
</script>