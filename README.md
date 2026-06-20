# Terra Vita Massage & Spa 🌿

**Премиальный массажный салон в Нови-Саде, Сербия**

Сайт-визитка с функцией онлайн-записи для массажного салона Terra Vita Massage & Spa.

## 🏗️ Технологии

- **HTML5** — семантическая вёрстка (article, section, nav)
- **Tailwind CSS v3** (CDN) — адаптивная сетка, утилитарные классы
- **Vanilla JS (ES6+)** — навигация, анимации, валидация формы
- **Font Awesome 6** (CDN) — иконки
- **Schema.org JSON-LD** — микроразметка для SEO/AEO

## 📁 Структура проекта

```
terra-vita-massage/
├── index.html              # Главная страница
├── usluge.html             # Услуги (catalog + filter)
├── majstori.html           # Мастера (6 карточек)
├── o-nama.html             # О нас (философия, история)
├── kontakt.html            # Контакты (адрес, карта, часы)
├── blog.html               # Блог (список статей)
├── booking.html            # Онлайн-запись (форма)
├── blog/
│   ├── masaza-posle-leta.html   # Статья 1
│   ├── kako-izabrati-masazu.html # Статья 2
│   └── masaza-stres.html         # Статья 3
├── css/
│   └── style.css           # Кастомные стили
├── js/
│   ├── main.js             # Навигация, анимации, FAQ
│   ├── booking.js          # Форма: маска телефона, валидация, time slots
│   └── schema.js           # JSON-LD микроразметка
├── images/
│   ├── logo.png            # Логотип Leaf-T
│   ├── hero-bg.png         # Фон главного экрана
│   └── masters/            # Фото мастеров
├── sitemap.xml             # Карта сайта
├── robots.txt              # Инструкции для поисковиков
├── 404.html                # Страница 404
└── README.md               # Этот файл
```

## 🚀 Деплой

Рекомендуемый способ — **Vercel** (Hobby — бесплатно):

1. Создайте репозиторий на GitHub
2. Запушьте все файлы в main/master
3. Подключите репозиторий к Vercel
4. Настройте свой домен (опционально)

Vercel автоматически определит статический сайт и развернёт его.

## 🔧 Настройка

### Форма бронирования
В файле `booking.html` замените `YOUR_ACCESS_KEY_HERE` на ваш ключ Web3Forms:

```html
<input type="hidden" name="access_key" value="ВАШ_КЛЮЧ" />
```

### Контакты
Замените `+381-64-123-4567` на реальный номер телефона салона.

### Социальные сети
Обновите ссылки на Instagram, Telegram и WhatsApp в футере и на странице контактов.

## 📊 SEO/AEO

- **JSON-LD Schema:** LocalBusiness, MedicalBusiness, HealthAndBeautyBusiness, FAQPage, HowTo, Organization, Article
- **Open Graph:** og:title, og:description, og:image (1200×630), og:type
- **Twitter Cards:** summary_large_image
- **Canonical URLs** на каждой странице
- **Статический HTML** — контент читается без JavaScript
- **FAQ** на главной для AEO (ответы LLM)

## 📱 Адаптивность

- 3 брейкпоинта: 360px / 768px / 1200px
- Mobile First
- Burger-меню на мобильных
- Sticky navbar

## 📄 Лицензия

© 2026 Terra Vita Massage & Spa. Все права защищены.
