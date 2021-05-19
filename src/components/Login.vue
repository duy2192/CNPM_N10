<template>
  <div class="main">
    <div class="row mt-5">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
        <h5 class="text-center text-primary font-weight-bold mt-5">Login to your account</h5>
        <div class="form-group mt-5">
          <input type="text" id="inputEmail"
            v-model="email"
            name="email"
            v-validate="'required|email'"
            :class="{'form-control': true, 
                     'border-danger': errors.has('email')}"
            placeholder="Email address" autofocus
            >    
            <span v-show="errors.has('email')" class="text-danger">
              {{ errors.first('email') }}
            </span>
        </div>
        <div class="form-group">
            <input type="password" 
              name="password" 
              v-model="password" 
              v-validate="'required'"       
              :class="{'form-control': true, 
                     'border-danger': errors.has('password')}"      
              placeholder="Password">                
        </div> 
        <span v-show="errors.has('password')" 
          class="text-danger">{{ errors.first('password') }}
        </span>
        <button class="btn-lg btn-primary btn-block text-uppercase mb-5"
          @click="login">
          Login
        </button>
      </div>
    </div>
  </div> 
</template>

<script>
import {userLogin} from '../APIs/usersAPI'
export default {
  name: 'Login',
  //props = "Thuộc tính public"
  props: {
  },
  data() {
    return {
      //Các thuộc tính "private" => Giống "state" trong React !       
      email:'',
      password:'',
    }
  },
  
  //Các phương thức "private"
  methods: {
    async login() {
      //Giờ chúng ta cần "validate" các thông tin đăng nhập
      let result = await this.$validator.validateAll()
      if(!result) {
        return
      }
      let loginResponse = await userLogin(this.email,this.password)

    if(Object.keys(loginResponse).length>0){
      this.$session.start()
      this.$session.set('loggedInUser',loginResponse)
      this.$router.push('/admin')
    } else{
    alert('Đăng nhập thất bại!!')
    }
},
  },  
}
</script>

<!-- scoped: Chỉ có tác dụng trong file .vue này -->
<style scoped>

.main{
    background-image: url('../assets/home-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;      
    height: 100%;
}
</style>