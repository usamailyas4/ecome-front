<template>
    <SideBar 
        :menu="[
            {name:'Profile', link:'/dashboard/profile'},
            {name:'Orders', link:'/dashboard/orders'}
        ]" 
        title="Admin Panel"
    />
    <div class="flex-1 ml-0 md:ml-60 px-2 py-4">
        <div class="bg-light px-8 mb-6 py-4 rounded-2xl w-[90%] mx-auto flex justify-between otems-center">
            <h2>Welcome to Dashboard</h2>
            <h4>{{ user.name }}</h4>
        </div>
        <RouterView />
    </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import SideBar from '../../../components/SideBar.vue';

export default{
    name: "UserDashboard",
    components:{
        SideBar
    },
    computed:{
        ...mapState(['user'])
    }
}
</script>