<template>
    <FormDesign title="Register" buttonText="Register" link="login" @submit="handleRegister">
        <div class="space-y-3">
            <input type="text" placeholder="Name" v-model="formData.name"/>
            <input type="email" placeholder="Email" v-model="formData.email"/>
            <input type="password" placeholder="Password" v-model="formData.password"/>
            <input type="tel" placeholder="+0 (000) 000‑000" v-model="formData.phone"/>
            <input type="text" placeholder="Address" v-model="formData.address"/>
            <input type="text" placeholder="Your favourite sports" v-model="formData.answer"/>
        </div>
    </FormDesign>
</template>

<script>
import axios from 'axios';
import { toastNote, isValidEmail } from '../utills/generalUtills';
import FormDesign from '../components/FormDesign.vue';
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default{
    name: "Register",
    components:{
        FormDesign
    },
    data(){
        return{
            formData:{
                name:'',
                email:'',
                password:'',
                phone:'',
                address:'',
                answer:''
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
        async handleRegister(){
            const condition = this.formData.name != '' && this.formData.email != '' && this.formData.password != '' && this.formData.phone != '' && this.formData.address != '' && this.formData.answer != ''
            
            if(!condition)return toastNote('Fill Required ', 'error')

            if(!isValidEmail(this.formData.email)) return toastNote('Invalid email', 'error')
            this.isLoader = true
            try{
                const response = await axios.post('/auth/register', this.formData)
                const successMessage = response.data?.message?? 'Success'
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