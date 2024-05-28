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
    renderEngines: [],
    priority: null,
    renderSamples: null,
    // jobTypes: ['Image', 'Animation'],
    // fileFormat: ['PNG', 'JPEG', 'FFMPEG'],
    presets: [],
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
    // async fetchPresets() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:82/data/jobs/types');
    //     console.log(response.data);
    //     this.preset = response.data; // Assign fetched data to preset
    //   } catch (error) {
    //     console.error('Error fetching presets:', error);
    //   }
    // },

    async fetchPresets() {
      try {
        const response = await fetch('http://127.0.0.1:82/data/jobs/types');
        console.log();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        console.log(data.render_engine);
        this.presets = data; // Assign fetched data to preset
      } catch (error) {
        console.error('Error fetching presets:', error);
      }
    },

    //   async fetchTasks() {
    //     try {
    //       const response = await fetch('http://127.0.0.1:82/data/jobs');
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       const data = await response.json();
    //       console.log(console.data);
    //       this.tasks = data;
    //     } catch (error) {
    //       console.error('Error fetching tasks:', error);
    //     }
    //   },

    // Other imports and code...

    async fetchTasks() {
      try {
        const response = await fetch('http://127.0.0.1:82/data/jobs');

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
