import Home from '@/components/Home'
import Login from '@/components/Login'

import VueRouter from 'vue-router'
const routes=[
    {path:'/', component: Home},
    {path:'/login', component: Login}

]
export default new VueRouter({routes})