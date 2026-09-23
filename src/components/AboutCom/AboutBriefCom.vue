<script setup>
// 导入Vue3核心API（保留所有原始导入，无删减）
import { ref, onMounted, onUnmounted } from 'vue';
// 图片路径完全不变
import aboutbrief1 from '../../assets/image/aboutview/aboutbrief1.png';
import aboutbrief2 from '../../assets/image/aboutview/aboutbrief2.png';
import fallbackImage from '../../assets/image/fallback.png';
import helloHand from '../../assets/image/aboutview-decoration/image.png.png';
import helloH from '../../assets/image/aboutview-decoration/H.png';
import helloE from '../../assets/image/aboutview-decoration/e.png';
import helloL1 from '../../assets/image/aboutview-decoration/L.png';
import helloL2 from '../../assets/image/aboutview-decoration/L（1）.png';
import helloO from '../../assets/image/aboutview-decoration/o.png';
import helloBang from '../../assets/image/aboutview-decoration/!.png';

// 定义响应式数据：屏幕尺寸判断
const isMobile = ref(false);
const isTablet = ref(false);
// 新增：复制提示相关响应式数据
const copyTip = ref(''); // 复制提示文本
const showTip = ref(false); // 是否显示提示
const helloTransforms = ref({});
const helloPieces = [
  { id: 'h', src: helloH, label: 'H', left: 1.5, top: 18, width: 11 },
  { id: 'e', src: helloE, label: 'e', left: 17.5, top: 20, width: 10 },
  { id: 'l1', src: helloL1, label: '第一个 L', left: 31, top: 13, width: 10 },
  { id: 'l2', src: helloL2, label: '第二个 L', left: 40, top: 7, width: 10 },
  { id: 'o', src: helloO, label: 'o', left: 51, top: 29, width: 10 },
  { id: 'bang', src: helloBang, label: '感叹号', left: 64, top: 25, width: 7 },
  { id: 'hand', src: helloHand, label: '挥手图案', left: 72, top: 0, width: 27 },
];

const animateHelloPiece = (id) => {
  const rotate = (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 13);
  helloTransforms.value = {
    ...helloTransforms.value,
    [id]: { rotation: `${rotate}deg`, scale: 1.07 + Math.random() * 0.1 },
  };
};

const resetHelloPiece = (id) => {
  const next = { ...helloTransforms.value };
  delete next[id];
  helloTransforms.value = next;
};

// 检测屏幕尺寸，用于响应式布局适配
const checkScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768; // 移动端：小于768px
  isTablet.value = width >= 768 && width < 1200; // 平板端：768-1200px
};

// 页面挂载时检测一次，窗口大小变化时重新检测
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

// 组件卸载时移除监听（避免内存泄漏）
onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// 图片加载失败兜底函数（核心：解决图片加载失败导致的布局塌陷）
const handleImgError = (e, fallbackImg) => {
  e.target.src = fallbackImg; // 加载失败时替换为兜底图片
  e.target.alt = "兜底图片";
};

// 新增：点击复制功能核心函数
const copyToClipboard = async (text) => {
  try {
    // 提取纯文本（去掉前缀如"手机号："、"邮箱："）
    const pureText = text.split('：')[1] || text;
    // 调用浏览器剪贴板API复制
    await navigator.clipboard.writeText(pureText);
    // 显示复制成功提示
    copyTip.value = `已复制：${pureText}`;
    showTip.value = true;
    // 2秒后隐藏提示
    setTimeout(() => {
      showTip.value = false;
      copyTip.value = '';
    }, 2000);
  } catch (err) {
    // 兼容旧浏览器/复制失败的情况
    copyTip.value = '复制失败，请手动复制';
    showTip.value = true;
    setTimeout(() => {
      showTip.value = false;
      copyTip.value = '';
    }, 2000);
    console.error('复制失败:', err);
  }
};

// 个人简介数据（保留所有原始字段）
const aboutData = ref({
  leftImage: aboutbrief1,
  topRightImage: aboutbrief2,
  fallbackImage: fallbackImage,
  intro: {
    content: [
      '· 拥有 6 年 UI 设计从业经验，热爱研究AI辅助UI设计，今年带领团队成员全面普及codex等AI产品的使用；深耕电商 / 产品视觉领域，持续关注全球前沿电商设计趋势与用户体验创新，始终以业务转化为核心驱动设计。具备从 0-1 主导电商产品、活动页面、店铺视觉等完整项目设计能力，独立完成需求分析、用户调研、原型输出、视觉落地到全流程交付，打造多个高转化、贴合电商业务目标的优质设计方案。',
      '· 工具技能全面扎实，熟练掌握 Figma、即时设计等协同设计工具，以及 PS、AI、AE 等电商视觉常用软件；主动拥抱 AI 工具赋能设计，高效完成创意生成、素材处理、页面快速迭代等工作，大幅提升电商设计落地效率与视觉表现力。',
      '· 秉持细节至上与商业价值并重的设计理念，极致打磨 UI/UX 细节，追求像素级视觉呈现与顺滑交互体验，坚信优质电商设计不仅提升品牌质感与页面颜值，更能降低用户决策成本、提升转化效率，直接为业务创造增量价值。',
    ],
    skills: ['手机号：15338727630', '微信：Naisinie']
  }
});
</script>

<template>
  <!-- 核心容器：调整顶部padding，让左侧图片紧贴导航栏 -->
  <section class="about-container">
    <!-- 布局容器：限制最大宽度，左右边距保留 -->
    <div class="about-layout-wrapper">
      <!-- 内容包装器：左右等高布局（保留原始逻辑） -->
      <div class="about-content-wrapper">
        <!-- 左侧：4:5比例图片 - 紧贴导航栏 -->
        <div class="about-left">
          <div class="image-box ratio-4-5">
            <img
                :src="aboutData.leftImage"
                alt="个人形象/代表图"
                class="img-fit"
                loading="lazy"
                @error="handleImgError($event, aboutData.fallbackImage)"
            />
          </div>
        </div>

        <!-- 右侧：上3:1图片 + 下简介 - 保留与导航栏的间距 -->
        <div class="about-right">
          <!-- 右侧顶部：3:1比例图片 -->
          <div class="about-right-top">
            <div class="image-box ratio-3-1">
              <div class="hello-art" role="group" aria-label="Hello 装饰插画">
                <button
                  v-for="piece in helloPieces"
                  :key="piece.id"
                  type="button"
                  class="hello-piece"
                  :aria-label="piece.label"
                  :style="{ left: piece.left + '%', top: piece.top + '%', width: piece.width + '%' }"
                  @pointerenter="animateHelloPiece(piece.id)"
                  @pointerleave="resetHelloPiece(piece.id)"
                  @focus="animateHelloPiece(piece.id)"
                  @blur="resetHelloPiece(piece.id)"
                  @click="animateHelloPiece(piece.id)"
                >
                  <img :src="piece.src" alt="" draggable="false" :style="{ '--hello-rotation': helloTransforms[piece.id]?.rotation || '0deg', '--hello-scale': helloTransforms[piece.id]?.scale || 1 }">
                </button>
              </div>
              <img
                  :src="aboutData.topRightImage"
                  alt="banner/作品合集图"
                  class="img-fit"
                  loading="lazy"
                  @error="handleImgError($event, aboutData.fallbackImage)"
              />
            </div>
          </div>

          <!-- 右侧底部简介 -->
          <div class="about-right-bottom">
            <div class="intro-content">
              <p v-for="(para, index) in aboutData.intro.content" :key="index">{{ para }}</p>
            </div>
            <!-- 新增：复制提示框 -->
            <div class="copy-tip" v-if="showTip">{{ copyTip }}</div>
            <!-- 技能标签：添加点击事件 -->
            <div class="skills-tag">
              <span
                  v-for="(skill, index) in aboutData.intro.skills"
                  :key="index"
                  class="tag"
                  @click="copyToClipboard(skill)"
                  style="cursor: pointer;"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 核心容器：【重点修改区1】移除强制100vh高度，改为自适应 + 最小高度（可手动调整） */
.about-container {
  width: 100%;
  /* 1. 移除min-height: 100vh（强制占满视口导致留白） */
  /* 2. 设置最小高度为内容兜底值，可手动调整（比如600px/800px） */
  min-height: 600px; /* 【手动调整这里】内容少时的最小高度，值越小留白越少 */
  background-color: #ffffff;
  /* 3. 底部padding可手动调整，控制最下方留白（当前72px，改小如32px） */
  padding: 0 0 32px 0; /* 【手动调整这里】底部间距，比如20px/32px/48px */
  margin: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

/* 布局容器：保留原始左右边距逻辑 */
.about-layout-wrapper {
  width: calc(100% - 200px); /* 左右各100px边距 */
  max-width: 1400px; /* 限制最大宽度 */
  box-sizing: border-box;
}

/* 内容包装器：保留原始网格布局，调整对齐方式 */
.about-content-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 4fr 6fr; /* 左侧4份，右侧6份 */
  grid-template-rows: auto;
  gap: 96px; /* 左右元素间距 */
  align-items: start; /* 避免强制等高导致塌陷 */
  box-sizing: border-box;
}

/* 左侧图片区域：紧贴导航栏，无顶部间距 */
.about-left {
  width: 100%;
  min-height: 400px; /* 防止塌陷 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 0; /* 核心：无顶部间距，紧贴导航栏 */
  padding-top: 0;
}

/* 右侧区域：保留与导航栏的间距，适配所有屏幕 */
.about-right {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  min-height: 400px; /* 防止塌陷 */
  margin-top: 72px; /* 大屏：右侧与导航栏的间距 */
}

/* 4:5比例容器：移除投影 + 保留核心样式 */
.ratio-4-5 {
  width: 100%;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  /* 移除投影：删除原box-shadow */
  padding-top: 125%; /* 4:5比例 */
  height: auto;
  min-height: 300px; /* 防止塌陷 */
}

/* 3:1比例容器：移除投影 + 保留核心样式 */
.ratio-3-1 {
  width: 100%;
  position: relative;
  padding-top: 33.333%; /* 3:1比例 */
  border-radius: 16px;
  overflow: hidden;
  /* 移除投影：删除原box-shadow */
  min-height: 100px; /* 防止塌陷 */
}

/* 图片适配：保留原始样式，确保显示 */
.img-fit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  background-color: #f5f5f5; /* 图片加载前显示背景色，避免空白 */
}

.hello-art { position:absolute; inset:0; overflow:visible; }
.hello-piece { position:absolute; display:block; padding:0; border:0; background:transparent; line-height:0; cursor:pointer; z-index:2; }
.hello-piece img { display:block; width:100%; height:auto; pointer-events:none; transform:rotate(var(--hello-rotation)) scale(var(--hello-scale)); transform-origin:center; transition:transform .36s cubic-bezier(.2,.8,.25,1.3); }
.hello-piece:focus-visible { outline:2px dashed #f6056b; outline-offset:3px; border-radius:8px; }
.ratio-3-1 > .img-fit { z-index:1; }
.hello-art + .img-fit { opacity:0; }

/* 右侧顶部图片容器：保留原始样式 */
.about-right-top {
  width: 100%;
  flex: 0 0 auto;
  box-sizing: border-box;
}

/* 右侧底部简介：保留原始样式 */
.about-right-bottom {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  position: relative; /* 新增：为复制提示框定位 */
}

/* 简介文本样式：保留原始样式 */
.intro-content {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: #444;
  margin-bottom: 15px;
}

.intro-content p {
  margin: 0 0 8px 0;
}

/* 新增：复制提示框样式 */
.copy-tip {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 16px;
  background-color: rgb(255, 19, 110);
  color: #ffffff;
  border-radius: 20px;
  font-size: 14px;
  z-index: 999;
  animation: fadeInOut 2s ease;
}

/* 新增：提示框动画 */
@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 10px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 10px); }
}

/* 技能标签样式：保留原始样式 + 优化点击交互 */
.skills-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background-color: #f8f9fa;
  color: #2c3e50;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  /* 新增：点击样式优化 */
  user-select: none; /* 禁止文本选中 */
}

.tag:hover {
  background-color: #ff136e;
  color: #fff;
  /* 新增：hover效果强化 */
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* 平板端适配（768-1200px） */
@media (max-width: 1200px) {
  .about-layout-wrapper {
    width: calc(100% - 80px); /* 左右各40px边距 */
  }

  .about-content-wrapper {
    grid-template-columns: 1fr; /* 上下布局 */
    grid-template-rows: auto auto;
    gap: 0; /* 左侧无间距，右侧间距通过margin-top控制 */
    align-items: start;
  }

  /* 平板端：右侧与导航栏的间距适配 */
  .about-right {
    margin-top: 48px;
    min-height: 250px;
  }

  .ratio-4-5 {
    min-height: 250px;
  }

  .ratio-3-1 {
    min-height: 80px;
  }

  .intro-content {
    font-size: 15px;
  }

  .tag {
    font-size: 13px;
  }

  /* 平板端复制提示框适配 */
  .copy-tip {
    font-size: 13px;
    padding: 5px 14px;
    bottom: 65px;
  }
}

/* 移动端适配（小于768px） */
@media (max-width: 768px) {
  /* 【重点修改区2】移动端同步调整最小高度和底部padding */
  .about-container {
    min-height: 400px; /* 【手动调整这里】移动端最小高度，比如300px/400px */
    padding: 0 0 20px 0; /* 【手动调整这里】移动端底部间距，比如16px/20px */
  }

  .about-layout-wrapper {
    width: calc(100% - 40px); /* 左右各20px边距 */
  }

  .about-content-wrapper {
    grid-template-columns: 1fr; /* 上下布局 */
    grid-template-rows: auto auto;
    gap: 0;
    align-items: start;
  }

  /* 移动端：右侧与导航栏的间距适配 */
  .about-right {
    margin-top: 32px;
    min-height: 200px;
  }

  .ratio-4-5 {
    min-height: 200px;
  }

  .ratio-3-1 {
    min-height: 60px;
  }

  .hello-art { display:none; }
  .hello-art + .img-fit { opacity:1; }

  .intro-content {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .tag {
    padding: 3px 10px;
    font-size: 12px;
  }

  /* 移动端复制提示框适配 */
  .copy-tip {
    font-size: 12px;
    padding: 4px 12px;
    bottom: 60px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hello-piece img { transition:none; transform:none; }
}
</style>
