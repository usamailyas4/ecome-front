<template>
    <SideBar 
        :menu="[
            {name:'Categories', link:'/admin/dashboard/categories'},
            {name:'Create Product', link:'/admin/dashboard/new-product'},
            {name:'Products', link:'/admin/dashboard/products'},
            {name:'Orders', link:'/admin/dashboard/orders'},
            {name:'Users', link:'/admin/dashboard/users'}
        ]" 
        title="Admin Panel"
    />
    <div class="flex-1 ml-0 md:ml-60 px-2 py-4">
        <div class="bg-light text-normal px-8 mb-6 py-4 rounded-2xl w-[90%] mx-auto flex justify-between otems-center">
            <h2>Welcome to Dashboard</h2>
            <h4>{{ user?.name?? '' }}</h4>
        </div>
        <RouterView />
    </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import SideBar from '../../../components/SideBar.vue';

export default{
    name: "Dashboard",
    components:{
        SideBar
    },
    computed:{
        ...mapState(['user'])
    }
}
</script>