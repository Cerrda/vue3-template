# vue3-template

## 推荐使用pnpm：

```js
pnpm i
pnpm run dev
```

## 模板已包含以下依赖：

- animate.css
- normalize.css
- ant-design-vue
- axios
- echarts
- vue-echarts
- vue-router
- vue-routr
- uuid
- dayjs
- prettier
- eslint
- sass
- stylelint
- vite-plugin-svg-icons
- postcss-px-to-viewport-plugin

## 模板封装了以下组件：

1. ### CountTo  数字滚动效果

   #### 使用方法举例：

   ```js
   const number = ref()
   setInterval(() => {
     number.value = Math.floor(Math.random() * 1000)
   }, 1000)
   
   <!-- gap是在设计稿中单个数字宽度的px数。如果传入的number是小数会自动保留两位处理 -->
   <CountTo class="count-to" :number="number" gap="14"></CountTo>
   ```

   #### 效果示例：

   ![Alt text](C:\work\vue3-template\assets\count_to.gif)

2. ### SvgIcon  更方便的使用svg

   #### 使用方法举例：

   1. #### 在/src/assets/icons中新建一个cell.svg文件，将相关的svg代码复制其中

   2. #### 在需要使用svg的地方使用，默认大小为16px，可通过传入width和height改变，svg颜色默认为cell.svg文件中代码指定的颜色，可通过传入
   
      #### fill改变

      ```js
      <SvgIcon name="cell" width="24" height="24" fill="#fff"></SvgIcon>
      ```

## 项目初始化

项目的自适应方案为vw+vh+flex，直接复制粘贴设计稿中元素的大小相关的css无需额外考虑屏幕适配

1. ### .env文件中修改设计稿大小

   ```js
   VITE_DESIGN_WIDTH = 1920
   VITE_DESIGN_HEIGHT = 1080
   ```

2. ### vite.clnfig.js中修改项目使用的数据库所在的服务器，即target

   ```js
   server: {
         proxy: {
           '/brdcontrol-service': {
             target: 'http://192.168.5.213:5555',
             changeOrigin: true
           }
         }
       }
   ```

3. ### 项目已配置好postcss-px-to-viewport-plugin，但是该postcss插件是将css中所有的px转为vh将会带来以下问题

   - #### 无法识别js中动态添加的css，无法识别行内css，解决办法如下

     #### 本模板中添加了px到vw和vh的工具函数，其中epx函数是用于echarts中，因为echarts中只能使用px作为单位

     ```js
     // px转vw
     export function px2vw(_px) {
       return ((_px * 100.0) / import.meta.env.VITE_DESIGN_WIDTH).toFixed(5) + 'vw'
     }
     // px转vh
     export function px2vh(_px) {
       return ((_px * 100.0) / import.meta.env.VITE_DESIGN_HEIGHT).toFixed(5) + 'vh'
     }
     // echarts中重新计算px
     export const epx = (size) => {
       let clientWidth = window.innerWidth
       let scale = clientWidth / import.meta.env.VITE_DESIGN_WIDTH
     
       return Number((size * scale).toFixed(5))
     }
     ```

   - #### 由于公司很多项目都是直接放在bdv的iframe中，项目占据浏览器的高度都要比设计稿中的高度矮，如果css都使用vw作为单位会出现滚动

     #### 条，因此提供以下方案，可根据情况选择是否使用。该方案是通过将高度相关的css属性的单位转成vh以适应iframe的高度，会对项目的高度

     #### 压缩

     ```js
     // eslint-disable-next-line
     module.exports = (viewportWidth, viewportHeight) => {
       // 可转换的 CSS 属性集合
       const transCssAttr = new Set([
         'height',
         'margin',
         'padding',
         'margin-top',
         'margin-bottom',
         'padding-top',
         'padding-bottom',
         'line-height',
         'max-height',
         'min-height'
       ])
     
       // 特殊处理的 CSS 属性集合
       const specialCssAttr = new Set(['margin', 'padding'])
     
       // 将数字精确到指定小数位数的函数
       const toFixed = (number, precision) => {
         const multiplier = 10 ** (precision + 1)
         const wholeNumber = Math.floor(number * multiplier)
         return (Math.round(wholeNumber / 10) * 10) / multiplier
       }
     
       // 将 vw 转换为 vh 单位的函数
       const toVh = (vw) => {
         return toFixed((((vw.split('vw')[0] / 100) * viewportWidth) / viewportHeight) * 100, 5)
       }
     
       return {
         postcssPlugin: 'hpx2vh',
         Once(css) {
           css.walkRules((rule) => {
             rule.walkDecls((decl) => {
               // 如果不是可转换的 CSS 属性或值中不包含 'vw'，则不进行处理
               if (!transCssAttr.has(decl.prop) || decl.value.indexOf('vw') === -1) return
     
               if (specialCssAttr.has(decl.prop)) {
                 // 对特殊属性进行处理
                 const values = decl.value.split(' ')
                 const len = values.length
                 let newValue = `${toVh(values[0])}vh`
     
                 if (len === 1) newValue += ` ${values[0]}`
                 if (len >= 2) newValue += ` ${values[1]}`
                 if (len >= 3) newValue += ` ${toVh(values[2])}vh`
                 if (len === 4) newValue += ` ${values[3]}`
     
                 decl.value = newValue
               } else {
                 // 对其他属性进行处理
                 decl.value = `${toVh(decl.value)}vh`
               }
             })
           })
         }
       }
     }
     
     // eslint-disable-next-line
     module.exports.postcss = true
     ```

     #### 以上是将高度相关css属性单位转成vh的postcss插件的代码，可能不完善，欢迎改进。如果不想使用vh作为高度相关css的单位可注释

     #### vite.config.js中对插件的使用

     ```js
     css: {
           postcss: {
             plugins: [
               postcssPxToViewport({
                 viewportWidth: env.VITE_DESIGN_WIDTH
               }),
               // hpx2vh(env.VITE_DESIGN_WIDTH, env.VITE_DESIGN_HEIGHT)
             ]
           }
         }
     ```

4. ### 网络请求相关

   #### 请求接口需要cookie中有sid信息，在pnpm run dev后需要添加该网页中的cookie的sid信息。sid可以通过登录项目测试环境获取。

   #### 项目模板已封装queryMysql和queryMiddle方法，以下用queryMysql举例

   ```js
   import axios from 'axios'
   // mysql查询 -------------------------------------------------------------------------------------------
   const queryMysqlEntity = axios.create({
     baseURL: '/brdcontrol-service/getRequestServer',
     timeout: 5000,
     method: 'POST',
     headers: { 'content-type': 'application/x-www-form-urlencoded' }
   })
   
   queryMysqlEntity.interceptors.response.use(function (res) {
     if (res.status === 200) {
       return res.data
     }
   })
   
   /**
    * mysql查询
    * @param {String} sql sql语句
    * @param {String} type get:查询，execute:其它
    * @returns {Function}
    */
   export function queryMysql(sql, type) {
     const data = {
       requestParams: JSON.stringify({
         serviceName: 'brd-mysql-8086',
         serviceMethod: `/brdmysql/${type ? 'execute' : 'get'}?sid=142459827452`,
         serviceParam: JSON.stringify({
           dataSourceType: '1',
           sql
         }),
         requesttype: 'get'
       })
     }
   
     return queryMysqlEntity({
       data
     })
   }
   ```

   #### 使用举例

   ```js
   // 建议将业务逻辑和数据获取逻辑隔离，增加代码可读性和可维护性，例如该项目模板将所有的请求都放在了api.js中
   // api.js
   import { queryMysq } from '@/utils/request.js'
   
   export const queryMysqlAPI = (name) => {
     const sql = `select * from cfg_tob_dnnproject_mgr`
   
     return queryMysql(sql)
   }
   
   // 使用时
   import { queryMysqlAPI } from '@/utils/api.js'
   
   const res = await queryMysqlAPI()
   console.log('🚀 ~ res:', res)
   ```

如需了解更多，可查看bdv_control项目的page下面的deviceDeatils项目相关代码
