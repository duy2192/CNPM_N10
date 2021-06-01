<template>
  <div class="container">
    <div class="row mt-5 border rounded ">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <h3 class="text-center font-weight-bold mt-5">
          Đổi mật khẩu
        </h3>
        <div class="form-group mt-5">
          <input
            type="password"
            name="password"
            v-model="pass"
            v-if="this.option == 1"
            class="form-control mb-3"
            placeholder="Mật Khẩu "
          />
          <input
            type="password"
            name="password"
            v-model="pass1"
            class="form-control"
            placeholder="Mật Khẩu Mới"
          />
          <input
            type="password"
            name="password"
            v-model="pass2"
            class="form-control mt-3"
            placeholder="Xác Nhận Mật Khẩu"
          />
        </div>
          <span class="text-danger" v-if="(this.pass1.length <=4||this.pass1.length <=4)&&this.pass1!='' "
          >Mật khẩu mới cần lớn hơn 4 ký tự
        </span><br>
        <span class="text-danger" v-if="this.pass1 != this.pass2"
          >Mật khẩu xác nhận không khớp
        </span><br>
        <span class="text-danger" v-if="this.pass1 == '' "
          >Chưa điền mật khẩu
        </span>
        <button
          class="btn btn-success btn-block text-uppercase mb-4"
          @click="resetpasswd"
        >
          Xác nhận
        </button>
        <router-link
          v-if="this.option == '1'"
          :to="{ path: '/admin' }"
          class="text-light"
          style="margin-left: 45%"
          ><u>Trở về</u>
        </router-link>
        <router-link
          v-if="this.option == '0'"
          :to="{ path: '/' }"
          class="text-light"
          style="margin-left: 45%"
          ><u>Trở về</u>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { resetpasswd } from "@/APIs/usersAPI";
import { changepasswd } from "@/APIs/usersAPI";

export default {
  name: "resetpasswd",
  data() {
    return {
      email: "",
      pass: "",
      pass1: "",
      pass2: "",
      option: "0",
    };
  },
  async beforeCreate() {
    if (this.$session.exists("loggrdInUser")) {
      let secretKey = await this.$route.query.secretKey;
      let token = await this.$session.get("loggedInUser").tokenKey;
      if (secretKey == token) {
        this.option = 1;
      } else {
        this.option = 0;
      }
    }
  },
  methods: {
    async resetpasswd() {
      if (this.option == "0") {
        let email = await this.$route.query.email;
        let oldpass = await this.$route.query.secretKey;

        if (this.pass1 === this.pass2 && this.pass1.length>=4) {
          let reset = await resetpasswd(email, this.pass1, oldpass);
          if (reset.result == "ok") {
            alert("Đổi mật khẩu thành công!");
          } else {
            alert(reset.message);
          }
        } else {
          this.message = "Mật khẩu không khớp!";
        }
      }
      if (this.option == "1") {
        let secretKey = await this.$route.query.secretKey;
        if (this.pass1.length>=4 && this.pass1 == this.pass2&this.pass!='') {
          let change = await changepasswd(this.pass, this.pass1, secretKey);
          if (change.result == "ok") {
            alert("Đổi mật khẩu thành công!");
          } else {
            alert(change.message);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.container{
  background-color: #34495e;
}
h3{
 color:#16a085
}
</style>