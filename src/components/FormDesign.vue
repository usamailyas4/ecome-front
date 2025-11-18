<template>
    <div class="flex items-center justify-center p-4 md:p-16">
        <div class="max-w-3xl w-full text-center bg-white shadow-lg rounded-2xl p-10">
            <h1 class="text-secondary mb-4">{{title}}</h1>
            <form @submit.prevent="">
                <slot></slot>
                <button type="submit" class="primary w-[40%] mt-4">{{ buttonText }}</button>
            </form>
            <div class="text-center mt-4">
                <span>Already have an account? </span>
                <router-link :to="`/`+link" class="font-semibold hover:underline capitalize">{{link}}</router-link>
            </div>
            <div class="text-center mt-4">
                <router-link to="/forgot" class="font-semibold hover:underline capitalize">Forgot Password</router-link>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
  name: "FormDesigne",
  props: {
    title: String,
    buttonText: String,
    link: String
  }
};
</script>