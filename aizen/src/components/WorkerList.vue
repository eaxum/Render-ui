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
        <div
          class="worker-item"
          v-for="(worker, index) in workerStore.workers"
          :key="index">
          <span class="item-text">
            <p class="task-item-title">{{ worker.name }}</p>
          </span>

          <span class="item-text">
            <button class="item-render">{{ worker.workerStatus }}</button>
          </span>
        </div>
      </div>
    </div>
    <!--adding model for add -worker-->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useWorkerStore } from '@/stores/WorkerStore';

const workerStore = useWorkerStore();
const addWorker = ref(false);
const showModal = ref(false);
const deleteModalRef = ref(null);
const newWorker = ref('');
const workerAdress = ref('');

workerStore.getWorkers();

const toggleAddWorker = () => {
  addWorker.value = !addWorker.value;
  showModal.value = false; // Close the modal when toggling addJob
};

onClickOutside(deleteModalRef, toggleAddWorker);
const handleSubmit = () => {
  if (newWorker.value.length > 0) {
    workerStore.addWorker({
      name: newWorker.value,
      workerStatus: workerStore.workerStatus,
      adress: workerAdress.value,
    });
    newWorker.value = '';
    workerAdress.value = '';
  }
};
</script>

<style scoped>
.search-option {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 5px;
}
.toggle-buttons {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
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
.add-tasks button {
  margin-top: 10px;
  position: relative;
  background-color: #3c8b35;
  color: #fff;
  width: 210px;
  height: 50px;
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
.modals {
  border-radius: 10px;
  width: 70%;
  padding: 10px 10px;
  position: absolute;
  top: 180px;
  bottom: 200px;
  left: 350px;
  justify-content: center;
  align-items: center;
}
.modals > div {
  background-color: white;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
