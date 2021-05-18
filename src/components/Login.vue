<template>
  <div class="main">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <h5 class="text-center">Login to your account</h5>
        <div class="form-group">
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
        <button class="btn-lg btn-primary btn-block text-uppercase"
          @click="login">
          Login
        </button>
      </div>
    </div>
  </div> 
</template>

<script>

export default {
  name: 'Login',
  //props = "Thuộc tính public"
  props: {
  },

  data() {
    return {
      //Các thuộc tính "private" => Giống "state" trong React !       
      email:'',
      password:''
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

      alert(`Bạn bấm đăng nhập. Email: ${this.email}, password: ${this.password}`)
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