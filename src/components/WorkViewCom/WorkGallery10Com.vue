<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const showImgPreview = ref(false);
const previewImgUrl = ref('');

const handleImgClick = (imgUrl) => {
  if (isMobile.value) {
    previewImgUrl.value = imgUrl;
    showImgPreview.value = true;
    document.body.style.overflow = 'hidden';
  }
};

const closeImgPreview = () => {
  showImgPreview.value = false;
  previewImgUrl.value = '';
  document.body.style.overflow = 'auto';
};

import xiansuo1 from '../../assets/image/worksxiansuo/线索1.png';
import xiansuo2 from '../../assets/image/worksxiansuo/线索2.png';
import xiansuo3 from '../../assets/image/worksxiansuo/线索3.png';

const workGalleryData = ref([
  { imgUrl: xiansuo1, alt: '线索作品展示图1' },
  {
    imgUrl: xiansuo2,
    alt: '常规项目引入 AI：新的交付方式',
    externalUrl: 'https://jiaki0808.github.io/used-car-leads-handoff/'
  },
  { imgUrl: xiansuo3, alt: '线索作品展示图3' },
]);
</script>

<template>
  <section class="work-gallery-container" id="work-top">
    <div class="work-gallery-list">
      <div class="work-img-item" v-for="(work, index) in workGalleryData" :key="index">
        <a
            v-if="work.externalUrl"
            :href="work.externalUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="work-img-link"
            :aria-label="`${work.alt}（在新标签页打开演示）`"
        >
          <img :src="work.imgUrl" :alt="work.alt" class="work-img" loading="lazy" />
        </a>
        <img
            v-else
            :src="work.imgUrl"
            :alt="work.alt"
            class="work-img"
            loading="lazy"
            @click="handleImgClick(work.imgUrl)"
        />
      </div>
    </div>
  </section>

  <teleport to="body">
    <div v-if="showImgPreview" class="img-preview-modal" @click="closeImgPreview">
      <img :src="previewImgUrl" alt="放大预览图" class="preview-img" @click.stop />
      <div class="close-btn" @click="closeImgPreview">×</div>
    </div>
  </teleport>
</template>

<style scoped>
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
.work-img-link {
  width: 100%;
  display: block;
  text-decoration: none;
}
.work-img-link .work-img {
  cursor: pointer;
}
.work-img-link:focus-visible {
  outline: 3px solid #14cfe4;
  outline-offset: 4px;
}
@media (max-width: 767px) { .work-gallery-container { padding: 32px 0; } }
@media (max-width: 1279px) and (min-width: 768px) { .work-gallery-container { padding: 48px 0; } }
@media (min-width: 1280px) and (max-width: 1919px) {
  .work-gallery-container { padding: 0; }
  .work-gallery-list { width: 100%; margin: 0; }
  .work-img-item { width: 100%; max-width: 1448px; margin: 0 auto !important; }
}
@media (min-width: 1920px) {
  .work-gallery-container { padding: 0; }
  .work-gallery-list { width: 100%; margin: 0; }
  .work-img-item { width: 100%; max-width: 1448px; margin: 0 auto !important; }
}
:global(*) { margin-left: 0; padding-left: 0; box-sizing: border-box; }
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
.preview-img { max-width: 100%; max-height: 100%; object-fit: contain; }
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
@media (min-width: 768px) { .img-preview-modal { display: none !important; } }
</style>
