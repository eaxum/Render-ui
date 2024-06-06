<template>
  <div class="container" id="blur-body" @click="!addJob">
    <div class="search-option">
      <div class="toggle-buttons">
        <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
          All Jobs
        </button>
        <button
          @click="filter = 'rendered'"
          :class="{ active: filter === 'rendered' }">
          Rendered Jobs
        </button>
        <button
          @click="filter = 'rendering'"
          :class="{ active: filter === 'rendering' }">
          Rendering Jobs
        </button>
        <button
          @click="filter = 'failed'"
          :class="{ active: filter === 'failed' }">
          Failed Jobs
        </button>
      </div>
      <div class="add-tasks">
        <button @click="toggleAddJob">Add New Task</button>
      </div>
    </div>
    <teleport to="body">
      <div v-if="addJob" ref="deleteModalRef">
        <form class="modals" @submit.prevent="handleSubmit">
          <div class="g">
            <div class="inputs">
              <div class="field-group">
                <label for="name" class="input-label">Job Name</label>
                <input
                  type="text"
                  name="name"
                  class="input-field"
                  v-model="jobName"
                  placeholder="name" />
              </div>
              <div class="field-group">
                <label for="file" class="input-label">File path</label>
                <input
                  type="text"
                  name="file"
                  v-model="jobFilePath"
                  class="input-field"
                  placeholder="file-path" />
              </div>
            </div>
            <div class="grids">
              <div class="input-modal">
                <h4>Preset</h4>
                <select v-model="selectedPreset">
                  <option
                    v-for="preset in taskStore.presets"
                    :key="preset.id"
                    :value="preset.id">
                    {{ preset.name }}
                  </option>
                </select>
              </div>

              <div class="input-modal">
                <h4>Priority</h4>
                <div class="render-input">
                  <input type="number" v-model="priority" />
                </div>
              </div>
              <div class="input-modal">
                <h4>Resolution (%)</h4>
                <div class="render-input">
                  <input
                    type="number"
                    v-model="resolutionPercentage"
                    placeholder="resolution Percentage" />
                </div>
              </div>
            </div>
            <div class="grids">
              <div class="input-modal">
                <h4>Frame Range</h4>
                <div class="input-wrapper">
                  <input
                    type="number"
                    v-model="frameRangeX"
                    placeholder="frame-X" />
                  <input
                    type="number"
                    v-model="frameRangeY"
                    placeholder="frame-Y" />
                </div>
              </div>
            </div>
            <div class="buttons">
              <div class="first">
                <button @click="toggleAddJob">Cancel</button>
                <button type="submit">Render</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </teleport>
    <div class="main-container">
      <div class="task-container" v-if="filter === 'all'">
        <div
          class="task-item"
          v-for="(task, index) in taskStore.tasks"
          :key="index">
          <span class="item-text">
            <p class="task-item-title">{{ task.name }}</p>
          </span>
          <span class="item-text">
            <p
              class="task-item-status"
              :class="{
                pending: task.status === 'pending',
                running: task.status === 'running',
                completed: task.status === 'completed',
                failed: task.status === 'failed',
              }">
              {{ task.status }}
            </p>
          </span>
          <span class="item-text">
            <button class="item-render" @click="removeTask(task.id)">
              Remove
            </button>
          </span>
        </div>
      </div>
      <!-- Similarly for other filters like rendered, rendering, failed -->

      <div class="task-container" v-if="filter === 'rendered'">
        <div
          class="task-item"
          v-for="(task, index) in taskStore.renderedTasks"
          :key="index">
          <span class="item-text">
            <p class="task-item-title">{{ task.name }}</p>
          </span>
          <span class="item-text">
            <p class="task-item-status">{{ task.status }}</p>
          </span>
          <span class="item-text">
            <button class="item-render">Remove</button>
          </span>
        </div>
      </div>

      <div class="task-container" v-if="filter === 'rendering'">
        <div
          class="task-item"
          v-for="(task, index) in taskStore.renderingTasks"
          :key="index">
          <span class="item-text"
            ><p class="task-item-title">{{ task.job_name }}</p></span
          >
          <span class="item-text"
            ><p class="task-item-status">{{ task.job_status }}</p></span
          >

          <span class="item-text"
            ><button class="item-render">Remove</button></span
          >
        </div>
      </div>

      <div class="task-container" v-if="filter === 'failed'">
        <div
          class="task-item"
          v-for="(task, index) in taskStore.failedTasks"
          :key="index">
          <span class="item-text"
            ><p class="task-item-title">{{ task.job_name }}</p></span
          >
          <span class="item-text"
            ><p class="task-item-status">{{ task.job_status }}</p></span
          >

          <span class="item-text"
            ><button class="item-render">Remove</button></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTaskStore } from '@/stores/TaskStore';
import axios from 'axios';

const taskStore = useTaskStore();
const filter = ref('all');
const addJob = ref(false);
const showModal = ref(false);
const deleteModalRef = ref(null);

const jobName = ref('');
const jobFilePath = ref('');
const priority = ref('');
const resolutionX = ref(1920);
const resolutionY = ref(1080);
const frameRangeX = ref('');
const frameRangeY = ref('');
const renderSamples = ref(100);
const resolutionPercentage = ref('');
const selectedPreset = ref('');
const renderEngine = ref('');

const toggleAddJob = () => {
  addJob.value = !addJob.value;
  showModal.value = false;
  toggleModalBlur(addJob.value);
};

onClickOutside(deleteModalRef, toggleAddJob);

const toggleModalBlur = (isBlurred) => {
  document.body.classList.toggle('blur-body', isBlurred);
};

const handleSubmit = async () => {
  const preset = taskStore.presets.find((p) => p.id === selectedPreset.value);

  const jobTypeName = preset ? preset.name : '';

  try {
    const newTask = {
      job_type_name: jobTypeName, // Use the name of the preset
      name: jobName.value,
      file_path: jobFilePath.value,
      resolution_Percentage: resolutionPercentage.value,
      priority: priority.value,
      start_frame: frameRangeX.value,
      end_frame: frameRangeY.value,
    };

    console.log('Sending payload:', newTask);

    const response = await fetch('http://127.0.0.1:82/data/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response data:', data);

    taskStore.fetchTasks();
    toggleAddJob();
  } catch (error) {
    console.error('Error adding job:', error);
  }
};

onMounted(async () => {
  await taskStore.fetchPresets();
  await taskStore.fetchTasks();
  selectedPreset.value = taskStore.presets[0].id;
});

watch(selectedPreset, (newPresetId) => {
  const preset = taskStore.presets.find((p) => p.id === newPresetId);
  if (preset) {
    frameRangeX.value = preset.start_frame;
    frameRangeY.value = preset.end_frame;
    resolutionPercentage.value = preset.resolution_percentage;
  }
});

const removeTask = async (taskId) => {
  try {
    await axios.delete(`http://127.0.0.1:82/data/jobs/${taskId}`);
    taskStore.fetchTasks();
  } catch (error) {
    console.error('Error removing task:', error);
  }
};
</script>

<style scoped>
.container {
  display: flex; /* Use flexbox for layout */
  flex-direction: column;
  height: 100%;
}
.grids {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.input-modal {
  border-radius: 10px;
  background: rgb(174, 174, 228);
  width: 320px;
  height: 130px;
}
.input-modal h4 {
  font-family: 'poppins', sans-serif;
  display: absolute;
  left: 20px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.render-input input {
  position: relative;
  width: 250px;
  border-radius: 10px;
  height: 40px;
  border: none;
  margin-left: 30px;
}
.input-modal .input-wrapper {
  justify-content: center;
  display: flex;
  gap: 10px;
}
.input-wrapper input {
  position: relative;
  width: 130px;
  border-radius: 10px;
  height: 40px;
  border: none;
}
.input-modal select {
  display: flex;
  color: brown;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none !important;
  padding: 10px 20px;
  border-radius: 5px;
  width: 90%;
  margin-left: 10px;
}
.inputs {
  margin-left: 60px;
  display: flex;
  gap: 160px;
  justify-content: center;
  align-items: center;
}
.field-group {
  width: 600px;
  position: relative;
  padding-top: 15px;
}
.input-field {
  margin-top: 40px;
  width: 500px;
  outline: 0;
  border: 0;
  border-bottom: 2px solid #fff;
  color: #fff;
  padding: 0px 0;
  background: transparent;
  font-size: 26px;
  transition: 0.3s ease;
}
.input-label {
  display: block;
  position: relative;
  top: 20px;
  font-size: 12pt;
  font-family: 'poppins', sans-serif;
  color: #fff;
  text-transform: uppercase;
  transition: 0.3s ease;
}
.input-field::placeholder {
  color: transparent;
  font-size: 18pt;
}
.input-field:placeholder-shown ~ .input-label {
  font-size: 15pt;
  top: 35px;
}
.input-field:focus {
  border-image: linear-gradient(to right, #ef5a03, #d1d357);
  border-image-slice: 1;
}
.input-field:focus ~ input-label {
  display: block;
  position: absolute;
  top: 0;
  font-size: 10pt;
  color: #ef5a03;
}
.toggle-buttons button.active {
  background-color: #41435f;
  /* Add any other styles you want for active buttons */
}

.main-container {
  font-family: 'poppins', sans-serif;
  background: linear-gradient(to bottom, #2e1652, #4b3a78);
  position: relative;
  height: 91vh;
  border-radius: 15px;
  overflow-y: auto;
  margin-right: 10px;
  overflow-x: hidden;
}
.main-container::-webkit-scrollbar {
  width: 15px; /* Adjust width as needed */
}
.main-container::-webkit-scrollbar-track {
  background-color: #292a39; /* Color for the scrollbar track */
}

.main-container::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 10px; /* Color for the scrollbar thumb */
}
.container::-webkit-scrollbar {
  display: none; /* This hides the scrollbar */
}

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
.search input {
  background-color: #292a39;
  border: none;
  outline: none !important;
  color: white;
  padding: 26px 355px;
  margin-right: 290px;
  border-radius: 10px;
}
.search input::placeholder {
  justify-content: start;
  font-size: 16pt;
  color: #fff;
}
.input-task {
  display: flex;
  gap: 10px;
}
.input-task input {
  background-color: #292a39;
  border: none;
  outline: none !important;
  color: white;
  padding: 26px 170px;
  border-radius: 10px;
}
.input-task input::placeholder {
  justify-content: start;
  font-size: 16pt;
  color: #fff;
}
.input-task button {
  background-color: #3c8b35;
  border: none;
  outline: none !important;
  color: white;
  padding: 26px 40px;
  border-radius: 10px;
}

.add-tasks button {
  margin-top: 10px;
  position: relative;
  background-color: #128f07;
  color: #fff;
  width: 210px;
  height: 50px;
  border-radius: 10px;
  font-size: 15pt;
  border: none;
  outline: none;
}
.header-wrapper-container {
  /*background-color: blue;*/
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  height: 7%;
}
.header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #1a1b33;

  border-radius: 10px;
  margin: 10px 0px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.texts {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* gap: 10px; */
  border-radius: 10px;
  /* background: #a93bc5; */
  cursor: pointer;
  justify-content: space-between;
}
.text {
  color: #fff;
  padding: 20px 20px;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.36px;
}
.task-container {
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
  align-items: center;
  overflow-y: auto;
  cursor: none;
}
.task-container .task-title {
  position: fixed; /* Make the title sticky */
  top: 159px; /* Stick it at the top */
  background-color: #292a39; /* Background color */
  z-index: 1; /* Ensure it's above other elements */
  padding: 10px 0; /* Add some padding for spacing */
  margin-bottom: 80px;
}
.task-item {
  position: inherit;
  background: #3b3d75;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
  width: calc(
    100% - 20px
  ); /* Adjust the width to fit within the parent container */
}
.item-text {
  margin-left: 20px;
  margin-right: 110px;
  color: white;
  width: 60px;
  top: 10px;
  text-align: center;
  font-size: 16pt;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-text-wrapper {
  white-space: nowrap; /* Prevents text from wrapping to the next line */
  overflow: hidden; /* Hides overflowed text */
  text-overflow: ellipsis; /* Adds ellipsis (...) to overflowed text */
  margin-left: 20px;
  margin-right: 110px;
  color: white;
  width: 60px;
  top: 10px;
  text-align: center;
  font-size: 16pt;
}
.task-item-status {
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 15px;
  padding: 7px;
  font-size: 19px;
  background-color: #d1d1d1;
  border-radius: 30px;
  margin-right: 0px;
}
.task-item-priority {
  margin-right: 40px;
}

.task-item-modal button {
  padding: 5px 10px;
  border-radius: 10px;
}

.item-render {
  color: white;
  padding: 10px 50px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  background-color: rgb(240, 81, 81);
}

.modals {
  position: fixed; /* Fixes the modal to the viewport */
  top: 50%; /* Centers the modal vertically */
  left: 50%; /* Centers the modal horizontally */
  transform: translate(
    -50%,
    -50%
  ); /* Adjusts the position to keep it centered */
  border-radius: 10px;
  width: 90%; /* Use a percentage to make it responsive */
  max-width: 1400px; /* Set a max-width to prevent it from becoming too wide */
  padding: 20px; /* Add some padding */
  background-color: #2c2e4e; /* Background color of the modal */
  z-index: 1000; /* Ensure it stays on top of other elements */
  overflow: auto; /* Ensure it scrolls if the content is too large */
}

.modals > div {
  background-color: #2c2e4e;
  border-radius: 10px;
  width: 100%; /* Make it take the full width of the .modals container */
  height: 600px;
  /* Let it adjust the height based on its content */
  max-height: 90vh; /* Ensure it doesn't exceed the viewport height */
  overflow: auto; /* Allow scrolling if content overflows */
}
.modal-input h4 {
  font-size: 20px;
  text-align: center;
  margin-right: 47px;
}
.modal-input input {
  display: block;
  width: 80%;
  font-size: 16px;
  /*background-color: #292a39;*/
  border: none;
  outline: none !important;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
}

.modals > div {
  background-color: #2c2e4e;
  border-radius: 10px;
  width: 1360px;
}
.grid {
  top: 20;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
.buttons {
  top: 520px;
  left: 400px;
  position: absolute;
  align-items: center;
  display: grid;
  gap: 230px;
  grid-template-columns: 1fr 1fr;
}
.buttons button[type='submit'] {
  background-color: #4caf50;
  color: white;
  font-size: 23px;
}

.buttons button:first-child {
  background-color: #f44336;
  color: white;
  font-size: 23px;
}
.buttons button {
  width: 250px;
  height: 60px;
  border: none;
  outline: none !important;
  border-radius: 10px;
}
/*input,
select {
  display: block;
  background-color: #292a39;
  padding: 15px 50px;
  border-radius: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  font-size: 1em;
} */

.flex {
  display: flex;
  gap: 10px;
}
.first {
  gap: 10px;
  display: flex;
  margin-left: 20px;
}
.task-item-status.pending {
  background-color: #f9d043 !important; /* Light yellow for pending */
}

.task-item-status.rendering {
  background-color: #4caf50 !important; /* Light green for running */
}

.item-text.completed {
  background-color: #673ab7 !important; /* Light purple for completed */
}

.task-item-status.failed {
  background-color: #f44336 !important; /* Light red for failed */
}
</style>
