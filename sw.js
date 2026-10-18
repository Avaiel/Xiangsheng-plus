// Xiangsheng-plus Service Worker V1.2.9
const BUILD_INFO = Object.freeze({
  appVersion: '1.2.9',
  cacheVersion: '20261018-v130'
});

const CACHE_NAME = `xiangsheng-cache-${BUILD_INFO.appVersion}-${BUILD_INFO.cacheVersion}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});

/*
 * V1.2.9 修复「换了 index.html 手机却不更新」
 *
 * 旧逻辑对所有请求都是 cache-first：只要 sw.js 的字节没变，
 * 浏览器就认为没有新版本、不重装、不重建缓存，
 * 于是 index.html 换成新的也永远拿不到（请求根本到不了网络）。
 *
 * 现在页面导航（打开 App 那一下）改成「网络优先 + 缓存兜底」：
 *   - 在线：每次都取最新的 index.html，顺便刷新离线缓存
 *   - 离线/断网：回退到缓存，照常能打开
 * 其余静态资源（图标、manifest）保持缓存优先，省流量、离线可用。
 */
self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;

  if(request.mode === 'navigate'){
    event.respondWith(
      fetch(request)
        .then(response => {
          if(response && response.ok){
            const copy = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put('./index.html', copy))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(hit => hit || fetch(request))
  );
});
