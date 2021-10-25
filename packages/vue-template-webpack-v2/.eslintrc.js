module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser", // 用来检测.vue文件
  parserOptions: {
    parser: "@babel/eslint-parser", // 替换babel-eslint
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/prettier", // 修复prettier和eslint-plugin-vue之间的规则冲突
    "eslint:recommended",
  ],
  plugins: ["prettier", "vue"],
};
