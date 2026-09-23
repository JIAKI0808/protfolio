<script setup>
import { onMounted } from 'vue'
import NavbarCom from '../../components/NavbarCom.vue'
import FootCom from '../../components/FootCom.vue'
import WorkGallery11Com from '../../components/WorkViewCom/WorkGallery11Com.vue'

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="work-detail-page">
    <div class="navbar-fixed-wrapper">
      <NavbarCom />
    </div>

    <main class="work-detail-main">
      <div class="work-detail-content">
        <WorkGallery11Com />
      </div>
    </main>

    <FootCom />
  </div>
</template>

<style scoped>
.work-detail-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: var(--navbar-height, 80px) 0 0;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.navbar-fixed-wrapper {
  position: fixed;
  inset: 0 0 auto;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.work-detail-main {
  flex: 1;
  width: 100%;
  padding: 32px 0;
  box-sizing: border-box;
}

.work-detail-content {
  width: calc(100% - 40px);
  max-width: 1920px;
  margin: 0 auto;
}

:global(body) {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

@media (min-width: 1920px) {
  .work-detail-page { --navbar-height: 88px; }
  .work-detail-main { padding: 48px 0; }
  .work-detail-content { width: calc(100% - 640px); }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .work-detail-content { width: calc(100% - 320px); }
}

@media (max-width: 1279px) and (min-width: 768px) {
  .work-detail-page { --navbar-height: 70px; }
  .work-detail-main { padding: 24px 0; }
  .work-detail-content { width: calc(100% - 32px); }
}

@media (max-width: 767px) and (min-width: 481px) {
  .work-detail-page { --navbar-height: 60px; }
  .work-detail-main { padding: 16px 0; }
  .work-detail-content { width: calc(100% - 24px); }
}

@media (max-width: 480px) {
  .work-detail-page { --navbar-height: 50px; }
  .work-detail-main { padding: 12px 0; }
  .work-detail-content { width: calc(100% - 32px); }
}
</style>
