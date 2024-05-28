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
    async getWorkers() {
      let url = "'http://localhost:3000/workers'";
      let testUrl = "'http://localhost:5000/workers'";
      this.loading = true;
      try {
        const response = await axios.get(testUrl);
        this.workers = response.data;
      } catch (error) {
        console.error('Error fetching workers:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        this.loading = false;
      }
    },
    async addWorker(worker) {
      this.workers.push(worker);

      const response = await fetch('http://localhost:3000/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(worker), // Convert object to JSON string
      });
      if (response.error) {
        console.log(response.error);
      }
    },
  },
});
