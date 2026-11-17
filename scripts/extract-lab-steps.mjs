// 从 3D 课件里读出每一段的问题、方程、现象和结论，写进 src/data/course-dialogues.json。
// 课件的 STEPS 藏在打包好的脚本里，只有页面真正跑起来（window.__lab 就绪）才读得到，
// 所以用无头 Edge / Chrome 打开每个课件，通过 DevTools 协议读出来。
//   node scripts/extract-lab-steps.mjs            全部课件
//   node scripts/extract-lab-steps.mjs emf-step   只读这几个
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(root, 'src/data/lessons.json'), 'utf8'));
const outFile = join(root, 'src/data/course-dialogues.json');
const only = process.argv.slice(2).filter(arg => arg !== '--');
const port = 9333;

const browser = [
  process.env.CHROME_PATH,
  `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(path => path && existsSync(path));
if (!browser) throw new Error('没找到 Edge / Chrome，设置 CHROME_PATH 再跑');

const profile = join(root, '.story-preview', '.extract-browser');
mkdirSync(profile, { recursive: true });
const child = spawn(browser, [
  '--headless=new', '--no-first-run', '--hide-scrollbars', '--mute-audio',
  '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1400,900', 'about:blank',
], { stdio: 'ignore' });

const sleep = ms => new Promise(done => setTimeout(done, ms));

async function pageSocket() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = targets.find(target => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* 浏览器还没起来 */ }
    await sleep(200);
  }
  throw new Error('连不上无头浏览器');
}

const socket = new WebSocket(await pageSocket());
await new Promise((done, fail) => { socket.onopen = done; socket.onerror = fail; });
let nextId = 0;
const pending = new Map();
socket.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};
function send(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise(done => pending.set(id, done));
}
async function evaluate(expression) {
  const { result } = await send('Runtime.evaluate', { expression, returnByValue: true });
  return result?.result?.value;
}

const text = value => (typeof value === 'string' ? value : value?.text ?? '');
const READ_STEPS = `JSON.stringify((window.__lab?.STEPS ?? []).map(step => ({
  tag: step.tag ?? '', q: step.q ?? '', eq: step.eq ?? '',
  expect: typeof step.expect === 'string' ? step.expect : step.expect?.text ?? '',
  concl: typeof step.concl === 'string' ? step.concl : step.concl?.text ?? '',
  wrong: typeof step.wrong === 'string' ? step.wrong : step.wrong?.text ?? step.mis ?? '',
})))`;

const saved = existsSync(outFile) ? JSON.parse(readFileSync(outFile, 'utf8')) : {};
let failed = 0;
for (const course of catalog) {
  if (only.length && !only.includes(course.slug)) continue;
  const url = pathToFileURL(join(root, 'public/lessons', course.file)).href;
  await send('Page.navigate', { url });
  let steps;
  for (let waited = 0; waited < 40000; waited += 500) {
    await sleep(500);
    const ready = await evaluate('Boolean(window.__lab && Array.isArray(window.__lab.STEPS) && window.__lab.STEPS.length)');
    if (ready) {
      steps = JSON.parse(await evaluate(READ_STEPS));
      break;
    }
  }
  if (!steps) {
    failed += 1;
    console.error(`✖ ${course.slug}: 40 秒内课件没就绪`);
    continue;
  }
  if (steps.length !== course.steps.length) console.warn(`⚠️ ${course.slug}: 课件 ${steps.length} 段，目录写着 ${course.steps.length} 段`);
  saved[course.slug] = steps.map(step => ({ ...step, expect: text(step.expect), concl: text(step.concl) }));
  console.log(`✔ ${course.slug}: ${steps.length} 段`);
}
socket.close();
child.kill();
const ordered = Object.fromEntries(catalog.filter(course => saved[course.slug]).map(course => [course.slug, saved[course.slug]]));
writeFileSync(outFile, `${JSON.stringify(ordered, null, 1)}\n`);
await sleep(500);
rmSync(profile, { recursive: true, force: true });
console.log(failed ? `${failed} 个课件没读到` : `已写入 ${outFile}`);
process.exitCode = failed ? 1 : 0;
