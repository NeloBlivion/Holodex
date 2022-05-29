/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import pkg from './package.json'
import yaml from "@rollup/plugin-yaml";

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

const API_BASE_URL = process.env.API_BASE_URL ?? "https://staging.holodex.net";
const REWRITE_API_ROUTES = !!process.env.REWRITE_API_ROUTES;

console.log(__dirname);

export default defineConfig({
  plugins: [
    yaml(),
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        'pinia',
        {
          '@/store': ['useStore'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      vue: '@vue/compat',
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (url) => (REWRITE_API_ROUTES ? url.replace(/^\/api/, "") : url),
      },
      "^/(stats|orgs).json$": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      "/statics": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
