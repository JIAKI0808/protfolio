<script setup>
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';

// 定义响应式数据：屏幕尺寸判断
const isMobile = ref(false);
const isTablet = ref(false);
const isLargeDesktop = ref(false);

// 检测屏幕尺寸
const checkScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width < 1280;
  isLargeDesktop.value = width >= 1280;
};

// 新增：页面回到顶部的核心方法（无动画，瞬间跳转）
const scrollToTop = () => {
  // 直接跳转顶部，取消平滑动画（核心修改）
  window.scrollTo(0, 0);
  // 兜底方案：兼容不同浏览器的滚动方式
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

// ========== 新增：移动端图片放大功能 ==========
const showImgPreview = ref(false); // 是否显示放大预览弹窗
const previewImgUrl = ref(''); // 预览图片的地址

// 点击图片放大（仅移动端生效）
const handleImgClick = (imgUrl) => {
  if (isMobile.value) {
    previewImgUrl.value = imgUrl;
    showImgPreview.value = true;
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
  }
};

// 关闭图片预览弹窗
const closeImgPreview = () => {
  showImgPreview.value = false;
  previewImgUrl.value = '';
  // 恢复页面滚动
  document.body.style.overflow = 'auto';
};
// ========== 新增结束 ==========

// 页面挂载和窗口变化时检测
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  // 挂载时强制回到顶部（首次进入页面）
  scrollToTop();
  // 额外保障：延迟执行一次，避免异步渲染导致的失效
  setTimeout(scrollToTop, 0);
});

// 新增：页面更新时也回到顶部（路由复用/组件刷新场景）
onUpdated(() => {
  scrollToTop();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  // 组件卸载时恢复页面滚动
  document.body.style.overflow = 'auto';
});

// 作品集图片数据
import haopingo01 from '../../assets/image/beforeworks2/02耗品go-1.png';
import haopingo02 from '../../assets/image/beforeworks2/02耗品go-2.png';
import haopingo03 from '../../assets/image/beforeworks2/02耗品go-3.png';
import haopingo04 from '../../assets/image/beforeworks2/02耗品go-4.png';
import haopingo05 from '../../assets/image/beforeworks2/02耗品go-5.png';
import haopingo06 from '../../assets/image/beforeworks2/02耗品go-6.png';
import haopingo07 from '../../assets/image/beforeworks2/02耗品go-7.png';

const workGalleryData = ref([
  { imgUrl: haopingo01, alt: '作品集展示图片1' },
  { imgUrl: haopingo02, alt: '作品集展示图片2' },
  { imgUrl: haopingo03, alt: '作品集展示图片3' },
  { imgUrl: haopingo04, alt: '作品集展示图片4' },
  { imgUrl: haopingo05, alt: '作品集展示图片5' },
  { imgUrl: haopingo06, alt: '作品集展示图片6' },
  { imgUrl: haopingo07, alt: '作品集展示图片7' },
]);
</script>

<template>
  <!-- 作品集核心容器：承载全局居中布局 -->
  <section class="work-gallery-container">
    <!-- 作品集列表：直接承载图片，无多余嵌套 -->
    <div class="work-gallery-list">
      <!-- 核心修复：将img标签改为Vue推荐的无闭合符写法，避免/>被解析为文本 -->
      <div class="work-img-item" v-for="(work, index) in workGalleryData" :key="index">
        <img
            :src="work.imgUrl"
            :alt="work.alt"
            class="work-img"
            loading="lazy"
            @click="handleImgClick(work.imgUrl)"
        >
      </div>
    </div>
  </section>

  <!-- 新增：移动端图片放大预览弹窗 -->
  <div
      v-if="showImgPreview"
      class="img-preview-modal"
      @click="closeImgPreview"
  >
    <img
        :src="previewImgUrl"
        alt="放大预览图"
        class="preview-img"
        @click.stop
    >
    <div class="close-btn" @click="closeImgPreview">×</div>
  </div>
</template>

<style scoped>
/* 核心容器：彻底清除内外边距，添加全局居中兜底，消除左侧留白 */
.work-gallery-container {
  width: 100%; /* 全屏宽度，无宽度约束 */
  min-height: auto;
  background-color: #ffffff;
  padding: 40px 0; /* 仅保留上下内边距，左右为0 */
  margin: 0; /* 补全你原代码中缺失的闭合，彻底清除默认外边距 */
  box-sizing: border-box;
  /* 全局居中配置，既保证子元素居中，又不产生多余留白 */
  display: flex;
  flex-direction: column; /* 垂直布局，与图片列表方向一致 */
  align-items: center; /* 水平居中（解决图片不居中、左侧留白问题） */
  justify-content: flex-start; /* 垂直靠上，不影响上下间距 */
}

/* 作品集列表：全屏适配，继承居中属性，添加图片间距（核心修改） */
.work-gallery-list {
  width: 100%; /* 继承容器宽度，无宽度约束 */
  display: flex;
  flex-direction: column; /* 垂直顺排 */
  gap: 24px; /* 大屏默认图片间距（核心：统一控制图片间间隔） */
  box-sizing: border-box;
  margin: 0; /* 彻底清除左侧/右侧外边距 */
  padding: 0; /* 彻底清除左侧/右侧内边距 */
  /* 继承容器居中属性，确保内部元素无偏移 */
  align-items: center;
  /* 双重保障：清除所有文本相关的默认样式 */
  font-size: 0;
  line-height: 0;
  letter-spacing: 0;
  word-spacing: 0;
}

/* 单个图片项：清除所有间距，确保图片无偏移 */
.work-img-item {
  width: 100%; /* 继承列表宽度，全屏展示 */
  box-sizing: border-box;
  margin: 0; /* 彻底清除左侧残留间距（关键） */
  padding: 0; /* 彻底清除左侧残留内边距 */
  /* 确保图片容器居中，无左右偏移 */
  text-align: center;
  /* 恢复基础文本样式，不影响子元素 */
  font-size: 16px;
  line-height: 1;
}

/* 作品集图片：全屏居中，无任何留白，高度自适应 */
.work-img {
  width: 100%; /* 全屏宽度，跟随父元素 */
  height: auto; /* 高度自适应，保持原始比例 */
  display: block; /* 去除行内元素默认偏移 */
  object-fit: contain; /* 保持图片完整显示，不裁剪 */
  box-sizing: border-box;
  margin: 0 auto; /* 图片自身水平居中（兜底，消除左侧偏移） */
  padding: 0; /* 清除图片默认内边距 */
  cursor: pointer; /* 移动端点击提示 */
}

/* 响应式适配：中屏（768px-1279px）- 调整间距，保持适配 */
@media (max-width: 1279px) and (min-width: 768px) {
  .work-gallery-container {
    padding: 48px 0; /* 仅调整上下内边距 */
  }
  .work-gallery-list {
    gap: 20px; /* 中屏图片间距略小 */
  }
}

/* 响应式适配：小屏（<768px）- 更小的间距，适配手机 */
@media (max-width: 767px) {
  .work-gallery-container {
    padding: 32px 0; /* 仅调整上下内边距 */
  }
  .work-gallery-list {
    gap: 16px; /* 小屏图片间距进一步缩小，适配窄屏 */
  }
  .work-img {
    max-width: 100%; /* 确保小屏图片不溢出，居中显示 */
    margin: 0 auto; /* 兜底居中，消除左侧偏移 */
  }
}

/* 响应式适配：核心大屏（≥1280px）- 全屏显示，间距保持默认 */
@media (min-width: 1280px) {
  .work-gallery-container {
    padding: 0 0;
    /* 核心修改1：删除固定宽度1280px，释放为全屏宽度 */
    width: 100%;
    /* 核心修改2：删除margin: 0 auto（无需居中约束，保持全屏） */
    margin: 0;
  }
  /* 图片及容器继承全屏宽度，无约束，实现大屏全屏展示 */
  .work-gallery-list, .work-img-item, .work-img {
    width: 100%;
    margin: 0; /* 取消居中外边距，跟随父元素全屏 */
  }
  /* 大屏间距保持默认24px，如需调整可在此修改 */
  .work-gallery-list {
    gap: 24px;
  }
  /* 可选：若想图片保持最大清晰度，不超出原始尺寸，可添加最大宽度（按需删除） */
  /* .work-img {
    max-width: 100%; // 或设置为图片原始宽度，如max-width: 2560px;
  } */
}

/* 兜底：清除全局可能的左侧偏移+文本残留（避免外部样式影响） */
:global(*) {
  margin-left: 0;
  padding-left: 0;
  box-sizing: border-box;
  /* 新增：清除所有文本间距，彻底杜绝符号/空白显示 */
  font-size: inherit;
  line-height: inherit;
  letter-spacing: 0;
  word-spacing: 0;
}

/* 新增：图片放大预览样式 */
.img-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.close-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 仅在非移动端隐藏弹窗 */
@media (min-width: 768px) {
  .img-preview-modal {
    display: none !important;
  }
}
</style>