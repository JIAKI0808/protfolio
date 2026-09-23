<script setup>
import { reactive } from 'vue';
import hi from '../../assets/image/home-decoration/HI.png';
import j from '../../assets/image/home-decoration/J.png';
import i1 from '../../assets/image/home-decoration/I1.png';
import a from '../../assets/image/home-decoration/A.png';
import k from '../../assets/image/home-decoration/K.png';
import i2 from '../../assets/image/home-decoration/I2.png';
import sun from '../../assets/image/home-decoration/sun.png';
import egg from '../../assets/image/home-decoration/egg.png';
import pink from '../../assets/image/home-decoration/装饰1.png';
import green from '../../assets/image/home-decoration/装饰2.png';

// Coordinates on the supplied 1600 × 714 reference; PNGs retain their transparent padding.
const pieces = [
  { id: 'hi', src: hi, label: 'Hi! My name is…', x: 40, y: 44, width: 340 },
  { id: 'j', src: j, label: '字母 J', x: 268, y: 214, width: 207 },
  { id: 'i1', src: i1, label: '橙色字母 I', x: 474, y: 306, width: 155 },
  { id: 'a', src: a, label: '字母 A', x: 646, y: 250, width: 230 },
  { id: 'k', src: k, label: '字母 K', x: 895, y: 327, width: 260 },
  { id: 'i2', src: i2, label: '绿色字母 I', x: 1176, y: 261, width: 166 },
  { id: 'sun', src: sun, label: '小太阳', x: 1012, y: 28, width: 212 },
  { id: 'pink', src: pink, label: '粉色曲线', x: 1242, y: 150, width: 148 },
  { id: 'green', src: green, label: '绿色笔触', x: 96, y: 488, width: 242 },
  { id: 'egg', src: egg, label: '煎蛋小人', x: 1224, y: 402, width: 340 },
];
const transforms = reactive({});
function animatePiece(id) {
  const effect = Math.floor(Math.random() * 3);
  const rotation = (Math.random() < 0.5 ? -1 : 1) * (7 + Math.random() * 11);
  const scale = 1.08 + Math.random() * 0.08;
  transforms[id] = {
    '--piece-rotation': (effect === 1 ? 0 : rotation) + 'deg',
    '--piece-scale': effect === 0 ? 1 : scale,
  };
}
function resetPiece(id) {
  delete transforms[id];
}
</script>

<template>
  <!-- 首页简介容器 -->
  <section class="intro-section">
    <!-- 居中图片（移除16:9限制，按图片自身比例适配） -->
    <div class="intro-img-wrapper">
      <div class="intro-art" role="group" aria-label="JIAKI 互动插画">
        <button
          v-for="piece in pieces"
          :key="piece.id"
          type="button"
          class="intro-piece"
          :aria-label="piece.label"
          :style="{ left: piece.x / 1600 * 100 + '%', top: piece.y / 714 * 100 + '%', width: piece.width / 1600 * 100 + '%' }"
          @pointerenter="animatePiece(piece.id)"
          @pointerleave="resetPiece(piece.id)"
          @focus="animatePiece(piece.id)"
          @blur="resetPiece(piece.id)"
          @click="animatePiece(piece.id)"
        >
          <img :src="piece.src" alt="" draggable="false" :style="transforms[piece.id]" />
        </button>
      </div>
      <img src="../../assets/image/workview/workviewcover.png" alt="首页简介配图" class="intro-img" loading="lazy">
    </div>

    <!-- 文字内容区域 -->
    <div class="intro-text-wrapper">
      <h5 class="intro-title">Hi~我是余嘉琪</h5>
      <p class="intro-desc">
        6 年 UI 设计经验，深耕电商行业，精通从原型、交互到视觉落地的全流程设计，熟练掌握主流设计工具与 AI 辅助设计，擅长 AE 动效与 Blender 3D 建模渲染，助力产品视觉呈现与电商运营宣传。
      </p>
    </div>
  </section>
</template>

<style scoped>
/* 整体容器：【核心调整区1】大幅降低基础顶部padding，减少默认留白 */
.intro-section {
  width: 100%;
  max-width: 1280px;  /* 核心：大屏断点调整为1280px */
  margin: 0 auto;
  padding: 20px 20px 56px; /* 重点：top从56px→20px，bottom保留56px，左右20px */
  display: flex;
  flex-direction: column; /* 上下布局 */
  align-items: center;    /* 子元素水平居中 */
  text-align: center;     /* 文字居中 */
  box-sizing: border-box;
}

/* 图片容器：移除16:9限制，按图片自身比例适配，仅控制宽度和居中 */
.intro-img-wrapper {
  width: 100%;
  max-width: 1000px;  /* 图片最大宽度，可自主调整 */
  margin-bottom: 48px; /* 基础：图片与文字的间距，后续响应式调整 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 图片样式：按自身比例显示，适配容器宽度，保留圆角优化 */
.intro-img {
  width: 100%; /* 图片宽度撑满容器，高度自动按比例适配 */
  height: auto; /* 核心：高度自动，跟随图片原始比例 */
  border-radius: 40px; /* 基础圆角，后续响应式调整 */
  object-fit: cover;  /* 保持图片比例，避免拉伸（可选保留） */
  object-position: center; /* 居中显示，保留核心内容 */
}

/* 基础文字样式：大屏默认（≥1280px），后续响应式调整 */
.intro-title {
  font-size: 56px;  /* 大屏默认字号 */
  font-weight: 700;   /* 加粗 */
  color: #333;        /* 主色调，可替换 */
  margin: 0 0 24px 0; /* 标题与正文的间距，后续响应式调整 */
  line-height: 1.2;   /* 行高优化 */
}

.intro-desc {
  font-size: 24px;    /* 大屏默认字号 */
  color: #666;        /* 次要文字颜色 */
  line-height: 1.6;   /* 舒适的行高，后续响应式调整 */
  max-width: 800px;   /* 限制正文宽度，提升阅读体验，后续响应式调整 */
  margin: 0 auto;     /* 正文水平居中 */
}

/* 响应式适配1：大屏专属（≥1280px）- 【核心调整区2】降低顶部padding */
@media (min-width: 1280px) {
  .intro-section {
    padding: 16px 0 40px; /* 重点：top从40px→16px，bottom40px，左右0 */
    max-width: 1280px; /* 锁定大屏最大宽度，贴合断点 */
  }

  .intro-img-wrapper {
    max-width: 800px; /* 增大图片最大宽度，减少留白 */
    margin-bottom: 56px; /* 增大图片与文字间距，提升舒展度 */
  }

  .intro-img {
    border-radius: 48px; /* 增大圆角，适配大屏视觉 */
  }

  .intro-title {
    font-size: 56px; /* 适度放大标题字号，适配大屏 */
    margin-bottom: 32px; /* 增大标题与正文间距 */
  }

  .intro-desc {
    font-size: 20px; /* 适度放大描述字号，适配大屏 */
    max-width: 850px; /* 增大正文最大宽度，减少文字换行 */
    line-height: 1.7; /* 优化行高，提升阅读体验 */
  }
}

/* 响应式适配2：中屏（768px ≤ 宽度 < 1280px）- 【核心调整区3】降低顶部padding */
@media (max-width: 1279px) and (min-width: 768px) {
  .intro-section {
    padding: 16px 30px 24px; /* 重点：top从24px→16px，bottom24px，左右30px */
    max-width: 1000px; /* 缩小整体最大宽度，适配中屏 */
  }

  .intro-img-wrapper {
    max-width: 640px; /* 缩小图片最大宽度，适配中屏 */
    margin-bottom: 40px; /* 缩小图片与文字间距 */
  }

  .intro-img {
    border-radius: 32px; /* 缩小圆角，适配中屏视觉 */
  }

  .intro-title {
    font-size: 48px; /* 缩小标题字号，适配中屏 */
    margin-bottom: 20px; /* 缩小标题与正文间距 */
  }

  .intro-desc {
    font-size: 18px; /* 缩小描述字号，适配中屏 */
    max-width: 700px; /* 缩小正文最大宽度，适配中屏 */
    line-height: 1.5; /* 优化行高，节省空间 */
  }
}

/* 响应式适配3：小屏（< 768px）- 【核心调整区4】降低顶部padding至最小 */
@media (max-width: 767px) {
  .intro-section {
    padding: 12px 15px 24px; /* 重点：top从24px→12px，bottom24px，左右15px */
    max-width: 500px; /* 锁定小屏最大宽度，避免内容过宽 */
  }

  .intro-img-wrapper {
    max-width: 100%; /* 图片充满容器，适配小屏 */
    margin-bottom: 32px; /* 进一步缩小图片与文字间距 */
  }

  .intro-img {
    border-radius: 24px; /* 缩小圆角，适配手机视觉 */
  }

  .intro-title {
    font-size: 36px; /* 大幅缩小标题字号，适配手机 */
    margin-bottom: 16px; /* 大幅缩小标题与正文间距 */
    line-height: 1.1; /* 优化行高，节省空间 */
  }

  .intro-desc {
    font-size: 15px; /* 大幅缩小描述字号，适配手机 */
    max-width: 100%; /* 正文充满容器，适配小屏 */
    line-height: 1.4; /* 优化行高，提升阅读体验 */
  }
}
</style>
<style scoped>
/* Preserve the existing 800px / 640px art widths and mobile cover. */
.intro-img-wrapper { overflow: visible; }
.intro-art { position: relative; width: 100%; aspect-ratio: 1600 / 714; }
.intro-art + .intro-img { display: none; }
.intro-piece {
  position: absolute; display: block; padding: 0; margin: 0;
  border: 0; background: transparent; line-height: 0; cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.intro-piece img {
  display: block; width: 100%; height: auto; pointer-events: none;
  transform: rotate(var(--piece-rotation, 0deg)) scale(var(--piece-scale, 1));
  transition: transform 360ms cubic-bezier(.2,.8,.25,1.3);
  transform-origin: center;
}
.intro-piece:focus-visible { outline: 2px dashed #F6056B; outline-offset: 5px; border-radius: 12px; }
@media (max-width: 767px) {
  .intro-art { display: none; }
  .intro-art + .intro-img { display: block; }
  .intro-img-wrapper { overflow: hidden; }
}
@media (prefers-reduced-motion: reduce) {
  .intro-piece img { transition: none; transform: none; }
}
</style>
