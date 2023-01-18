// vite.config.js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import prismjs from 'vite-plugin-prismjs';

import path from 'path'


export default defineConfig({
    themeConfig: {
        algolia: {
            appId: 'HKHZGVB87Z',
            apiKey: '8c8ae109bdd517271953b6da471dcecf',
            indexName: 'leo_blog'
        },
    },


    //在plugins配置数组里添加gzip插件
    plugins: [
        vue(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
        prismjs({
            languages: 'all',
        })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],

    },
    server: {
        port: 3000,
        proxy: {
            '/music': {
                // 后台地址
                target: 'http://openapi.music.163.com/openapi/music/basic/search/song/get/v2',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/music/, '')
            },
            '/api2': {
                // 后台地址
                target: 'http://127.0.0.1:8956/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api2/, '')
            }
        }
    },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
            }
        }
    },


})
