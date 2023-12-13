import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import postcssPxToViewport from 'postcss-px-to-viewport-8-plugin'
import { loadEnv } from 'vite'
import hpx2vh from './hpx2vh'

export default defineConfig((mode) => {
  // eslint-disable-next-line
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // eslint-disable-next-line
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],

        symbolId: 'icon-[dir]-[name]'
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
          })
        ]
      })
    ],
    css: {
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: env.VITE_DESIGN_WIDTH
          }),
          hpx2vh(env.VITE_DESIGN_WIDTH, env.VITE_DESIGN_HEIGHT)
        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      proxy: {
        '/brdcontrol-service': {
          target: 'http://192.168.5.213:5555',
          changeOrigin: true
        },
        '/api/rssi': {
          target: 'http://192.168.5.150:5555',
          changeOrigin: true
        }
      }
    }
  }
})
