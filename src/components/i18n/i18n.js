
import I18n from 'react-native-i18n';
import en from './locales/en';
import hi from './locales/hi';
import ka from './locales/ka';
import ta from './locales/ta';
import te from './locales/te';

I18n.fallbacks = true;

I18n.translations = {
  en,
  hi,
  ka,
  ta,
  te
};

export default I18n;
