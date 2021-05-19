import Home from '@/components/Home'
import Login from '@/components/Login'
import Admin from '@/components/Admin'

import VueRouter from 'vue-router'
const routes=[
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/admin', component: Admin}

]
export default new VueRouter({routes})