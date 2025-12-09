// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 左侧导航栏切换功能
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

    if (sidebarToggle && sidebar && sidebarBackdrop) {
        // 侧边栏开关点击事件
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarBackdrop.classList.toggle('active');
            
            // 切换图标
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // 点击遮罩层关闭侧边栏
        sidebarBackdrop.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarBackdrop.classList.remove('active');
            
            // 恢复图标
            const icon = sidebarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    }

    // 汉堡菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // 切换图标（汉堡/关闭）
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 标签切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有标签的active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 为当前点击的标签添加active类
            this.classList.add('active');

            // 显示对应的内容
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 关闭侧边栏（如果打开）
                if (sidebar && sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    sidebarBackdrop.classList.remove('active');
                    const icon = sidebarToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 待解锁地区点击事件 - 阻止默认行为并提示
    document.querySelectorAll('.sidebar-menu a:has(.fa-circle-o)').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            alert('此目的地尚未解锁，敬请期待！');
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 添加卡片动画效果
    const animateCards = function() {
        const cards = document.querySelectorAll('.destination-card');

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // 初始化卡片样式
    document.querySelectorAll('.destination-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // 初始加载时执行动画
    animateCards();

    // 滚动时执行动画
    window.addEventListener('scroll', animateCards);
});