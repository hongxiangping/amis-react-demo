import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import replace from '@rollup/plugin-replace';
//@ts-ignore
import i18nPlugin from 'plugin-react-i18n';

var I18N = process.env.I18N;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/images': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/images/, '')
      }
    }
  },
  resolve: {
    // 配置路径别名
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
});
