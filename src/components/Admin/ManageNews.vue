<template>
  <div class="container">
    <h1 class="text-center mt-5 font-weight-bold" style="color: #16a085">
      Quản lý bài viết
    </h1>
    <div class="mt-5">
      <input
        type="text"
        class="border rounded mb-2"
        @keyup="searchnews"
        v-model="search"
        style="width: 400px; height: 40px"
        placeholder="Tìm kiếm"
      />
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
            <td scope="row" v-if="news.author != null">
              {{ page * 6 + key + 1 }}
            </td>
            <td v-if="news.author != null">{{ news.title }}</td>
            <td v-if="news.author != null">{{ news.author.username }}</td>
            <td v-if="news.author != null">
              {{ news.date.slice(0, 10).split("-").reverse().join("/") }}
            </td>
            <td v-if="news.author != null">
              <i
                class="fas fa-ban"
                @click="unblocknews(news._id)"
                v-if="news.active == '0'"
              ></i>
              <i
                class="fas fa-check"
                @click="blocknews(news._id)"
                v-if="news.active == '1'"
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
          v-if="this.page > 0"
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
</template>
<script>
import { getQueryNews, blockNews, unblockNews } from "@/APIs/newsAPI.js";
export default {
  name: "managenews",
  data() {
    return {
      news: [],
      search: "",
      userloggedin: null,
      page: 0,
      total: 0,
    };
  },
  async beforeCreate() {
    this.userloggedin = await this.$session.get("loggedInUser");
    let news = await getQueryNews("", 0);
    this.news = news.data1;
    this.total = news.total;
  },
  methods: {
    async searchnews() {
      let news = await getQueryNews(this.search.trim());
      if (news.result == "ok") {
        this.news = news.data1;
        this.total = news.total;
      }
    },
    async blocknews(id) {
      if (confirm("Chặn bài viết?")) {
        let resblock = await blockNews(id, this.userloggedin.tokenKey);
        if (resblock.result == "ok") {
          alert("Chặn bài viết thành công!");
          let news = await getQueryNews(this.search.trim(), this.page);
          if (news.result == "ok") {
            this.news = news.data1;
          }
        } else {
          alert(resblock.message);
        }
      }
    },
    async unblocknews(id) {
      if (confirm("Mở khóa bài viết?")) {
        let resblock = await unblockNews(id, this.userloggedin.tokenKey);
        if (resblock.result == "ok") {
          alert("Mở khóa bài viết thành công!");
          let news = await getQueryNews(this.search.trim(), this.page);
          if (news.result == "ok") {
            this.news = news.data1;
          }
        } else {
          alert(resblock.message);
        }
      }
    },
    async nextpage() {
      if (this.page == this.total) {
        return;
      }
      this.page++;
      let news = await getQueryNews(this.search.trim(), this.page);
      this.news = news.data1;
      this.total = news.total;
    },
    async prevpage() {
      if (this.page == 0) {
        return;
      }
      this.page--;
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data1;
      this.total = news.total;
    },
  },
};
</script>
<style scoped>
a:hover {
  background-color: #74b9ff;
  color: #f5f6fa;
}
.previous {
  background-color: #1abc9c;
  color: black;
  border-radius: 10%;
}

.next {
  background-color: #1abc9c;
  color: black;
  border-radius: 10%;
}
</style>