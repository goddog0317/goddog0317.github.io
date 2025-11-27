// 平滑滚动功能
let currentScrollY = 0;
let targetScrollY = 0;
const ease = 0.01;

function updateScroll() {
    const diff = targetScrollY - currentScrollY;
    currentScrollY += diff * ease;
    window.scrollTo(0, currentScrollY);

    if (Math.abs(diff) > 0.5) {
        requestAnimationFrame(updateScroll);
    }
}

window.addEventListener('wheel', (e) => {
    e.preventDefault();
    targetScrollY += e.deltaY * 0.5;
    targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
    requestAnimationFrame(updateScroll);
}, { passive: false });

document.querySelectorAll('.vertical-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            targetScrollY = targetPosition;
            requestAnimationFrame(updateScroll);
        }
    });
});

// 右侧边栏hover显示功能
const rightSidebar = document.querySelector('.right-sidebar');
let isMouseInSidebar = false;

// 监听鼠标是否进入侧边栏
rightSidebar.addEventListener('mouseenter', () => {
    isMouseInSidebar = true;
    rightSidebar.classList.add('active');
});

// 监听鼠标是否离开侧边栏
rightSidebar.addEventListener('mouseleave', () => {
    isMouseInSidebar = false;
    rightSidebar.classList.remove('active');
});

// 当鼠标靠近右侧边缘时显示侧边栏
document.addEventListener('mousemove', (e) => {
    const windowWidth = window.innerWidth;
    // 当鼠标不在侧边栏内，且距离右侧小于50px时显示侧边栏
    if (!isMouseInSidebar && windowWidth - e.clientX < 50) {
        rightSidebar.classList.add('active');
    }
});

// 子项目点击展开/隐藏功能
document.querySelectorAll('.tab-header').forEach(header => {
    header.addEventListener('click', () => {
        // 切换当前标签的活动状态
        header.classList.toggle('active');
        // 获取对应的内容区域并切换显示状态
        const content = header.nextElementSibling;
        content.classList.toggle('active');
    });
});

// 背景图片滚动
document.addEventListener('DOMContentLoaded', function () {
    // 获取需要应用效果的元素（这里假设是body，也可以是特定容器）
    const targetElement = document.body;

    // 设置初始背景图片（如果CSS中已设置可以省略）
    targetElement.style.backgroundAttachment = "fixed"; // 固定背景防止默认滚动
    targetElement.style.backgroundSize = "cover";
    targetElement.style.backgroundPosition = "center center";

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        // 计算滚动百分比
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        const totalScrollable = documentHeight - windowHeight;
        const scrollPercentage = totalScrollable > 0 ? scrollTop / totalScrollable : 0;

        // 根据滚动百分比计算背景移动位置（这里以Y轴为例，范围-50%到50%）
        const bgMoveRange = 50; // 移动范围百分比
        const bgYPosition = (bgMoveRange * scrollPercentage + bgMoveRange) / 5;
        // const bgYPosition = scrollPercentage + 50;

        // 应用背景位置
        targetElement.style.backgroundPosition = `center ${bgYPosition}%`;
    });
});