<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from "../../components/FootCom.vue";
import WorkGallery10Com from '../../components/WorkViewCom/WorkGallery10Com.vue'

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
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="work-page1-wrapper">
    <div class="navbar-fixed-wrapper">
      <NavbarCom />
    </div>

    <main class="work-page1-main">
      <div class="work-page1-content">
        <WorkGallery10Com />
      </div>
    </main>

    <FootCom />
  </div>
</template>

<style scoped lang="scss">
.work-page1-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding-top: var(--navbar-height, 80px);
}

.navbar-fixed-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.work-page1-main {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 32px 0px;
  box-sizing: border-box;
}

.work-page1-content {
  width: calc(100% - 40px);
  max-width: 1920px;
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

:global(.navbar) {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
}

:global(.foot) {
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 1920px) {
  .work-page1-content {
    width: calc(100% - 640px);
    margin: 0 auto;
  }

  .work-page1-main {
    padding: 48px 0;
  }

  .work-page1-wrapper {
    --navbar-height: 88px;
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .work-page1-content {
    width: calc(100% - 320px);
    max-width: 1920px;
    margin: 0 auto;
  }
}

@media (max-width: 1279px) and (min-width: 768px) {
  .work-page1-content {
    width: calc(100% - 32px);
    max-width: 100%;
    margin: 0 auto;
  }

  .work-page1-main {
    padding: 24px 0;
  }

  .work-page1-wrapper {
    --navbar-height: 70px;
  }
}

@media (max-width: 767px) and (min-width: 481px) {
  .work-page1-content {
    width: calc(100% - 24px);
    max-width: 100%;
    margin: 0 auto;
  }

  .work-page1-main {
    padding: 16px 0;
  }

  .work-page1-wrapper {
    --navbar-height: 60px;
  }
}

@media (max-width: 480px) {
  .work-page1-content {
    width: calc(100% - 32px);
    margin: 0 auto;
  }

  .work-page1-main {
    padding: 12px 0;
  }

  .work-page1-wrapper {
    --navbar-height: 50px;
  }
}
</style>
