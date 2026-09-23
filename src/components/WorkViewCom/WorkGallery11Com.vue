<script setup>
import caseStudyImage from '../../assets/image/works-ai-poster/ai-skill-poster-case-study.png'
</script>

<template>
  <section class="work-gallery-container" id="work-top" aria-label="把审美写成 Skill 项目详情">
    <figure class="work-img-item">
      <img
          :src="caseStudyImage"
          alt="把审美写成 Skill：AI 家居海报视觉系统实践完整案例"
          class="work-img"
          loading="eager"
          decoding="async"
      >
    </figure>
  </section>
</template>

<style scoped>
.work-gallery-container {
  width: 100%;
  margin: 0;
  padding: 0;
  background: #ffffff;
  box-sizing: border-box;
}

.work-img-item {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
}

.work-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}
</style>
