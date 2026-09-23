<script setup>
import { onMounted, onActivated } from 'vue'; // 新增导入钩子
import NavbarCom from '../components/NavbarCom.vue'
import WorkBriefCom from '../components/WorkViewCom/WorkBriefCom.vue'
import WorkCardCom from '../components/WorkCardCom.vue'
import FootCom from "../components/FootCom.vue";

// 新增：滚动到顶部的方法
const scrollToTop = () => {
  // 方式1：滚动整个窗口到顶部（优先）
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant' // 无动画，瞬间回到顶部
  });
  // 方式2：如果是容器内滚动，加这行（兜底）
  document.querySelector('.works-view-wrapper')?.scrollTo(0, 0);
};

// 场景1：页面首次挂载时滚动到顶部
onMounted(() => {
  scrollToTop();
});

// 场景2：如果页面被<keep-alive>缓存，激活时滚动到顶部（关键）
onActivated(() => {
  scrollToTop();
});
</script>

<template>
  <!-- 页面整体容器：控制布局流（仅兜底垂直布局，不干预子组件） -->
  <div class="works-view-wrapper">
    <!-- 导航栏 -->
    <NavbarCom />
    <!-- WorkBriefCom 外层容器（仅保留基础间距，断点与子组件统一） -->
    <div class="work-brief-outer-wrapper">
      <div class="work-brief-container">
        <WorkBriefCom />
      </div>
    </div>
    <!-- WorkCardCom 专属容器（仅保留上下间距，不干预左右边距，断点统一） -->
    <div class="work-card-outer-wrapper">
      <WorkCardCom />
    </div>
    <FootCom />
  </div>
</template>

<style scoped lang="scss">
// 原有样式不变，无需修改
// 全局基础样式（仅作用于当前组件根容器，不渗透子组件）
.works-view-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #ffffff; // 仅当前页面背景，不渗透子组件
}

// 保留变量定义（供非媒体查询场景使用），但媒体查询中改用具体值
:root {
  --screen-lg: 1280px; // 大屏断点
  --screen-md: 768px;  // 中屏断点
  // 父页面仅管控WorkBriefCom边距，WorkCardCom边距自管控
  --brief-lg-padding: 60px;
  --brief-md-padding: 40px;
  --brief-sm-padding: 20px;
}

// WorkBriefCom 外层容器（仅保留基础上下间距，断点与子组件统一）
.work-brief-outer-wrapper {
  margin-top: 120px; // 大屏默认上下间距
  margin-bottom: 40px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 var(--brief-lg-padding); // 非媒体查询场景可正常使用变量
}

// WorkBriefCom 核心容器（仅保留居中，解除固定宽度/内边距限制）
.work-brief-container {
  margin: 0 auto; // 仅水平居中，宽度由 WorkBriefCom 自身控制
  box-sizing: border-box;
}

// WorkCardCom 父容器（仅保留上下间距，不干预左右边距，断点统一）
.work-card-outer-wrapper {
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto 40px auto; // 仅底部间距，左右边距由WorkCardCom自管控
}

// 大屏专属（≥1280px，替换CSS变量为具体数值）
@media (min-width: 1280px) {
  .work-brief-outer-wrapper {
    margin-top: 120px;
    margin-bottom: 40px;
    padding: 0 var(--brief-lg-padding);
  }
}

// 中屏专属（768px - 1279px，替换CSS变量为具体数值）
@media (max-width: 1279px) and (min-width: 768px) {
  .work-brief-outer-wrapper {
    margin-top: 100px;
    margin-bottom: 30px;
    padding: 0 var(--brief-md-padding);
  }
}

// 小屏专属（≤767px，替换CSS变量为具体数值）
@media (max-width: 767px) {
  .work-brief-outer-wrapper {
    margin-top: 80px;
    margin-bottom: 20px;
    padding: 0 var(--brief-sm-padding);
  }
}
</style>