<template>
  <div class="main">
    <Header />
    <div class="container">
      <input
        type="search"
        class="border rounded  mb-4"
        placeholder="Tìm kiếm ... "
        style="width: 300px; height: 45px"
        v-model="search"
        @keyup="searchnews"
      />
      <div class="row mt-3" v-for="news in this.news" :key="news._id">
        <div class="imagenews col-md-6 col-lg-4 " v-if="news.author!=null">
          <img
            :srcset="`http://localhost:3000/img/${news.image}`"
            alt=""
            style="width: 300px; height: 170px"
          />
        </div>
        <div class="titlenews col-md-6 col-lg-8 title" v-if="news.author!=null">
          <h5 class="font-weight-bold" style="color:#0652DD">{{ news.title }}</h5>
        </div>
      </div>
    </div>
          <p class="text-center mt-5 font-weight-bold" style="text-dark"><u> {{this.news.length>0?`Trang ${this.page+1}`:`Không tìm thấy kết quả phù hợp!`}}</u></p>
    <div class="" style="margin-left: 45%">
      <p class="btn previous font-weight-bold" @click="prevpage" v-if="this.page>0">&laquo; Trước</p>
      <p class="btn next ml-1 font-weight-bold" @click="nextpage" v-if="(this.news<6&&this.page<this.total)||(this.news.length==6&&(this.total-this.page)>1)"
>Tiếp theo &raquo;</p>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Main/Header";
import { getQueryNews } from "@/APIs/newsAPI";

export default {
  name: "newsPage",
  components: { Header },
  data() {
    return {
      search: "",
      news: [],
      page:0,
      total:0
    };
  },
  async beforeCreate() {
      let news = await getQueryNews("", 0);
      this.news = news.data;
      this.total=news.total
  },
  methods: {
   async nextpage() {
     if(this.page==this.total){
       return
     }
      this.page++
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total=news.total
      
    },
       async prevpage() {
         if(this.page==0){
           return
         }
      this.page--
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total=news.total
    },
    async searchnews(){
      let news = await getQueryNews(this.search.trim(), Number(this.page));
      this.news = news.data;
      this.total=news.total
    }
  },
};
</script>
<style scoped>
.container {
  margin-top: 180px;
}
a:hover {
  background-color: #74b9ff;
  color: #f5f6fa
}
 h5:hover{
    color:#00a8ff
  }
.previous {
  background-color: #0984e3;
  color: black;
  border-radius: 10%;
}

.next {
  background-color: #0984e3;
  color: black;
  border-radius: 10%;
}
.title:hover{
  background-color: #f5f6fa;
}
</style>