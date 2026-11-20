import './learning.css';
import { findCard, findLabCard, units } from './lesson-index';
import { html, setHtml } from './html';
import { initProgressStore, reloadProgress } from './store';
import { leaveHome, renderHome } from './pages/home';
import { renderTopic } from './pages/topic';
import { getElement } from '../utils/dom';

/** 问答页、实验台带着全部文章、互动图（simlib）、动画和配音清单：首页和主题页用不上，打开时才加载 */
type LessonPage = typeof import('./pages/lesson');
type LabPage = typeof import('./pages/lab');
type Catalog = typeof import('./catalog');
let lessonPage: LessonPage | undefined;
let labPage: LabPage | undefined;
const loadCatalog = (): Promise<Catalog> => import('./catalog');
const loadLessonPage = (): Promise<[LessonPage, Catalog]> =>
  Promise.all([import('./pages/lesson').then(page => (lessonPage = page)), loadCatalog()]);
const loadLabPage = (): Promise<[LabPage, Catalog]> =>
  Promise.all([import('./pages/lab').then(page => (labPage = page)), loadCatalog()]);

/** 和「身体奇遇记」「化学奇遇记」一样没有顶栏：首页大标题就是招牌，其余页面都有「← 返回」。 */
const shell = html`
  <a class="skip-link" href="#learning-content">跳到正文内容</a>
  <p class="storage-notice" id="storage-notice" role="alert" hidden></p>
  <main id="learning-content" tabindex="-1"></main>
  <footer class="learning-footer">奇遇记系列 · 物理奇遇记 —— 小念一问，爸爸一答，把身边的物理看个明白</footer>`;

const notFound = html`
  <section class="empty-state">
    <h1>这个问题还没写好</h1>
    <p>回到首页，挑一个别的问题吧。</p>
    <a class="page-back" href="#home">← 回到首页</a>
  </section>`;

const loadFailed = html`
  <section class="empty-state">
    <h1>这一页没加载出来</h1>
    <p>可能是网络断了一下，刷新页面再试试。</p>
    <a class="page-back" href="#home">← 回到首页</a>
  </section>`;

const HOME_PAGES = new Set(['home', 'path', 'courses', 'progress']);

export function initLearningApp(): void {
  const root = getElement('app-content');
  root.classList.add('learning-app');
  setHtml(root, shell);
  const content = getElement('learning-content');
  const notice = getElement('storage-notice');
  root.querySelector<HTMLAnchorElement>('.skip-link')?.addEventListener('click', event => {
    event.preventDefault();
    content.focus();
  });

  initProgressStore({
    onError(error) {
      console.error('PhyVerse learning progress could not be saved or restored.', error);
      notice.hidden = false;
      notice.textContent = '无法读取或保存本机记录（浏览器存储受限或记录损坏）。阅读不受影响，只是「看过」的标记不会保留。';
    },
    onChange: () => {},
  });

  let routeId = 0;

  /** 页面包到了再画；等的时候孩子已经点去别处，就不再画这一页 */
  function renderLater<T>(thisRoute: number, load: Promise<T>, render: (loaded: T) => void): void {
    load.then(
      loaded => {
        if (thisRoute === routeId) render(loaded);
      },
      (error: unknown) => {
        console.error('PhyVerse page failed to load.', error);
        if (thisRoute === routeId) setHtml(content, loadFailed);
      },
    );
  }

  function route(focus = false): void {
    if (location.hash === '#learning-content') {
      if (content.childElementCount > 0) {
        content.focus();
        return;
      }
      history.replaceState(null, '', '#home');
      focus = true;
    }
    const thisRoute = (routeId += 1);
    lessonPage?.leaveLesson();
    labPage?.leaveLab();
    leaveHome();
    content.replaceChildren();

    const page = (location.hash.slice(1) || 'home').split('?')[0];
    const [kind, id = ''] = page.split('/');
    const unit = kind === 'topic' || kind === 'unit' ? units.find(item => item.id === id) : undefined;
    const lab = kind === 'lab' ? findLabCard(id) : undefined;
    const lesson = kind === 'q' || kind === 'lesson' || kind === 'lab' ? findCard(id) : undefined;
    if (kind === 'lab' && !lab && lesson) history.replaceState(null, '', `#q/${lesson.slug}`);

    let title = '小念和爸爸探索物理的奥秘';
    if (HOME_PAGES.has(page)) {
      renderHome(content);
    } else if (page === 'labs') {
      title = '3D 实验台';
      renderLater(thisRoute, loadLabPage(), ([labs]) => labs.renderLabs(content));
    } else if (lab) {
      title = `3D 实验台 · ${lab.title}`;
      renderLater(thisRoute, loadLabPage(), ([labs, catalog]) => labs.renderLab(content, catalog.findLab(lab.slug)!));
    } else if (unit) {
      title = unit.title;
      renderTopic(content, unit);
    } else if (lesson) {
      title = lesson.articleTitle;
      renderLater(thisRoute, loadLessonPage(), ([lessons, catalog]) => lessons.renderLesson(content, catalog.findLesson(lesson.slug)!));
    } else {
      title = '页面未找到';
      setHtml(content, notFound);
    }

    document.title = `物理奇遇记 · ${title}`;
    if (focus) {
      content.focus({ preventScroll: true });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }

  window.addEventListener('hashchange', () => route(true));
  // 只有实验台页面里的 iframe 会发消息，那时实验台的包一定已经到了
  window.addEventListener('message', event => labPage?.handleLabMessage(event));
  window.addEventListener('storage', () => {
    if (reloadProgress() && !lessonPage?.isLessonOpen() && !labPage?.isLabOpen()) route();
  });
  route();
  // 首页先轻装出场，加载完、空下来再把问答页拉进缓存，点进去就不用等
  const win = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  const idle = win.requestIdleCallback?.bind(win) ?? ((run: () => void) => window.setTimeout(run, 2000));
  const prefetch = (): void => void idle(() => void loadLessonPage().catch(() => {}), { timeout: 5000 });
  if (document.readyState === 'complete') prefetch();
  else window.addEventListener('load', prefetch, { once: true });
}
