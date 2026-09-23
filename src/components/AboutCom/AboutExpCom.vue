<script setup>
// 导入Vue3核心API
import { ref, onMounted, onUnmounted } from 'vue';

// 定义响应式数据：屏幕尺寸判断
const isMobile = ref(false);
const isTablet = ref(false);

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

// 核心数据：工作经历、教育经历、技能工具
const expData = ref({
  // 工作经历（左侧时间线）
  workExp: [
    {
      period: '2026.03-2026.08',
      company: '深圳广联数科科技有限公司',
      position: '高级UI设计师-To B',
      content: [
        '[优加车拍小程序、优加车拍后台、生意助手小程序等]V5.0版本更新迭代，接收并理解需求文档→输出高保真设计稿→AI辅助完成设计稿走查→交付开发。',
        '[AI辅助优化设计流程]在AI浪潮下，主动学习前沿知识，带领团队熟练掌握AI工具，应用到实际工作中，为团队提效。',
        '[优加车拍设计规范V1.0]使用AI完成优加车拍设计规范V1.0版本的整理归纳，提高团队出图效率。',
        '[生意助手小程序]使用AI将页面还原成HTML并交接给前端，加快项目版本更新进度。',
      ]
    },
    {
      period: '2022.09-2025.12',
      company: '深圳斐颂信息技术有限公司',
      position: 'UI负责人-B2C',
      content: [
        '[Fixon曜约]APPV1.0-V2.0、小程序V1.0-V2.0、Web端V1.0-V3.0全版本迭代设计，完成从功能架构梳理→低保真交互原型→高保真视觉落地的全流程设计，建立标准化设计组件库提升开发效率。',
        '[Fixon官网]V1.0/V2.0UI界面设计，包括PC端、移动端的适配设计以及海内外语言适配。',
        '建立[Fixon后台管理]V1.0/V2.0 开源框架设计标准，通过模块化组件设计使新功能开发周期缩短30%。',
        '[脸红兔子]线上、线下小程序原型、交互、UI设计。',
        '跨部门合作，及时跟进开发进度及前端落地效果，配合开发进行产品测试，严格走查最终效果。',
      ]
    },
    {
      period: '2021.08-2022.08',
      company: '深圳市康美集势网络科技有限公司',
      position: '中级UI设计-B2B',
      content: [
        '根据产品需求,输出商协集势APP、耗品go小程序、美梦帮扶后台管理系统的UI界面,输出交互设计规范。',
        '推进高效协作工具的使用，分享使用经验。',
        '参与产品竞品分析以及问卷调查,寻找产品差异化，打造产品特色。跟踪产品体验效果，从用户角度出发，进行品牌UI升级。',
        '根据视觉设计的发展趋势及用户研究结果不断优化产品的视觉体验。'
      ]
    },
    {
      period: '2020.08-2021.07',
      company: '深圳市铂涨科技有限公司',
      position: '初级UI设计-C端',
      content: [
        '负责公司外包项目界面的设计与美化工作。',
        '负责"全民娱乐小游戏"、掌厨APP的界面设计,与客户沟通并交付设计稿。',
        '完成公司上级交代的H5、节日海报等制作。',
        '与前端工程师沟通并完成最终的效果测试'
      ]
    },
  ],
  // 教育经历（右侧顶部）
  eduExp: [
    {
      period: '2016.09-2020.07',
      school: '福建省三明学院',
      major: '风景园林设计',
      degree: '本科',
      content: '主修景观规划设计、手绘与软件表现、空间美学等，融合生态、建筑与艺术，培养的空间布局、视觉呈现能力'
    },
  ],
  // 技能工具（右侧底部）
  skills: {
    frontEnd: {
      title: '核心设计能力',
      list: ['AI辅助UI设计','全链路设计', '多端界面适配', '设计规范制定', '高保真原型设计', '交互动效演示','AE动效演示','用户路径优化']
    },
    buildTool: {
      title: '效率工具与设计提效',
      list: ['Figma', '即时设计', 'Sketch', 'Photoshop', 'Adobe Illustrator','AE','即梦AI、豆包、Lovart等AI工具','Html/css','Blender']
    },
    otherTool: {
      title: '用户增长与运营设计',
      list: ['用户增长思维', '用户行为分析','运营物料设计', '视觉语言优化',]
    }
  }
});
</script>

<template>
  <!-- 核心容器：白色背景、三端适配 -->
  <section class="exp-container">
    <!-- 布局容器：左右100px边距、限制最大宽度 -->
    <div class="exp-layout-wrapper">
      <!-- 内容包装器：大屏左右布局 -->
      <div class="exp-content-wrapper">
        <!-- 左侧：工作经历时间线（原点+竖线） -->
        <div class="exp-left">
          <div class="exp-module">
            <h2 class="module-title">工作经历</h2>
            <div class="work-timeline">
              <div class="timeline-item" v-for="(item, index) in expData.workExp" :key="index">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
                <div class="timeline-content">
                  <h3 class="content-title">{{ item.company }} - {{ item.position }}</h3>
                  <p class="content-period">{{ item.period }}</p>
                  <!-- 工作经历的content容器：新增专属类名区分教育经历 -->
                  <div class="content-desc work-content-desc">
                    <p v-for="(desc, idx) in item.content" :key="idx">{{ desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：上教育经历 + 下技能工具 -->
        <div class="exp-right">
          <!-- 右侧顶部：教育经历 -->
          <div class="exp-module edu-module">
            <h2 class="module-title">教育经历</h2>
            <div class="edu-list">
              <div class="edu-item" v-for="(item, index) in expData.eduExp" :key="index">
                <h3 class="content-title">{{ item.school }} - {{ item.major }}</h3>
                <p class="content-period">{{ item.period }} | {{ item.degree }}</p>
                <div class="content-desc">
                  <p>{{ item.content }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧底部：技能与工具 -->
          <div class="exp-module skill-module">
            <h2 class="module-title">技能与工具</h2>
            <div class="skill-list">
              <div class="skill-item" v-for="(skill, key) in expData.skills" :key="key">
                <h3 class="skill-subtitle">{{ skill.title }}</h3>
                <ul class="skill-desc">
                  <li v-for="(item, idx) in skill.list" :key="idx">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 核心容器：白色背景、最小1屏高度 */
.exp-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0; /* px单位，上下无内边距 */
  margin: 0;
  box-sizing: border-box;
}

/* 布局容器：左右100px边距、限制最大宽度（保证大屏内容完整显示） */
.exp-layout-wrapper {
  width: calc(100% - 200px); /* 大屏左右固定100px边距 */
  max-width: 1400px; /* 限制最大宽度，避免大屏内容过宽 */
  margin: 0 auto;
  box-sizing: border-box;
}

/* 内容包装器：大屏左右布局、px单位间距 */
.exp-content-wrapper {
  display: grid;
  grid-template-columns: 6fr 4fr; /* 大屏左侧6份 右侧4份 */
  gap: 112px; /* px单位，左右模块间距 */
  box-sizing: border-box;
}

/* 通用模块样式：移除灰色底框、px单位内边距 */
.exp-module {
  width: 100%;
  padding: 16px 0; /* px单位，上下内边距16px，左右无 */
  border-radius: 0; /* 移除圆角 */
  box-shadow: none; /* 移除阴影 */
  box-sizing: border-box;
}

/* 模块大标题（单独设置，可独立调整） */
.module-title {
  font-size: 28px; /* 放大模块标题，px单位 */
  color: #28282c;
  margin: 0 0 16px 0; /* px单位，标题下方间距16px */
  font-weight: 700;
  padding-bottom: 16px; /* px单位，下划线下方内边距8px */
  border-bottom: 2px solid #e9ecef;
}

/* ---------------------- 左侧工作经历：专属样式（仅作用于左侧） ---------------------- */
.exp-left {
  width: 100%;
  box-sizing: border-box;
}

.work-timeline {
  width: 100%;
  position: relative;
  padding-left: 28px; /* 工作经历专属左侧内边距（对齐基准） */
  box-sizing: border-box;
}

.timeline-item {
  width: 100%;
  position: relative;
  margin-bottom: 0;
  padding-bottom: 48px;
  box-sizing: border-box;
}

.timeline-item:last-child {
  padding-bottom: 0;
  margin-bottom: 0;
}

/* 时间线原点 */
.timeline-dot {
  width: 12px;
  height: 12px;
  background-color: #28282c;
  border-radius: 50%;
  position: absolute;
  left: -28px; /* 精准对齐work-timeline的padding-left */
  top: 6px;
  z-index: 2;
}

/* 时间线竖线 */
.timeline-line {
  width: 2px;
  height: 100%;
  background-color: #e9ecef;
  position: absolute;
  left: -23px; /* 竖线在原点正中间 */
  top: 0;
  z-index: 1;
}

.timeline-item:last-child .timeline-line {
  height: 16px;
}

/* ---------------------- 全局二级文字样式（工作/教育共用） ---------------------- */
.content-title {
  font-size: 20px;
  color: #28282c;
  margin: 0 0 12px 0;
  font-weight: 600;
  padding: 0; /* 移除所有padding，依托父容器对齐 */
}

.content-period {
  font-size: 16px;
  color: #28282c;
  margin: 0 0 12px 0;
  padding: 0;
  font-weight: 600;
}

.content-desc {
  font-size: 14px;
  color: #42474e;
  line-height: 1.8;
  padding: 0;
  box-sizing: border-box;
}

.content-desc p {
  margin: 0 0 8px 0;
}
.content-desc p:last-child {
  margin-bottom: 0;
}

/* ---------------------- 核心修改：工作经历content小圆点居中样式 ---------------------- */
/* 工作经历的content容器：增加左内边距给圆点 */
.work-content-desc {
  padding-left: 12px; /* 给小圆点留出空间 */
}

/* 工作经历每个content项的小圆点（尺寸更小） */
.work-content-desc p {
  position: relative;
  padding-left: 10px; /* 文本和圆点的间距 */
  margin-bottom: 8px;
  line-height: 1.8; /* 固定行高，确保圆点定位一致 */
}

/* 小圆点样式：直径4px（更小）、灰色系、严格垂直居中 */
.work-content-desc p::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%; /* 改为基于父元素高度50%定位 */
  width: 4px; /* 圆点大小（更小） */
  height: 4px; /* 圆点大小（更小） */
  border-radius: 50%;
  background-color: #6c757d; /* 浅灰色，视觉更柔和 */
  transform: translateY(-50%); /* 自身向上偏移50%，实现绝对居中 */
  z-index: 1;
}

/* ---------------------- 右侧教育+技能：专属样式（无时间线，零padding-left） ---------------------- */
.exp-right {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  /* 核心：右侧模块无左侧padding，避免和工作经历对齐 */
  padding-left: 0 !important;
}

.edu-module {
  flex: 1;
}

.edu-list {
  width: 100%;
  box-sizing: border-box;
}

.edu-item {
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
}
.edu-item:last-child {
  margin-bottom: 0;
}

/* 技能工具样式 */
.skill-subtitle {
  font-size: 18px;
  color: #F6056B;
  margin: 0 0 10px 0;
  font-weight: 600;
  padding-left: 8px;
  border-left: 3px solid #e9ecef;
}

.skill-desc {
  list-style: disc;
  padding-left: 24px;
  font-size: 14px;
  color: #42474e;
  line-height: 1.8;
  box-sizing: border-box;
}

.skill-desc li {
  margin-bottom: 8px;
}
.skill-desc li:last-child {
  margin-bottom: 0;
}

.skill-module {
  flex: 1;
}

.skill-list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  box-sizing: border-box;
}

.skill-item {
  width: 100%;
  box-sizing: border-box;
}

/* ---------------------- 响应式：中屏（768-1200px）核心修复 ---------------------- */
@media (max-width: 1200px) and (min-width: 768px) {
  .exp-layout-wrapper {
    width: calc(100% - 80px); /* 中屏左右40px边距 */
  }

  .exp-content-wrapper {
    grid-template-columns: 1fr; /* 改为上下布局 */
    gap: 48px; /* 加大上下间距，区分模块 */
  }

  /* 中屏：工作经历时间线调整（仅左侧生效） */
  .work-timeline {
    padding-left: 24px;
  }
  .timeline-dot {
    left: -24px;
    width: 10px;
    height: 10px;
    top: 5px;
  }
  .timeline-line {
    left: -20px;
  }

  /* 中屏：模块标题字号调整 */
  .module-title {
    font-size: 24px;
    margin-bottom: 20px;
    padding-bottom: 12px;
  }

  /* 中屏：二级文字字号调整 */
  .content-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .content-period {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .content-desc {
    font-size: 15px;
    line-height: 1.7;
  }

  /* 中屏：工作经历小圆点适配 */
  .work-content-desc {
    padding-left: 10px;
  }
  .work-content-desc p {
    padding-left: 8px;
    line-height: 1.7; /* 同步行高，确保居中 */
  }
  .work-content-desc p::before {
    width: 3.5px;
    height: 3.5px;
  }

  /* 中屏：技能文字字号调整 */
  .skill-subtitle {
    font-size: 17px;
    margin-bottom: 8px;
  }
  .skill-desc {
    font-size: 13px;
    padding-left: 20px;
  }

  /* 核心：中屏右侧模块顺排，无左侧padding */
  .exp-right {
    padding-left: 0;
    gap: 24px;
  }
}

/* ---------------------- 响应式：小屏（<768px）核心修复 ---------------------- */
@media (max-width: 767px) {
  .exp-container {
    padding: 30px 0;
  }

  .exp-layout-wrapper {
    width: calc(100% - 40px); /* 小屏左右20px边距 */
  }

  .exp-content-wrapper {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .exp-module {
    padding: 12px 0;
  }

  /* 小屏：工作经历时间线调整 */
  .work-timeline {
    padding-left: 20px;
  }
  .timeline-dot {
    left: -20px;
    width: 8px;
    height: 8px;
    top: 4px;
  }
  .timeline-line {
    left: -17px;
    width: 1px;
  }

  /* 小屏：模块标题字号调整 */
  .module-title {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom-width: 1px;
  }

  /* 小屏：二级文字字号调整 */
  .content-title {
    font-size: 15px;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .content-period {
    font-size: 13px;
    margin-bottom: 8px;
    color: #495057;
  }
  .content-desc {
    font-size: 13px;
    line-height: 1.6;
  }

  /* 小屏：工作经历小圆点适配 */
  .work-content-desc {
    padding-left: 8px;
  }
  .work-content-desc p {
    padding-left: 8px;
    line-height: 1.6; /* 同步行高，确保居中 */
  }
  .work-content-desc p::before {
    width: 3px;
    height: 3px;
  }

  /* 小屏：技能文字字号调整 */
  .skill-subtitle {
    font-size: 15px;
    margin-bottom: 6px;
    padding-left: 6px;
    border-left-width: 2px;
  }
  .skill-desc {
    font-size: 13px;
    padding-left: 18px;
    line-height: 1.6;
  }
  .skill-desc li {
    margin-bottom: 6px;
  }

  /* 核心：小屏右侧模块顺排，无左侧padding */
  .exp-right {
    padding-left: 0;
    gap: 20px;
  }

  .timeline-item {
    padding-bottom: 36px;
  }
}
</style>
