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
          <div class="row mt-5" v-if="this.data1.length > 0">
            <div class="col-md-6 col-lg-6 border boxvn">
              <span class="font-weight-bold text-title1">Việt Nam</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold">
                  Số ca nhiễm <br />{{ this.data1[0].scn }}
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang điều trị <br />{{ this.data1[0].dangnhiem }}
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />{{ this.data1[0].khoi }}
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />{{ this.data1[0].tuvong }}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 border boxtg">
              <span class="font-weight-bold text-title1">Thế giới</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold">
                  Số ca nhiễm <br />{{ this.data1[1].scn }}
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang nhiễm<br />{{ this.data1[1].dangnhiem }}
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />{{ this.data1[1].khoi }}
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />{{ this.data1[1].tuvong }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <select name="" id="" @change="changeoption">
              <option value="1">Thống kê theo Tỉnh/Thành phố</option>
              <option value="2">Thống kê bệnh nhân</option>
            </select>
          </div>
          <transition
            enter-active-class="animated fadeIn delay"
            leave-active-class="animated fadeOut delay"
            mode="out-in"
          >
            <div class="mt-5 scrolltable" v-if="this.option == 2">
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
                  <tr
                    v-for="news in this.data2"
                    v-bind:key="news.bn"
                    :class="{
                      'text-danger': news.tinhtrang == 'Đang điều trị',
                      'text-success': news.tinhtrang == 'Khỏi',
                    }"
                  >
                    <td scope="row">{{ news.bn }}</td>
                    <td>{{ news.tuoi }}</td>
                    <td>{{ news.que }}</td>
                    <td>{{ news.tinhtrang }}</td>
                    <td>{{ news.quoctich }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </transition>
          <transition
            enter-active-class="animated fadeIn delay"
            leave-active-class="animated fadeOut delay"
            mode="out-in"
          >
            <div class="text-center" v-if="this.option == 1">
              <input
                type="text"
                name=""
                id=""
                v-model="search"
                @keyup="searchcovid19"
                placeholder="Tìm kiếm"
              />
            </div>
          </transition>
          <transition
            enter-active-class="animated fadeIn delay"
            leave-active-class="animated fadeOut delay"
            mode="out-in"
          >
            <div class="mt-5 scrolltable" v-if="this.option == 1">
              <table class="table text-center table-bordered">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tỉnh/Thành phố</th>
                    <th>Đang điều trị</th>
                    <th>Đã khỏi</th>
                    <th>Tử vong</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tp, key) in this.data3" v-bind:key="tp.Name">
                    <td scope="row">{{ key + 1 }}</td>
                    <td>{{ tp.Name }}</td>
                    <td>{{ tp.dieutri }}</td>
                    <td>{{ tp.khoibenh }}</td>
                    <td>{{ tp.tuvong }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Main/Header";
import Footer from "@/components/Main/Footer";
import data2 from "@/assets/data2.json";
import data1 from "@/assets/data1.json";
import data3 from "@/assets/datatp.json";

export default {
  components: { Header, Footer },
  name: "Home",
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      option: 1,
      search: "",
    };
  },
  async beforeCreate() {
    this.data2 = await data1;
    this.data1 = await data2;
    this.data3 = await data3;
  },
  methods: {
    async changeoption(e) {
      this.option = e.target.value;
    },
    async searchcovid19() {
      let array = [];
      const regex = new RegExp(`${this.search}`, "i");
      data3.forEach((e) => {
        if (e.Name.match(regex)) {
          array.push(e);
        }
      });
      this.data3 = array;
    },
  },
};
</script>
<style scoped>
.container {
  height: 100%;
}
.boxvn {
  background-color: #fff;
  border-radius: 20px;
}
.boxtg {
  background-color: #fff;
  border-radius: 20px;
}
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
.scrolltable {
  height: 400px;
  overflow: scroll;
  background-color: #fff;
}
@media screen and (max-width: 768px) {
  .text-content {
    font-size: 15px;
  }
}
select {
  border-radius: 20px;
}
option {
  border-radius: 20px;
}
input {
  border-radius: 20px;
  width: 200px;
}
.delay{
  animation-delay: 0.25s;
}
</style>
