<template>
  <div class="header-container">
    <!-- <div class="logo">P</div> -->
    <div class="admin">
      <!-- <span class="admin-text">Admin</span> -->
      <!-- <span class="profile-picture"
          ><img src="./../assets/lilbaby.jpeg" width="150" height="150" alt=""
        /></span> -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.header-container {
  width: 300px;
  display: flex;
  margin-left: 35px;
  margin-right: 35px;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  /*background-color: #3949ab;*/
  color: white;
  font-size: 18px;
}
.logo {
  font-size: 45pt;
}
.admin {
  display: flex;
  justify-content: space-between;
}
.admin-text {
  font-size: 16pt;
  margin-right: 20px;
  margin-top: 30px;
}
.profile-picture img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
</style>
