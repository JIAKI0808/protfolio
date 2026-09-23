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

// 页面回到顶部的核心方法
const scrollToTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

// 移动端图片放大功能（修复语法错误）
const showImgPreview = ref(false);
const previewImgUrl = ref('');

// 点击图片放大（仅移动端生效）
const handleImgClick = (imgUrl) => {
  if (isMobile.value) {
    previewImgUrl.value = imgUrl;
    showImgPreview.value = true;
    document.body.style.overflow = 'hidden';
  }
};

// 关闭图片预览弹窗
const closeImgPreview = () => {
  showImgPreview.value = false;
  previewImgUrl.value = '';
  document.body.style.overflow = 'auto';
};

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
  document.body.style.overflow = 'auto';
});

// 作品集图片数据（保留你的原有数据，注意图片路径正确性）
import shangxie01 from '../../assets/image/beforeworks1/01商协-1.png';
import shangxie02 from '../../assets/image/beforeworks1/01商协-2.png';
import shangxie03 from '../../assets/image/beforeworks1/01商协-3.png';
import shangxie04 from '../../assets/image/beforeworks1/01商协-4.png';
import shangxie05 from '../../assets/image/beforeworks1/01商协-5.png';
import shangxie06 from '../../assets/image/beforeworks1/01商协-6.png';
import shangxie07 from '../../assets/image/beforeworks1/01商协-7.png';
import shangxie08 from '../../assets/image/beforeworks1/01商协-8.png';
import shangxie09 from '../../assets/image/beforeworks1/01商协-9.png';
import shangxie10 from '../../assets/image/beforeworks1/01商协-10.png';
import shangxie11 from '../../assets/image/beforeworks1/01商协-11.png';
import shangxie12 from '../../assets/image/beforeworks1/01商协-12.png';

const workGalleryData = ref([
  { imgUrl: shangxie01, alt: '作品集展示图片1' },
  { imgUrl: shangxie02, alt: '作品集展示图片2' },
  { imgUrl: shangxie03, alt: '作品集展示图片3' },
  { imgUrl: shangxie04, alt: '作品集展示图片4' },
  { imgUrl: shangxie05, alt: '作品集展示图片5' },
  { imgUrl: shangxie06, alt: '作品集展示图片6' },
  { imgUrl: shangxie07, alt: '作品集展示图片7' },
  { imgUrl: shangxie08, alt: '作品集展示图片8' },
  { imgUrl: shangxie09, alt: '作品集展示图片9' },
  { imgUrl: shangxie10, alt: '作品集展示图片10' },
  { imgUrl: shangxie11, alt: '作品集展示图片11' },
  { imgUrl: shangxie12, alt: '作品集展示图片12' },
]);
</script>

<template>
  <!-- 核心容器：确保基础结构存在 -->
  <section class="work-gallery-container">
    <div class="work-gallery-list">
      <div class="work-img-item" v-for="(work, index) in workGalleryData" :key="index">
        <img
            :src="work.imgUrl"
            :alt="work.alt"
            class="work-img"
            loading="lazy"
            @click="handleImgClick(work.imgUrl)"
        />
      </div>
    </div>
  </section>

  <!-- 修复：替换Teleport为普通弹窗，避免兼容问题 -->
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
/* 核心容器样式（恢复基础样式，确保显示） */
.work-gallery-container {
  width: 100%;
  min-height: 100vh; /* 新增：确保容器有高度，避免空白 */
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
}

.work-img-item {
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
}

.work-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
}

/* 响应式适配（保留原有逻辑） */
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
  .work-img {
    max-width: 100%;
    margin: 0 auto;
    cursor: pointer;
  }
}

@media (min-width: 1280px) {
  .work-gallery-container {
    padding: 0;
    width: 100%;
    margin: 0;
  }
  .work-gallery-list, .work-img-item, .work-img {
    width: 100%;
    margin: 0;
  }
  .work-gallery-list {
    gap: 24px;
  }
}

/* 兜底样式 */
:global(*) {
  margin-left: 0;
  padding-left: 0;
  box-sizing: border-box;
}

/* 图片放大弹窗样式（简化，避免冲突） */
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

/* 非移动端隐藏弹窗 */
@media (min-width: 768px) {
  .img-preview-modal {
    display: none !important;
  }
}
</style>