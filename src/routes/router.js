import Home from '@/components/Main/Home'
import Login from '@/components/Admin/Login'
import Admin from '@/components/Admin/Admin'
import resetpasswd from '@/components/Admin/Resetpasswd'
import newsPage from '@/components/Main/NewsPage'
import newsdetail from '@/components/Main/NewsDetail'
import activeUser from '@/components/Admin/ActiveUser'
import VueRouter from 'vue-router'
const routes=[
    {path:'/', component: Home},
    {path:'/login', component: Login},
    {path:'/admin', component: Admin},
    {path:'/resetpasswd', component: resetpasswd},
    {path:'/news', component: newsPage},
    {path:'/newscontent', component: newsdetail},
    {path:'/activeuser', component: activeUser},


]
export default new VueRouter({routes})