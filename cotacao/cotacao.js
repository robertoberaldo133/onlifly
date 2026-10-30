(function () {
var $ = function (i) { return document.getElementById(i); };

/* ===================== tabelas ===================== */
var MES_N = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
var MES = {jan:1,fev:2,mar:3,abr:4,mai:5,jun:6,jul:7,ago:8,set:9,out:10,nov:11,dez:12,
           feb:2,apr:4,may:5,aug:8,sep:9,oct:10,dec:12};
var DIA_N = ['dom','seg','ter','qua','qui','sex','sáb'];

var CIA = {G3:'GOL',LA:'LATAM',JJ:'LATAM',AD:'Azul',TP:'TAP Air Portugal',IB:'Iberia',
  UX:'Air Europa',AF:'Air France',KL:'KLM',LH:'Lufthansa',LX:'Swiss',AZ:'ITA Airways',
  EK:'Emirates',QR:'Qatar Airways',EY:'Etihad Airways',TK:'Turkish Airlines',A3:'Aegean',
  AA:'American Airlines',UA:'United',DL:'Delta',CM:'Copa Airlines',AV:'Avianca',
  AR:'Aerolineas Argentinas',BA:'British Airways',AC:'Air Canada',AT:'Royal Air Maroc',
  SN:'Brussels Airlines',OS:'Austrian',AY:'Finnair',ET:'Ethiopian',MS:'EgyptAir',
  SQ:'Singapore Airlines',H2:'Sky Airline',JA:'JetSmart'};

var AERO = {GRU:'São Paulo',CGH:'São Paulo',VCP:'Campinas',GIG:'Rio de Janeiro',SDU:'Rio de Janeiro',
  BSB:'Brasília',CNF:'Belo Horizonte',PLU:'Belo Horizonte',SSA:'Salvador',REC:'Recife',
  FOR:'Fortaleza',NAT:'Natal',MCZ:'Maceió',JPA:'João Pessoa',AJU:'Aracaju',SLZ:'São Luís',
  BEL:'Belém',MAO:'Manaus',CWB:'Curitiba',FLN:'Florianópolis',NVT:'Navegantes',
  POA:'Porto Alegre',IGU:'Foz do Iguaçu',VIX:'Vitória',CGB:'Cuiabá',CGR:'Campo Grande',
  GYN:'Goiânia',THE:'Teresina',PMW:'Palmas',JJD:'Jericoacoara',BPS:'Porto Seguro',
  IOS:'Ilhéus',FEN:'Fernando de Noronha',MCP:'Macapá',PVH:'Porto Velho',RBR:'Rio Branco',
  BVB:'Boa Vista',UDI:'Uberlândia',LDB:'Londrina',CXJ:'Caxias do Sul',
  LIS:'Lisboa',OPO:'Porto',MAD:'Madri',BCN:'Barcelona',CDG:'Paris',ORY:'Paris',
  FCO:'Roma',MXP:'Milão',LIN:'Milão',VCE:'Veneza',NAP:'Nápoles',FLR:'Florença',
  ATH:'Atenas',JTR:'Santorini',JMK:'Mykonos',HER:'Creta',
  LHR:'Londres',LGW:'Londres',FRA:'Frankfurt',MUC:'Munique',AMS:'Amsterdã',ZRH:'Zurique',
  BRU:'Bruxelas',VIE:'Viena',PRG:'Praga',BUD:'Budapeste',CPH:'Copenhague',
  IST:'Istambul',DXB:'Dubai',AUH:'Abu Dhabi',DOH:'Doha',CMN:'Casablanca',CAI:'Cairo',
  JNB:'Joanesburgo',CPT:'Cidade do Cabo',
  MIA:'Miami',MCO:'Orlando',FLL:'Fort Lauderdale',JFK:'Nova York',EWR:'Nova York',
  LGA:'Nova York',LAX:'Los Angeles',LAS:'Las Vegas',SFO:'São Francisco',ORD:'Chicago',
  IAD:'Washington',BOS:'Boston',ATL:'Atlanta',DFW:'Dallas',IAH:'Houston',
  CUN:'Cancún',MEX:'Cidade do México',PTY:'Cidade do Panamá',BOG:'Bogotá',LIM:'Lima',
  SCL:'Santiago',EZE:'Buenos Aires',AEP:'Buenos Aires',MVD:'Montevidéu',ASU:'Assunção',
  SJU:'San Juan',PUJ:'Punta Cana',HAV:'Havana',
  NRT:'Tóquio',HND:'Tóquio',ICN:'Seul',PEK:'Pequim',PVG:'Xangai',BKK:'Bangkok',
  SIN:'Singapura',SYD:'Sydney',AKL:'Auckland'};

var BR = ['GRU','CGH','VCP','GIG','SDU','BSB','CNF','PLU','SSA','REC','FOR','NAT','MCZ',
  'JPA','AJU','SLZ','BEL','MAO','CWB','FLN','NVT','POA','IGU','VIX','CGB','CGR','GYN',
  'THE','PMW','JJD','BPS','IOS','FEN','MCP','PVH','RBR','BVB','UDI','LDB','CXJ'];

/* Bagagem de mao por companhia. kg serve so para ordenar da mais restritiva
   para a mais generosa; num trecho com duas companhias vale a menor, porque e
   conferida em cada portao. */
var BAGMAO = {
  'GOL':   {kg:12, txt:'1 mala de mão de 12 kg e 1 item pessoal de 10 kg por passageiro'},
  'LATAM': {kg:12, txt:'1 mala de mão de 12 kg e 1 item pessoal de 10 kg por passageiro'},
  'Azul':  {kg:10, txt:'1 mala de mão de 10 kg e 1 item pessoal por passageiro'},
  'TAP Air Portugal': {kg:10, txt:'1 mala de mão de 10 kg e 1 item pessoal de 2 kg por passageiro'},
  'Air Europa': {kg:10, txt:'1 mala de mão de 10 kg e 1 item pessoal por passageiro'},
  'Avianca':    {kg:10, txt:'1 mala de mão de 10 kg e 1 item pessoal por passageiro'},
  'Emirates':   {kg:7,  txt:'1 peça de mão de 10 kg saindo do Brasil e 7 kg nos demais trechos, contando bolsa e mochila'},
  'American Airlines': {kg:99, txt:'1 mala de mão e 1 item pessoal por passageiro, sem limite de peso'}
};

var LIXO = [/^estimativa de emiss/i,/^potencial de aquecimento/i,/^espa[çc]o para as pernas/i,
  /^wi-?fi/i,/^sa[íi]da usb/i,/^tomada/i,/^streaming/i,/^v[íi]deo sob demanda/i,
  /^econ[ôo]mica$/i,/^executiva$/i,/^primeira classe$/i,/^premium/i,
  /^avi[ãa]o e tripula/i,/^monitorar/i,/^ida e volta/i,/^somente ida/i,
  /^durante a noite$/i,/menos emiss[õo]es$/i,/^selecionar$/i,/^escolher$/i,
  /^aeroporto/i,/^separado por/i,/^voo operado por/i,/^classe/i,/^assento/i];

var NAO_NOME = new RegExp(['viagem','voo','aeroporto','econ[ôo]mica','executiva','primeira',
  'monitorar','pre[çc]o','alerta','bagagem','pessoa','passageiro','adulto','crian[çc]a',
  'beb[êe]','escala','parada','dura[çc][ãa]o','classe','cidade','ida','volta','direto',
  'durante','noite','assento','tripula','operado','emiss','conex'].join('|'), 'i');
var CONECTOR = ['de','da','do','das','dos','e','di','du','del','la','van','von'];

/* ===================== utilidades ===================== */
function ehLixo(l){ for(var i=0;i<LIXO.length;i++){ if(LIXO[i].test(l)) return true } return false }
function semAcento(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase() }
function cidade(c){ return AERO[c] || c }
function z2(n){ n=String(n); return n.length<2 ? '0'+n : n }
function moeda(n){ return n.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2}) }
function maiuscula(w){ var c=w.charAt(0); return c===c.toUpperCase() && c!==c.toLowerCase() }

/* minutos <-> "8h15min" */
function minDe(s){
  var h=s.match(/(\d+)\s*h/), m=s.match(/(\d+)\s*min/);
  return (h?+h[1]:0)*60 + (m?+m[1]:0);
}
function durTxt(min){
  if(!min) return '';
  var h=Math.floor(min/60), m=min%60;
  return h ? (h+'h'+(m?z2(m)+'min':'')) : (m+'min');
}

function pareceNome(s){
  if(!s || /\d/.test(s) || ehLixo(s) || NAO_NOME.test(s)) return false;
  if(!/^[A-Za-zÀ-ÿ'´`^~.\- ]{4,60}$/.test(s)) return false;
  var p=s.split(/\s+/), i, w, n=0;
  if(p.length<2 || p.length>6) return false;
  for(i=0;i<p.length;i++){
    w=p[i];
    if(CONECTOR.indexOf(w.toLowerCase())>=0) continue;
    if(!maiuscula(w)) return false;
    n++;
  }
  if(n<2) return false;
  var x;
  for(x in CIA){ if(semAcento(CIA[x])===semAcento(s)) return false }
  for(x in AERO){ if(semAcento(AERO[x])===semAcento(s)) return false }
  return true;
}

function dataDe(l){
  var a=l.match(/(\d{1,2})\s*\/\s*(\d{1,2})(?:\s*\/\s*(\d{2,4}))?\s*$/);
  if(a) return {d:+a[1], m:+a[2], a:a[3]?(+a[3]<100?2000+ +a[3]:+a[3]):null};
  var b=semAcento(l).match(/(\d{1,2})\s*de\s*([a-z]{3})/);
  if(b && MES[b[2]]) return {d:+b[1], m:MES[b[2]], a:null};
  return null;
}

/* ===================== leitor ===================== */
function ler(txt){
  var L = txt.split(/\r?\n/).map(function(s){ return s.replace(/^[•·*•]+\s*/,'').trim() });
  var secao=null, nTrecho=0, datas={},
      pontos={ida:[],volta:[],extra:[]}, cias={ida:[],volta:[],extra:[]},
      voos={ida:[],volta:[],extra:[]}, aero={ida:[],volta:[],extra:[]},
      paradas={ida:[],volta:[],extra:[]}, pernas={ida:[],volta:[],extra:[]},
      bag=[], sobra=[], total=null, pax='', cliente='';

  for(var i=0;i<L.length;i++){
    var l=L[i];
    if(!l) continue;

    if(/^voo de ida|^ida$|^trecho de ida/i.test(l)){ secao='ida'; nTrecho=Math.max(nTrecho,1); continue }
    if(/^voo de volta|^voo de regresso|^volta$|^trecho de volta/i.test(l)){ secao='volta'; nTrecho=Math.max(nTrecho,2); continue }
    if(/^(voo|trecho)\s*\d+\b/i.test(l)){
      nTrecho++;
      secao = nTrecho===1 ? 'ida' : (nTrecho===2 ? 'volta' : 'extra');
      continue;
    }

    var nm=l.match(/^(?:cliente|passageiro|nome)\s*:\s*(.+)$/i);
    if(nm){ cliente=nm[1].trim(); continue }

    var d=dataDe(l);
    if(d){ if(secao && !datas[secao]) datas[secao]=d; else sobra.push(l); continue }

    var t=l.match(/^(\d{1,2}):(\d{2})\s*(\+\d)?$/);
    if(t){
      var cod=null;
      for(var j=i+1;j<L.length && j<i+6;j++){
        if(/^\d{1,2}:\d{2}/.test(L[j])) break;
        var m=L[j].match(/\(([A-Z]{3})\)\s*$/);
        if(m){ cod=m[1]; i=j; break }
      }
      if(cod && secao) pontos[secao].push({h:z2(t[1])+':'+t[2], mais:t[3]||'', cod:cod});
      continue;
    }

    var tv=l.match(/^tempo de viagem:\s*(.+)$/i);
    if(tv){ if(secao) pernas[secao].push(minDe(tv[1])); continue }

    var p=l.match(/^parada de\s+(.+)$/i);
    if(p){ if(secao) paradas[secao].push(minDe(p[1])); continue }

    var f=l.match(/^([A-Z][A-Z0-9])\s?(\d{1,4})$/);
    if(f){
      if(secao){ cias[secao].push(CIA[f[1]]||f[1]); voos[secao].push(f[1]+' '+f[2]) }
      continue;
    }

    var av=l.match(/^(Boeing|Airbus|Embraer|ATR)\b.*/i);
    if(av){ if(secao) aero[secao].push(av[0]); continue }

    if(/bagagem/i.test(l)){ bag.push(l); continue }

    var px=l.match(/(\d+)\s*(pessoas?|passageiros?|adultos?|pax)\b/i);
    if(px && !pax){ pax=px[0].replace(/\s+/g,' ').toLowerCase(); continue }

    var vl=l.match(/^(?:(?:valor|total|pre[çc]o)\s*:?\s*)?R?\$?\s*(\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?|\d{3,7}(?:,\d{1,2})?)$/i);
    if(vl){
      var n=parseFloat(vl[1].replace(/\./g,'').replace(',','.'));
      if(isFinite(n) && n>=200){ if(total===null || n>total) total=n; continue }
    }

    if(ehLixo(l)) continue;
    sobra.push(l);
  }

  if(!cliente){
    for(var k=sobra.length-1;k>=0;k--){
      if(pareceNome(sobra[k])){ cliente=sobra[k]; sobra.splice(k,1); break }
    }
  }

  var hoje=new Date(); hoje.setHours(0,0,0,0);
  if(datas.ida && !datas.ida.a){
    datas.ida.a=hoje.getFullYear();
    if(new Date(datas.ida.a,datas.ida.m-1,datas.ida.d)<hoje) datas.ida.a++;
  }
  if(datas.volta && !datas.volta.a){
    datas.volta.a = datas.ida ? datas.ida.a : hoje.getFullYear();
    if(datas.ida && (datas.volta.m<datas.ida.m ||
       (datas.volta.m===datas.ida.m && datas.volta.d<datas.ida.d))) datas.volta.a++;
  }

  return {
    ida:   trecho(pontos.ida, cias.ida, voos.ida, aero.ida, paradas.ida, pernas.ida, datas.ida),
    volta: trecho(pontos.volta, cias.volta, voos.volta, aero.volta, paradas.volta, pernas.volta, datas.volta),
    cliente:cliente, pax:pax, bag:bag, total:total, sobra:sobra,
    demais: nTrecho>2 ? nTrecho-2 : 0
  };
}

function trecho(pts, cs, vs, avs, pds, prn, dt){
  if(!pts.length) return null;
  var ini=pts[0], fim=pts[pts.length-1], legs=Math.floor(pts.length/2), i;

  var esc;
  if(legs<=1){ esc='Voo direto · sem paradas'; }
  else {
    var n=legs-1, onde=[];
    for(i=0;i<n;i++){
      var c = pts[i*2+1] ? cidade(pts[i*2+1].cod) : '';
      onde.push(c + (pds[i] ? ' ('+durTxt(pds[i])+')' : ''));
    }
    esc = n + (n>1?' paradas · ':' parada · ') + onde.join(' · ');
  }

  var tot=0;
  for(i=0;i<prn.length;i++) tot+=prn[i];
  for(i=0;i<pds.length;i++) tot+=pds[i];

  var uc=[], uv=[], ua=[];
  for(i=0;i<cs.length;i++){ if(uc.indexOf(cs[i])<0) uc.push(cs[i]) }
  for(i=0;i<vs.length;i++){ if(uv.indexOf(vs[i])<0) uv.push(vs[i]) }
  for(i=0;i<avs.length;i++){ if(ua.indexOf(avs[i])<0) ua.push(avs[i]) }

  return {
    data:dt, deCod:ini.cod, paraCod:fim.cod,
    sai:ini.h, cheg:fim.h, mais:fim.mais,
    cia:uc.join(' e '), cias:uc, voo:uv.join(' · '), aeronave:ua.join(' · '),
    esc:esc, dur:durTxt(tot), noturno: +ini.h.slice(0,2) >= 21 || +ini.h.slice(0,2) <= 4
  };
}

/* ===================== bagagem ===================== */
var maoAtual='', extrasAtual=[];

function bagagemDeMao(cias){
  var pior=null, i, r;
  for(i=0;i<cias.length;i++){
    r=BAGMAO[cias[i]];
    if(!r) return null;
    if(!pior || r.kg<pior.kg) pior=r;
  }
  return pior ? pior.txt : null;
}
function limitesDiferentes(cias){
  var v={}, i, r, n=0, k;
  for(i=0;i<cias.length;i++){ r=BAGMAO[cias[i]]; if(r) v[r.txt]=1 }
  for(k in v) n++;
  return n>1;
}
function contaMalas(){
  if($('b_desp').value!=='sim') return {total:0};
  var q=parseInt($('b_qtd').value,10)||1, px=$('b_pax').value, n;
  if(px==='todos'){
    var m=String($('pax').value||'').match(/\d+/);
    n = m ? parseInt(m[0],10) : 1;
  } else n=parseInt(px,10)||1;
  var s = $('b_trecho').value==='ambos' ? 2 : 1;
  return {porPax:q, pax:n, sentidos:s, total:q*n*s};
}
function textoDespachada(){
  if($('b_desp').value==='nao') return 'Sem bagagem despachada inclusa';
  var q=parseInt($('b_qtd').value,10)||1, tr=$('b_trecho').value, px=$('b_pax').value;
  var s = q + (q>1?' malas despachadas':' mala despachada') + ' de 23 kg';
  s += px==='todos' ? ' por passageiro'
     : ' para '+px+(px==='1'?' passageiro':' passageiros');
  s += tr==='ida' ? ', somente na ida' : tr==='volta' ? ', somente na volta' : ', na ida e na volta';
  if($('b_desp').value==='cia') s += ', já inclusa na tarifa';
  return s;
}
function montaBagagem(){
  var l=[];
  if(maoAtual) l.push(maoAtual);
  l.push(textoDespachada());
  $('bag').value = l.concat(extrasAtual).join('\n');
}

/* ===================== aplicar ===================== */
function fmtD(d){ return d ? z2(d.d)+'/'+z2(d.m)+'/'+d.a : '' }

function limpaCampos(){
  Array.prototype.forEach.call($('f').querySelectorAll('input,textarea'), function(el){
    if(el.id==='parc'||el.id==='desc'||el.id==='classe'||el.id==='tipo') return;
    el.value='';
  });
}

function aplicar(){
  var r=ler($('bruto').value), av=[];
  limpaCampos();

  ['ida','volta'].forEach(function(s){
    var p = s==='ida' ? 'i' : 'v', t=r[s];
    if(!t) return;
    $(p+'_data').value = fmtD(t.data);
    $(p+'_cia').value  = t.cia;
    $(p+'_de').value   = cidade(t.deCod)+' ('+t.deCod+')';
    $(p+'_para').value = cidade(t.paraCod)+' ('+t.paraCod+')';
    $(p+'_sai').value  = t.sai;
    $(p+'_cheg').value = t.cheg + (t.mais ? ' '+t.mais : '');
    $(p+'_dur').value  = t.dur;
    $(p+'_esc').value  = t.esc + (t.noturno ? ' · noturno' : '');
    $(p+'_voo').value  = [t.voo, t.aeronave].filter(Boolean).join(' · ');
  });

  if(r.cliente) $('cliente').value=r.cliente;
  if(r.pax)     $('pax').value=r.pax;
  $('tipo').value = r.volta ? 'Ida e volta' : 'Somente ida';
  if(r.total!==null) $('total').value=moeda(r.total);

  var cias=[];
  ['ida','volta'].forEach(function(s){ if(r[s]) cias=cias.concat(r[s].cias) });
  maoAtual = bagagemDeMao(cias) || '';
  var temDesp=false;
  extrasAtual=[];
  r.bag.forEach(function(l){
    if(/bagagem\s+despachada\s+inclusa/i.test(l) && !/apenas|^sem\b/i.test(l)){ temDesp=true; return }
    extrasAtual.push(l);
  });
  if(temDesp) $('b_desp').value='sim';
  montaBagagem();

  /* destaques sugeridos a partir do que foi lido */
  var dd=[];
  if(r.ida){
    var rota = cidade(r.ida.deCod)+' ⇄ '+cidade(r.ida.paraCod);
    var direto = r.ida.esc.indexOf('direto')>=0 && (!r.volta || r.volta.esc.indexOf('direto')>=0);
    dd.push(direto ? ('Voos diretos '+rota+', sem conexões')
                   : ('Melhor combinação de horários entre '+rota));
    if(r.ida.aeronave) dd.push('Aeronave '+r.ida.aeronave.split(' · ')[0]);
  }
  dd.push($('b_desp').value==='sim' ? 'Bagagem despachada inclusa' : 'Bagagem de mão inclusa');
  dd.push('Agência certificada Cadastur');
  $('dest').value = dd.join('\n');

  var h=new Date();
  $('valid').value = z2(h.getDate())+'/'+z2(h.getMonth()+1)+'/'+h.getFullYear();

  if(!r.ida) av.push('Não encontrei nenhum voo. Confira se copiou o bloco inteiro da página.');
  if(r.ida && !r.volta) av.push('Só encontrei a ida. Se a viagem tem volta, copie a página inteira.');
  if(r.demais) av.push('O itinerário tem '+(r.demais+2)+' trechos e a cotação mostra 2. Monte uma cotação por par de trechos.');
  if(r.ida && r.ida.data) av.push('Confira o ano das datas: a pesquisa não informa, eu deduzi pelo calendário.');
  if(!r.cliente) av.push('Nome do cliente não encontrado. Digite abaixo.');
  if(r.total===null) av.push('Valor não encontrado. Digite abaixo.');
  if(!temDesp && $('b_desp').value==='sim')
    av.push('A pesquisa não menciona bagagem despachada, mas a seleção está em Sim. Confirme na tarifa.');
  if(!maoAtual) av.push('Falta a bagagem de mão. Não conheço o limite dessa companhia, preencha à mão.');
  if(maoAtual && limitesDiferentes(cias))
    av.push('As companhias do trecho têm limites de mão diferentes. Usei o menor, que é o que vale no portão.');
  var dest = r.ida ? r.ida.paraCod : null;
  if(dest && BR.indexOf(dest)<0 && (cias.indexOf('GOL')>=0 || cias.indexOf('LATAM')>=0))
    av.push('Voo internacional: na tarifa Basic da GOL e da LATAM a mala de mão não vem inclusa. Confirme a tarifa.');

  var box=$('avisos');
  if(av.length){
    box.className='avisos';
    box.innerHTML='<b>Confira antes de enviar</b><ul>'+av.map(function(a){return '<li>'+a+'</li>'}).join('')+'</ul>';
  } else {
    box.className='avisos ok';
    box.innerHTML='<b>Tudo certo</b>Li todos os campos. Confira a cotação e gere o PDF.';
  }

  var sb=$('sobra');
  if(r.sobra.length){
    sb.innerHTML='<details class="sobra"><summary>'+r.sobra.length+' linhas que eu ignorei</summary><pre></pre></details>';
    sb.querySelector('pre').textContent=r.sobra.join('\n');
  } else sb.innerHTML='';

  render();
}

/* ===================== cotação ===================== */
function txt(id,v){ var e=$(id); if(e) e.textContent=v }

function lista(el, texto, classe){
  el.innerHTML='';
  String(texto||'').split('\n').map(function(l){return l.trim()}).filter(Boolean)
    .forEach(function(l){ var li=document.createElement('li'); li.textContent=l; el.appendChild(li) });
}

/* "26/12/2026" -> "sáb, 26 dez 2026" */
function dataLonga(v){
  var m=String(v||'').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if(!m) return '';
  var dt=new Date(+m[3], +m[2]-1, +m[1]);
  return DIA_N[dt.getDay()]+', '+(+m[1])+' '+MES_N[+m[2]-1]+' '+m[3];
}
function soCidade(v){ return String(v||'').replace(/\s*\([^)]*\)\s*/,'').trim() }
function soCod(v){ var m=String(v||'').match(/\(([A-Z]{3})\)/); return m?m[1]:'' }

function render(){
  var temVolta = !!($('v_de').value || $('v_data').value);

  /* cabeçalho */
  var o=soCidade($('i_de').value), d=soCidade($('i_para').value);
  txt('o_rota', (o&&d) ? (o+(temVolta?' ⇄ ':' → ')+d) : 'Cotação');

  var nome=$('cliente').value.trim();
  $('o_para').style.display = nome ? '' : 'none';
  txt('o_cliente', nome);

  var di=$('i_data').value, dv=$('v_data').value;
  txt('o_periodo', di ? (dv ? di+' a '+dv : di) : '');
  $('o_periodo').style.display = di ? '' : 'none';
  txt('o_pax', $('pax').value||'');
  $('o_pax').style.display = $('pax').value ? '' : 'none';
  txt('o_classe', 'Classe '+($('classe').value||'Econômica'));
  txt('o_tipo', $('tipo').value||'');

  /* trechos */
  ['i','v'].forEach(function(p){
    txt('o_'+p+'_data', dataLonga($(p+'_data').value));
    var sai=$(p+'_sai').value, cheg=$(p+'_cheg').value;
    txt('o_'+p+'_sai', sai);
    var mm=cheg.match(/^(.*?)\s*(\+\d)$/);
    var e=$('o_'+p+'_cheg');
    if(e) e.innerHTML = mm ? (mm[1]+'<sup>'+mm[2]+'</sup>') : cheg;
    txt('o_'+p+'_de',   soCod($(p+'_de').value)+' · '+soCidade($(p+'_de').value));
    txt('o_'+p+'_para', soCidade($(p+'_para').value)+' · '+soCod($(p+'_para').value));
    txt('o_'+p+'_dur',  $(p+'_dur').value);
    txt('o_'+p+'_esc',  $(p+'_esc').value);
    var det=$('o_'+p+'_det');
    var v=$(p+'_voo').value, c=$(p+'_cia').value;
    det.innerHTML = (v?'<b>'+v+'</b>':'') + (v&&c?' · ':'') + c;
  });
  $('bl_volta').style.display = temVolta ? '' : 'none';

  lista($('o_bag'), $('bag').value);
  lista($('o_dest'), $('dest').value);

  /* valores */
  var cheia=parseFloat(String($('total').value||'').replace(/\./g,'').replace(',','.'));
  var pct=parseFloat(String($('desc').value||'').replace(',','.'));
  var temDesc = isFinite(cheia) && isFinite(pct) && pct>0;
  var passagem = temDesc ? Math.round(cheia*(1-pct/100)*100)/100 : cheia;

  var vmala=parseFloat(String($('b_valor').value||'').replace(/\./g,'').replace(',','.'));
  var c=contaMalas(), malas=c.total;
  var bagagem = (isFinite(vmala) && malas>0) ? malas*vmala : 0;
  var geral = (isFinite(passagem)?passagem:0) + bagagem;

  $('b_soma').value = bagagem>0
    ? c.porPax+' x '+c.pax+' pax x '+c.sentidos+(c.sentidos>1?' trechos':' trecho')+
      ' = '+malas+(malas>1?' despachos':' despacho')+' · R$ '+moeda(bagagem)
    : '—';

  var px=$('pax').value||'';
  txt('o_it_voo', 'Passagem aérea'+(temVolta?' ida e volta':' somente ida')+(px?' ('+px+')':''));
  txt('o_it_voov', isFinite(passagem) ? 'R$ '+moeda(passagem) : '—');
  $('l_bag').style.display = bagagem>0 ? '' : 'none';
  txt('o_it_bag', malas+(malas>1?' despachos de bagagem':' despacho de bagagem')+
      (isFinite(vmala)?' (R$ '+moeda(vmala)+' cada)':''));
  txt('o_it_bagv', 'R$ '+moeda(bagagem));

  txt('o_tk', 'Total'+(px?' · '+px:''));
  txt('o_total', isFinite(passagem) ? moeda(geral) : '—');

  var n=parseInt($('parc').value,10);
  txt('o_parcn', n>0 ? n : 10);
  txt('o_pagto', n>0 ? ('ou em até '+n+'x no cartão') : '');

  txt('o_consultor', $('consultor').value||'');
}

/* ===================== eventos ===================== */
var LEMBRAR=['consultor','b_desp','b_qtd','b_trecho','b_pax','b_valor','desc','parc'];
LEMBRAR.forEach(function(id){
  try{ var s=localStorage.getItem('onlifly-'+id); if(s) $(id).value=s; }catch(e){}
  ['change','input'].forEach(function(ev){
    $(id).addEventListener(ev, function(){
      try{ localStorage.setItem('onlifly-'+id, this.value) }catch(e){}
      if(id!=='consultor' && id!=='desc' && id!=='parc') montaBagagem();
      render();
    });
  });
});

$('f').addEventListener('input', render);
$('bag').addEventListener('input', render);
$('ler').addEventListener('click', aplicar);
$('imprimir').addEventListener('click', function(){ window.print() });
$('limpar').addEventListener('click', function(){
  $('bruto').value='';
  limpaCampos();
  maoAtual=''; extrasAtual=[];
  montaBagagem();
  $('avisos').innerHTML=''; $('sobra').innerHTML='';
  render();
});

var EXEMPLO=[
'Voo de ida','seg., 28 de dez.','21:05','Aeroporto Internacional de Natal (NAT)',
'Tempo de viagem: 1h 35 min','22:40','Aeroporto Internacional de Salvador (SSA)','',
'Gol','G3 1913','Econômica','Boeing 737','Parada de 1h 45 min','Salvador','(SSA)',
'00:25+1','Aeroporto Internacional de Salvador (SSA)','Tempo de viagem: 8h 5 min',
'Durante a noite','11:30+1','Aeroporto Humberto Delgado (LIS)','','Tap Air Portugal','TP 28',
'Airbus A330-900neo',
'Voo de volta','dom., 24 de jan.','12:15','Aeroporto Humberto Delgado (LIS)',
'Tempo de viagem: 10h','19:15','Aeroporto Internacional do Rio de Janeiro (GIG)','',
'Gol','G3 7021','Airbus A330','Parada de 2h 25 min','Rio de Janeiro','(GIG)',
'21:40','Aeroporto Internacional do Rio de Janeiro (GIG)','Tempo de viagem: 3h 5 min',
'00:45+1','Aeroporto Internacional de Natal (NAT)','','Gol','G3 1834','Boeing 737','',
'5.522,5','Cliente: Maria Judite','2 pessoas','Bagagem despachada inclusa'
].join('\n');

$('exemplo').addEventListener('click', function(){ $('bruto').value=EXEMPLO; aplicar() });

montaBagagem();
render();
})();
