<template>
  <div class="container">
    <h1 class="text-center mt-5 font-weight-bold" style="color: #16a085">
      Quản lý bài viết
    </h1>
    <div id="txteditor" v-if="this.actionnews == 1 || this.actionnews == '3'">
      <span class="font-weight-bold">Tiêu đề</span><br />
      <textarea name="" id="" cols="100" rows="3" v-model="title"></textarea
      ><br />
      <span class="font-weight-bold text-danger" v-if="this.title.trim() === ''"
        >Tiêu đề không được để trống</span
      >
      <div class="mt-3" style="width: 300px">
        <div class="form-group font-weight-bold">
          <label for="">Ảnh đại diện</label>
          <input
            ref="imagefile"
            type="file"
            class="form-control-file"
            name=""
            id=""
            placeholder=""
            aria-describedby="fileHelpId"
            @change="onfilechange"
          />
          <img
            v-if="this.resimg != ''"
            :src="this.resimg"
            alt=""
            style="width: 400px; height: 200px"
          />
          <span
            class="text-danger"
            v-if="['png', 'jpg', 'jpeg', ''].indexOf(this.fileExtension) < 0"
            >Cần đúng định dạng file ảnh
          </span>
        </div>
      </div>
      <span class="font-weight-bold">Nội dung</span>
      <ckeditor :editor="editor" v-model="editorData"></ckeditor>
      <span
        class="font-weight-bold text-danger"
        v-if="this.editorData.trim() === ''"
        >Nội dung không được để trống</span
      >
    </div>
    <button
      class="btn btn-primary mr-3 mt-3"
      v-if="this.actionnews == '1'"
      @click="savenews"
    >
      Lưu
    </button>
    <button
      class="btn btn-primary mr-3 mt-3"
      v-if="this.actionnews == '3'"
      @click="saveEditnews"
    >
      Lưu
    </button>
    <button class="btn btn-danger mt-3" @click="addnews">
      {{ this.actionnews == "0" ? "Thêm bài viết" : "Hủy" }}
    </button>
        <h2 class="text-center font-weight-bold" v-if="this.news.length<=0" style="color:#b71540">Oops! Bạn chưa có bài viết nào!</h2><br>

    <div class="mt-5" v-if="this.actionnews == '0'">
      <table
        class="table text-center table-bordered bg-info"
        v-if="this.news.length > 0"
      >
        <thead class="thead-inverse">
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Ngày viết</th>
            <th>Trạng thái</th>
            <th>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(news, index) in this.news"
            :key="news._id"
            :class="{ 'text-danger': news.active != '1' }"
          >
            <td>{{ index + 1 }}</td>
            <td scope="row">{{ news.title }}</td>
            <td>{{ news.date }}</td>
            <td>{{ news.active == "1" ? "Ok" : "Blocked" }}</td>
            <td>
              <i class="fas fa-edit" @click="editnews(news._id)"></i
              ><i
                class="ml-3 fas fa-trash-alt"
                @click="deletenews(news._id)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  userInsertNews,
  uploadimg,
  getNewsbyID,
  deleteNewsbyId,
  getdetailnews,
  updateNews,
} from "@/APIs/newsAPI";
export default {
  name: "news",
  data() {
    return {
      actionnews: "0",
      editor: ClassicEditor,
      editorData: "",
      selectedfile: null,
      title: "",
      fileExtension: "",
      news: [],
      userloggedin: null,
      resimg: "",
      idnews: "",
    };
  },
  async beforeCreate() {
    this.userloggedin = await this.$session.get("loggedInUser");
    let usernews = await getNewsbyID(this.userloggedin._id);
    this.news = usernews;
  },
  methods: {
    addnews() {
      if (this.actionnews == "0") {
        this.actionnews = "1";
        this.resimg = "";
      } else {
        this.actionnews = "0";
        this.editorData = "";
        this.title = "";
      }
    },
    onfilechange(event) {
      this.selectedfile = event.target.files[0];
      this.fileExtension = this.selectedfile.name.split(".").pop();
    },
    async savenews() {
      if (this.title.trim() != "" && this.editorData.trim() != "") {
        let res = await userInsertNews(
          this.title,
          this.editorData,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Thêm bài viết thành công!");
          var newsres = res;
          this.actionnews = "0";

          let newsresponse = await getNewsbyID(this.userloggedin._id);
          this.news = await newsresponse;
          this.title = "";
          this.editorData = "";
        } else {
          alert(res.message);
        }
      }
      if (newsres != undefined) {
        if (this.selectedfile != null && newsres.result == "ok") {
          if (
            ["png", "jpg", "jpeg"].indexOf(this.fileExtension.toLowerCase()) >=
            0
          ) {
            var data = new FormData();
            data.append("fileimg", this.selectedfile);
            data.append("id", newsres.data._id);
            let res = await uploadimg(data);
            console.log(res);
          }
        }
      }
    },
    async deletenews(id) {
      let res = await deleteNewsbyId(id, this.userloggedin.tokenKey);
      if (res.result == "ok") {
        let newsresponse = await getNewsbyID(this.userloggedin._id);
        this.news = await newsresponse;
        alert("Xóa bài viết thành công!");
      } else {
        alert(res.message);
      }
    },
    async editnews(id) {
      let detailnews = await getdetailnews(id);
      if (detailnews.result == "ok") {
        this.actionnews = "3";
        this.title = detailnews.data.title;
        this.editorData = detailnews.data.content;
        this.resimg = "http://localhost:3000/img/" + detailnews.data.image;
        this.idnews = id;
      }
    },
    async saveEditnews() {
      if (this.title.trim() != "" && this.editorData.trim() != "") {
        let res = await updateNews(
          this.idnews,
          this.title,
          this.editorData,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Sửa bài viết thành công!");
          var newsres = res;
          this.actionnews = "0";
          let newsresponse = await getNewsbyID(this.userloggedin._id);
          this.news = await newsresponse;
          this.title = "";
          this.editorData = "";
        } else {
          alert(res.result);
        }
      }
      if (newsres != undefined) {
        if (this.selectedfile != null && newsres.result == "ok") {
          if (
            ["png", "jpg", "jpeg"].indexOf(this.fileExtension.toLowerCase()) >=
            0
          ) {
            var data = new FormData();
            data.append("fileimg", this.selectedfile);
            data.append("id", newsres.data._id);
            let res = await uploadimg(data);
            console.log(res);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
</style>