/**
 * Terra Vita Massage & Spa — JSON-LD Schema.org Injection
 * LocalBusiness + MedicalBusiness + FAQ + HowTo + Organization
 */

(function () {
  'use strict';

  /* ============================================
     Base LocalBusiness Schema (все страницы)
     ============================================ */
  var localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "name": "Terra Vita Massage & Spa",
    "alternateName": "Terra Vita Massage",
    "description": "Премиальный массажный салон в Нови-Саде. Классический, лечебный, спортивный массаж, SPA-программы и стоун-терапия.",
    "url": "https://terravitamassage.rs",
    "telephone": "+381-64-123-4567",
    "email": "info@terravitamassage.rs",
    "logo": "https://terravitamassage.rs/images/logo.png",
    "image": "https://terravitamassage.rs/images/hero-bg.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bulevar Mihajla Pupina 12",
      "addressLocality": "Novi Sad",
      "addressRegion": "Vojvodina",
      "postalCode": "21000",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.2551,
      "longitude": 19.8452
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "18:00",
        "description": "По предварительной записи"
      }
    ],
    "priceRange": "RSD 1500 – 8000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5"
    },
    "sameAs": [
      "https://instagram.com/terravitamassage",
      "https://t.me/terravitamassage",
      "https://wa.me/381641234567"
    ],
    "areaServed": {
      "@type": "City",
      "name": "Novi Sad"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги массажа",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Классический массаж" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SPA-программы" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Лечебный массаж" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Спортивный массаж" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Стоун-терапия" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Подарочные сертификаты" } }
      ]
    }
  };

  injectSchema(localBusiness);

  /* ============================================
     Page-specific Schemas
     ============================================ */
  var page = getPageName();

  /* --- FAQ Schema (Главная + Блог) --- */
  if (page === 'index' || page === 'blog') {
    var faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Какой массаж лучше всего подходит при болях в спине?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "При болях в спине мы рекомендуем лечебный массаж в сочетании с мануальной терапией. Наш специалист Марко Йованович, дипломированный физиотерапевт, проведёт диагностику и подберёт оптимальную программу."
          }
        },
        {
          "@type": "Question",
          "name": "Сколько длится один сеанс массажа?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Стандартный сеанс длится 60 минут. Мы также предлагаем экспресс-сеансы (30 минут) и расширенные программы (90 и 120 минут) для SPA-ритуалов."
          }
        },
        {
          "@type": "Question",
          "name": "Работаете ли вы в воскресенье?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, мы работаем по воскресеньям с 10:00 до 18:00, но только по предварительной записи. Рекомендуем бронировать воскресные визиты заранее."
          }
        },
        {
          "@type": "Question",
          "name": "Какие цены на массаж в Terra Vita?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Цены варьируются от 1500 RSD (экспресс-массаж) до 8000 RSD (SPA-программы для двоих). Точную стоимость вы можете посмотреть на странице услуг."
          }
        },
        {
          "@type": "Question",
          "name": "Нужна ли предварительная запись?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, мы работаем по предварительной записи. Вы можете записаться онлайн через форму на сайте или позвонить нам по телефону +381-64-123-4567."
          }
        },
        {
          "@type": "Question",
          "name": "Есть ли противопоказания для массажа?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, массаж имеет противопоказания: острые воспалительные процессы, онкологические заболевания, тромбоз, кожные инфекции, беременность (первый триместр). Перед первым визитом мы рекомендуем проконсультироваться с нашим специалистом."
          }
        }
      ]
    };
    injectSchema(faqSchema);
  }

  /* --- HowTo Schema (Страница услуг) --- */
  if (page === 'usluge') {
    var howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Как подготовиться к массажу в Terra Vita",
      "description": "Пошаговая инструкция подготовки к сеансу массажа для максимального расслабления и пользы.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Выберите подходящий вид массажа",
          "text": "Ознакомьтесь с нашими услугами и выберите массаж, который соответствует вашим потребностям. Не уверены? Позвоните нам — мы поможем с выбором."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Запишитесь на удобное время",
          "text": "Заполните форму онлайн-записи на сайте или позвоните по телефону. Мы работаем с 10:00 до 21:00 ежедневно."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Придите за 10 минут до сеанса",
          "text": "Прибудьте в салон заранее, чтобы заполнить анкету, переодеться и расслабиться в зоне ожидания."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Проконсультируйтесь с мастером",
          "text": "Перед началом сеанса мастер уточнит ваши пожелания, зоны воздействия и возможные противопоказания."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Наслаждайтесь процедурой",
          "text": "Расслабьтесь и доверьтесь профессионалу. После массажа мы предложим вам травяной чай и дадим рекомендации по закреплению эффекта."
        }
      ]
    };
    injectSchema(howToSchema);
  }

  /* --- Organization + BreadcrumbList (О нас) --- */
  if (page === 'o-nama') {
    var orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Terra Vita Massage & Spa",
      "description": "Премиальный массажный салон в Нови-Саде, Сербия. Основан в 2023 году.",
      "founder": [
        { "@type": "Person", "name": "Анна Петрович" }
      ],
      "foundingDate": "2023",
      "foundingLocation": "Novi Sad, Serbia"
    };
    injectSchema(orgSchema);

    var breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://terravitamassage.rs/" },
        { "@type": "ListItem", "position": 2, "name": "О нас", "item": "https://terravitamassage.rs/o-nama.html" }
      ]
    };
    injectSchema(breadcrumbSchema);
  }

  /* ============================================
     Helper Functions
     ============================================ */
  function injectSchema(schema) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  function getPageName() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path.replace('.html', '');
  }
})();
