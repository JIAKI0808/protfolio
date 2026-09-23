<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from "../../components/FootCom.vue";
import BackTopBtnCom from "../../components/BackToTop.vue";

import cover1 from '../../assets/image/workview/cover1.png';
import cover2 from '../../assets/image/workview/cover2.png';
import cover4 from '../../assets/image/workview/cover4.png';

const worksList = ref([
  {
    imgUrl: cover1,
    title: 'Fixon APP/小程序',
    desc: 'Fixon曜约 是一个集建站、预约、商品售卖、民宿管理于一体的本土化私域运营平台。',
    path: '/work-page1'
  },
  {
    imgUrl: cover2,
    title: 'Fixon Web',
    desc: 'Fixon Web 版复刻移动端核心功能，优化桌面排版，跨设备体验一致，大屏操作高效便捷。',
    path: '/work-page2'
  },
  {
    imgUrl: cover4,
    title: 'Fixon 官网',
    desc: 'Fixon官网是品牌核心视觉入口,清晰呈现产品价值,构建用户知识库,以直观设计缩短转化路径,兼顾体验与商业目标。',
    path: '/work-page4'
  },
])

const router = useRouter();
onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});
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
                <RouterLink
                    v-for="(item, index) in worksList"
                    :key="`c-project-${index}`"
                    :to="item.path"
                    class="works-card-link"
                >
                  <div class="works-card">
                    <div class="card-img-wrapper">
                      <img :src="item.imgUrl" :alt="item.title" class="card-img" loading="lazy">
                    </div>
                    <div class="card-text-wrapper">
                      <h3 class="card-title">{{ item.title }}</h3>
                      <p class="card-desc">{{ item.desc }}</p>
                    </div>
                  </div>
                </RouterLink>
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
// 全局布局：对齐参考页
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

// 原有布局调整（移除!important，对齐参考页）
.outer-container {
  width: 100%;
  padding: 105px 0 20px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background: #ffffff;
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

// 图片容器：改为aspect-ratio 5/4（核心，对齐参考页）
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

.works-card:hover .card-img {
  transform: scale(1.05);
}

// 文字区域：对齐参考页（移除嵌套样式，简化）
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