import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import postProcessor from 'i18next-sprintf-postprocessor';
// import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import jp from './locales/jp.json';
const lng = localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'jp';
i18next
.use(reactI18nextModule)
.use(Backend)
.use(Cache)
// .use(LanguageDetector)
.use(postProcessor)
	.init({
		fallbackLng: lng,
		debug: false,
		ns: ['translations'],
		defaultNS: 'translations',
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
		react: {
			wait: true,
		},
		// Using simple hardcoded resources for simple example
		resources: {
			en,
			jp
		},
	}
)




export default i18next

