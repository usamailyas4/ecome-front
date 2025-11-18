<template>
    <FormDesign title="Login" buttonText="Login" link="register" @submit="handleLogin">
        <div class="space-y-3">
            <input type="email" placeholder="Email" v-model="formData.email"/>
            <input type="password" placeholder="Password" v-model="formData.password"/>
        </div>
    </FormDesign>
</template>

<script>
import axios from 'axios';
import FormDesign from '../components/FormDesign.vue';
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote, isValidEmail } from '../utills/generalUtills';

export default{
    name: "Login",
    components:{
        FormDesign
    },
    data(){
        return{
            formData:{
                email:'',
                password:''
            }
        }
    },
    computed:{
        ...mapState(['Loader', 'user', 'login']),
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
        async handleLogin(){
            const condition = this.formData.email != '' && this.formData.password != ''
            
            if(!condition)return toastNote('Fill Required ', 'error')

            if(!isValidEmail(this.formData.email)) return toastNote('Invalid email', 'error')

            this.isLoader = true
            try{
                const response = await axios.post('/auth/login', this.formData)
                const successMessage = response.data?.message?? 'Success'

                localStorage.setItem('token', response.data?.token?? '')

                toastNote(successMessage, 'success')
                this.isLoader = false
                setTimeout(() => {
                    this.$store.commit('setUser', response.data?.user ?? null)
                    this.$store.commit('setLogin', true)
                    
                    this.$router.push('/');
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