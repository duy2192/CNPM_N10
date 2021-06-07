<template>
  <div class="main mb-5" style="margin-top: 160px">
    <Header />
    <div class="container" v-if="this.news != null">
      <div class="row">
        <div class="col-lg-9 col-md-8 col-sm-12 title">
          <h3 class="font-weight-bold mb-5">{{ this.news.title }}</h3>
          <div v-html="this.news.content"></div>
        </div>
        <div class="col-lg-3 col-md-4" v-if="this.newsother != null">
          <h4 class="text-center"><i> Tin khác </i></h4>
          <div class="ml-4" v-for="newso in this.newsother" :key="newso._id">
                <router-link
                  :to="{ path: `/newscontent`, query: { id: newso._id, page } }"
                  v-if="newso._id != id&&newso.category.active==1"
                  class="row"
                >
                                <img
                  :srcset="`${newso.image}`"
                  alt=""
                  class="img-newsother "
                  v-if="newso._id != id&&newso.category.active==1"
                />
                  <p class="" style="font-size: 14px">{{ newso.title }}</p>
                </router-link>
                <hr v-if="newso._id != id&&newso.category.active==1">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getdetailnews } from "@/APIs/newsAPI.js";
import Header from "@/components/Main/Header";
import { getQueryNews } from "@/APIs/newsAPI";

export default {
  name: "newsdetail",
  components: { Header },
  data() {
    return {
      news: null,
      newsother: null,
      page: 0,
      id: 0,
    };
  },
  async beforeCreate() {
    this.id = await this.$route.query.id;
    let news = await getdetailnews(this.id);
    this.news = news.data;
    this.page = await this.$route.query.page;

    let newsother = await getQueryNews("", this.page);
    this.newsother = newsother.data;
  },
  methods: {},
};
</script>
<style>
.image img {
  height: auto;
  max-width: 100%;
}

.img-newsother {
  max-width: 100%;
  height: auto;
}
</style>