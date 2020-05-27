import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../public/locales/en/translation.json";
import translationHI from "../public/locales/hi/translation.json";
import translationIT from "../public/locales/it/translation.json";
import translationSR from "../public/locales/sr/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  hi: {
    translation: translationHI
  },
  it: {
    translation: translationIT
  },
  sr: {
    translation: translationSR
  }
}


const detectionOptions = {
	order: [
		'path',
		'cookie',
		'navigator',
		'localStorage',
		'subdomain',
		'queryString',
		'htmlTag'
	],
	lookupFromPathIndex: 0
}

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// passes i18n down to react-i18next
	.use(initReactI18next)
	.init({
		detection: detectionOptions,
		resources,
		fallbackLng: 'en',

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	})

export default i18n
