import en from '../plugins/en-locale'
import pt from '../plugins/pt_BR-locale'

export default {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      flagSrc: 'https://cdn.vuetifyjs.com/images/flags/us.png',
    },
    {
      code: 'pt',
      iso: 'pt-BR',
      name: 'Português',
      flagSrc: 'https://cdn.vuetifyjs.com/images/flags/br.png',
    },
  ],
  defaultLocale: 'pt',
  strategy: 'prefix',
  vueI18n: {
    fallbackLocale: 'pt',
    messages: { en, pt },
  },
}
