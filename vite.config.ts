import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          complaint: path.resolve(__dirname, 'complaint.html'),
          tracking: path.resolve(__dirname, 'tracking.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          history: path.resolve(__dirname, 'history.html'),
          details: path.resolve(__dirname, 'details.html'),
          about: path.resolve(__dirname, 'about.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        }
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
