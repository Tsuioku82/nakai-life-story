(function(){
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const paragraphs=s=>s.split('\n\n').map(t=>'<p class="story-text">'+esc(t)+'</p>').join('');
const slug=location.pathname.replace(/\/$/,'').split('/').pop().replace(/\.html$/,'')||'index';
const page=Math.max(0,chapters.findIndex(c=>c.file.replace(/\.html$/,'')===slug));
const c=chapters[page],names=['一','二','三'];
document.title=c.short+'｜中井さんの人生の履歴書';
document.querySelector('#app').innerHTML=`
<a class="skip" href="#main">本文へ進む</a>
<header><a class="brand" href="index.html"><span class="brand-icon" aria-hidden="true">綴</span><span>人生の履歴書<small>中井さんの、心豊かな日々。</small></span></a><div class="tools"><span id="size-label">文字の大きさ</span><div class="size-control" role="group" aria-labelledby="size-label"><button data-size="standard" aria-pressed="true">標準</button><button data-size="large" aria-pressed="false">大</button><button data-size="xlarge" aria-pressed="false">特大</button></div></div></header>
<div class="theme-bar"><span class="edition">中井さんの物語 ／ 全三篇</span><span>読書と音楽、穏やかな笑顔。</span></div>
<nav class="nav" aria-label="全3ページ">${chapters.map((x,i)=>'<a href="'+x.file+'" '+(i===page?'aria-current="page"':'')+'><span>0'+(i+1)+'</span>'+x.short+'</a>').join('')}</nav>
<main id="main"><section class="cover ${page?'inner-cover':''} ${page===1?'school-cover':''}"><div class="cover-copy"><p class="eyebrow">${['七年来の友人がつづる、三篇の物語','好きなことが、暮らしを彩る','言葉にふれる、人柄にふれる'][page]}</p><p class="chapter-no">第${names[page]}篇 <span>／ 全三篇</span></p><h1>${esc(c.title).replace(/\n/g,'<br>')}</h1>${page===0?'<p class="years">〜 八十代、今を心豊かに 〜</p>':''}<p class="intro">${esc(c.lead).replace(/\n/g,'<br>')}</p><a class="read-link" href="#story">この篇を読む <span aria-hidden="true">↓</span></a></div>
${c.image?'<figure class="book-art"><div class="book-topline">'+(page===0?'花と本のある時間':'春の学び舎を描いて')+' <span>0'+(page+1)+' / 03</span></div><div class="photo-area"><button class="photo-open" aria-label="画像を拡大して見る"><img src="'+c.image+'" alt="'+(page===0?'コスモス畑のベンチで本を手にする中井さんのイメージ':'桜並木と疎水に囲まれた京都府立洛東高等学校の春を描いたイラスト')+'" width="'+(page===0?1448:1672)+'" height="'+(page===0?1086:941)+'" fetchpriority="high"></button></div><figcaption class="caption">'+esc(c.caption)+'</figcaption><div class="book-bottom">人生の履歴書 <span>大切な時間を、言葉に。</span></div></figure>':'<div class="book-art quote-album"><p class="eyebrow">中井さんの大切な言葉</p><blockquote>毎日用事をつくる。<br><br>嫌なことは<br>明日まで持ち越さない。</blockquote><p class="quote-end">今日を、自分らしく。</p></div>'}</section>
<p class="chapter-description">${esc(c.description)}</p><div class="story-heading" id="story"><p class="eyebrow">第${names[page]}篇</p><h2>${esc(c.short)}</h2><p>どうぞ、ゆっくりお読みください。</p></div>
<div class="reading-layout"><aside><p class="eyebrow">この篇の目次</p><ol>${c.sections.map((s,j)=>'<li><a href="#section-'+j+'"><span>0'+(j+1)+'</span>'+esc(s[0])+'</a></li>').join('')}</ol><p class="side-note">本をひらくように、<br>一頁ずつ。</p></aside><div class="stories">${c.sections.map((s,j)=>'<section class="story" id="section-'+j+'"><p class="section-label"><span>0'+(j+1)+'</span>'+esc(s[0])+'</p><h3>'+esc(s[1])+'</h3>'+paragraphs(s[2])+'</section>').join('')}</div></div>
<nav class="page-turn" aria-label="前後のページ"><p>${page<2?'物語は、次の頁へ。':'また、最初の頁から。'}</p><a class="next" href="${chapters[(page+1)%3].file}"><span>${page<2?'第'+names[page+1]+'篇':'もう一度'}</span>${page<2?esc(chapters[page+1].short):'最初の頁に戻る'} <b aria-hidden="true">→</b></a><div class="page-bottom">${page>0?'<a href="'+chapters[page-1].file+'">← 前の頁へ</a>':'<span>はじまりの頁</span>'}<span>0${page+1} / 03</span><a href="#top">頁の先頭へ ↑</a></div></nav></main>
<footer><p class="footer-brand">中井さんの人生の履歴書</p><p>読書と音楽、心豊かな毎日。</p><p class="template-note">ご友人から伺ったお話をもとに、友人の目線でつづっています。</p><button id="print">この頁を印刷する</button><small>一人の人生には、一冊の本になるほどの物語がある。</small></footer>`;
let size='standard';
try{size=localStorage.getItem('nakai-text-size')||size;}catch{}
size=new URLSearchParams(location.search).get('textSize')||size;
function applySize(s){size=['standard','large','xlarge'].includes(s)?s:'standard';document.documentElement.dataset.textSize=size;document.documentElement.classList.toggle('large',size==='large');document.documentElement.classList.toggle('xlarge',size==='xlarge');document.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.size===size)));try{localStorage.setItem('nakai-text-size',size);const u=new URL(location.href);u.searchParams.set('textSize',size);history.replaceState(null,'',u);}catch{}document.querySelectorAll('a[href]').forEach(a=>{if(/^(index|memories|message)\.html/.test(a.getAttribute('href'))){const u=new URL(a.href);u.searchParams.set('textSize',size);a.href=u.pathname+u.search;}});}
applySize(size);
document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{applySize(b.dataset.size);document.querySelector('#notice').textContent='文字の大きさを「'+({standard:'標準',large:'大',xlarge:'特大'}[size])+'」にしました。';clearTimeout(window.noticeTimer);window.noticeTimer=setTimeout(()=>document.querySelector('#notice').textContent='',4000);});
document.querySelector('#print').onclick=()=>window.print();
document.querySelector('.photo-open')?.addEventListener('click',()=>{const d=document.querySelector('#photo-view');d.querySelector('img').src=c.image;d.querySelector('img').alt=c.caption;d.querySelector('.expanded-caption').textContent=c.caption;d.showModal();});
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
})();
