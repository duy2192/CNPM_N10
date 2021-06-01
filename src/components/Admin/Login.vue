<template>
  <div class="container">
    <div class="row mt-5 border rounded  ">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
        <h5 class="text-center font-weight-bold mt-5">
          {{ this.logintext }}
        </h5>
        <div class="form-group mt-5">
          <input
            type="text"
            id="inputEmail"
            v-model="email"
            name="email"
            v-validate="'required|email'"
            :class="{
              'form-control': true,
              'border-danger': errors.has('email'),
            }"
            placeholder="Email"
            autofocus
          />
          <span v-show="errors.has('email')" class="text-danger">
            Email không khả dụng!
          </span>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-if="this.forgot == 'Quên mật khẩu'"
            name="password"
            v-model="password"
            :class="{
              'form-control': true,
              'border-danger': errors.has('password'),
            }"
            placeholder="Mật Khẩu"
          />
        </div>
        <span v-show="errors.has('password')" class="text-danger"
          >Chưa điền mật khẩu
        </span>
        <button class="btn btn-success btn-block text-uppercase" @click="login">
          {{ this.logintext }}
        </button>
        <p
          class="btn mb-5 text-center float-right text-light"
          @click="forgotclick"
          ><u>{{ this.forgot }}</u></p
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reqresetpasswd, userLogin } from "../../APIs/usersAPI";
export default {
  name: "Login",
  //props = "Thuộc tính public"
  props: {},
  data() {
    return {
      //Các thuộc tính "private" => Giống "state" trong React !
      email: "",
      password: "",
      forgot: "Quên mật khẩu",
      logintext: "Đăng nhập",
    };
  },
  beforeCreate(){
    if (this.$session.exists()) {
        this.$router.push("/admin");
    }
  },
  //Các phương thức "private"
  methods: {
    async login() {
      let result = await this.$validator.validateAll();
      if (!result) {
        return;
      }
      if(this.logintext=='Đăng nhập'){
      let loginResponse = await userLogin(this.email, this.password);

      if (Object.keys(loginResponse).length > 0) {
        this.$session.start()
        this.$session.set("loggedInUser", loginResponse);
        this.$router.push("/admin");
      } else {
        alert("Đăng nhập thất bại!!");
      }
    }
    else{
      const reqpasswd= await reqresetpasswd(this.email)
      if(reqpasswd.result=='ok'){
        alert('Vui lòng kiểm tra Email')
      }else{
        alert(reqpasswd.message)
      }
    }
    },
    async forgotclick() {
      
      if (this.forgot == "Quên mật khẩu") {
        this.forgot = "Đăng nhập";
        this.logintext = "Quên mật khẩu";
      } else {
      this.forgot = "Quên mật khẩu";
      this.logintext = "Đăng nhập";
      }

    },
  },
};
</script>
<!-- scoped: Chỉ có tác dụng trong file .vue này -->
<style scoped>
.container{
  background-color: #34495e;
}
h5{
 color:#16a085
}
</style>
