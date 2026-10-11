/* ═════ Idiomas (solo versión pública) ═════════════════════════════
   La app está escrita en español. Con el iPhone en otro idioma se enseña en inglés:
   cada texto que aparece en pantalla se busca en EN (texto exacto) y, si no está,
   en EN_RX (textos con números o nombres dentro). Lo que no esté, sale en español.
   Para añadir un idioma: otra tabla como EN y una línea en idiomaApp().            */
function idiomaApp(){
  var g = null;
  try{ g = localStorage.getItem('mm_idioma'); }catch(_){}
  if(g === 'es' || g === 'en') return g;
  var l = String((navigator.languages && navigator.languages[0]) || navigator.language || 'es').toLowerCase();
  return l.indexOf('es') === 0 ? 'es' : 'en';
}
var IDIOMA = idiomaApp();
var EN = __EN__;
var EN_RX = __EN_RX__.map(function(p){ return [new RegExp(p[0]), p[1]]; });
function T(s){
  if(IDIOMA === 'es' || s == null) return s;
  var k = String(s), r = EN[k];
  if(r != null) return r;
  var t = k.trim();
  if(t !== k && EN[t] != null) return k.replace(t, EN[t]);
  for(var i = 0; i < EN_RX.length; i++){
    if(EN_RX[i][0].test(t)) return k.replace(t, t.replace(EN_RX[i][0], EN_RX[i][1]));
  }
  return k;
}
if(IDIOMA !== 'es'){
  document.documentElement.lang = IDIOMA;
  var NO_TRAD = {SCRIPT:1, STYLE:1, TEXTAREA:1};
  var traducirNodo = function(n){
    if(n.nodeType === 3){
      var v = n.nodeValue;
      if(v && /[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(v)){ var w = T(v); if(w !== v) n.nodeValue = w; }
      return;
    }
    if(n.nodeType !== 1 || NO_TRAD[n.nodeName] || n.id === 'letra') return;
    ['placeholder', 'aria-label', 'title'].forEach(function(a){
      var v = n.getAttribute && n.getAttribute(a);
      if(v){ var w = T(v); if(w !== v) n.setAttribute(a, w); }
    });
    // Lo que escribe el usuario o viene de fuera (títulos, cantantes, emisoras) no se toca
    if(n.classList && (n.classList.contains('t') || n.classList.contains('s') || n.classList.contains('r-t') ||
       n.id === 'n-t' || n.id === 'n-s' || n.id === 'm-t' || n.id === 'm-s')) return;
    for(var c = n.firstChild; c; c = c.nextSibling) traducirNodo(c);
  };
  new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.type === 'characterData') traducirNodo(m.target);
      else if(m.type === 'attributes'){
        var v = m.target.getAttribute(m.attributeName), w = v && T(v);
        if(w && w !== v) m.target.setAttribute(m.attributeName, w);
      }
      else for(var i = 0; i < m.addedNodes.length; i++) traducirNodo(m.addedNodes[i]);
    });
  }).observe(document.documentElement, {childList:true, subtree:true, characterData:true,
                                        attributes:true, attributeFilter:['placeholder', 'aria-label', 'title']});
  document.addEventListener('DOMContentLoaded', function(){ traducirNodo(document.body); });
  if(document.body) traducirNodo(document.body);
  var _toast = toast;
  toast = function(msg, tipo, ms){ return _toast(T(msg), tipo, ms); };
  var _confirm = window.confirm, _alert = window.alert, _prompt = window.prompt;
  window.confirm = function(m){ return _confirm.call(window, T(m)); };
  window.alert = function(m){ return _alert.call(window, T(m)); };
  window.prompt = function(m, d){ return _prompt.call(window, T(m), d); };
}
