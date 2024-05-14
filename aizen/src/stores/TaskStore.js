import { defineStore } from 'pinia';
import axios from 'axios'; // Import Axios for making HTTP requests

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    isLoading: false,
    jobStatus: 'idle',
    frameRangeX: null,
    frameRangeY: null,
    resolutionX: null,
    resolutionY: null,
    resolutionPercentage: null,
    renderEngines: ['Eevee', 'Cycles', 'Workbench'],
    priority: null,
    renderSamples: null,
    jobTypes: ['Image', 'Animation'],
    fileFormat: ['PNG', 'JPEG', 'FFMPEG'],
    preset: {
      Lightinig: {
        renderEngines: 'Workbench',
        jobTypes: 'Image',
        fileFormat: 'PNG',
        resolutionPercentage: 50,
        renderSamples: 14,
        resolutionX: 1920,
        resolutionY: 1080,
      },
      finalize: {
        renderEngines: 'Cycles',
        jobTypes: 'Animation',
        fileFormat: 'FFMPEG',
        resolutionPercentage: 100,
        renderSamples: 36,
        resolutionX: 3840,
        resolutionY: 2160,
      },
    },
    tasks: [],
  }),

  getters: {
    // rendered() {
    //   return this.tasks.filter((status) => status.rendered);
    // },

    renderedTasks() {
      return this.tasks.filter((task) => task.job_status === 'Completed');
    },
    renderingTasks() {
      return this.tasks.filter((task) => task.job_status === 'Rendering');
    },
    failedTasks() {
      return this.tasks.filter((task) => task.job_status === 'failed');
    },
  },
  actions: {
    async fetchTasks() {
      try {
        const response = await fetch('http://127.0.0.1:5000/getjobs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        this.tasks = data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
  },
});
