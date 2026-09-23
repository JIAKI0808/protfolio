<template>
  <!-- 单独包裹，避免样式污染 -->
  <div class="back-btn-wrapper">
    <!-- 返回上一层按钮：指定页面始终显示 -->
    <div
        class="back-btn back-to-prev"
        v-if="isTargetWorkPage"
        @click="goBack"
    >
      <img src="./../assets/icons/backarrow.svg" alt="返回上一层" class="arrow-icon" />
    </div>
    <!-- 回顶部按钮：滚动后显示 -->
    <div
        class="back-btn back-to-top"
        v-if="isShow"
        @click="backToTop"
    >
      <img src="./../assets/icons/top-arrow.svg" alt="回到顶部" class="arrow-icon" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 定义Props（简化+无冗余）
const props = defineProps({
  bottom: { type: Number, default: 30 },
  right: { type: Number, default: 30 },
  showHeight: { type: Number, default: 300 }
});

// 路由实例
const route = useRoute();
const router = useRouter();

// 状态变量（仅保留必要的）
const isShow = ref(false); // 控制回顶部按钮
const isTargetWorkPage = ref(false); // 控制返回按钮

// 精准匹配目标页面（无正则，纯数组匹配）
const checkTargetPage = () => {
  const targetPaths = [
    '/work-page1', '/work-page2', '/work-page3', '/work-page4', '/work-page5',
    '/work-page6', '/work-page7', '/work-page8', '/work-page9', '/work-page10', '/work-page11',
    '/work-before-1', '/work-before-2', '/work-before-3', '/work-before-4', '/work-before-5', '/c-project',
    '/b-project','/others','/b-project',
  ];
  isTargetWorkPage.value = targetPaths.includes(route.path);
};

// 滚动监听（仅控制回顶部按钮）
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  isShow.value = scrollTop > props.showHeight;
};

// 回顶部方法
const backToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 返回上一层方法
const goBack = () => {
  window.history.length > 1 ? router.back() : router.push('/');
};

// 生命周期（极简，无冗余）
onMounted(() => {
  checkTargetPage();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 监听路由变化
watch(() => route.path, checkTargetPage, { immediate: true });

// 监听滚动阈值变化
watch(() => props.showHeight, handleScroll);
</script>

<style scoped>
/* 基础容器：PC端使用props默认值，移动端单独覆盖 */
.back-btn-wrapper {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  overflow: visible;
  /* PC端默认边距（和props一致） */
  bottom: 30px;
  right: 30px;
}

/* 🔥 核心：移动端媒体查询，调小边距 */
@media (max-width: 767px) {
  .back-btn-wrapper {
    bottom: 15px !important; /* 移动端底部距离从30px改为15px */
    right: 8px !important;  /* 移动端右侧距离从30px改为15px */
    gap: 8px; /* 移动端按钮间距也调小，更紧凑 */
  }
  /* 移动端按钮尺寸可按需调小（可选） */
  .back-btn {
    width: 40px;
    height: 40px;
  }
  .arrow-icon {
    width: 18px;
    height: 18px;
  }
}

/* 通用按钮样式：统一风格，无全局影响 */
.back-btn {
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  overflow: visible;
  position: relative;
}

/* 图标样式：仅控制自身 */
.arrow-icon {
  width: 20px;
  height: 20px;
  filter: invert(34%) sepia(89%) saturate(1352%) hue-rotate(207deg) brightness(90%) contrast(94%);
  pointer-events: none;
}

/* Hover效果：自然放大，无变形 */
.back-btn:hover {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transform-origin: center;
}

/* 单独样式：仅区分按钮，无冗余 */
.back-to-prev {
  opacity: 0.9;
}
.back-to-top {
  opacity: 0.9;
}
</style>
