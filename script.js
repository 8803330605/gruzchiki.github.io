// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');

    // Функция применения темы
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

    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Если пользователь уже выбирал тему — используем её
        setTheme(savedTheme);
    } else {
        // Если нет — проверяем системную тему
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemDark ? 'dark' : 'light');
    }

    // Кнопка переключения
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // СЛУШАЕМ ИЗМЕНЕНИЕ СИСТЕМНОЙ ТЕМЫ, НО НЕ ПЕРЕЗАПИСЫВАЕМ ВЫБОР ПОЛЬЗОВАТЕЛЯ
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Если пользователь уже выбирал тему вручную — не трогаем
        if (localStorage.getItem('theme')) {
            return;
        }
        // Иначе подстраиваемся под систему
        setTheme(e.matches ? 'dark' : 'light');
    });

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