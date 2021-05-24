<template>
  <div class="main">
    <nav class="nav__cont">
      <ul class="nav">
        <li class="nav_items" @click="avatarcl">
          <img
            src="../../assets/avatar.jpg"
            alt=""
            class="ml-5 mb-5 rounded-circle"
            style="width: 100px; height: 100px; background-size: cover;"
          />
          <p class="txtli text-info">{{ this.username }}</p>
        </li>
        <li class="nav__items" v-if="this.avatar == '1'">
          <p
            class="txtli text-info"
            @click="changepasswd"
            style="font-size: 20px"
          >
            <u> Đổi mật khẩu</u>
          </p>
        </li>
        <li class="nav__items" v-if="this.avatar == '1'">
          <p class="txtli text-info" @click="logout" style="font-size: 20px">
            <u> Đăng xuất</u>
          </p>
        </li>
        <li class="nav__items mt-3" v-if="this.role == 2" @click='manageUsercl'>
          <p class="txtli font-weight-bold">Quản lý tài khoản</p>
        </li>
        <li class="nav__items"  v-if="this.role == 2"  @click='manageNewscl'>
          <p class="txtli font-weight-bold">Quản lý bài viết</p>
        </li>
      </ul>
    </nav>
    <div class="wrapper">
      <main>
        <managenews  v-if="this.role == 2&&this.task=='1'" />
        <manageUser v-if="this.role == 2&&this.task=='0'" />
      </main>
    </div>
  </div>
</template>
<script>
import managenews from "./ManageNews";
import manageUser from "./ManageUser";

export default {
  components: { managenews, manageUser },
  name: "Admin",
  data() {
    return {
      email: "",
      username: "",
      isloggedIn: false,
      name: "",
      task: "0",
      role: "",
      token: "",
      avatar: "",
    };
  },
  async beforeCreate() {
    if (this.$session.exists()) {
      let user = await this.$session.get("loggedInUser");
      this.email = user.email;
      this.username = user.username ? user.username : "";
      this.isloggedIn = user ? true : false;
      this.role = user.active ? user.active : "";
      this.token = user.tokenKey ? user.tokenKey : "";
    } else {
      this.email = "";
      this.username = "";
      this.isloggedIn = false;
      this.$router.push("/login");
    }
  },
  methods: {
    manageUsercl(){
      this.task='0'
    },
    manageNewscl(){
      this.task='1'
    },
    logout() {
      this.$session.destroy();
      this.$router.push("/");
    },
    avatarcl() {
      if (this.avatar == "1") {
        this.avatar = "0";
      } else {
        this.avatar = "1";
      }
    },
    changepasswd() {
      this.$router.push(`/resetpasswd?secretKey=${this.token}`);
    },
  },
};
</script>
<style  scoped>
.nav__cont {
  position: fixed;
  width: 40px;
  top: 0;
  height: 100vh;
  z-index: 100;
  background-color: #202020;
  overflow: hidden;
  transition: width 0.3s ease;
  cursor: pointer;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
}
main {
  margin-left: 200px;
}
@media screen and (max-width: 600px) {
  .nav__cont:hover {
    width: 200px;
  }
}
@media screen and (min-width: 600px) {
  .nav__cont {
    width: 200px;
  }
}

.nav {
  list-style-type: none;
  color: white;
}
.nav:first-child {
  padding-top: 1.5rem;
}
.nav__items {
  font-family: "roboto";
}
.nav__items:hover p:after {
  opacity: 1;
}
.txtli {
  position: relative;
  display: block;
  top: -35px;
  padding-left: 25px;
  padding-right: 15px;
  transition: all 0.3s ease;
  margin-left: 25px;
  margin-right: 10px;
  text-decoration: none;
  color: white;
  font-family: "roboto";
  font-weight: 100;
  font-size: 1.35em;
}
.txtli:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  background: radial-gradient(
    circle at 94.02% 88.03%,
    #54a4ff,
    transparent 100%
  );
  opacity: 0;
  transition: all 0.5s ease;
  z-index: -10;
}

</style>