<script setup>
// 导入公共组件（与你的WorksView保持一致）
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from "../../components/FootCom.vue";
// 导入WorkGallery1Com（你的作品集1详情组件，替换为实际路径）
import WorkGallery2Com from '../../components/WorkViewCom/WorkGallery2Com.vue'
</script>

<template>
  <!-- 页面整体容器：继承WorksView的布局风格，开启flex兜底布局 -->
  <div class="work-page1-wrapper">
    <!-- 导航栏（复用公共组件，添加固定定位容器） -->
    <div class="navbar-fixed-wrapper">
      <NavbarCom />
    </div>

    <!-- 核心内容容器：实现三端适配，兼容你的页面宽度规范 -->
    <main class="work-page1-main">
      <div class="work-page1-content">
        <!-- 作品集1详情组件：WorkGallery1Com -->
        <WorkGallery2Com />
      </div>
    </main>

    <!-- 页脚（复用公共组件） -->
    <FootCom />
  </div>
</template>

<style scoped lang="scss">
// 页面全局容器：与WorksView保持一致，撑起全屏高度，开启flex布局兜底
.work-page1-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff; // 继承你的页面默认背景
  display: flex; // 新增：开启flex布局，解决子元素flex:1不生效问题
  flex-direction: column; // 新增：垂直布局，匹配导航-内容-页脚结构
  // 新增：给固定导航栏留出空间，避免内容被遮挡
  padding-top: var(--navbar-height, 80px); // 自定义变量，适配导航栏高度，可微调
}

// 新增：导航栏固定容器（核心：实现不跟随滚动）
.navbar-fixed-wrapper {
  position: fixed; // 固定定位，脱离文档流，不跟随页面滚动
  top: 0; // 固定在页面顶部
  left: 0; // 对齐页面左侧，无偏移
  right: 0; // 对齐页面右侧，全屏宽度
  z-index: 999; // 提高层级，避免被内容遮挡（关键）
  background-color: #ffffff; // 匹配页面背景，避免透明穿透
  box-sizing: border-box;
  // 可选：添加底部阴影，增强悬浮视觉效果
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

// 核心内容区域：隔离导航和页脚，实现自适应，flex:1生效
.work-page1-main {
  flex: 1; // 现在可正常生效，撑满导航和页脚之间的空间
  width: 100%;
  margin: 0; // 清除左右外边距
  padding: 32px 0px; // 仅保留上下内边距，左右为0（消除留白）
  box-sizing: border-box;
}

// 内容包装器：三端适配核心（两边留少量边距，居中显示）
.work-page1-content {
  // 大屏（≥1280px 且 <1920px）：留少量边距（左右各20px，总边距40px），居中显示
  width: calc(100% - 40px); // 核心修改：全屏宽度减去左右边距（可调整40px改变边距大小）
  max-width: 1920px; // 可选：限制最大宽度，避免超宽屏（如4K）图片过大模糊
  padding: 0;
  margin: 0 auto; // 核心：居中显示，边距对称分布在左右两侧
  box-sizing: border-box;
}

// 清除body默认样式（与WorksView保持一致）
:global(body) {
  margin: 0;
  padding: 0;
  // 新增：避免页面滚动时出现横向滚动条
  overflow-x: hidden;
}

// 导航栏样式兼容（与WorksView保持一致，确保固定后样式正常）
:global(.navbar) {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  // 确保导航栏内部元素不溢出
  max-width: 100%;
}

// 页脚样式兼容（复用公共样式）
:global(.foot) {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

// 【核心新增】超大屏专属（≥1920px，如4K屏、2K屏）：增加左右留白，优化布局美观度
@media (min-width: 1920px) {
  .work-page1-content {
    // 方案1：固定左右总边距（推荐，留白均匀且可控）
    width: calc(100% - 640px); // 左右各192px留白（总边距384px），可调整为200px/400px
    // 方案2：限制最大宽度+自动居中（留白随屏幕宽度增加而扩大，更适配超宽屏）
    // max-width: 1920px; // 固定内容最大宽度，超出部分自动转为左右留白
    // width: 100%;
    margin: 0 auto; // 保持居中，留白对称分布在两侧
  }

  .work-page1-main {
    padding: 48px 0; // 超大屏适当增加上下内边距，与左右留白呼应，更舒展
  }

  // 超大屏适配导航栏高度（可选，若需调整）
  .work-page1-wrapper {
    --navbar-height: 88px;
  }
}

// 响应式适配：大屏（≥1280px 且 <1920px）- 保留原有适配，不影响
@media (min-width: 1280px) and (max-width: 1919px) {
  .work-page1-content {
    width: calc(100% - 320px);
    max-width: 1920px;
    margin: 0 auto;
  }
}

// 响应式适配：中屏（768px-1279px）- 留少量边距（左右各16px，总边距32px）
@media (max-width: 1279px) and (min-width: 768px) {
  .work-page1-content {
    width: calc(100% - 32px); // 中屏边距略小，适配屏幕尺寸
    max-width: 100%;
    margin: 0 auto; // 居中显示，边距对称
  }

  .work-page1-main {
    padding: 24px 0; // 仅调整上下内边距，左右为0
  }

  // 中屏适配导航栏高度（可选，若导航栏在中屏高度变化）
  .work-page1-wrapper {
    --navbar-height: 70px;
  }
}

// 响应式适配：小屏（≤767px 且 >480px）- 留少量边距（左右各12px，总边距24px）
@media (max-width: 767px) and (min-width: 481px) {
  .work-page1-content {
    width: calc(100% - 24px); // 小屏边距更小，保证内容展示空间
    max-width: 100%;
    margin: 0 auto; // 居中显示，边距对称
  }

  .work-page1-main {
    padding: 16px 0; // 仅调整上下内边距，左右为0
  }

  // 小屏适配导航栏高度（可选，若导航栏在小屏高度变化）
  .work-page1-wrapper {
    --navbar-height: 60px;
  }
}

// 响应式适配：超小屏（≤480px）- 增加左右留白（原16px→32px），避免内容贴边
@media (max-width: 480px) {
  .work-page1-content {
    width: calc(100% - 32px); // 原16px总边距→32px总边距（左右各16px），留白更充足
    margin: 0 auto; // 居中显示，边距对称
  }

  .work-page1-main {
    padding: 12px 0; // 适当减少上下内边距，平衡布局
  }

  // 超小屏适配导航栏高度（可选）
  .work-page1-wrapper {
    --navbar-height: 50px;
  }
}
</style>