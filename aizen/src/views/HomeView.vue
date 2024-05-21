<script setup>
import SideBar from '@/components/SideBar.vue';
import TaskItems from '@/components/TaskItems.vue';
</script>

<template>
  <main>
    <body>
      <SideBar />
      <div class="main">
        <TaskItems />
      </div>
    </body>
  </main>
</template>

<style scoped>
main {
  font-family: 'poppins', sans-serif;
  background-color: #4b356b;
  border-radius: 20px;
  width: 100%;
  height: 97vh;
}
body {
  display: flex;
}
.main {
  flex: 1 1 0;
}
main::-webkit-scrollbar {
  display: none; /* This hides the scrollbar */
}
</style>
