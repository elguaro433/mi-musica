/* ═════ SOLO VERSIÓN PÚBLICA (App Store) ════════════════════════════
   crear_publica.py mete este bloque al final del guion principal de la copia pública.
   La app privada no lo lleva. Aquí se SUSTITUYEN funciones
   de la app por asignación (nunca con «function x()», que pisaría la original
   antes de poder guardarla).                                                      */

/* ── 1 · Países de todo el mundo ───────────────────────────────── */
// Tiendas de Apple con lista de éxitos (comprobadas una a una el 11/10/2026). Si el
// país del teléfono no tiene, los éxitos salen de EE. UU.; la radio sí es la del país.
var APPLE_CC = '__APPLE_CC__'.split(' ');
var REGIONES = ('ad ae af ag ai al am ao ar at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bw by bz ' +
  'ca cd cf cg ch ci cl cm cn co cr cu cv cw cy cz de dj dk dm do dz ec ee eg er es et fi fj fm fo fr ga gb gd ge ' +
  'gh gi gl gm gn gp gq gr gt gu gw gy hk hn hr ht hu id ie il im in iq ir is it jm jo jp ke kg kh km kn kr kw ky ' +
  'kz la lb lc li lk lr ls lt lu lv ly ma mc md me mg mk ml mm mn mo mq mr ms mt mu mv mw mx my mz na nc ne ng ni ' +
  'nl no np nz om pa pe pf pg ph pk pl pr ps pt py qa re ro rs ru rw sa sb sc sd se sg si sk sl sm sn so sr ss sv ' +
  'sy sz tc td tg th tj tm tn to tr tt tw tz ua ug us uy uz va vc ve vg vi vn vu ws xk ye za zm zw').split(' ');
function banderaDe(cc){
  cc = String(cc || '').toUpperCase();
  if(!/^[A-Z]{2}$/.test(cc)) return '🌍';
  return String.fromCodePoint(0x1F1E6 + cc.charCodeAt(0) - 65, 0x1F1E6 + cc.charCodeAt(1) - 65);
}
var NOMBRES_REGION = null;
function nombreRegion(cc){
  try{
    if(!NOMBRES_REGION) NOMBRES_REGION = new Intl.DisplayNames([idiomaApp()], {type:'region'});
    var n = NOMBRES_REGION.of(String(cc).toUpperCase());
    return n && n !== String(cc).toUpperCase() ? n : String(cc).toUpperCase();
  }catch(_){ return String(cc).toUpperCase(); }
}
function paisDelTelefono(){
  var ls = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
  for(var i = 0; i < ls.length; i++){
    var m = String(ls[i]).match(/[-_]([A-Za-z]{2})(?:$|[-_])/);
    if(m && REGIONES.indexOf(m[1].toLowerCase()) >= 0) return m[1].toLowerCase();
  }
  return 'us';
}
paisIni = function(){
  var g = null;
  try{ g = localStorage.getItem('mm_pais_' + yo); }catch(_){}
  return (g && REGIONES.indexOf(g) >= 0) ? g : paisDelTelefono();
};
PAISES_INI = REGIONES.map(function(cc){ return [cc, banderaDe(cc), nombreRegion(cc)]; })
  .sort(function(a, b){ return a[2].localeCompare(b[2]); });
RB_PAIS = {};
REGIONES.forEach(function(cc){ RB_PAIS[cc] = cc.toUpperCase(); });
function tiendaApple(cc){ return APPLE_CC.indexOf(cc) >= 0 ? cc : 'us'; }
// Los éxitos generales del país (la privada pide solo los latinos: genre=12)
exitosAppleDirecto = async function(cc){
  var d = await traerConLimite('https://itunes.apple.com/' + tiendaApple(cc) + '/rss/topsongs/limit=25/json', 12000);
  return [].concat((d.feed || {}).entry || []).map(pistaDeLista).filter(Boolean);
};
var _buscarAppleDirecto = buscarAppleDirecto;
buscarAppleDirecto = function(texto, cc){ return _buscarAppleDirecto(texto, tiendaApple(cc || paisIni())); };

function selectorPais(){
  var cc = paisIni();
  return '<div class="tabs" style="margin-top:14px"><button class="tab on" data-elegir-pais="1">' +
    banderaDe(cc) + ' ' + esc(nombreRegion(cc)) + ' · ' + T('Cambiar país') + '</button></div>';
}
function hojaPaises(){
  abrirHoja('<h4>' + T('¿De qué país?') + '</h4>' +
    '<div class="sub">' + T('Los éxitos y las emisoras de Inicio y Radio serán de ese país.') + '</div>' +
    '<input id="pais-q" class="campo" type="search" autocomplete="off" placeholder="' + T('Buscar país') + '" ' +
    'style="width:100%;margin:6px 0 10px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);' +
    'background:var(--card);color:var(--ink);font-size:16px">' +
    '<div id="pais-lista">' + filasPaises('') + '</div>');
}
function filasPaises(q){
  q = normTxt(q || '');
  var actual = paisIni();
  return PAISES_INI.filter(function(p){ return !q || normTxt(p[2]).indexOf(q) >= 0 || p[0] === q; })
    .map(function(p){
      return '<button class="opc" data-pais="' + p[0] + '"><span class="em">' + p[1] + '</span><span class="tx"><b>' +
        esc(p[2]) + '</b></span>' + (p[0] === actual ? '<span class="tx" style="flex:0">✓</span>' : '') + '</button>';
    }).join('') || '<div class="note">' + T('Ningún país con ese nombre.') + '</div>';
}
document.addEventListener('input', function(ev){
  if(ev.target && ev.target.id === 'pais-q') $('pais-lista').innerHTML = filasPaises(ev.target.value);
});

// Radio Browser da el país en inglés; la app lo traduce al español. En inglés se deja como viene.
if(IDIOMA !== 'es'){
  nombrePais = function(n){
    var t = String(n || '').trim().replace(/^The\s+/i, '');
    if(/^united states/i.test(t)) return 'United States';
    if(/^united kingdom/i.test(t)) return 'United Kingdom';
    return t || 'Worldwide';
  };
}

/* ── 2 · Radio: las más escuchadas del país del teléfono ───────── */
var RADIO_PAIS = {cc:'', lista:[], cargando:false};
function bloquePaisRadio(){
  var cc = paisIni();
  if(RADIO_PAIS.cc !== cc && !RADIO_PAIS.cargando){
    RADIO_PAIS.cargando = true;
    radiosTop(cc.toUpperCase()).then(function(l){ RADIO_PAIS.lista = l; }, function(){ RADIO_PAIS.lista = []; })
      .then(function(){
        RADIO_PAIS.cc = cc; RADIO_PAIS.cargando = false;
        if(vistaActual === 'buscar' && pestana === 'radio') pintarBuscar();
      });
  }
  var t = '📻 ' + T('Las más escuchadas en') + ' ' + esc(nombreRegion(cc));
  if(RADIO_PAIS.cc === cc && RADIO_PAIS.lista.length) return estante(t, 'rp', RADIO_PAIS.lista) + selectorPais();
  if(RADIO_PAIS.cargando) return esqueleto(t);
  return selectorPais();
}

/* ── 3 · Sin YouTube en la versión pública ─────────────────────── */
abrirVideoId = function(){ toast(T('Los vídeos no están disponibles en esta versión.'), null, 3500); };
escucharCompleta = function(){ toast(T('Esta canción no está completa en Audius. Prueba con otra o con la radio.'), 'malo', 4500); };

/* ── 4 · Temporizador para dormir: ya viene en la app privada (luna en «Sonando ahora», v2.7). ── */

/* ── 5 · Tu resumen: lo que más escuchas ───────────────────────── */
function datosResumen(){
  var canc = CANCIONES.filter(function(c){ return c.veces; })
    .sort(function(a, b){ return b.veces - a.veces; });
  var total = canc.reduce(function(s, c){ return s + c.veces; }, 0);
  var art = {};
  canc.forEach(function(c){ var a = primerArtista(c.artista) || ''; if(a) art[a] = (art[a] || 0) + c.veces; });
  var artistas = Object.keys(art).sort(function(a, b){ return art[b] - art[a]; }).slice(0, 5)
    .map(function(a){ return [a, art[a]]; });
  var cr = conteoRadio(), radios = Object.keys(cr).map(function(k){ return cr[k]; })
    .filter(function(x){ return x && x.e; }).sort(function(a, b){ return b.n - a.n; }).slice(0, 3);
  return {canc:canc.slice(0, 5), total:total, artistas:artistas, radios:radios, n:CANCIONES.length};
}
function bloqueResumen(){
  var d = datosResumen();
  if(!d.total && !d.radios.length) return '';
  return '<div class="tabs" style="margin-top:14px"><button class="tab on" data-resumen="1">✨ ' + T('Tu resumen') + '</button></div>';
}
function hojaResumen(){
  var d = datosResumen(), h = '<h4>✨ ' + T('Tu resumen') + '</h4><div class="sub">' +
    d.n + ' ' + T('canciones en tu biblioteca') + ' · ' + d.total + ' ' + T('reproducciones') + '</div>';
  function fila(i, t, s){
    return '<div class="opc" style="cursor:default"><span class="em" style="font:700 18px var(--font-d);color:var(--purple)">' + i +
      '</span><span class="tx"><b>' + esc(t) + '</b>' + (s ? '<br><span style="color:var(--muted)">' + esc(s) + '</span>' : '') + '</span></div>';
  }
  if(d.artistas.length) h += '<div class="city">🎤 ' + T('Tus cantantes') + '</div>' +
    d.artistas.map(function(a, i){ return fila(i + 1, a[0], a[1] + ' ' + T('reproducciones')); }).join('');
  if(d.canc.length) h += '<div class="city">🔥 ' + T('Tus canciones') + '</div>' +
    d.canc.map(function(c, i){ return fila(i + 1, c.titulo, c.artista + ' · ' + c.veces + '×'); }).join('');
  if(d.radios.length) h += '<div class="city">📻 ' + T('Tus emisoras') + '</div>' +
    d.radios.map(function(x, i){ return fila(i + 1, x.e.nombre, x.n + '×'); }).join('');
  abrirHoja(h + '<button class="opc" data-cerrar-hoja="1"><span class="tx"><b>' + T('Cerrar') + '</b></span></button>');
}

/* ── Toques de las mejoras (la app maneja los suyos aparte) ────── */
document.addEventListener('click', function(ev){
  var t = ev.target; if(!t || !t.closest || window.__swipe) return;
  var el;
  if(t.closest('[data-elegir-pais]')){ hojaPaises(); return; }
  if(t.closest('#hoja [data-pais]')){
    setTimeout(function(){ cerrarHoja(); RADIO_PAIS.cc = ''; NOMBRES_REGION = null;
      if(vistaActual === 'buscar') pintarBuscar(); }, 0);
    return;
  }
  if(t.closest('[data-resumen]')){ hojaResumen(); return; }
});
