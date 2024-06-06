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
  width: 100%;
  height: 100%;
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
@media screen and (max-width: 768px) {
  /* Stack SideBar and TaskItems vertically */
  body {
    flex-direction: row; /* Change to column layout */
  }

  .main {
    flex: 1 0 auto; /* Remove flex grow and allow content to set height */
  }
}
</style>
