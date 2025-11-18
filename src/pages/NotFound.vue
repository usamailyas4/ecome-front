<template>
    <div class="flex items-center justify-center p-16">
        <div class="max-w-2xl w-full text-center bg-white shadow-lg rounded-2xl p-10">
            <h1 class="text-8xl font-bold text-secondary mb-4">404</h1>
            <h2 class="text-2xl font-semibold text-normal mb-2">Page Not Found</h2>
            <p class="mb-8 text-normal">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>

            <router-link to="/">
                <button class="primary">Go Home</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default{
    name: "NotFound"
}
</script>