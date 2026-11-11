(function(){
var L={
tooltitle:["Invoice Maker","Générateur de factures","منشئ الفواتير"],
inv:["INVOICE","FACTURE","فاتورة"],
number:["Invoice no.","N° de facture","رقم الفاتورة"],
date:["Date","Date","التاريخ"],
due:["Due date","Échéance","تاريخ الاستحقاق"],
biz:["Your business","Votre entreprise","مؤسستك"],
client:["Client","Client","الزبون"],
billed:["Billed to","Facturé à","موجهة إلى"],
invd:["Invoice details","Détails de la facture","تفاصيل الفاتورة"],
items:["Items","Articles","المواد"],
opts:["Taxes & options","Taxes et options","الرسوم والخيارات"],
design:["Design","Design","التصميم"],
name:["Client name","Nom du client","اسم الزبون"],
bname:["Business name","Raison sociale","اسم المؤسسة"],
addr:["Address","Adresse","العنوان"],
phone:["Phone","Téléphone","الهاتف"],
email:["Email","E-mail","البريد الإلكتروني"],
rc:["RC no.","N° RC","رقم السجل التجاري"],
nif:["NIF","NIF","الرقم الجبائي NIF"],
nis:["NIS","NIS","رقم التعريف الإحصائي NIS"],
ai:["Article no. (AI)","N° d’article (AI)","رقم المادة (AI)"],
logo:["Logo","Logo","الشعار"],
rmlogo:["Remove logo","Retirer le logo","حذف الشعار"],
desc:["Description","Désignation","البيان"],
qty:["Qty","Qté","الكمية"],
price:["Unit price","Prix unitaire","سعر الوحدة"],
amount:["Amount","Montant","المبلغ"],
add:["+ Add item","+ Ajouter une ligne","+ إضافة سطر"],
rm:["Remove","Supprimer","حذف"],
sub:["Subtotal","Sous-total","المجموع الفرعي"],
disc:["Discount","Remise","التخفيض"],
dtype:["Discount type","Type de remise","نوع التخفيض"],
pct:["Percent (%)","Pourcentage (%)","نسبة (%)"],
fix:["Fixed amount","Montant fixe","مبلغ ثابت"],
net:["Total before tax (HT)","Total HT","المبلغ دون رسم (HT)"],
tva:["VAT (TVA)","TVA","الرسم على القيمة المضافة (TVA)"],
tvar:["TVA rate (%)","Taux de TVA (%)","نسبة TVA (%)"],
ttc:["Total incl. tax (TTC)","Total TTC","المبلغ مع الرسم (TTC)"],
stamp:["Stamp duty (DZD)","Droit de timbre (DA)","حق الطابع (د.ج)"],
total:["Amount due","Net à payer","المبلغ المستحق"],
notes:["Notes / payment terms","Notes / conditions de paiement","ملاحظات / شروط الدفع"],
tpl:["Template","Modèle","النموذج"],
t1:["Classic","Classique","كلاسيكي"],t2:["Modern","Moderne","عصري"],t3:["Minimal","Minimal","بسيط"],
color:["Accent color","Couleur d’accent","لون التمييز"],
lang:["Invoice language","Langue de la facture","لغة الفاتورة"],
dl:["Download PDF","Télécharger le PDF","تحميل PDF"],
nw:["New invoice","Nouvelle facture","فاتورة جديدة"],
clr:["Erase saved data","Effacer les données","مسح البيانات المحفوظة"],
saved:["Your data is saved in your browser only. Nothing is uploaded.","Vos données sont enregistrées uniquement dans votre navigateur. Rien n’est envoyé.","تُحفظ بياناتك في متصفحك فقط. لا يتم رفع أي شيء."],
prev:["Live preview","Aperçu en direct","معاينة مباشرة"],
conf:["Erase all saved data?","Effacer toutes les données enregistrées ?","هل تريد مسح جميع البيانات المحفوظة؟"],
wait:["Generating PDF…","Génération du PDF…","جارٍ إنشاء PDF…"],
item1:["Product or service","Produit ou service","منتج أو خدمة"]
};
var K='atlas-invoice-v1',IDX={en:0,fr:1,ar:2},CUR=['DZD','DA','د.ج'];
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var uiL=IDX[document.documentElement.lang]!=null?document.documentElement.lang:'en';
function tt(k){return L[k][IDX[uiL]]}
function n(x){x=parseFloat(String(x).replace(',','.'));return isFinite(x)?x:0}
function e(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nl(s){return e(s).replace(/\n/g,'<br>')}
function fmt(v){return v.toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2}).replace(/[\u202f\u00a0]/g,' ')}
function bump(v){return/\d/.test(v)?v.replace(/(\d+)(?!.*\d)/,function(m){return String(+m+1).padStart(m.length,'0')}):v+'-2'}
function fresh(keep){var y=new Date().getFullYear(),td=new Date().toISOString().slice(0,10);
 var s={biz:{name:'',address:'',phone:'',email:'',rc:'',nif:'',nis:'',ai:'',logo:''},client:{name:'',address:'',phone:'',nif:''},
 inv:{number:y+'-001',date:td,due:'',tva:19,dtype:'pct',disc:0,stamp:0,notes:'',tpl:'classic',acc:'#1AA7BF',lang:uiL==='ar'?'ar':'fr'},items:[{d:'',q:1,p:0}]};
 if(keep){s.biz=keep.biz;['tva','tpl','acc','lang'].forEach(function(k){s.inv[k]=keep.inv[k]});s.inv.number=bump(keep.inv.number)}
 return s}
var S=fresh();
try{var sv=JSON.parse(localStorage.getItem(K)||'null');if(sv){['biz','client','inv'].forEach(function(k){S[k]=Object.assign({},S[k],sv[k])});if(sv.items&&sv.items.length)S.items=sv.items}}catch(x){}
var tm;function save(){clearTimeout(tm);tm=setTimeout(function(){try{localStorage.setItem(K,JSON.stringify(S))}catch(x){}},300)}
function path(p,v){var a=p.split('.'),o=S;for(var i=0;i<a.length-1;i++)o=o[a[i]];if(v===undefined)return o[a[a.length-1]];o[a[a.length-1]]=v}
function calc(){var sub=0;S.items.forEach(function(i){sub+=n(i.q)*n(i.p)});
 var d=S.inv.dtype==='pct'?sub*Math.min(n(S.inv.disc),100)/100:Math.min(n(S.inv.disc),sub),net=sub-d,tv=net*n(S.inv.tva)/100,ttc=net+tv,st=n(S.inv.stamp);
 return{sub:sub,d:d,net:net,tv:tv,ttc:ttc,st:st,tot:ttc+st}}
function dt(v){if(!v)return'';var a=v.split('-');return a[2]+'/'+a[1]+'/'+a[0]}
function render(){
 var il=IDX[S.inv.lang],ti=function(k){return L[k][il]},m=function(v){return fmt(v)+' '+CUR[il]},c=calc(),b=S.biz,cl=S.client,i=$('#inv');
 i.className='inv t-'+S.inv.tpl;i.dir=S.inv.lang==='ar'?'rtl':'ltr';i.lang=S.inv.lang;i.style.setProperty('--acc',S.inv.acc);
 var ids=[['RC',b.rc],['NIF',b.nif],['NIS',b.nis],['AI',b.ai]].filter(function(x){return x[1]}).map(function(x){return x[0]+': '+e(x[1])}).join(' · ');
 var rows=S.items.filter(function(x){return x.d||n(x.p)>0});if(!rows.length)rows=[S.items[0]];
 var r=rows.map(function(x){return'<tr><td>'+nl(x.d)+'</td><td class="n">'+e(x.q)+'</td><td class="n">'+fmt(n(x.p))+'</td><td class="n">'+fmt(n(x.q)*n(x.p))+'</td></tr>'}).join('');
 var tr=function(k,v,cls){return'<div class="'+(cls||'')+'"><span>'+k+'</span><b>'+v+'</b></div>'};
 var t=tr(ti('sub'),m(c.sub));
 if(c.d>0)t+=tr(ti('disc')+(S.inv.dtype==='pct'?' ('+n(S.inv.disc)+'%)':''),'− '+m(c.d));
 t+=tr(ti('net'),m(c.net))+tr(ti('tva')+' ('+n(S.inv.tva)+'%)',m(c.tv))+tr(ti('ttc'),m(c.ttc));
 if(c.st>0)t+=tr(ti('stamp').replace(/\s*\(.*\)/,''),m(c.st));
 t+=tr(ti('total'),m(c.tot),'grand');
 i.innerHTML='<div class="i-top"><div class="i-brand">'+(b.logo?'<img src="'+b.logo+'" alt="">':'')+'<div><strong>'+e(b.name||'—')+'</strong><div>'+nl(b.address)+'</div><div>'+[b.phone,b.email].filter(Boolean).map(e).join(' · ')+'</div><div class="ids">'+ids+'</div></div></div>'
 +'<div class="i-title"><h2>'+ti('inv')+'</h2><div><span>'+ti('number')+'</span> <b>'+e(S.inv.number)+'</b></div><div><span>'+ti('date')+'</span> <b>'+dt(S.inv.date)+'</b></div>'+(S.inv.due?'<div><span>'+ti('due')+'</span> <b>'+dt(S.inv.due)+'</b></div>':'')+'</div></div>'
 +'<div class="i-bill"><h4>'+ti('billed')+'</h4><strong>'+e(cl.name||'—')+'</strong><div>'+nl(cl.address)+'</div><div>'+[cl.phone,cl.nif&&'NIF: '+cl.nif].filter(Boolean).map(e).join(' · ')+'</div></div>'
 +'<table class="i-items"><thead><tr><th>'+ti('desc')+'</th><th class="n">'+ti('qty')+'</th><th class="n">'+ti('price')+'</th><th class="n">'+ti('amount')+'</th></tr></thead><tbody>'+r+'</tbody></table>'
 +'<div class="i-tot">'+t+'</div>'+(S.inv.notes?'<div class="i-notes"><h4>'+ti('notes').split(' /')[0].split(' /')[0]+'</h4>'+nl(S.inv.notes)+'</div>':'');
 fit()}
function fit(){var i=$('#inv'),w=$('#pw');if(!w)return;var sc=Math.min(1,w.clientWidth/794);i.style.transform='scale('+sc+')';w.style.height=Math.ceil(i.offsetHeight*sc)+'px'}
function labels(){$$('[data-t]').forEach(function(el){el.textContent=tt(el.dataset.t)});$$('[data-ph]').forEach(function(el){el.placeholder=tt(el.dataset.ph)})}
function sync(){$$('[data-p]').forEach(function(el){el.value=path(el.dataset.p)})}
function items(){var h='';S.items.forEach(function(it,i){h+='<div class="irow" data-i="'+i+'"><input data-f="d" placeholder="'+e(tt('item1'))+'" value="'+e(it.d)+'" aria-label="'+e(tt('desc'))+'"><input data-f="q" type="number" min="0" step="any" inputmode="decimal" value="'+e(it.q)+'" aria-label="'+e(tt('qty'))+'"><input data-f="p" type="number" min="0" step="any" inputmode="decimal" value="'+e(it.p)+'" aria-label="'+e(tt('price'))+'"><output>'+fmt(n(it.q)*n(it.p))+'</output><button type="button" class="x" data-rm="'+i+'" aria-label="'+e(tt('rm'))+'">×</button></div>'});$('#rows').innerHTML=h}
$('#rows').addEventListener('input',function(ev){var r=ev.target.closest('.irow');if(!r)return;var it=S.items[+r.dataset.i];it[ev.target.dataset.f]=ev.target.value;r.querySelector('output').textContent=fmt(n(it.q)*n(it.p));render();save()});
$('#rows').addEventListener('click',function(ev){var b=ev.target.closest('[data-rm]');if(!b)return;S.items.splice(+b.dataset.rm,1);if(!S.items.length)S.items.push({d:'',q:1,p:0});items();render();save()});
$('#add').addEventListener('click',function(){S.items.push({d:'',q:1,p:0});items();render();save();var f=$$('#rows .irow input[data-f=d]').pop();f&&f.focus()});
$('#tool').addEventListener('input',function(ev){var el=ev.target;if(!el.dataset.p)return;path(el.dataset.p,el.value);render();save()});
$('#logo').addEventListener('change',function(){var f=this.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,300/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*s);cv.height=Math.round(im.height*s);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);S.biz.logo=cv.toDataURL('image/png');render();save()};im.src=rd.result};rd.readAsDataURL(f)});
$('#rmlogo').addEventListener('click',function(){S.biz.logo='';$('#logo').value='';render();save()});
$('#nw').addEventListener('click',function(){S=fresh(S);sync();items();render();save();window.scrollTo({top:$('#tool').offsetTop,behavior:'smooth'})});
$('#clr').addEventListener('click',function(){if(!confirm(tt('conf')))return;try{localStorage.removeItem(K)}catch(x){}S=fresh();sync();items();render()});
$('#dl').addEventListener('click',function(){var btn=this,fn='invoice-'+String(S.inv.number||'draft').replace(/[^\w-]+/g,'_')+'.pdf';
 if(!window.html2pdf){window.print();return}
 var h=document.createElement('div');h.style.cssText='position:fixed;left:-10000px;top:0';var c=$('#inv').cloneNode(true);c.style.transform='none';c.style.minHeight='1120px';c.style.height='1120px';c.style.overflow='hidden';h.appendChild(c);document.body.appendChild(h);
 btn.disabled=true;var o=btn.textContent;btn.textContent=tt('wait');
 var done=function(){h.remove();btn.disabled=false;btn.textContent=o};
 html2pdf().set({margin:0,filename:fn,image:{type:'jpeg',quality:.96},html2canvas:{scale:2,useCORS:true,backgroundColor:'#ffffff',scrollX:0,scrollY:0},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy']}}).from(c).save().then(done,function(){done();window.print()})});
new MutationObserver(function(){var l=document.documentElement.lang;if(IDX[l]==null||l===uiL)return;uiL=l;S.inv.lang=l==='ar'?'ar':'fr';labels();sync();items();render();save()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
window.addEventListener('resize',fit);
var mb=$('#mbar');if(mb&&window.IntersectionObserver)new IntersectionObserver(function(en){mb.classList.toggle('show',en[0].isIntersecting)},{threshold:.02}).observe($('#tool'));
$('#mprev').addEventListener('click',function(){$('#pw').scrollIntoView({behavior:'smooth',block:'start'})});$('#mdl').addEventListener('click',function(){$('#dl').click()});
labels();sync();items();render();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();
