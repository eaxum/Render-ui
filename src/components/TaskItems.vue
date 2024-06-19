<template>
  <div :class="{ container: true, blurred: addJob }" id="blurBody">
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
      <div v-if="addJob" ref="deleteModalRef" @click.stop>
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
                <button type="button" @click="toggleAddJob">Cancel</button>
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
          <span class="item-text">
            <p class="task-item-title">{{ task.job_name }}</p>
          </span>
          <span class="item-text">
            <p class="task-item-status">{{ task.job_status }}</p>
          </span>
          <span class="item-text">
            <button class="item-render">Remove</button>
          </span>
        </div>
      </div>
      <div class="task-container" v-if="filter === 'failed'">
        <div
          class="task-item"
          v-for="(task, index) in taskStore.failedTasks"
          :key="index">
          <span class="item-text">
            <p class="task-item-title">{{ task.job_name }}</p>
          </span>
          <span class="item-text">
            <p class="task-item-status">{{ task.job_status }}</p>
          </span>
          <span class="item-text">
            <button class="item-render">Remove</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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
  toggleBlurBody();
};

const toggleBlurBody = () => {
  const blurBody = document.getElementById('blurBody');
  if (blurBody) {
    blurBody.classList.toggle('blurred', addJob.value);
  }
};

onClickOutside(deleteModalRef, () => {
  addJob.value = false;
  toggleBlurBody();
});

const handleSubmit = async () => {
  const preset = taskStore.presets.find((p) => p.id === selectedPreset.value);
  const jobTypeName = preset ? preset.name : '';

  try {
    const newTask = {
      job_type_name: jobTypeName,
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
  selectedPreset.value = taskStore.presets[0]?.id;
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
    await fetch(`http://127.0.0.1:82/data/jobs/${taskId}`, {
      method: 'DELETE',
    });
    taskStore.fetchTasks();
  } catch (error) {
    console.error('Error removing task:', error);
  }
};
</script>

<style scoped>
.blurred {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.container {
  display: flex;
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
  font-size: 20px;
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
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
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
  width: 15px;
}
.main-container::-webkit-scrollbar-track {
  background-color: #292a39;
}
.main-container::-webkit-scrollbar-thumb {
  background-color: #666;
  border-radius: 10px;
}
.container::-webkit-scrollbar {
  display: none;
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
  position: fixed;
  top: 159px;
  background-color: #292a39;
  z-index: 1;
  padding: 10px 0;
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
  width: calc(100% - 20px);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  width: 90%;
  max-width: 1400px;
  padding: 20px;
  background-color: #2c2e4e;
  z-index: 1000;
  overflow: auto;
}
.modals > div {
  background-color: #2c2e4e;
  border-radius: 10px;
  width: 100%;
  height: 600px;
  max-height: 90vh;
  overflow: auto;
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
  border: none;
  outline: none !important;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
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
  background-color: #f9d043 !important;
}
.task-item-status.rendering {
  background-color: #4caf50 !important;
}
.item-text.completed {
  background-color: #673ab7 !important;
}
.task-item-status.failed {
  background-color: #f44336 !important;
}
</style>
