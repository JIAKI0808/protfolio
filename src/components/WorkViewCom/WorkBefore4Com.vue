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

// 页面回到顶部的核心方法（无动画，瞬间跳转）
const scrollToTop = () => {
  window.scrollTo(0, 0);
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
  scrollToTop();
  setTimeout(scrollToTop, 0);
});

onUpdated(() => {
  scrollToTop();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  // 组件卸载时恢复页面滚动
  document.body.style.overflow = 'auto';
});

// 作品集图片数据
import yundong01 from '../../assets/image/beforeworks4/04每日运动-1.png';
// import yundong02 from '../../assets/image/beforeworks4/04每日运动-2.png';
// import yundong03 from '../../assets/image/beforeworks4/04每日运动-3.png';
// import yundong04 from '../../assets/image/beforeworks4/04每日运动-4.png';
// import yundong05 from '../../assets/image/beforeworks4/04每日运动-5.png';
// import yundong06 from '../../assets/image/beforeworks4/04每日运动-6.png';

// 核心修改：用import方式引入视频（解决Vue资源解析问题）
import videoFile from '../../assets/video/beforeworks4/yundongvideo.mp4';

const workGalleryData = ref([
  // { imgUrl: yundong01, alt: '作品集展示图片1' },
  // { imgUrl: yundong02, alt: '作品集展示图片2' },
  // { imgUrl: yundong03, alt: '作品集展示图片3' },
  // { imgUrl: yundong04, alt: '作品集展示图片4' },
  // { imgUrl: yundong05, alt: '作品集展示图片5' },
  // { imgUrl: yundong06, alt: '作品集展示图片6' },
]);

// 视频路径改为import引入的变量
const videoUrl = videoFile;
</script>

<template>
  <section class="work-gallery-container">
    <div class="work-gallery-list">
      <!-- 图片列表（删除空白字符） -->
      <div class="work-img-item" v-for="(work, index) in workGalleryData" :key="index"><img
          :src="work.imgUrl"
          :alt="work.alt"
          class="work-img"
          loading="lazy"
          @click="handleImgClick(work.imgUrl)"
      /></div>
      <!-- 视频项 -->
      <div class="work-video-item"><video
          class="work-video"
          controls
          preload="metadata"
          width="100%"
          height="auto"
          playsinline
      >
        <source :src="videoUrl" type="video/mp4">
        您的浏览器不支持HTML5视频播放，请升级浏览器后重试。
      </video></div>
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
    />
    <div class="close-btn" @click="closeImgPreview">×</div>
  </div>
</template>

<style scoped>
/* 原有样式保持不变 */
.work-gallery-container {
  width: 100%;
  min-height: auto;
  background-color: #ffffff;
  padding: 40px 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.work-gallery-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  align-items: center;
  font-size: 0; /* 关键：清除文本节点的默认字号，消除空白字符影响 */
  line-height: 0; /* 辅助：清除行高带来的额外间距 */
}

.work-img-item {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 16px; /* 恢复默认字号，避免影响子元素 */
  line-height: 1; /* 恢复默认行高 */
}

.work-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  cursor: pointer; /* 移动端点击提示 */
}

.work-video-item {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 16px; /* 恢复默认字号，避免影响子元素 */
  line-height: 1; /* 恢复默认行高 */
}

.work-video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  border-radius: 0;
  /* 新增：确保视频控件正常显示 */
  background-color: #f5f5f5;
}

/* 响应式适配 */
@media (max-width: 1279px) and (min-width: 768px) {
  .work-gallery-container {
    padding: 48px 0;
  }
  .work-gallery-list {
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .work-gallery-container {
    padding: 32px 0;
  }
  .work-gallery-list {
    gap: 16px;
  }
  .work-img, .work-video {
    max-width: 100%;
    margin: 0 auto;
  }
}

@media (min-width: 1280px) {
  .work-gallery-container {
    padding: 0 0;
    width: 100%;
    margin: 0;
  }
  .work-gallery-list, .work-img-item, .work-img, .work-video-item, .work-video {
    width: 100%;
    margin: 0;
  }
  .work-gallery-list {
    gap: 24px;
  }
}

:global(*) {
  margin-left: 0;
  padding-left: 0;
  box-sizing: border-box;
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