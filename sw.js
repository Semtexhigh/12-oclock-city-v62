/* 12 O'Clock City service worker: download once, instant after. Version 470dc2f2d8 */
var V='12oc-470dc2f2d8';
var CORE=['./','./index.html','./app.html?v=470dc2f2d8'];
var LATER=['./sd/babylon.js','./sd/game.js'];
var CDN=/^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){});})).then(function(){LATER.forEach(function(u){c.add(u).catch(function(){});});});}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k.indexOf('12oc-')===0&&k!==V;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);var same=u.origin===self.location.origin;if(!same&&!CDN.test(r.url))return;
  if(same&&/\/sw\.js$/.test(u.pathname))return;
  var nav=r.mode==='navigate';
  e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:nav}).then(function(hit){var net=fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque'))c.put(nav?'./index.html':r,res.clone());return res;}).catch(function(){return hit;});return hit||net;});}));});
