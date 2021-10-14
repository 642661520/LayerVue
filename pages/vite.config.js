import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');
console.log(process.env);
export default defineConfig({
  build: {
    outDir: '../dist',
  },
  plugins: [vue()],
});
