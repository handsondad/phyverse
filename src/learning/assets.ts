/** public/ 下的静态资源地址：去掉开头的 `/`，拼上 BASE_URL，兼容 GitHub Pages 子路径部署 */
export function publicAsset(path: string, base = import.meta.env.BASE_URL): string {
  if (/^(?:https?:|data:|blob:|\.)/.test(path)) return path;
  return `${base}${path.replace(/^\/+/, '')}`;
}

/** 课件、封面这些放在 public/lessons/ 下的文件地址 */
export function lessonAsset(path: string): string {
  return publicAsset(`lessons/${path.replace(/^\/+/, '')}`);
}
