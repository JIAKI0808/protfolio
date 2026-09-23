<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from "../../components/FootCom.vue";
import BackTopBtnCom from "../../components/BackToTop.vue";

// 路径正确，保留原有导入
import cover3 from '../../assets/image/workview/cover3.png';
import cover8 from '../../assets/image/workview/cover8.png';
import beforecover1 from '../../assets/image/workview/beforecover1.png';
import beforecover2 from '../../assets/image/workview/beforecover2.png';
import beforecover3 from '../../assets/image/workview/beforecover3.png';
import youjiacover from '../../assets/image/workview/youjiacover.png';

const worksList = ref([
  {
    imgUrl: youjiacover,
    title: '优加车拍小程序/后台设计',
    desc: '一款面向二手车流通业务的交易管理产品，通过这个项目验证了AI辅助整理设计规范和走查skill的可能性。',
    path: '/work-page9'
  },
  {
    imgUrl: cover3,
    title: 'Fixon 后台管理',
    desc: 'Fixon后台管理系统为APP及Web端配套打造,提供高效管控与数据支撑,打通前后端全流程,保障协作顺畅。',
    path: '/work-page3'
  },
  {
    imgUrl: cover8,
    title: '脸红兔子 收银小程序',
    desc: '聚焦线下零售场景的收银类小程序设计，通过极简流程与清晰视觉，实现快速点单、优惠计算与便捷收款。',
    path: '/work-page8'
  },
  {
    imgUrl: beforecover1,
    title: '商协集势APP',
    desc: '商协集势依托康美集势平台,以技术和大数据汇商协会资源,数字化美业协会管理,实现数据运营闭环,赋能美康产业协会成长。',
    path: '/work-before-1'
  },
  {
    imgUrl: beforecover2,
    title: '耗品Go小程序',
    desc: '耗品GO是康美集势货源采购版块小程序,美康门店专属TOB采购商城,一站式集采质优价廉的耗材礼品。',
    path: '/work-before-2'
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
    <!-- 内容区域：独立容器，推挤页脚到底部 -->
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
                      <img
                          :src="item.imgUrl"
                          :alt="item.title"
                          class="card-img"
                          loading="lazy"
                      >
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
    <!-- 页脚外层容器：仅做居中布局，不修改页脚自身样式 -->
    <div class="footer-wrapper">
      <FootCom class="local-foot" />
    </div>
    <BackTopBtnCom />
  </div>
</template>

<style lang="scss" scoped>
// 全局布局：核心控制整体结构
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

// 内容容器：占满除页脚外的所有空间，推挤页脚到底部
.content-container {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

// 原有内容布局（完全保留，无修改）
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

// hover交互
.works-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15);
}

.works-card:hover .card-img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

// 图片容器：5:4比例
.card-img-wrapper {
  width: 100%;
  aspect-ratio: 5/4;
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// 文字区域
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

// 页脚外层容器：仅做居中布局，不修改FootCom自身样式
.footer-wrapper {
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  /* 核心：让页脚整体居中，不改动内部样式 */
  display: flex;
  justify-content: center;
  align-items: center;
  // 保留页脚原有margin/padding，仅控制居中
  margin: 0;
  padding: 0;
}

// 仅保留页脚的基础样式，不修改其内部结构
.local-foot {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  // 完全移除对页脚自身的样式修改
}

// 响应式适配（完全保留）
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
}
</style>
