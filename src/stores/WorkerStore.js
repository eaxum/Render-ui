import { defineStore } from 'pinia';
import axios from 'axios';

export const useWorkerStore = defineStore('workerStore', {
  state: () => ({
    workerStatus: 'idle',
    workers: [],
    loading: false, // Initialize as boolean
  }),
  getters: {},
  actions: {
    // async getWorkers() {
    //   let testUrl = 'http://localhost:3000/workers';
    //   let url = 'http://127.0.0.1:82/workers';

    //   this.loading = true;
    //   try {
    //     const response = await axios.get(url);
    //     this.workers = response.data;
    //     console.log(workers);
    //   } catch (error) {
    //     console.error('Error fetching workers:', error);
    //     // Handle error (e.g., show error message to user)
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async getWorkers() {
      let testUrl = 'http://localhost:3000/workers';
      let url = 'http://127.0.0.1:82/worker';

      this.loading = true;
      try {
        const response = await fetch(url);
        console.log(response.data);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.workers = data;
        console.log(this.workers);
      } catch (error) {
        console.error('Error fetching workers:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        this.loading = false;
      }
    },
  },
});
