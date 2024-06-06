<script setup>
import SideBar from '@/components/SideBar.vue';
import WorkerList from '@/components/WorkerList.vue';
</script>

<template>
  <main>
    <body>
      <SideBar />
      <div class="main">
        <WorkerList />
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
</style>
