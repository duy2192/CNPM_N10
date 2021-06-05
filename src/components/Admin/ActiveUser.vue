<template>
  <div class="container text-center ">
    <div class="mt-5">
      <div v-if="this.res == 1">
        <h3 class="mb-5 text-primary font-weight-bold">Kích hoạt Account thành công!</h3>
        <router-link :to="{ path: '/login' }" >
         <h4 class="text-success"> Let start!</h4>
        </router-link>
      </div>
      <div v-if="this.res == -1">
        <h3  class="mb-5 text-secondary font-weight-bold">{{this.mes}}</h3>
        <router-link :to="{ path: '/' }"  ><h4 class="text-danger"> Trở về!</h4> </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { activeUser } from "@/APIs/usersAPI";
export default {
  name: "activeUser",
  data() {
    return {
      res: 1,
      mes:''
    };
  },
  async beforeCreate() {
    
    let secretKey = await this.$route.query.secretKey;
    let email = await this.$route.query.email;
    if(!secretKey||!email){
    this.$router.push("/");
    }
    let res = await activeUser(email, secretKey);
    if (res.result == "ok") {
      this.res = 1;
    } else {
      this.res = -1;
      this.mes=res.message
    }
  },
};
</script>
<style  scoped>
.container {
  background-color: #34495e;
  border-radius: 20px;
}
h5 {
  color: #16a085;
}
</style>