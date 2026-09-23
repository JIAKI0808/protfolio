/**
 * 网页端 rem 适配脚本（设计稿 1280px）
 * 目标：1280 设计稿 → 桌面端 1rem=100px，等比缩放到平板/手机
 * 使用方式：设计稿量出 56px 直接写 0.56rem 即可
 */
(function (designWidth = 1280, baseFont = 100) {
    /**
     * 计算并设置 html 的 font-size
     * 1. 获取当前可视区宽度
     * 2. 最小 320px，最大 2560px，防止极端设备
     * 3. 按 1280 设计稿等比缩放
     */
    function setRem() {
        const cw = document.documentElement.clientWidth || document.body.clientWidth
        const ratio = Math.min(Math.max(cw, 320), 2560) / designWidth
        document.documentElement.style.fontSize = `${ratio * baseFont}px`
    }

    // 初始化
    setRem()

    // 窗口变化或横屏时重新计算
    window.addEventListener('resize', setRem)
    window.addEventListener('orientationchange', setRem)

    /**
     * 注册安全距离 CSS 变量，供业务样式引用
     * --sat: 顶部刘海高度
     * --sab: 底部刘海高度
     */
    const docStyle = document.documentElement.style
    docStyle.setProperty('--sat', 'env(safe-area-inset-top, 0px)')
    docStyle.setProperty('--sab', 'env(safe-area-inset-bottom, 0px)')
})()