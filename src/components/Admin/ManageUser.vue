<template>
  <div class="container">
    <h1 class="text-center mt-5 font-weight-bold" style="color: #16a085">
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
      <form v-show="this.action == '1'" onsubmit="return false;">
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
            id="imail"
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
        v-if="
          this.alluser.length > 0 && (this.action == '' || this.action == '1')
        "
      >
        <thead class="thead-inverse">
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số bài viết</th>
            <th>Role</th>
            <th>Trạng thái</th>
            <th>Xem bài viết</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, key) in this.alluser"
            v-bind:key="user.email"
            :class="{ 'bg-danger': user.active == -1 }"
          >
            <td scope="row">{{ key + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.news.length }}</td>
            <td>{{ user.active == 2 ? "Admin" : "User" }}</td>
            <td>
              <i
                class="fas fa-ban btn"
                v-if="user.active == -1"
                @click="unblockuser(user.email)"
              ></i>
              <i
                class="fas fa-check"
                v-if="user.active == 1"
                @click="blockuser(user.email)"
              ></i>
            </td>
            <td><i class="fas fa-eye" @click="showallnews(user._id)"></i></td>
          </tr>
        </tbody>
      </table>
      <div class="mt-5" v-if="this.action == '2'">
        <input
          type="text"
          class="border rounded mb-2"
          @keyup="searchnewsuser"
          v-model="search"
          style="width: 400px; height: 40px"
          placeholder="Tìm kiếm"
        /><br />
        <p class="btn btn-primary border rounded" @click="returnuser">
          &laquo; Quay lại
        </p>
        <table class="table text-center table-bordered bg-info">
          <thead class="thead-inverse">
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày viết</th>
              <th>Trạng thái</th>
              <th>Xem bài viết</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(news, key) in this.news"
              :key="news.title"
              :class="{ 'bg-danger': news.active == '0' }"
            >
              <td scope="row">{{ page * 6 + key + 1 }}</td>
              <td>{{ news.title }}</td>
              <td>{{ news.author.username }}</td>
              <td>
                {{ news.date.slice(0, 10).split("-").reverse().join("/") }}
              </td>
              <td>
                <i
                  class="fas fa-check"
                  v-if="news.active == '1'"
                  @click="blocknews(news._id)"
                ></i>
                <i
                  class="fas fa-ban"
                  v-if="news.active == '0'"
                  @click="unblocknews(news._id)"
                ></i>
              </td>
              <td>
                <router-link
                  :to="{ path: '/newscontent', query: { id: news._id } }"
                  target="_blank"
                  style="color: black"
                  v-if="news.active!=0"
                >
                  <i class="fas fa-eye"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <p
          class="text-center mt-5 font-weight-bold"
          style="text-dark"
          v-if="this.page > 0"
        >
          <u>
            {{
              this.news.length > 0
                ? `Trang ${this.page + 1}`
                : `Không tìm thấy kết quả phù hợp!`
            }}</u
          >
        </p>
        <div class="" style="margin-left: 45%">
          <p
            class="btn previous font-weight-bold"
            @click="prevpage"
            v-if="this.page > 0&&this.news.length>0"
          >
            &laquo; Trước
          </p>
          <p
            class="btn next ml-1 font-weight-bold"
            @click="nextpage"
            v-if="
              (this.news.length < 6 &&
                this.page < this.total - 1 &&
                this.news.length > 0) ||
              (this.news.length == 6 && this.total - this.page > 1)
            "
          >
            Tiếp theo &raquo;
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getallUser } from "@/APIs/usersAPI";
import { registerUser } from "@/APIs/usersAPI";
import { blockUser, unblockUser } from "@/APIs/usersAPI";
import { blockNews, getNewsbyID, unblockNews } from "@/APIs/newsAPI.js";

export default {
  name: "manageUser",
  data() {
    return {
      alluser: [],
      action: "",
      name: "",
      email: "",
      userloggedin: null,
      search: "",
      news: [],
      newsid: "",
      page: 0,
      total: 0,
    };
  },
  async beforeCreate() {
    let user = await getallUser();
    this.alluser = user;
    this.userloggedin = await this.$session.get("loggedInUser");
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
      if (confirm("Chặn tài khoản?")) {
        let user = await blockUser(email, this.userloggedin.tokenKey);
        if (user.result == "ok") {
          let alluser = await getallUser();
          this.alluser = alluser;
          alert(`Chặn user thành công!`);
        } else {
          alert(`Chặn user không thành công!${user.message}`);
        }
      } else {
        return;
      }
    },
    async unblockuser(email) {
      if (confirm("Bỏ chặn tài khoản này?")) {
        let user = await unblockUser(email, this.userloggedin.tokenKey);
        if (user.result == "ok") {
          let alluser = await getallUser();
          this.alluser = alluser;
          alert(`Mở khóa thành công!`);
        } else {
          alert(`Mở khóa không thành công!${user.message}`);
        }
      } else {
        return;
      }
    },
    async showallnews(id) {
      this.newsid = id;
      this.action = "2";
      let news = await getNewsbyID(id, this.search, 0);
      this.news = news.data;
      this.total = news.total;
    },
    async searchnewsuser() {
      let news = await getNewsbyID(this.newsid, this.search.trim());
      if (news.result == "ok") {
        this.news = news.data;
      }
    },
    async blocknews(id) {
      if (confirm("Chặn bài viết?")) {
        let resblock = await blockNews(id, this.userloggedin.tokenKey);
        if (resblock.result == "ok") {
          alert("Chặn bài viết thành công!");
          let news = await getNewsbyID(this.newsid, this.search, 0);
          this.news = news.data;
        } else {
          alert(resblock.message);
        }
      }
    },
    returnuser() {
      this.action = "";
    },
    async unblocknews(id) {
      if (confirm("Mở khóa bài viết?")) {
        let resblock = await unblockNews(id, this.userloggedin.tokenKey);
        if (resblock.result == "ok") {
          alert("Mở khóa bài viết thành công!");
          let news = await getNewsbyID(this.newsid, this.search, 0);
          this.news = news.data;
        } else {
          alert(resblock.message);
        }
      }
    },
    async searchnews() {
      this.news = await getNewsbyID(this.newsid, this.search.trim(), this.page);
    },
    async nextpage() {
      if (this.page == this.total) {
        return;
      }
      this.page++;
      let news = await getNewsbyID(this.newsid, this.search.trim(), this.page);
      this.news = news.data;
      this.total = news.total;
    },
    async prevpage() {
      if (this.page == 0) {
        return;
      }
      this.page--;
      let news = await await getNewsbyID(
        this.newsid,
        this.search.trim(),
        this.page
      );
      this.news = news.data;
      this.total = news.total;
    },
  },
};
</script>
<style scoped>
.form-group {
  width: 400px;
}

a:hover {
  background-color: #74b9ff;
  color: #f5f6fa;
}
.previous {
  background-color: #1abc9c;
  color: black;
  border-radius: 20px;
}

.next {
  background-color: #1abc9c;
  color: black;
  border-radius: 20px;
}
</style>