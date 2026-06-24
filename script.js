// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️ Светлая';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                this.textContent = '☀️ Светлая';
                localStorage.setItem('theme', 'dark');
            } else {
                this.textContent = '🌙 Тёмная';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ===== ВЫПАДАЮЩЕЕ МЕНЮ =====
    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
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

// ===== АВТООПРЕДЕЛЕНИЕ ТЁМНОЙ ТЕМЫ СИСТЕМЫ =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Если в системе включена тёмная тема
    if (!localStorage.getItem('theme')) {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.textContent = '☀️ Светлая';
        localStorage.setItem('theme', 'dark');
    }
}

// Слушаем изменение темы в системе
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (e.matches) {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.textContent = '☀️ Светлая';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.textContent = '🌙 Тёмная';
        localStorage.setItem('theme', 'light');
    }
});
