<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from "../../components/FootCom.vue";
import BackTopBtnCom from "../../components/BackToTop.vue";

import cover7 from '../../assets/image/workview/cover7.png';
import beforecover4 from '../../assets/image/workview/beforecover4.png';
import xiansuocover from '../../assets/image/workview/xiansuocover.png';
import catWarehouseCover from '../../assets/image/workview/catwarehouse-vibe-coding-cover.png';
import aiPosterCover from '../../assets/image/works-ai-poster/ai-skill-poster-cover.png';

const worksList = ref([
  {
    imgUrl: aiPosterCover,
    title: '把审美写成 Skill｜AI 家居海报',
    desc: '将白底摄影、手绘小人与文案规则固化为可复用流程，批量生成统一而有故事感的家居海报。',
    path: '/work-page11',
    imageFit: 'contain',
    imageBackground: '#f4f0e8'
  },
  {
    imgUrl: catWarehouseCover,
    title: 'AI Vibe Coding 界面优化',
    desc: '以自然语言描述需求，由 Codex 快速生成初版界面，并通过多轮协作持续优化信息层级、视觉风格与交互体验，探索 AI 驱动的产品设计与开发流程。',
    externalUrl: 'https://jiaki0808.github.io/CatWarehouse/ui-preview/mobile-comparison/index.html',
    imageFit: 'contain'
  },
  {
    imgUrl: xiansuocover,
    title: '常规项目引入AI',
    desc: '引入AI优化设计流程，前置需求分析与方案走查；搭建可复用Icon Skill，统一图标规范，沉淀设计资产。',
    path: '/work-page10'
  },
  {
    imgUrl: cover7,
    title: 'Blender3D建模',
    desc: 'Blender建模及渲染作品展示',
    path: '/work-page7'
  },
  {
    imgUrl: beforecover4,
    title: 'AE动效展示',
    desc: '给每日运动APP做的产品宣传视频',
    path: '/work-before-4'
  },
])

const router = useRouter();
onMounted(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });
});

// 移除：全局body样式修改（改用组件容器背景）
// router.afterEach((to) => {
//   window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
//   if (to.name !== 'CProject') {
//     document.body.style.background = '#f9f9f9';
//   } else {
//     document.body.style.background = '#ffffff';
//   }
// });
</script>

<template>
  <div class="works-view-wrapper">
    <NavbarCom />
    <!-- 新增：内容容器，推挤页脚到底部 -->
    <div class="content-container">
      <div class="outer-container">
        <div class="works-card-container">
          <div class="works-content-wrapper">
            <div class="works-section">
              <div class="works-card-grid">
                <component
                    :is="item.externalUrl ? 'a' : RouterLink"
                    v-for="item in worksList"
                    :key="item.externalUrl || item.path"
                    :to="item.externalUrl ? undefined : item.path"
                    :href="item.externalUrl || undefined"
                    :target="item.externalUrl ? '_blank' : undefined"
                    :rel="item.externalUrl ? 'noopener noreferrer' : undefined"
                    :aria-label="item.externalUrl ? `${item.title}（在新标签页打开）` : undefined"
                    class="works-card-link"
                >
                  <div class="works-card">
                    <div class="card-img-wrapper">
                      <img
                          :src="item.imgUrl"
                          :alt="item.title"
                          class="card-img"
                          :class="{ 'card-img--contain': item.imageFit === 'contain' }"
                          :style="item.imageBackground ? { backgroundColor: item.imageBackground } : undefined"
                          loading="lazy"
                      >
                    </div>
                    <div class="card-text-wrapper">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-desc">{{ item.desc }}</p>
                    </div>
                  </div>
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增：页脚外层容器，仅做居中布局 -->
    <div class="footer-wrapper">
      <FootCom class="local-foot" />
    </div>
    <BackTopBtnCom />
  </div>
</template>

<style lang="scss" scoped>
// 全局布局：对齐参考页（移除全局重置，改用组件内样式）
.works-view-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

// 新增：内容容器，占满除页脚外的空间
.content-container {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

// 原有布局调整（修正容器名，对齐参考页）
.outer-container {
  width: 100%;
  padding: 105px 0 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.works-card-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}

.works-content-wrapper {
  width: 100%;
  padding: 0 60px;
  box-sizing: border-box;
}

.works-section {
  width: 100%;
  margin-bottom: 20px;
}

.works-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px;
  width: 100%;
  box-sizing: border-box;
}

.works-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.works-card-link:focus-visible {
  outline: 3px solid #14cfe4;
  outline-offset: 4px;
  border-radius: 24px;
}

// 卡片样式：对齐参考页（移除!important）
.works-card {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.works-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
}

// 图片容器：改为aspect-ratio 5/4（核心）
.card-img-wrapper {
  width: 100%;
  aspect-ratio: 5/4;
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}

// 图片样式：移除绝对定位，对齐参考页
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.card-img--contain {
  object-fit: contain;
  background: #f4fbff;
}

.works-card:hover .card-img {
  transform: scale(1.05);
}

// 文字区域：对齐参考页（移除贴左特殊样式，统一规则）
.card-text-wrapper {
  padding: 28px 32px;
  flex: 1;
  box-sizing: border-box;
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.card-desc {
  font-size: 17px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

// 页脚外层容器：仅做居中，不修改页脚样式
.footer-wrapper {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

// 页脚基础样式：对齐参考页
.local-foot {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
}

// 响应式适配：完全对齐参考页
@media (max-width: 767px) {
  .works-card-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .works-card {
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
  }

  .card-img-wrapper {
    aspect-ratio: 5/4;
  }

  .card-text-wrapper {
    padding: 16px 20px;
  }

  .card-title {
    font-size: 15px;
    margin-bottom: 8px;
  }

  .card-desc {
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (min-width: 1280px) {
  .works-card-grid {
    gap: 80px;
  }

  .card-text-wrapper {
    padding: 32px 36px;
  }

  .card-title {
    font-size: 24px;
    margin-bottom: 18px;
  }

  .card-desc {
    font-size: 16px;
  }
}

@media (max-width: 1279px) and (min-width: 768px) {
  .works-content-wrapper {
    padding: 0 40px;
  }

  .works-card-grid {
    gap: 50px;
  }

  .card-text-wrapper {
    padding: 24px 28px;
  }

  .card-title {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .card-desc {
    font-size: 15px;
  }

  .works-card {
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.08);
  }

  .works-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
}
</style>
