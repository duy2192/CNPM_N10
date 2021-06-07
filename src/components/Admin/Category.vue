<template>
  <div class="container">
    <h1 class="text-center mt-5 font-weight-bold" style="color: #16a085">
      Quản lý danh mục
    </h1>
    <div
      id="txteditor"
      class="mb-5"
      v-show="this.action == 1 || this.action == 2"
    >
      <span class="font-weight-bold">Tên danh mục</span><br />
      <textarea
        name=""
        id=""
        style="width: 100%"
        rows="3"
        v-model="name"
      ></textarea>
      <br />
      <span class="font-weight-bold text-danger" v-if="this.name.trim() === ''"
        >Tên danh mục không được để trống</span
      >
      <br /><br />
      <span class="font-weight-bold">Mô tả</span>
      <textarea
        name=""
        id=""
        style="width: 100%"
        rows="3"
        v-model="description"
      ></textarea>
    </div>
    <button
      class="btn btn-primary mr-3 mt-3"
      v-if="this.action == 1"
      @click="saveCate"
    >
      Lưu
    </button>

    <button
      class="btn btn-primary mr-3 mt-3"
      v-if="this.action == 2"
      @click="saveEditCate"
    >
      Lưu
    </button>

    <button class="btn btn-danger mt-3" @click="addcate" v-if="this.action!=3">
      {{ this.action == 0 ? "Thêm danh mục" : "Hủy" }}
    </button>
    <br />

    <div class="mt-3" v-if="this.action == 0">
      <table class="table text-center table-bordered bg-info">
        <thead class="thead-inverse">
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Số bài viết</th>
            <th>Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cate, key) in this.category" :key="cate.name">
            <td>{{ key + 1 }}</td>
            <td>{{ cate.name }}</td>
            <td>{{ cate.posts.length }}</td>
            <td>
              <i class="fas fa-edit" @click="editcl(cate._id)"></i>
              <i class="ml-2 fas fa-trash-alt" @click="deletecl(cate._id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {
  InsertCategory,
  getCategory,
  UpdateCategory,
  getbyidCategory,
  BlockCategory,
} from "@/APIs/categoryAPI";
export default {
  name: "category",
  data() {
    return {
      name: "",
      description: "",
      action: 0,
      category: null,
      news: null,
      userloggedin: null,
      idcate: null
    };
  },
  async beforeCreate() {
    this.userloggedin = await this.$session.get("loggedInUser");
    let res = await getCategory();
    this.category = res.data;
  },
  methods: {
    addcate() {
      this.name = "";
      this.description = "";
      if (this.action == 0) {
        this.action = 1;
      } else {
        this.action = 0;
      }
    },
    async saveCate() {
      if (this.name.trim() != "") {
        let res = await InsertCategory(
          this.name,
          this.description,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Thêm danh mục thành công!");
          let res = await getCategory();
          this.category = res.data;
          this.action = 0;
        } else {
          alert(res.message);
        }
      }
    },
    async editcl(id) {
      let res = await getbyidCategory(id);
      if (res.result == "ok") {
        this.action = 2;
        this.idcate = id;
        this.name = res.data.name;
        this.description = res.data.description;
      } else {
        alert(res.message);
      }
    },
    async saveEditCate() {
      if (this.name.trim() != "") {
        let res = await UpdateCategory(
          this.idcate,
          this.name,
          this.description,
          this.userloggedin.tokenKey
        );
        if (res.result == "ok") {
          alert("Cập nhật danh mục thành công!");
          let rescate = await getCategory();
          this.category = rescate.data;
          this.action = 0;
          this.name = "";
          this.description = "";
        } else {
          alert(res.message);
        }
      }
    },
    async deletecl(id) {
      if (confirm("Xóa danh mục?") == true) {
        let res = await BlockCategory(id, this.userloggedin.tokenKey);
        if (res.result == 'ok') {
          alert("Xóa danh mục thành công!");
          let rescate = await getCategory();
          this.category = rescate.data;
        } else {
          alert(res.message);
        }
      }
    }
  },
};
</script>
<style scoped>
</style>