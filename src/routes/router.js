import Home from '@/components/Main/Home'
import Login from '@/components/Admin/Login'
import Admin from '@/components/Admin/Admin'
import resetpasswd from '@/components/Admin/Resetpasswd'
import newsPage from '@/components/Main/News'
import VueRouter from 'vue-router'
const routes=[
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/admin', component: Admin},
    {path:'/resetpasswd', component: resetpasswd},
    {path:'/news', component: newsPage}

]
export default new VueRouter({routes})