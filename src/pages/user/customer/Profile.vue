<template>
    <FormDesign class="-mt-8" title="Profile" buttonText="Update" link="login" @submit="profileUpdate">
        <div class="space-y-3">
            <input type="text" placeholder="Name" v-model="formData.name"/>
            <input type="email" placeholder="Email" disabled :value="email"/>
            <input type="password" placeholder="Password" v-model="formData.password"/>
            <input type="tel" placeholder="+0 (000) 000‑000" v-model="formData.phone"/>
            <input type="text" placeholder="Address" v-model="formData.address"/>
            <input type="text" placeholder="Your favourite sports" v-model="formData.answer"/>
        </div>
    </FormDesign>
</template>

<script>
import FormDesign from '../../../components/FormDesign.vue';
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { toastNote } from '../../../utills/generalUtills';
import axios from 'axios';

export default{
    name:"Profile",
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
            },
            email:''
        }
    },
    computed:{
        ...mapState(['Loader', 'user']),
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
        async profileUpdate(){
            this.isLoader = true
            try{
                const response = await axios.put('/auth/update-profile', this.formData)
                const successMessage = response.data?.message?? 'Success'
                toastNote(successMessage, 'success')
                this.isLoader = false
                this.$store.commit('setUser', response.data?.user ?? null)
                console.log(response.data.user)
            }catch(error){
                const errorMessage = error.response?.data?.message ?? error.message ?? 'Something went wrong'
                toastNote(errorMessage, 'error')
                this.isLoader = false
            }
        }
    },
    mounted(){
        this.formData={
                name:this.user.name,
                email:this.user.email,
                password:this.user.password,
                phone:this.user.phone,
                address:this.user.address,
                answer:this.user.answer
            }
            this.email=this.user.email
    }
}
</script>