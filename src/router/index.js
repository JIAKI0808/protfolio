// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import WorksView from "../views/WorksView.vue"
import AboutView from "../views/AboutView.vue"
// 1. 导入C端项目页面组件（根据你的实际文件路径修改）
import CProjectView from "../views/WorkContentsView/WorkcView.vue"
import BProjectView from "../views/WorkContentsView/WorkbView.vue"
import OthersView from "../views/WorkContentsView/WorkothersView.vue"
// 预留：其他分类页面（后续添加时取消注释）
// import BProjectView from "../views/BProjectView.vue"
// import OperationDesignView from "../views/OperationDesignView.vue"
// import OthersView from "../views/OthersView.vue"

// 原有页面导入
import WorkPage1 from "../views/WorksView/WorkPage1.vue"
import WorkPage2 from "../views/WorksView/WorkPage2.vue"
import WorkPage3 from "../views/WorksView/WorkPage3.vue";
import WorkPage4 from "../views/WorksView/WorkPage4.vue";
import WorkPage5 from "../views/WorksView/WorkPage5.vue";
import WorkPage6 from "../views/WorksView/WorkPage6.vue";
import WorkPage7 from "../views/WorksView/WorkPage7.vue";
import WorkPage8 from "../views/WorksView/WorkPage8.vue";
import WorkPage9 from "../views/WorksView/WorkPage9.vue";
import WorkPage10 from "../views/WorksView/WorkPage10.vue";
import WorkPage11 from "../views/WorksView/WorkPage11.vue";
import WorkBefore1 from "../views/WorksBeforeView/WorksBefore1.vue";
import WorkBefore2 from "../views/WorksBeforeView/WorksBefore2.vue";
import WorkBefore3 from "../views/WorksBeforeView/WorksBefore3.vue";
import WorkBefore4 from "../views/WorksBeforeView/WorksBefore4.vue";
import WorkBefore5 from "../views/WorksBeforeView/WorksBefore5.vue";

const routes = [
    { path: '/',      name: 'Work',  component: WorksView  },
    { path: '/about', name: 'About', component: AboutView },

    // 2. 添加C端项目页面路由（核心）
    { path: '/c-project', name: 'CProject', component: CProjectView },
    { path: '/b-project', name: 'BProject', component: BProjectView },
    { path: '/others', name: 'Others', component: OthersView },
    // 预留：其他分类页面路由（后续添加时取消注释）
    // { path: '/b-project', name: 'BProject', component: BProjectView },
    // { path: '/operation-design', name: 'OperationDesign', component: OperationDesignView },
    // { path: '/others', name: 'Others', component: OthersView },

    // 原有作品详情页路由
    { path: '/work-page1', name: 'WorkPage1', component: WorkPage1 },
    { path: '/work-page2', name: 'WorkPage2', component: WorkPage2 },
    { path: '/work-page3', name: 'WorkPage3', component: WorkPage3 },
    { path: '/work-page4', name: 'WorkPage4', component: WorkPage4 },
    { path: '/work-page5', name: 'WorkPage5', component: WorkPage5 },
    { path: '/work-page6', name: 'WorkPage6', component: WorkPage6 },
    { path: '/work-page7', name: 'WorkPage7', component: WorkPage7 },
    { path: '/work-page8', name: 'WorkPage8', component: WorkPage8 },
    { path: '/work-page9', name: 'WorkPage9', component: WorkPage9 },
    { path: '/work-page10', name: 'WorkPage10', component: WorkPage10 },
    { path: '/work-page11', name: 'WorkPage11', component: WorkPage11 },
    { path: '/work-before-1', name: 'WorkBefore1', component: WorkBefore1 },
    { path: '/work-before-2', name: 'WorkBefore2', component: WorkBefore2 },
    { path: '/work-before-3', name: 'WorkBefore3', component: WorkBefore3 },
    { path: '/work-before-4', name: 'WorkBefore4', component: WorkBefore4 },
    { path: '/work-before-5', name: 'WorkBefore5', component: WorkBefore5 },
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})
