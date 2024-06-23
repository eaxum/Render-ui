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
      let testUrl = 'http://localhost:3000/workers';
      let url = 'http://127.0.0.1:82/data/workers';

      this.loading = true;
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.workers = data;
        console.log('Workers data:', this.workers);
      } catch (error) {
        console.error('Error fetching workers:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
