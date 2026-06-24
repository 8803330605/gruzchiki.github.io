document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeToggle) themeToggle.textContent = '☀️ Светлая';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeToggle) themeToggle.textContent = '🌙 Тёмная';
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (localStorage.getItem('theme')) {
            return;
        }
        setTheme(e.matches ? 'dark' : 'light');
    });

    // ===== ВЫПАДАЮЩЕЕ МЕНЮ =====
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(function(item) {
                item.classList.remove('open');
            });
        }
    });

    // ===== ПЛАВНАЯ ПРОКРУТКА =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});