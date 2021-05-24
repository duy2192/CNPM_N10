<template>
  <div class="container">
    <h1 class=" text-center mt-5 font-weight-bold" style=" color:#16a085">
      Quản lý tài khoản
    </h1>
    <div class="mt-5">
      <button
        class="btn btn-primary mb-2"
        @click="cladduser"
        v-if="this.action == ''"
      >
        Thêm tài khoản
      </button>
      <form v-if="this.action == '1'" onsubmit="return false;">
        <div class="form-group">
          <input
            type="text"
            name=""
            id="iname"
            class="form-control"
            placeholder="Tên"
            aria-describedby="helpId"
            v-model="name"
            v-text="this.name"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            name="email"
            id="iname"
            class="form-control"
            placeholder="Email"
            aria-describedby="helpId"
            v-validate="'required|email'"
            v-model="email"
            :class="{
              'border-danger': errors.has('email'),
            }"
            v-text="this.email"
          />
          <span v-show="errors.has('email')" class="text-danger">
            Email không khả dụng
          </span>
        </div>
        <button class="btn btn-success" @click="adduser">Thêm</button>
        <button class="btn btn-danger ml-3" @click="cladduser">Hủy</button>
      </form>
      <table
        class="table text-center table-bordered bg-info"
        v-if="this.alluser.length > 0"
      >
        <thead class="thead-inverse">
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Số bài viết</th>
            <th>Role</th>
            <th>Chặn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in this.alluser" v-bind:key="user.email">
            <td scope="row">{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.news.length }}</td>
            <td>{{ user.active == 2 ? "Admin" : "User" }}</td>
            <td>
              <i
                class="fas fa-ban btn"
                v-if="user.active == 1"
                @click="blockuser(user.email)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { getallUser } from "@/APIs/usersAPI";
import { registerUser } from "@/APIs/usersAPI";
import { blockUser } from "@/APIs/usersAPI";
export default {
  name: "manageUser",
  data() {
    return {
      alluser: [],
      action: "",
      name: "",
      email: "",
    };
  },
  async created() {
    let user = await getallUser();
    this.alluser = user;
  },
  methods: {
    cladduser() {
      if (this.action == "") {
        this.action = "1";
      } else {
        this.name = "";
        this.email = "";
        this.action = "";
      }
    },
    async adduser() {
      let result = await this.$validator.validateAll();
      if (!result) {
        return;
      }
      let regisuser = await registerUser(this.name, this.email);
      if (regisuser.result == "ok") {
        alert("Thêm người dùng thành công! Đang chờ người dùng xác nhận");
      } else {
        alert(regisuser.message);
      }
    },
    async blockuser(email) {
      let userloggedin = await this.$session.get("loggedInUser");
      let user = await blockUser(email, userloggedin.tokenKey);
      if (user.result=='ok') {
        let alluser = await getallUser();
        this.alluser = alluser;
        alert(`Chặn user thành công!`);
      } else {
        alert(`Chặn user không thành công!${user.message}`);
      }

    },
  },
};
</script>
<style scoped>
.form-group {
  width: 400px;
}

</style>