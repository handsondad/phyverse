import './css/base.css';
import '../public/theme/tokens.css';
import { initLearningApp } from './learning/app';

const fontSheet = document.querySelector<HTMLLinkElement>('link#google-fonts');
if (fontSheet) {
  if (fontSheet.sheet) fontSheet.media = 'all';
  else fontSheet.addEventListener('load', () => { fontSheet.media = 'all'; }, { once: true });
}

initLearningApp();
