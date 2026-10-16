import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import assert from 'node:assert/strict';
import { GALLERY_ITEMS } from '../src/utils/galleryImages.js';
const root=resolve(import.meta.dirname,'..');
const walk=(p)=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
const main=readFileSync(join(root,'index.html'),'utf8');
const pages=[join(root,'index.html'),...walk(join(root,'public')).filter(p=>p.endsWith('.html'))];
const errors=[];let checked=0;
function target(url,file){
 if(!url||/^(https?:|mailto:|data:|tel:|javascript:)/i.test(url))return;
 const [pathname,fragment]=url.split('#');
 if(!pathname){if(fragment&&!readFileSync(file,'utf8').includes(`id="${fragment}"`))errors.push(`${file}: unknown anchor ${url}`);return;}
 let dest=pathname.startsWith('/')?join(root,'public',decodeURI(pathname)):resolve(dirname(file),decodeURI(pathname));
 if(pathname==='/')dest=join(root,'index.html');
 else if(pathname.startsWith('/src/'))dest=join(root,pathname);
 else if(pathname.endsWith('/'))dest=join(dest,'index.html');
 checked++;
 if(!existsSync(dest))errors.push(`${file}: missing ${url}`);
 if(fragment&&existsSync(dest)&&dest.endsWith('.html')&&!readFileSync(dest,'utf8').includes(`id="${fragment}"`))errors.push(`${file}: unknown anchor ${url}`);
}
for(const p of pages){
 const html=readFileSync(p,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${p}: duplicate IDs`);
 assert.match(html,/<meta name="robots" content="noindex, nofollow"/);
 for(const m of html.matchAll(/\b(?:href|src|data-src|poster)="([^"]*)"/g))target(m[1].replaceAll('&amp;','&'),p);
 for(const m of html.matchAll(/\bsrcset="([^"]+)"/g))for(const entry of m[1].split(','))target(entry.trim().split(/\s+/)[0],p);
}
for(const p of walk(join(root,'src')).filter(p=>p.endsWith('.css'))){
 for(const m of readFileSync(p,'utf8').matchAll(/url\(["']?(\/[^)"']+)["']?\)/g))target(m[1],p);
}
for(const p of GALLERY_ITEMS){target(p.src,join(root,'index.html'));target(p.href,join(root,'index.html'));for(const entry of p.srcset.split(','))target(entry.trim().split(/\s+/)[0],join(root,'index.html'));}
assert.equal(GALLERY_ITEMS.length,10,'Ten gallery surfaces preserve the reference composition');
assert.equal((main.match(/class="social-icon-svg"/g)||[]).length,5,'Five animated social icons');
assert.equal((main.match(/class="social-text"/g)||[]).length,3,'Three hero text links');
assert.equal((main.match(/class="wpkoi-media wpkoi-media--/g)||[]).length,5,'Five showcase media surfaces');
assert.equal((main.match(/class="awards-card"/g)||[]).length,10,'Ten journey cards');
const list=main.match(/<ul class="awards-list"[^>]*>([\s\S]*?)<\/ul>/)?.[1]??'';
assert.equal((list.match(/<li>/g)||[]).length,10,'Journey captions match the animated cards');
assert.equal((main.match(/data-email="diluxlane@gmail.com"/g)||[]).length,2);
assert.ok(!/info@danielkiss|1M\+ downloads|14\+|500\+|200\+|CSSDA|Special Kudos|Based in Hungary/.test(main),'No inherited identity or achievements');
for(const id of ['hero','skills','portfolio','wpkoi','awards','transition','contact'])assert.ok(main.includes(`id="${id}"`),`Preserve animation section ${id}`);
assert.ok(existsSync(join(root,'public/about.html')));
assert.ok(!existsSync(join(root,'public/.htaccess')),'No inherited origin redirects');
assert.ok(!existsSync(join(root,'public/sitemap.xml')),'No invented production hostname');
assert.deepEqual(errors,[]);
console.log(`PASS: ${pages.length} HTML pages; ${checked} local references; gallery, showcase and journey integrity; email and attribution content.`);
