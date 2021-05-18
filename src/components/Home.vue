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
          <div class="row mt-5">
            <div class="col-md-6 col-lg-6 border border-info rounded">
              <span class="font-weight-bold text-title1">Việt Nam</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold">
                  Số ca nhiễm <br />2000
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang điều trị <br />2000
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />2000
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />2000
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 border border-info rounded">
              <span class="font-weight-bold text-title1">Thế giới</span>
              <div class="row text-center">
                <div class="col text-danger text-content font-weight-bold">
                  Số ca nhiễm <br />2000
                </div>
                <div class="col text-warning text-content font-weight-bold">
                  Đang nhiễm<br />2000
                </div>
                <div class="col text-success text-content font-weight-bold">
                  Khỏi <br />2000
                </div>
                <div class="col text-secondary text-content font-weight-bold">
                  Tử vong <br />2000
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5">
            <table class="table">
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
                <tr>
                  <td scope="row"></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
import Header from "@/components/Header";
export default {
  components: { Header },
  name: "Home",
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
@media screen and (max-width: 768px) {
.text-content {
  font-size: 15px;
}
}
</style>
