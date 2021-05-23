<template>
  <div class="">
    <Header />
    <div class="container box-vntg">
      <div class="">
        <div class="container text-center font-weight-bold">
          <span class="header-span"
            >Thống kê tình hình chung dịch bệnh Covid-19</span
          >
        </div>
        <div class="">
          <div class="row mt-5" v-if='this.data1.length>0'>
            <div class="col-md-6 col-lg-6 border border-info rounded">
              <span class="font-weight-bold text-title1">Việt Nam</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold" >
                  Số ca nhiễm <br />{{this.data1[0].scn}}
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang điều trị <br />{{this.data1[0].dangnhiem}}
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />{{this.data1[0].khoi}}
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />{{this.data1[0].tuvong}}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 border border-info rounded">
              <span class="font-weight-bold text-title1">Thế giới</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold" >
                  Số ca nhiễm <br />{{this.data1[1].scn}}
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang nhiễm<br />{{this.data1[1].dangnhiem}}
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />{{this.data1[1].khoi}}
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />{{this.data1[1].tuvong}}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 scrolltable">
            <table class="table text-center table-bordered">
              <thead>
                <tr>
                  <th>Bệnh nhân</th>
                  <th>Tuổi</th>
                  <th>Địa điểm</th>
                  <th>Tình trạng</th>
                  <th>Quốc tịch</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(news) in this.data2" v-bind:key="news.bn" :class="{'text-danger' : news.tinhtrang=='Đang điều trị', 'text-success': news.tinhtrang=='Khỏi'}">
                  <td scope="row">{{news.bn}}</td>
                  <td>{{news.tuoi}}</td>
                  <td>{{news.que}}</td>
                  <td>{{news.tinhtrang}}</td>
                  <td>{{news.quoctich}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Main/Header";
import {getDataCovid19} from '@/APIs/dataAPI'
import {getDataCovid19VN} from '@/APIs/dataAPI'
export default {
  components: { Header },
  name: "Home",
  data() {
    return {
      data1: [],
      data2: []
    };
  },
  async beforeCreate() {
   let data1= await getDataCovid19()
    this.data1=data1
   let data2= await getDataCovid19VN()
   this.data2=data2
  },
};
</script>
<style scoped>
.box-vntg {
  position: relative;
  margin-top: 130px;
}
.header-span {
  font-size: 30px;
  color: #416f94;
}
.text-title1 {
  font-size: 28px;
}
.text-content {
  font-size: 18px;
}
.scrolltable{
  height: 400px;
  overflow: scroll;
}
@media screen and (max-width: 768px) {
  .text-content {
    font-size: 15px;
  }
}
</style>
