<template>
  <div class="container">
    <div class="search-option">
      <div class="toggle-buttons">
        <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
          All Workers
        </button>
        <button
          @click="filter = 'rendered'"
          :class="{ active: filter === 'rendered' }">
          Online Workers
        </button>
        <button
          @click="filter = 'rendered'"
          :class="{ active: filter === 'rendered' }">
          Offline Workers
        </button>
      </div>
    </div>
    <div class="main-container">
      <div class="worker-container">
        <div class="worker-item">
          <span class="item-text">
            <p class="task-item-title">Worker 1</p>
          </span>

          <span class="item-text">
            <button class="item-render">Online</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.search-option {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 5px;
}
.toggle-buttons {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}
.toggle-buttons button {
  /*padding: 13px 25px;*/
  width: 210px;
  height: 50px;
  background-color: #292a39;
  border: none;
  outline: none !important;
  color: white;
  border-radius: 10px;
  font-size: 15pt;
}
.main-container {
  font-family: 'poppins', sans-serif;
  background-color: #292a39;
  position: relative;
  height: 88vh;
  border-radius: 15px;
  overflow-y: auto;
  overflow-x: hidden;
}
.main-container::-webkit-scrollbar {
  width: 15px; /* Adjust width as needed */
}
.worker-container {
  border-radius: 10px;
  margin-top: 20px;
  width: 1885px;
  align-items: center;
  overflow-y: auto;
}
.worker-item {
  background: #3b3d75;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
}
.worker-container .task-title {
  position: fixed; /* Make the title sticky */
  top: 159px; /* Stick it at the top */
  background-color: #292a39; /* Background color */
  z-index: 1; /* Ensure it's above other elements */
  padding: 10px 0; /* Add some padding for spacing */
  margin-bottom: 80px;
}
.item-text {
  margin-left: 20px;
  margin-right: 110px;
  color: white;
  width: 60px;
  top: 10px;
  text-align: center;
  font-size: 16pt;
  white-space: nowrap; /* Prevent text from wrapping */
}
.item-render {
  padding: 10px 50px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  background-color: rgb(67, 240, 67);
}
</style>
