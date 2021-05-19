<template>
  <div class="main">
    <h1>ADMIN ZOZOZO</h1>
    <button class="btn btn-primary" @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  name: "Admin",
  data() {
    return {
      email: "",
      username: "",
      isloggedIn: false,
    };
  },
  created() {
    if (this.$session.exists()) {
      let user = this.$session.get("loggedInUser");
      this.email = user.email;
      this.username = user.name ? user.name : "";
      this.isloggedIn = user ? true : false;
    } else {
      this.email = "";
      this.username = "";
      this.isloggedIn = false;
      this.$router.push("/login");
    }
  },
  methods: {
      logout(){
          this.$session.destroy()
        this.$router.push("/");

      }
  }
};
</script>
<style scoped>

</style>