<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

/* 导航配置：name 与路由表中保持一致，方便高亮判断 */
const navList = [
  { label: 'Work',  name: 'Work',  path: '/' },        // 首页
  { label: 'About', name: 'About', path: '/about' },
  // { label: 'Play',  name: 'Play',  path: '/play' },
  // { label: 'Photo', name: 'Photo', path: '/photo' }
];

// 定义响应式变量：标记是否触发滚动（显示毛玻璃）
const isScrolled = ref(false);
// 新增响应式变量：标记汉堡菜单是否展开（小屏专用）
const isMenuOpen = ref(false);
// 新增响应式变量：标记是否为小屏（用于适配布局）
const isMobile = ref(false);

// 滚动事件处理函数：判断滚动距离，更新isScrolled
const handleScroll = () => {
  // 滚动距离超过20px时触发毛玻璃（可调整阈值，如10px/50px）
  isScrolled.value = window.scrollY > 20;
};

// 新增：窗口尺寸变化处理函数，判断是否为小屏
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  // 小屏切换为大屏时，自动关闭菜单，避免布局错乱
  if (!isMobile.value) {
    isMenuOpen.value = false;
  }
};

// 新增：汉堡菜单点击切换函数
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 新增：导航项点击后关闭菜单（小屏专用，提升交互体验）
const closeMenuOnNavClick = () => {
  if (isMobile.value) {
    isMenuOpen.value = false;
  }
};

// 挂载时添加监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  // 初始化时执行一次尺寸判断，避免布局异常
  handleResize();
  // 初始化毛玻璃状态
  handleScroll();
});

// 卸载时移除监听（防止内存泄漏）
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <!-- 外层 wrapper：绑定动态class，根据isScrolled切换毛玻璃样式 -->
  <header class="navbar" :class="{ 'navbar-blur': isScrolled }">
    <!-- 左侧 logo -->
    <router-link to="/" class="logo" @click="closeMenuOnNavClick">
      <img src="../assets/image/namelogo.png" alt="Site Logo" />
    </router-link>

    <!-- 右侧：大屏显示导航，小屏显示汉堡菜单 + 展开式导航 -->
    <div class="nav-wrapper">
      <!-- 大屏导航（≥768px显示） -->
      <nav class="nav desktop-nav">
        <router-link
            v-for="item in navList"
            :key="item.name"
            :to="item.path"
            :class="{ active: $route.name === item.name }"
            class="nav-item"
            @click="closeMenuOnNavClick"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- 小屏专属：汉堡菜单按钮（≤768px显示） -->
      <button class="hamburger-btn" @click="toggleMenu" v-show="isMobile">
        <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
        <span class="hamburger-line" :class="{ active: isMenuOpen }"></span>
      </button>

      <!-- 小屏专属：展开式导航（≤768px显示，根据isMenuOpen切换展开/收起） -->
      <nav class="nav mobile-nav" :class="{ open: isMenuOpen }" v-show="isMobile">
        <router-link
            v-for="item in navList"
            :key="item.name"
            :to="item.path"
            :class="{ active: $route.name === item.name }"
            class="nav-item"
            @click="closeMenuOnNavClick"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
// 🔥 核心新增：定义缺失的CSS变量，或直接替换为目标颜色
:root {
  --text-normal: #333333;       // 默认文字颜色
  --text-active: #F6056B;       // 当前页文字颜色（目标色）
  --primary: #F6056B;           // hover态颜色（可选，和当前页保持一致）
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  /* 核心修改：未滚动时显示纯白色背景 */
  background: #ffffff;
  border-bottom: 1px solid #eee;   // 浅灰分割线
  /* 固定定位属性（保持不跟随滚动） */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  box-sizing: border-box;
  max-width: 100vw;
  /* 过渡效果：毛玻璃切换更平滑，无突兀感 */
  transition: all 0.3s ease;
}

/* 新增：滚动触发的毛玻璃样式类 */
.navbar-blur {
  /* 1. 调整背景色：降低不透明度，增强毛玻璃通透感（关键） */
  background: rgba(255, 255, 255, 0.85); // 滚动后浅白毛玻璃
  /* 2. 毛玻璃核心属性：backdrop-filter: blur() */
  backdrop-filter: blur(8px); // 模糊半径8px（可调整：4px更淡，12px更浓）
  -webkit-backdrop-filter: blur(8px); // 兼容Safari浏览器
  /* 3. 优化视觉：加深边框/阴影，增强层次感 */
  border-bottom: 1px solid rgba(238, 238, 238, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

/* 给页面主体内容预留导航栏高度，避免内容被遮挡 */
:global(body) {
  padding-top: calc(32px + 32px + 1px); // 导航栏上下内边距(16*2) + logo高度(32) + 边框高度(1)
  margin: 0;
  background: #f9f9f9; // 可选：设置页面背景，更易凸显毛玻璃效果
}

.logo img {
  height: 32px;
  width: auto;
  display: block;
}

/* 导航容器：统一控制布局 */
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* 大屏导航（≥768px）：原有布局保留 */
.desktop-nav {
  display: flex;
  gap: 28px;
}

/* 小屏汉堡菜单按钮（≤768px）：核心修复样式 */
.hamburger-btn {
  display: none; /* 默认隐藏，小屏显示 */
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000; /* 确保在菜单上层，防止被遮挡 */

  .hamburger-line {
    display: block;
    width: 100%;
    height: 2px;
    background: #333333; /* 默认态深色，确保白色背景可见 */
    border-radius: 1px;
    transition: all 0.3s ease; /* 线条切换动画 */

    // 🔥 核心修复：强制激活态颜色为#F6056B，避免变量失效
    &.active {
      background: #F6056B !important;
    }

    /* 汉堡菜单展开为叉号的动画：第1根线旋转 */
    &:nth-child(1).active {
      transform: translateY(9px) rotate(45deg);
    }

    /* 汉堡菜单展开为叉号的动画：第2根线隐藏 */
    &:nth-child(2).active {
      opacity: 0;
    }

    /* 汉堡菜单展开为叉号的动画：第3根线旋转 */
    &:nth-child(3).active {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
}

/* 小屏展开式导航（≤768px）：核心样式 + z-index 优化 */
.mobile-nav {
  display: none; /* 默认隐藏，小屏显示 */
  position: absolute;
  top: 100%; /* 紧贴导航栏下方 */
  right: 0;
  width: 200px; /* 菜单宽度，可调整 */
  background: rgba(255, 255, 255, 0.95); /* 菜单背景，适配毛玻璃 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(238, 238, 238, 0.9);
  border-top: none; /* 与导航栏边框重合，避免双重边框 */
  border-radius: 0 0 8px 8px; /* 右下角/左下角圆角，提升视觉 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  flex-direction: column; /* 垂直排列导航项 */
  gap: 0; /* 取消水平间距，垂直间距通过padding控制 */
  overflow: hidden;
  max-height: 0; /* 收起时高度为0，隐藏内容 */
  transition: max-height 0.3s ease; /* 展开/收起流畅动画 */
  z-index: 999; /* 低于汉堡按钮的1000，确保按钮不被遮挡 */

  /* 菜单展开状态 */
  &.open {
    max-height: 300px; /* 足够容纳所有导航项，可调整 */
    padding: 8px 0; /* 展开时添加上下内边距 */
  }

  .nav-item {
    padding: 12px 24px; /* 垂直排列的内边距，提升点击区域 */
    width: 100%;
    box-sizing: border-box;
    text-align: left; /* 左对齐，更符合移动端交互习惯 */

    /* 选中态下划线调整：适配垂直布局 */
    &.active::after {
      bottom: 0;
      left: 24px;
      width: calc(100% - 48px); /* 与左右内边距对齐 */
      background: var(--text-active); /* 下划线颜色同步为#F6056B */
    }
  }
}

/* 响应式断点：≤768px（小屏），切换导航布局 */
@media (max-width: 768px) {
  .navbar {
    padding: 16px 20px; /* 小屏缩小左右内边距，适配手机 */
  }

  /* 大屏导航隐藏 */
  .desktop-nav {
    display: none;
  }

  /* 汉堡菜单按钮显示 */
  .hamburger-btn {
    display: flex;
  }

  /* 小屏导航显示（默认收起，展开时显示内容） */
  .mobile-nav {
    display: flex;
  }

  /* 小屏页面主体预留高度调整（适配导航栏内边距变化） */
  :global(body) {
    padding-top: calc(32px + 20px + 1px);
  }
}

/* 原有导航项样式保留，统一适配大屏/小屏 */
.nav-item {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-normal); /* 默认文字颜色：#333 */
  text-decoration: none;
  position: relative;
  transition: color 0.2s;

  /* 🔥 核心修改：当前页选中态，文字颜色强制设为#F6056B */
  &.active {
    color: #F6056B !important; /* 强制生效，避免样式覆盖 */
  }

  /* hover 态（可选）：未选中时hover显示目标色 */
  &:hover:not(.active) {
    color: #F6056B;
  }

  /* 下划线点缀（可选） */
  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: #F6056B; /* 下划线颜色同步为目标色 */
    transition: all 0.2s ease;
  }
}
</style>