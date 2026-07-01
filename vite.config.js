import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        unified: resolve(__dirname, 'pages/unified-protection.html'),
        kubernetes: resolve(__dirname, 'pages/kubernetes-waap.html'),
        aiml: resolve(__dirname, 'pages/aiml-detection.html'),
        hybrid: resolve(__dirname, 'pages/hybrid-cloud.html'),
        rapid: resolve(__dirname, 'pages/rapid-deployment.html'),
        login: resolve(__dirname, 'login/index.html')
      }
    }
  }
});
