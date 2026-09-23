<script setup>
import { RouterLink, RouterView } from 'vue-router'
// 🔥 1. 导入回到顶部组件（路径要和你的文件位置匹配）
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <nav>
    <RouterLink to="/"></RouterLink>
  </nav>

  <!-- 页面内容渲染区域 -->
  <RouterView />

  <!-- 🔥 2. 使用回到顶部组件：全局显示，可自定义位置/显示阈值 -->
  <BackToTop
      :bottom="50"
  :right="30"
  :show-height="200"
  />
</template>

<style scoped>
/* 你的原有样式保留，无需额外修改 */
</style>