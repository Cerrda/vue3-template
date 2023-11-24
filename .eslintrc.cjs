/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier/skip-formatting'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/valid-template-root': 'off', // 关闭template根元素检测
    'no-var': 'error', // 禁止使用var
    'no-unused-vars': 'off', // 关闭未使用变量检测
    'vue/multi-word-component-names': 'off' // 关闭多个单词组成的组件名检测
  }
}
