<template>
  <div class="main mb-4">
    <Header />
    <div class="container header">

      <h1 class="text-center font-weight-bold mt-5">
        {{ this.catename == undefined ? "Tin tức" : this.catename }}
      </h1>
      <hr />
    </div>

    <div class="container main">
      <span class="font-weight-bold mr-3 " style="font-size: 20px">Danh mục</span>
      <select name="" id="" class="mt-3 mb-3" @change="changecate" style="height:40px">
        <option value="">Tin tức</option>
        <option
          v-for="cate in this.Category"
          :key="cate.name"
          :value="`${cate._id + '_' + cate.name}`"
        >
          {{ cate.name }}
        </option></select
      ><br />
      <input
        type="search"
        class="border rounded mb-2"
        placeholder="Tìm kiếm ... "
        style="width: 300px; height: 45px"
        v-model="search"
        @keyup="searchnews"
      />

      <div
        class="row mt-3"
        v-for="news in this.news"
        :key="news._id"
        @click="routerpush(news._id)"
      >
        <div class="imagenews col-md-6 col-lg-4" v-if="news.author != null&&news.category.active==1&&news.active==1">
          <img
            :srcset="`${news.image}`"
            alt=""
            style="width: 350px; height: 160px"
          />
        </div>

        <div
          class="titlenews col-md-6 col-lg-8 title mt-3"
          v-if="news.author != null&&news.category.active==1&&news.active==1"
        >
          <h5 class="font-weight-bold" style="color: #0652dd">
            {{ news.title }}
          </h5>
          <h6 style="color: #95a5a6">
            {{ news.date.slice(0, 10).split("-").reverse().join("/") }}
          </h6>
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
import { getQueryNews, getNewsbyCate } from "@/APIs/newsAPI";
import { getCategory } from "@/APIs/categoryAPI";
import "vueperslides/dist/vueperslides.css";
import { SERVER_NAME, SERVER_PORT } from "@/APIs/apiParameters";
export default {
  name: "newsPage",
  components: { Header }, //VueperSlides, VueperSlide },
  data() {
    return {
      search: "",
      news: [],
      page: 0,
      total: 0,
      title: "Test",
      SERVER_NAME,
      SERVER_PORT,
      Category: null,
      catename: undefined,
      cateid:''
    };
  },
  async beforeCreate() {
    let news = await getQueryNews("", 0);
    this.news = news.data;
    this.total = news.total;
    let category = await getCategory();
    this.Category = category.data;
  },
  methods: {
    async nextpage() {
      if (this.page == this.total) {
        return;
      }
      this.page++;
      if(this.cateid==''){
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;
    }else{
      let news = await getNewsbyCate(this.cateid, this.search, this.page);
      this.news = news.data;
      this.total = news.total;
    }
    },
    async prevpage() {
      if (this.page == 0) {
        return;
      }
      this.page--;
      if(this.cateid==''){
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;
    }else{
       let news = await getNewsbyCate(this.cateid, this.search, this.page);
      this.news = news.data;
      this.total = news.total;
    }
    },
    async searchnews() {
      this.page=0
      if(this.catename==undefined){
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total = news.total;}else{
        let news = await getNewsbyCate(this.cateid, this.search, this.page);
      this.news = news.data;
      this.total = news.total;
      }
    },
    async routerpush(id) {
      this.$router.push({
        path: `/newscontent`,
        query: { id, page: this.page },
      });
    },
    async changecate(e) {
      let cateid = e.target.value.split("_")[0];
      this.cateid=cateid
      this.catename = e.target.value.split("_")[1];
      if (this.catename == undefined) {
        let news = await getQueryNews("", 0);
        this.news = news.data;
      } else {
        this.page=0
        let res = await getNewsbyCate(cateid, this.search, 0);
        if (res.result == "ok") {
          this.news = res.data;
        }
      }
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
  margin-top: 60px;
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
  border-radius: 20px;
}

.next {
  background-color: #1abc9c;
  color: black;
  border-radius: 20px;
}
select {
  border-radius: 20px;
}
option {
  border-radius: 20px;
}
</style>