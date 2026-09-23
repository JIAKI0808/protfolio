<script setup>
import { RouterLink } from 'vue-router'
import cProject from '../assets/image/workcard/C.png'
import bProject from '../assets/image/workcard/B.png'
import operationDesign from '../assets/image/workcard/Operation design.png'
import others from '../assets/image/workcard/Others.png'

const workCategories = [
  { imgUrl: cProject, alt: 'C端项目', path: '/c-project', color: '#2eb34f', projects: [
    { label: 'FixonAPP、小程序', path: '/work-page1' },
    { label: 'Fixon web端', path: '/work-page2' },
    { label: 'Fixon 官网', path: '/work-page4' },
  ] },
  { imgUrl: bProject, alt: 'B端项目', path: '/b-project', color: '#f77c13', projects: [
    { label: '优加车拍小程序+后台', path: '/work-page9' },
    { label: 'Fixon后台管理', path: '/work-page3' },
    { label: '脸红兔子收银小程序', path: '/work-page8' },
    { label: '商协集势APP', path: '/work-before-1' },
    { label: '耗品Go小程序', path: '/work-before-2' },
  ] },
  { imgUrl: operationDesign, alt: '运营设计', path: '/work-page5' },
  { imgUrl: others, alt: '其他技能', path: '/others' },
]
</script>

<template>
  <div class="first-works-container">
    <div class="first-works-wrapper">
      <div class="first-works-grid">
        <article v-for="item in workCategories" :key="item.path" class="first-works-card" :style="{ '--card-color': item.color }">
          <RouterLink :to="item.path" class="category-link" :aria-label="`${item.alt}总览`">
            <img :src="item.imgUrl" :alt="item.alt" loading="lazy" class="first-card-img">
          </RouterLink>
          <nav v-if="item.projects" class="project-links" :aria-label="`${item.alt}项目列表`">
            <RouterLink v-for="project in item.projects" :key="project.path" :to="project.path" class="project-link">
              <span aria-hidden="true">·</span><span class="project-label">{{ project.label }}</span>
            </RouterLink>
          </nav>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first-works-container { width:100%; box-sizing:border-box; padding:40px 0; }
.first-works-wrapper { width:100%; max-width:1440px; margin:0 auto; padding:0 60px; box-sizing:border-box; }
.first-works-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:50px; justify-items:center; }
.first-works-card { position:relative; width:100%; min-width:0; container-type:inline-size; transition:transform .3s ease; }
.first-works-card:hover { transform:translateY(-4px); }
.category-link { display:block; border-radius:24px; }
.first-card-img { width:100%; height:auto; display:block; }
.project-links { position:absolute; top:49.8%; left:12.5%; right:9%; display:flex; flex-direction:column; gap:2.6cqw; pointer-events:none; }
.project-link { display:flex; gap:1.4cqw; width:fit-content; max-width:100%; color:var(--card-color); font-family:Arial,'Microsoft YaHei',sans-serif; font-size:4.7cqw; line-height:1.45; text-decoration:none; white-space:nowrap; pointer-events:auto; }
.project-link:hover .project-label, .project-link:focus-visible .project-label { text-decoration:underline; text-underline-offset:.22em; text-decoration-thickness:1px; }
.project-link:focus-visible, .category-link:focus-visible { outline:2px dashed var(--card-color,#f6056b); outline-offset:3px; }
@media (min-width:1440px) { .first-works-wrapper { padding:0 80px; } .first-works-grid { gap:60px; } }
@media (min-width:1280px) and (max-width:1439px) { .first-works-wrapper { padding:0 70px; } .first-works-grid { gap:55px; } }
@media (min-width:768px) and (max-width:1279px) { .first-works-wrapper { padding:0 40px; max-width:95%; } .first-works-grid { gap:40px; } .first-works-card { max-width:95%; } }
@media (max-width:767px) { .first-works-container { padding:30px 0; } .first-works-wrapper { padding:0 25px; } .first-works-grid { grid-template-columns:minmax(0,1fr); gap:35px; max-width:90%; margin:0 auto; } }
@media (max-width:480px) { .first-works-wrapper { padding:0 20px; } .first-works-grid { gap:30px; } }
@media (prefers-reduced-motion:reduce) { .first-works-card { transition:none; transform:none; } }
</style>
