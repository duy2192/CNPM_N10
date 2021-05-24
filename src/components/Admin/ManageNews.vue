<template>
  <div class="container">
        <h1 class=" text-center mt-5 font-weight-bold" style=" color:#16a085">
      Quản lý bài viết
    </h1>
    <ckeditor value="Hello, World!"></ckeditor>
    <div class="mt-5">
      <table class="table text-center table-bordered bg-info">
        <thead class="thead-inverse">
          <tr>
            <th>Tiêu đề</th>
            <th>Tác giả</th>
            <th>Ngày viết</th>
            <th>Chặn</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row"></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "managenews",
  data() {
    return {};
  },
  methods:{
    click(){
      alert('@@')
    }
  }
};
</script>
<style scoped>
</style>