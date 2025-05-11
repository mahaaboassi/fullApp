import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import the translation files
import translationEN from './data/en/translation.json';
import translationAr from './data/ar/translation.json';

// Configure "" i18next
i18n
  .use(initReactI18next) // Passes i18next down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAr,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Language to use if the translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;