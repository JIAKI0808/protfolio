<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

// 原有代码：屏幕尺寸判断
const isMobile = ref(false);
const isTablet = ref(false);
const isLargeDesktop = ref(false);
const isXLDesktop = ref(false);

const checkScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width < 1280;
  isLargeDesktop.value = width >= 1280 && width < 1920;
  isXLDesktop.value = width >= 1920;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  // 原有：页面挂载后强制滚动到顶部
  nextTick(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

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

// 原有代码：图片/视频导入
import blender1 from '../../assets/image/works7/06blender 1.png';
import blender2 from '../../assets/image/works7/06blender 2.png';
import blender3 from '../../assets/image/works7/06blender 3.png';
import blender4 from '../../assets/image/works7/06blender 4.png';
import workVideo from '../../assets/video/07blender/fox_majic.mp4';

const workGalleryData = ref([
  { imgUrl: blender1, alt: '作品集展示图片1' },
  { imgUrl: blender2, alt: '作品集展示图片2' },
  { imgUrl: blender3, alt: '作品集展示图片3' },
  { imgUrl: blender4, alt: '作品集展示图片4（视频底图）' },
]);
</script>

<template>
  <!-- 原有容器：保留id和所有逻辑 -->
  <section class="work-gallery-container" id="work-top">
    <div class="work-gallery-list">
      <!-- 前3张图片：添加点击放大事件 -->
      <div class="work-img-item" v-for="(work, index) in workGalleryData.slice(0, 3)" :key="index">
        <img
            :src="work.imgUrl"
            :alt="work.alt"
            class="work-img"
            loading="lazy"
            @click="handleImgClick(work.imgUrl)"
        />
      </div>

      <!-- 第4张图 + 视频组合：给底图添加点击放大事件 -->
      <div class="work-video-bg-wrapper" v-if="workGalleryData.length >= 4">
        <img
            :src="workGalleryData[3].imgUrl"
            :alt="workGalleryData[3].alt"
            class="work-bg-img"
            loading="lazy"
            @click="handleImgClick(workGalleryData[3].imgUrl)"
        />
        <div class="work-video-float-wrapper">
          <video
              :src="workVideo"
              class="work-video"
              controls
              preload="metadata"
              playsinline
              poster=""
              style="z-index: 10;"
              @click.stop
          >
          您的浏览器不支持HTML5视频播放，请升级浏览器
          </video>
        </div>
      </div>
    </div>
  </section>

  <!-- ========== 新增：移动端图片放大预览弹窗 ========== -->
  <teleport to="body">
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
  </teleport>
  <!-- ========== 新增结束 ========== -->
</template>

<style scoped>
/* 原有样式全部保留，新增scroll-margin-top */
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
  scroll-margin-top: 0 !important;
}

.work-gallery-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  align-items: center;
}

.work-img-item {
  width: 100%;
  max-width: 1448px;
  box-sizing: border-box;
  margin: 0 auto !important;
  padding: 0;
  text-align: center;
}

.work-img {
  width: 100%;
  height: auto !important;
  min-height: 100px;
  display: block !important;
  object-fit: contain;
  box-sizing: border-box;
  margin: 0 auto !important;
  padding: 0;
}

.work-video-bg-wrapper {
  width: 100%;
  max-width: 1448px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  overflow: visible !important;
  z-index: 1;
  margin-top: 0px;
  margin-bottom: 0px;
}

.work-bg-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.work-video-float-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 80%;
  max-width: 1448px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}

.work-video {
  width: 100%;
  height: auto !important;
  max-height: 80vh;
  object-fit: contain;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  display: block !important;
}

/* 原有响应式适配样式全部保留 */
@media (max-width: 767px) {
  .work-gallery-container {
    padding: 32px 0;
  }
  .work-video-float-wrapper {
    top: 75%;
    left: 50%;
    width: 75%;
  }
}

@media (max-width: 1279px) and (min-width: 768px) {
  .work-gallery-container {
    padding: 48px 0;
  }
  .work-video-float-wrapper {
    top: 75%;
    left: 50%;
    width: 75%;
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .work-gallery-container {
    padding: 0;
  }
  .work-gallery-list {
    width: 100%;
    margin: 0;
  }
  .work-img-item {
    width: 100%;
    max-width: 1448px;
    margin: 0 auto !important;
  }
  .work-video-float-wrapper {
    top: 75%;
    left: 50%;
    width: 75%;
  }
}

@media (min-width: 1920px) {
  .work-gallery-container {
    padding: 0;
  }
  .work-gallery-list {
    width: 100%;
    margin: 0;
  }
  .work-img-item {
    width: 100%;
    max-width: 1448px;
    margin: 0 auto !important;
  }
  .work-video-float-wrapper {
    top: 75%;
    left: 50%;
    width: 1000px;
    max-width: none;
  }
}

:global(*) {
  margin-left: 0;
  padding-left: 0;
  box-sizing: border-box;
}

/* ========== 新增：移动端图片放大预览样式 ========== */
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

/* 仅在非移动端隐藏弹窗，不影响大屏布局 */
@media (min-width: 768px) {
  .img-preview-modal {
    display: none !important;
  }
}
/* ========== 新增结束 ========== */
</style>