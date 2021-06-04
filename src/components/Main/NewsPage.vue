<template>
  <div class="main mb-4">
    <Header />
    <div class="container header">
      <vueper-slides autoplay>
        <vueper-slide
          v-for="(news, i) in this.news.slice(0, 3)"
          :pause-on-hover="true"
          :key="i"
          :title="news.title"
          :image="news.image"
          style="font-size: 25px"
          class="text-light"
        />
      </vueper-slides>
      <h1 class="text-center font-weight-bold mt-5">Tin Tức</h1>
      <hr />
    </div>

    <div class="container main">
      <input
        type="search"
        class="border rounded mb-2"
        placeholder="Tìm kiếm ... "
        style="width: 300px; height: 45px"
        v-model="search"
        @keyup="searchnews"
      />

      <div class="row mt-3" v-for="news in this.news" :key="news._id" @click="routerpush(news._id)">

          <div class="imagenews col-md-6 col-lg-4" v-if="news.author != null">
            <img
              :srcset="`${news.image}`"
              alt=""
              style="width: 350px; height: 160px"
            />
          </div>


          <div
            class="titlenews col-md-6 col-lg-8 title mt-3"
            v-if="news.author != null"
          >       
            <h5 class="font-weight-bold" style="color: #0652dd">
              {{ news.title }}
            </h5>        

          </div>
      </div>
    </div>

    <p class="text-center mt-5 font-weight-bold" style="text-dark">
      <u>
        {{
          this.news.length > 0
            ? `Trang ${this.page + 1}`
            : `Không tìm thấy kết quả phù hợp!`
        }}</u
      >
    </p>
    <div class="mb-5" style="margin-left: 45%">
      <p
        class="btn previous font-weight-bold"
        @click="prevpage"
        v-if="this.page > 0 && this.news.length > 0"
      >
        &laquo; Trước
      </p>
      <p
        class="btn next ml-1 font-weight-bold"
        @click="nextpage"
        v-if="
          (this.news.length < 6 &&
            this.page < this.total - 1 &&
            this.news > 0) ||
          (this.news.length == 6 && this.total - this.page > 1)
        "
      >
        Tiếp theo &raquo;
      </p>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Main/Header";
import { getQueryNews } from "@/APIs/newsAPI";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import {
    SERVER_NAME,
    SERVER_PORT,
} from '@/APIs/apiParameters'
export default {
  name: "newsPage",
  components: { Header, VueperSlides, VueperSlide },
  data() {
    return {
      search: "",
      news: [],
      page: 0,
      total: 0,
      title: "Test",
      SERVER_NAME,
      SERVER_PORT
    };
  },
  async beforeCreate() {
    let news = await getQueryNews("", 0);
    this.news = news.data;
    this.total = news.total;
  },
  methods: {
    async nextpage() {
      if (this.page == this.total) {
        return;
      }
      this.page++;
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;
    },
    async prevpage() {
      if (this.page == 0) {
        return;
      }
      this.page--;
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;
    },
    async searchnews() {
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;
    },
      async routerpush(id) {
        this.$router.push({ path: `/newscontent`, query: { id, page: this.page } });
    },
  
  },
};
</script>
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";

.header {
  margin-top: 160px;
}
.main {
  margin-top: 100px;
}
.row {
  background-color: #fff;
  border-radius: 20px;
  /* height: 200px; */
}
.row:hover {
  background-color: #74b9ff;
}
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