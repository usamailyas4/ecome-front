import { createWebHistory, createRouter } from 'vue-router'
import store from './store'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Policy from './pages/Policy.vue'
import NotFound from './pages/NotFound.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Dashboard from './pages/user/admin/Dashboard.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import UserDashboard from './pages/user/customer/UserDashboard.vue'
import AddCategory from './pages/user/admin/Categories.vue'
import AddProduct from './pages/user/admin/AddProduct.vue'
import Users from './pages/user/admin/Users.vue'
import Profile from './pages/user/customer/Profile.vue'
import Orders from './pages/user/customer/Orders.vue'
import Products from './pages/user/admin/Products.vue'
import Product from './pages/product.vue'
import Categories from './pages/Categories.vue'
import Cart from './pages/Cart.vue'
import AdminOrders from './pages/user/admin/AdminOrders.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/product/:slug', component: Product, meta: { title: 'Product | Ecommerce' } },
  { path: '/category/:slug', component: Categories, meta: { title: 'Category | Ecommerce' } },
  { path: '/register', component: Register, meta: { title: 'Register | Ecommerce' } },
  { path: '/login', component: Login, meta: { title: 'Login | Ecommerce' } },
  { path: '/forgot', component: ForgotPassword, meta: { title: 'Forgot Password | Ecommerce' } },
  { path: '/about', component: About, meta: { title: 'About Us | Ecommerce' } },
  { path: '/cart', component: Cart, meta: { title: 'Cart | Ecommerce' } },
  { path: '/contact', component: Contact, meta: { title: 'Contact | Ecommerce' } },
  { path: '/policy', component: Policy, meta: { title: 'Privacy Policy | Ecommerce' } },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: '404 | Ecommerce' } },
  
  { path: '/dashboard', component: UserDashboard,
    children:[
      { path: 'profile', component: Profile },
      { path: 'orders', component: Orders },
    ], 
    meta: { title: 'Dashboard | Ecommerce' } 
  },


  { path: '/admin/dashboard', component: Dashboard,
    children:[
      { path: 'categories', component: AddCategory },
      { path: 'new-product', component: AddProduct },
      { path: 'products/:slug', component: AddProduct },
      { path: 'products', component: Products },
      { path: 'orders', component: AdminOrders },
      { path: 'users', component: Users },
    ],
    meta: { title: 'Dashboard | Ecommerce' } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
    return { top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {

  const isLogin = store.state.login
  const user = store.state.user

  if ((to.path === '/login' || to.path === '/register' || to.path === '/forgot') && isLogin) {
    next('/') 
  }else if((to.path === '/dashboard' || to.path.startsWith('/admin/dashboard')) && !isLogin){
    next('/login')
  }else if(to.path.startsWith('/admin/dashboard') && user.role != 1){
    next('/dashboard')
  }else {
    next() 
  }
})

export default router