<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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

// 页面挂载和窗口变化时检测
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
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

// 作品集图片数据
import houtai01 from '../../assets/image/works3/03后台管理 1.png';
import houtai02 from '../../assets/image/works3/03后台管理 2.png';
import houtai03 from '../../assets/image/works3/03后台管理 3.png';
import houtai04 from '../../assets/image/works3/03后台管理 4.png';

const workGalleryData = ref([
  { imgUrl: houtai01, alt: '作品集展示图片1' },
  { imgUrl: houtai02, alt: '作品集展示图片2' },
  { imgUrl: houtai03, alt: '作品集展示图片3' },
  { imgUrl: houtai04, alt: '作品集展示图片4' },
]);
</script>

<template>
  <!-- 作品集核心容器：承载全局居中布局 -->
  <section class="work-gallery-container">
    <!-- 作品集列表：直接承载图片，无多余嵌套 -->
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

/* 作品集列表：全屏适配，继承居中属性，无任何残留间距 */
.work-gallery-list {
  width: 100%; /* 继承容器宽度，无宽度约束 */
  display: flex;
  flex-direction: column; /* 垂直顺排 */
  gap: 0; /* 强制0间距，无图片间留白 */
  box-sizing: border-box;
  margin: 0; /* 彻底清除左侧/右侧外边距 */
  padding: 0; /* 彻底清除左侧/右侧内边距 */
  /* 继承容器居中属性，确保内部元素无偏移 */
  align-items: center;
}

/* 单个图片项：清除所有间距，确保图片无偏移 */
.work-img-item {
  width: 100%; /* 继承列表宽度，全屏展示 */
  box-sizing: border-box;
  margin: 0; /* 彻底清除左侧残留间距（关键） */
  padding: 0; /* 彻底清除左侧残留内边距 */
  /* 确保图片容器居中，无左右偏移 */
  text-align: center;
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
}

/* 响应式适配：中屏+过渡屏（768px-1279px）- 无留白，居中对齐 */
@media (max-width: 1279px) and (min-width: 768px) {
  .work-gallery-container {
    padding: 48px 0; /* 仅调整上下内边距 */
  }
  /* 所有元素保持100%宽度+居中，无左侧留白 */
}

/* 响应式适配：小屏（<768px）- 无留白，居中对齐 */
@media (max-width: 767px) {
  .work-gallery-container {
    padding: 32px 0; /* 仅调整上下内边距 */
  }
  .work-img {
    max-width: 100%; /* 确保小屏图片不溢出，居中显示 */
    margin: 0 auto; /* 兜底居中，消除左侧偏移 */
  }
}

/* 响应式适配：核心大屏（≥1280px）- 全屏显示，解决图片偏小问题 */
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
  /* 可选：若想图片保持最大清晰度，不超出原始尺寸，可添加最大宽度（按需删除） */
  /* .work-img {
    max-width: 100%; // 或设置为图片原始宽度，如max-width: 2560px;
  } */
}

/* 兜底：清除全局可能的左侧偏移（避免外部样式影响） */
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

/* 仅在非移动端隐藏弹窗 */
@media (min-width: 768px) {
  .img-preview-modal {
    display: none !important;
  }
}
/* ========== 新增结束 ========== */
</style>