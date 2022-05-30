import {defineConfig} from 'vite'
import { resolve } from 'path';
// 安装plugin-vue，需要npm i @vitejs/plugin-vue
// 如果报错，则需要在pakage.json和packge-lock.json中更改vite的版本，重新npm install
import vue from '@vitejs/plugin-vue'
// 引入polyfill
import legacy from '@vitejs/plugin-legacy'
const path = require('path');
export default defineConfig({
    plugins:[
        vue(),
        legacy({
            targets: 'IE 11',
            modernPolyfills: true
        })
    ],
    server:{
        open:true,
        port:8080
    },
    build:{
        target:'modules',
        outDir:'dist',
        assetsDir:'assets',
        minify:'terser'
    },
    preview:{
        open:true
    }
})