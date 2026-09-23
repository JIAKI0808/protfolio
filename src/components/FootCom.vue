<template>
  <!-- 页脚容器 -->
  <footer class="footer-container">
    <!-- 顶部细横线 -->
    <div class="footer-divider"></div>

    <!-- 核心内容区：左右布局 -->
    <div class="footer-main">
      <!-- 左侧问候语 -->
      <div class="footer-text">
        谢谢您的观看！期待合作~
      </div>

      <!-- 右侧联系方式 -->
      <div class="footer-contact">
        <p class="contact-item">微信：Naisinie</p>
        <p class="contact-item">手机：15338727630</p>
      </div>
    </div>

    <!-- 底部居中版权语 -->
    <div class="footer-copyright">
      Made by JIAKI@2026 V2.1
    </div>
  </footer>
</template>

<script setup>
// 页脚组件无额外逻辑，留空即可
</script>

<style scoped lang="scss">
/* 页脚整体容器 */
.footer-container {
  width: 100%;
  max-width: 1280px; // 匹配页面宽度
  margin: 60px auto 30px; // 上下外间距放大（原40px/20px）
  padding: 0 30px; // 左右内边距放大（原20px）
  box-sizing: border-box;
  color: #666;
  font-size: 16px; // 基础字体放大（原14px）
}

/* 顶部细横线 */
.footer-divider {
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-bottom: 30px; // 横线与内容间距放大（原20px）
}

/* 核心内容区：左右布局（核心修改：移除flex-wrap，保留两侧排列） */
.footer-main {
  display: flex;
  justify-content: space-between; // 核心：保持左右两端对齐（大屏/中屏）
  align-items: center; // 垂直居中，保持布局整洁
  margin-bottom: 24px; // 内容与版权语间距放大（原16px）
  gap: 24px; // 仅作为最小间距兜底，不触发换行
  flex-wrap: nowrap; // 核心：禁止换行，强制保持左右两侧排列（中屏/小屏）
}

/* 左侧问候语 */
.footer-text {
  font-size: 20px; // 大屏默认字体
  color: #000;
  line-height: 1.8; // 行高放大，更宽松（原1.5）
  white-space: nowrap; // 辅助：防止文字换行，保持左侧整体布局（大屏/中屏）
}

/* 右侧联系方式 */
.footer-contact {
  text-align: right; // 核心：保持右侧文字右对齐（大屏/中屏）
  .contact-item {
    margin: 0;
    font-size: 16px; // 大屏默认字体
    line-height: 2; // 行高放大（原1.6）
    &:first-child {
      margin-bottom: 8px; // 联系方式间距放大（原4px）
    }
  }
}

/* 底部版权语 */
.footer-copyright {
  width: 100%;
  text-align: center;
  font-size: 14px; // 大屏默认字体
  color: #333;
  padding-top: 16px; // 版权语上内边距放大（原10px）
  border-top: 1px solid #f5f5f5;
  line-height: 1.8;
}

/* 响应式断点1：中屏（768px ≤ 宽度 ≤ 1280px）- 保持左右排列，缩小字号和间距 */
@media (max-width: 1280px) and (min-width: 768px) {
  .footer-container {
    padding: 0 25px; // 中屏缩小左右内边距
    margin: 50px auto 30px; // 微调上下外边距
  }

  .footer-text {
    font-size: 18px; // 中屏问候语缩小（从20px→18px）
  }

  .footer-contact .contact-item {
    font-size: 15px; // 中屏联系方式缩小（从16px→15px）
    line-height: 1.9; // 微调行高，保持紧凑
  }

  .footer-main {
    gap: 16px; // 中屏缩小兜底间距
    margin-bottom: 20px; // 微调内容与版权语间距
  }
}

/* 响应式断点2：小屏（481px ≤ 宽度 ≤ 767px）- 整体居中对齐，缩小字号 */
@media (max-width: 767px) and (min-width: 481px) {
  .footer-container {
    padding: 0 20px; // 小屏缩小左右内边距
    margin: 45px auto 30px; // 微调上下外边距
  }

  .footer-text {
    font-size: 16px; // 小屏问候语进一步缩小（从20px→16px）
    line-height: 1.6; // 微调行高，适配小屏
    white-space: normal; // 允许文字换行，避免溢出（小屏专属）
    text-align: center; // 核心修改1：问候语水平居中
  }

  .footer-contact .contact-item {
    font-size: 14px; // 小屏联系方式进一步缩小（从16px→14px）
    line-height: 1.8; // 微调行高，保持紧凑
  }

  .footer-main {
    gap: 12px; // 小屏缩小兜底间距
    margin-bottom: 18px; // 微调内容与版权语间距
    /* 核心修改2：核心内容区改为横向居中（取代左右两端对齐） */
    justify-content: center; // 横向整体居中
    align-items: center; // 保持垂直居中
  }

  /* 核心修改3：联系方式居中对齐（取代右对齐） */
  .footer-contact {
    text-align: center; // 小屏联系方式居中
  }
}

/* 响应式断点3：超小屏（≤480px）- 整体居中显示，适配手机窄屏 */
@media (max-width: 480px) {
  .footer-container {
    margin-top: 40px;
    padding: 0 20px;
  }

  /* 核心修改1：核心内容区改为垂直布局+水平居中 */
  .footer-main {
    flex-direction: column; // 切换垂直布局
    align-items: center; // 水平居中（关键，实现整体居中）
    justify-content: center; // 垂直居中兜底
    gap: 16px; // 垂直布局下的上下间距
    margin-bottom: 18px;
  }

  /* 核心修改2：联系方式居中对齐 */
  .footer-contact {
    text-align: center; // 取代左对齐，实现联系方式居中
  }

  /* 核心修改3：问候语居中对齐，允许换行 */
  .footer-text {
    font-size: 14px; // 超小屏问候语略调小
    white-space: normal; // 允许文字换行，避免溢出
    text-align: center; // 新增：问候语水平居中
    line-height: 1.6; // 微调行高，适配居中布局
  }

  /* 联系方式字号保持，优化行高 */
  .footer-contact .contact-item {
    font-size: 12px; // 超小屏联系方式保持缩小尺寸
    line-height: 1.6; // 微调行高，适配居中布局
  }
}
</style>
