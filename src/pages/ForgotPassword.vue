<template>
    <FormDesign title="Forgot Password" buttonText="Update" link="login" @submit="handleForgot">
        <div class="space-y-3">
            <input type="email" placeholder="Email" v-model="formData.email"/>
            <input type="text" placeholder="Your favourite sports" v-model="formData.answer"/>
            <input type="password" placeholder="New Password" v-model="formData.password"/>
        </div>
    </FormDesign>
</template>

<script>
import axios from 'axios';
import FormDesign from '../components/FormDesign.vue';
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote, isValidEmail } from '../utills/generalUtills';

export default{
    name: "ForgotPassword",
    components:{
        FormDesign
    },
    data(){
        return{
            formData:{
                email:'',
                answer:'',
                password:''
            }
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
        }
    },
    methods:{
        async handleForgot(){
            const condition = this.formData.email != '' && this.formData.password != '' && this.formData.answer != ''
            
            if(!condition)return toastNote('Fill Required ', 'error')

            if(!isValidEmail(this.formData.email)) return toastNote('Invalid email', 'error')

            this.isLoader = true
            try{
                const response = await axios.post('/auth/forgot-password', this.formData)
                const successMessage = response.data?.message?? 'Success'

                localStorage.setItem('token', response.data?.token?? '')

                toastNote(successMessage, 'success')
                this.isLoader = false
                setTimeout(() => {
                    this.$router.push('/login');
                }, 2500);
            }catch(error){
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        }
    }
}
</script>