<template>
  <div class="container">
    <h1 class="text-center mt-5 font-weight-bold" style="color: #16a085">
      Bài viết của tôi
    </h1>
    <div
      id="txteditor"
      class="mb-5"
      v-if="this.actionnews == 1 || this.actionnews == '3'"
    >
      <span class="font-weight-bold">Tiêu đề</span><br />
      <textarea
        name=""
        id=""
        style="width: 100%"
        rows="3"
        v-model="title"
      ></textarea
      ><br />
      <span class="font-weight-bold text-danger" v-if="this.title.trim() === ''"
        >Tiêu đề không được để trống</span
      ><br />
      <span class="font-weight-bold" v-if="this.actionnews==1">Danh mục</span><br />

      <select name="" id="" class="mt-3" @change="changecate" v-if="this.actionnews==1">
        <option :value="``">--</option>
        <option
          v-for="cate in this.Category"
          :key="cate.name"
          :value="`${cate._id}`"

        >
          {{ cate.name }}
        </option></select
      ><br />
      <span class="font-weight-bold text-danger" v-if="this.cateid.trim() == ''&&this.actionnews==1"
        >Chọn danh mục</span
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
      <ckeditor
        :editor="editor"
        :config="editorConfig"
        v-model="editorData"
        style="height: 500px"
      ></ckeditor>
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
    <div
      style="margin-bottom: 200px"
      v-if="this.actionnews == '1' || this.actionnews == '3'"
    ></div>
    <h2
      class="text-center font-weight-bold"
      v-if="this.news.length <= 0 && this.search.trim() == ''"
      style="color: #b71540"
    >
      Oops! Bạn chưa có bài viết nào!
    </h2>
    <br />

    <div class="mt-5" v-if="this.actionnews == '0'">
      <input
        type="text"
        class="border rounded mb-2"
        @keyup="searchnews"
        v-model="search"
        style="width: 400px"
        placeholder="Tìm kiếm"
      />
      <p
        class="font-weight-bold"
        v-if="this.news.length <= 0 && this.search.trim() != ''"
      >
        Không tìm thấy kết quả phù hợp
      </p>
    </div>
<br />
      <span class="font-weight-bold mr-3"  v-if="this.actionnews==0">Danh mục</span>
      <select
        name=""
        id=""
        class="mt-3 mb-3"
        v-if="this.Category != null&&this.actionnews==0"
        @change="changecate"
      >
        <option value="">Tin tức</option>
        <option
          v-for="cate in this.Category"
          :key="cate.name"
          :value="`${cate._id}`"
        >
          {{ cate.name }}
        </option>
      </select>
    <div class="mt-3" v-if="this.actionnews == '0'">
      <table
        class="table text-center table-bordered bg-info"
        v-if="this.news.length > 0"
      >
        <thead class="thead-inverse">
          <tr>
            <th>STT</th>
            <th>Danh mục</th>
            <th>Tiêu đề</th>
            <th>Ngày viết</th>
            <th>Trạng thái</th>
            <th>Cập nhật</th>
            <th>Xem bài viết</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(news, index) in this.news"
            :key="news.title"
            :class="{ 'bg-danger': news.active != '1'||news.category.active==0  }"
         
          >
            <td v-if="news.author._id==userloggedin._id">{{ page * 6 + index + 1 }}</td>
            <td v-if="news.author._id==userloggedin._id">{{news.category.name}} <p v-if="news.category.active==0">(Đã xóa)</p> </td>
            <td v-if="news.author._id==userloggedin._id" style="max-width: 650px" scope="row">{{ news.title }}</td>
            <td v-if="news.author._id==userloggedin._id">{{ news.date.slice(0, 10).split("-").reverse().join("/") }}</td>
            <td v-if="news.author._id==userloggedin._id">{{ news.active == "1" ? "Ok" : "Blocked" }}</td>
            <td v-if="news.author._id==userloggedin._id">
              <i class="fas fa-edit" @click="editnews(news._id)"></i
              ><i
                class="ml-3 fas fa-trash-alt"
                @click="deletenews(news._id)"
              ></i>
            </td>
            <td v-if="news.author._id==userloggedin._id">
              <router-link
                :to="{ path: '/newscontent', query: { id: news._id } }"
                target="_blank"
                style="color: black"
                v-if="news.active != 0&&news.category.active==1"
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
        <u> {{ `Trang ${this.page + 1}` }}</u>
      </p>
      <div class="" style="margin-left: 45%">
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; //trình Editor viết bài
import {
  userInsertNews,
  uploadimg,
  getNewsbyID,
  deleteNewsbyId,
  getdetailnews,
  updateNews,
  getNewsbyUserCate

} from "@/APIs/newsAPI"; //Call APIs
import { getCategory } from "@/APIs/categoryAPI";
import { SERVER_NAME, SERVER_PORT } from "@/APIs/apiParameters"; //Địa chỉ Client
import UploadAdapter from "@/APIs/newsAPI";
export default {
  name: "news",
  data() {
    return {
      // Các biến
      actionnews: "0",
      editor: ClassicEditor,
      editorData: "",
      title: "",
      news: [],
      fileExtension: "",
      userloggedin: null,
      resimg: `${SERVER_NAME}:${SERVER_PORT}/img/bg-24.jpg`,
      idnews: "",
      search: "",
      page: 0,
      total: 0,
      editorConfig: { extraPlugins: [this.uploader] },
      Category: "",
      cateid: "",
    }; //
  },
  async beforeCreate() {
    // Trước khi components được khởi tạo
    this.userloggedin = await this.$session.get("loggedInUser");
    let usernews = await getNewsbyID(this.userloggedin._id, "", 0);
    this.news = usernews.data;
    this.total = usernews.total;
    let category = await getCategory();
    this.Category = category.data;
  },
  methods: {
    // Các phương thức (Hàm)
    addnews() {
      this.cateid=''
      if (this.actionnews == "0") {
        this.actionnews = "1";
      } else {
        this.actionnews = "0";
        this.editorData = "";
        this.title = "";
      }
    },
    async onfilechange(event) {
      if (!event.target.files[0]) return;
      let selectedfile = event.target.files[0];
      this.fileExtension = selectedfile.name.split(".").pop();
      if (selectedfile != null) {
        if (
          ["png", "jpg", "jpeg"].indexOf(this.fileExtension.toLowerCase()) >= 0
        ) {
          var data = new FormData();
          data.append("fileimg", selectedfile);
          let res = await uploadimg(data);
          if (res.result == "ok") {
            this.resimg = res.data;
          }
        }
      }
    },
    async savenews() {
      if (this.title.trim() != "" && this.editorData.trim() != ""&& this.cateid!='') {
        let res = await userInsertNews(
          this.title,
          this.editorData,
          this.resimg,
          this.cateid,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Thêm bài viết thành công!");
          this.actionnews = "0";
          this.cateid=''
          let newsresponse = await getNewsbyID(
            this.userloggedin._id,
            this.search.trim(),
            this.page
          );
          this.news = await newsresponse.data;
          this.title = "";
          this.editorData = "";
          this.total = newsresponse.total;
          this.resimg = `${SERVER_NAME}:${SERVER_PORT}/img/bg-24.jpg`;
        } else {
          alert(res.message);
        }
      }
    },
    async deletenews(id) {
      if (confirm("Are you sure?")) {
        let res = await deleteNewsbyId(id, this.userloggedin.tokenKey);
        if (res.result == "ok") {
          let newsresponse = await getNewsbyID(
            this.userloggedin._id,
            this.search.trim(),
            this.page
          );
          this.news = await newsresponse.data;
          this.total = newsresponse.total;
          alert("Xóa bài viết thành công!");
        } else {
          alert(res.message);
        }
      } else {
        return;
      }
    },
    async editnews(id) {
      
      let detailnews = await getdetailnews(id);
      if (detailnews.result == "ok") {
        this.actionnews = "3";
        this.title = detailnews.data.title;
        this.editorData = detailnews.data.content;
        this.resimg = detailnews.data.image;
        this.idnews = id;
      }
    },
    async saveEditnews() {
      if (this.title.trim() != "" && this.editorData.trim() != "") {
        let res = await updateNews(
          this.idnews,
          this.title,
          this.editorData,
          this.resimg,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Sửa bài viết thành công!");
          this.actionnews = "0";
          let newsresponse = await getNewsbyID(
            this.userloggedin._id,
            this.search.trim(),
            this.page
          );
          this.news = await newsresponse.data;
          this.title = "";
          this.editorData = "";
          this.total = newsresponse.total;
          this.resimg = `${SERVER_NAME}:${SERVER_PORT}/img/bg-24.jpg`;
        } else {
          alert(res.message);
        }
      }
    },
    async searchnews() {
      this.page=0
      if(this.cateid==''){
      let news = await getNewsbyID(
        this.userloggedin._id,
        this.search.trim(),
        this.page
      );
      this.news = news.data;}else{
        let res = await getNewsbyUserCate(this.cateid,this.userloggedin._id, this.search, this.page);
        if (res.result == "ok") {
          this.news = res.data;
          this.total = res.total;
        }
      }
    },
    async nextpage() {
      if (this.page == this.total) {
        return;
      }
      this.page++;
      if(this.cateid==''){
      let news = await getNewsbyID(
        this.userloggedin._id,
        this.search.trim(),
        this.page
      );
      if (news.result == "ok") {
        this.news = news.data;
        this.total = news.total;
      }}else{
        let res = await getNewsbyUserCate(this.cateid,this.userloggedin._id, this.search, this.page);
        if (res.result == "ok") {
          this.news = res.data;
          this.total = res.total;
        }
      }
    },
    async prevpage() {
      if (this.page == 0) {
        return;
      }
      this.page--;
      if(this.cateid==''){
      let news = await await getNewsbyID(
        this.userloggedin._id,
        this.search.trim(),
        this.page
      );
      this.news = news.data;
      this.total = news.total;
    }else{
              let res = await getNewsbyUserCate(this.cateid,this.userloggedin._id, this.search, this.page);
        if (res.result == "ok") {
          this.news = res.data;
                this.total = res.total;
        }
    }
    },
    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
   async changecate(e) {
      let cateid = e.target.value;
      this.cateid = cateid;
      if (cateid == "") {
        let news =  await getNewsbyID(
        this.userloggedin._id,
        this.search.trim(),
        this.page
        
      );
        this.news = news.data;
        this.total = news.total;
      } else {
        this.page = 0;
        let res = await getNewsbyUserCate(cateid,this.userloggedin._id, this.search, 0);
        if (res.result == "ok") {
          this.news = res.data;
          this.total = res.total;

        }
      }
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