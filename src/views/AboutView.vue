<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavbarCom from '../components/NavbarCom.vue'
import AboutBriefCom from "../components/AboutCom/AboutBriefCom.vue"
import AboutExpCom from '../components/AboutCom/AboutExpCom.vue'
import FootCom from "../components/FootCom.vue";

// 🔥 核心修复1：路由切换时强制滚动到顶部
const router = useRouter();

// 页面挂载时滚动到顶部（覆盖刷新/直接访问场景）
onMounted(() => {
  // 强制滚动到页面最顶部（x=0, y=0）
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant' // 无动画，立即到顶
  });

  // 🔥 新增：挂载时把body背景设为纯白（只作用于About页面）
  document.body.style.background = '#ffffff';
});

// 🔥 核心修复2：监听路由变化，确保从其他页面切过来也滚动到顶
router.afterEach((to) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

  // 🔥 新增：离开About页面时恢复原有背景（如果其他页面需要#f9f9f9）
  if (to.name !== 'About') {
    document.body.style.background = '#f9f9f9';
  } else {
    document.body.style.background = '#ffffff';
  }
});
</script>

<template>
  <div class="works-view-wrapper">
    <NavbarCom />
    <div class="about-content-container">
      <AboutBriefCom class="about-brief-section"/>
      <AboutExpCom class="about-exp-section"/>
    </div>
    <FootCom />
  </div>
</template>

<style scoped lang="scss">
.works-view-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // 🔥 修改：容器背景设为纯白
  background: #ffffff;
  position: relative;
  top: 0;
}

// 核心优化：精准匹配导航栏高度，避免间距偏差导致视觉上“不在顶部”
.about-content-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  // 导航栏固定高度：16*2（上下padding） + 32（logo） + 1（边框） = 65px，向上取整65px更精准
  padding: 65px 0 32px !important;
  margin: 0 !important;
  box-sizing: border-box;
  // 🔥 修改：内容容器背景也设为纯白
  background: #ffffff;
  position: relative;
  top: 0;
}

.about-brief-section {
  width: 100%;
  margin: 0 auto !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.about-exp-section {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

// 🔥 关键修改：删除body的#f9f9f9背景设置，改为通过JS动态控制
:global(body) {
  margin: 0;
  padding: 0 !important; // 彻底移除全局padding，避免双重间距
  // 移除：background: #f9f9f9;
  scroll-behavior: auto;
}

:global(html) {
  scroll-padding-top: 0;
  scroll-behavior: auto;
}

:global(.about-brief-container) {
  width: 1280px;
  padding: 0 200px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  min-height: calc(100vh - 120px);
  // 🔥 新增：内容块背景也设为纯白
  background: #ffffff;
  position: relative;
  top: 0;
}

:global(.foot) {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  margin-top: auto;
  // 🔥 可选：如果页脚需要纯白背景也加上
  background: #ffffff;
}

// 平板端适配
@media (max-width: 1280px) {
  .about-content-container {
    gap: 32px;
    padding: 65px 0 24px !important; // 同步调整为65px
  }
  :global(.about-brief-container) {
    width: 100%;
    padding: 0 40px;
    min-height: calc(100vh - 110px);
    background: #ffffff;
  }
}

// 移动端适配
@media (max-width: 768px) {
  .about-content-container {
    gap: 24px;
    padding: 65px 0 16px !important; // 同步调整为65px
  }
  :global(.about-brief-container) {
    padding: 0 20px;
    min-height: calc(100vh - 100px);
    background: #ffffff;
  }
}
</style>