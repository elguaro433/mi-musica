#!/usr/bin/env python3
"""Genera publica/web/index.html a partir del index.html de la raíz (la app privada de Emmanuel y Elibel).

La app privada NO se toca nunca. Este script le quita lo personal y lo que Apple no admite:
  - perfiles Emmanuel/Elibel, créditos, firma, saludo con nombre
  - Piped (buscador de YouTube no oficial) y la pestaña de YouTube
  - fuentes de Google (carga desde Google: problema de privacidad en la UE)
  - aviso de «ábrela desde el icono» y autoactualización por web (la actualiza la App Store)

Uso:  python publica/crear_publica.py
Cada sustitución comprueba que el texto existe; si la app privada cambia y algo ya no encaja, falla en voz alta.
"""
import io, os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, 'index.html')
# Desde el 25/10/2026 la app pública vive en Proyectos\Apps Android\mi-musica (las de la familia no se tocan)
DESTINO = os.path.join(RAIZ, '..', '..', 'Apps Android', 'mi-musica', 'web', 'index.html')
NOMBRE = 'Mi Musiquita'         # nombre en la tienda (libre en Google Play el 25/10/2026)
VERSION_PUBLICA = '1.0'          # la de la App Store: va por su cuenta

s = io.open(ORIGEN, encoding='utf-8').read()          # traduce CRLF a \n


def cambiar(viejo, nuevo, veces=1):
    global s
    n = s.count(viejo)
    if n != veces:
        sys.exit('NO ENCAJA (%d veces, esperaba %d): %s' % (n, veces, viejo[:90].replace('\n', '↵')))
    s = s.replace(viejo, nuevo)


def cambiar_re(patron, nuevo, flags=re.S):
    global s
    s2, n = re.subn(patron, lambda m: nuevo, s, count=1, flags=flags)
    if n != 1:
        sys.exit('NO ENCAJA (regex): ' + patron[:90])
    s = s2


# 1 · Cabecera: sin perfiles por enlace, un solo manifiesto genérico
cambiar_re(r'<script>\n/\* Cada persona tiene SU enlace.*?\}\)\(\);\n</script>',
           '<script>window.__QUIEN = \'yo\'; document.write(\'<link rel="manifest" href="manifest.json">\');</script>')
cambiar_re(r'''<script>document\.write\('<meta name="apple-mobile-web-app-title" content="' \+ .*?\);</script>''',
           '<meta name="apple-mobile-web-app-title" content="Mi Música">')
cambiar('content="Tu música, tuya de verdad. Sin internet, en el coche y con tu nombre."',
        'content="Tu música, tuya de verdad. Sin internet y en el coche."')

# 1b · Pantallas de arranque de la web con el logo personal: fuera (la app nativa lleva la suya)
s, _n = re.subn(r'<link rel="apple-touch-startup-image"[^>]*>[ \t]*(?:\r?\n)?', '', s)
if _n != 6:
    sys.exit('Esperaba 6 pantallas de arranque, encontré %d' % _n)

# 2 · Fuentes de Google fuera (la letra cae a la del sistema)
cambiar('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
cambiar('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n', '')
cambiar_re(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com/css2[^>]*>\n', '')

# 3 · «¿Quién eres?»: sin botones de personas (la pantalla ya no se enseña nunca)
cambiar_re(r'    <button class="q-btn" data-p="emmanuel">.*?</button>\n    <button class="q-btn" data-p="elibel">.*?</button>\n', '')

# 4 · Créditos y firma
cambiar('MI MÚSICA — Familia Díaz González · Creador: Emmanuel Díaz', 'MI MÚSICA')
cambiar_re(r"'<div class=\"credito\">Propiedad de la.*?</div>'\+\n    '<div class=\"sign\">Emmanuel Díaz</div>'\+",
           "'<div class=\"credito\"><b>Mi Música</b><br>Versión '+APP_VERSION+'<br>__CREADOR__</div>'+\n"
           "    '<a class=\"btn\" href=\"privacidad.html\" target=\"_blank\" rel=\"noopener\">🔒&nbsp; Política de privacidad</a>'+")
cambiar("'<button class=\"btn\" id=\"a-actualizar\" style=\"margin-bottom:14px\">🔄&nbsp; Buscar actualización</button>'+\n", '')
cambiar('Enviar informe (WhatsApp)', 'Enviar informe de errores')
# El informe va al correo de soporte (no a un WhatsApp): se copia entero y se abre el correo con el principio
SOPORTE = 'emmanueldiazapps@gmail.com'
cambiar("async function copiarInforme(){\n",
        "async function informePorCorreo(){\n"
        "  var txt = await textoInforme();\n"
        "  try{ await navigator.clipboard.writeText(txt); }catch(_){}\n"
        "  var cuerpo = 'Cuéntanos qué pasó:\\n\\n\\n--- Informe (está copiado entero: si aquí sale cortado, pégalo) ---\\n' + txt.slice(0, 1500);\n"
        "  location.href = 'mailto:__SOPORTE__?subject=' + encodeURIComponent('Mi Musiquita · informe v' + APP_VERSION) + '&body=' + encodeURIComponent(cuerpo);\n"
        "  toast('Se abre tu correo para escribirnos. El informe completo está copiado.', 'bueno', 6000);\n"
        "}\n"
        "async function copiarInforme(){\n  return informePorCorreo();\n")

s = s.replace('Cómo traer mi música del PC', 'Cómo añadir mi música')

# 5 · Una sola persona anónima
cambiar_re(r"var PERSONAS = \{.*?\n\};",
           "var PERSONAS = {\n  yo:{n:'Mi música', corto:'', ini:'♪', sexo:'', g:'linear-gradient(135deg,#a970ff,#ff5fa6)', c:'#a970ff'}\n};")
cambiar("esc(p.corto.charAt(0))", "esc(p.ini || p.corto.charAt(0))")
cambiar("esc(saludoHora() + ', ' + PERSONAS[yo].corto)", "esc(saludoHora())")
cambiar("canciones de ' + PERSONAS[yo].corto + ' de este teléfono.'", "canciones de este teléfono.'")
cambiar("Son tuyas: Elibel tiene las suyas.", "Son solo tuyas: se guardan en este iPhone.")
cambiar("if(!yo) yo = localStorage.getItem('mm_perfil') || 'emmanuel';", "if(!yo) yo = 'yo';")
cambiar("var guardado = PERSONAS[window.__QUIEN] ? window.__QUIEN : 'emmanuel';", "var guardado = 'yo';")
cambiar("(emmanuel|elibel|emiliano|alejandro)\\b/i);\n    return m ? m[1].toLowerCase() : '';", "(nunca-existe)\\b/i);\n    return m ? m[1].toLowerCase() : '';")

# 6 · Sin YouTube no oficial (Piped) ni pestaña de YouTube
cambiar_re(r"var PIPED = \[.*?\];", "var PIPED = [];       // versión pública: sin buscador no oficial de YouTube")
cambiar("async function buscarYouTube(texto){\n", "async function buscarYouTube(texto){\n  throw new Error('no disponible en la versión pública');\n")
cambiar_re(r'      <button class="tab" data-t="youtube">.*?YouTube</button>\n', '')
cambiar_re(r"    '<button class=\"opc\" data-ap-yt=\"1\">.*?</span></button>' \+\n", '')
cambiar("  escucharCompleta(p);\n}\n/* ── la hoja de una canción de Apple ── */",
        "  toast('Esta canción no está completa en Audius. Prueba con otra o con la radio.', 'malo', 4500);\n}\n/* ── la hoja de una canción de Apple ── */")
cambiar("async function escucharCompleta(p){\n", "async function escucharCompleta(p){\n  toast('Esta canción no está completa en Audius. Prueba con otra o con la radio.', 'malo', 4500); return;\n")

# 7 · Sin avisos de «web en Safari» ni autoactualización por web
cambiar("if(!standalone && guardado){", "if(false){")
cambiar("async function buscarActualizacion(forzar){\n", "async function buscarActualizacion(forzar){\n  return false;       // la versión pública la actualiza la App Store\n")

# 8 · Versión propia de la tienda (la privada va por su cuenta)
cambiar_re(r"var APP_VERSION = '[\d.]+';", "var APP_VERSION = '" + VERSION_PUBLICA + "';")

# 9 · Mundial: sin las emisoras de casa (Andorra, Barquisimeto…); Inicio y Radio según el país del teléfono
cambiar_re(r"var EMISORAS = \[.*?\];\n", "var EMISORAS = [];      // versión pública: las emisoras salen del país del teléfono\n")
cambiar("""  h += '<div class="tabs" style="margin-top:14px">' + PAISES_INI.map(function(p){
    return '<button class="tab'+(p[0] === paisIni() ? ' on' : '')+'" data-pais="'+p[0]+'">'+p[1]+' '+p[2]+'</button>'; }).join('') + '</div>';""",
        "  h += bloqueResumen() + selectorPais();")
cambiar("    C.innerHTML = botones + bloqueMundo() + propias;",
        "    C.innerHTML = botones + bloqueMundo() + bloquePaisRadio() + propias;")

# 10 · Términos de uso junto a la privacidad
cambiar("""'<a class="btn" href="privacidad.html" target="_blank" rel="noopener">🔒&nbsp; Política de privacidad</a>'+""",
        """'<a class="btn" href="privacidad.html" target="_blank" rel="noopener">ℹ️&nbsp; Política de privacidad</a>'+
    '<a class="btn" href="terminos.html" target="_blank" rel="noopener">📖&nbsp; Términos de uso</a>'+""")

# Lo que queda con nombres propios son solo comentarios del código: se neutralizan también
for viejo, nuevo in [('Emiliano y Emmanuel Alejandro', 'los niños'), ("'emiliano' | 'alejandro'", "'nino1' | 'nino2'"), ('Elibel', 'un usuario'), ('Emmanuel', 'un usuario'), ('elibel', 'perfil2'), ('emmanuel', 'perfil1'), ('Dacia', 'coche')]:
    s = s.replace(viejo, nuevo)

# 11 · Mejoras e idiomas de la versión pública (publica/i18n.js y publica/mejoras.js), al final del guion principal
import json
def leer(n):
    return io.open(os.path.join(RAIZ, 'publica', n), encoding='utf-8').read()
tr = json.loads(leer('en.json'))
i18n = leer('i18n.js').replace('__EN__', json.dumps(tr['textos'], ensure_ascii=False, indent=0)) \
                      .replace('__EN_RX__', json.dumps(tr['patrones'], ensure_ascii=False))
mej = leer('mejoras.js').replace('__APPLE_CC__', leer('paises_apple.txt').strip())
fin = s.rfind('\n</script>\n</body>')
if fin < 0:
    sys.exit('NO ENCAJA: final del guion principal')
s = s[:fin] + '\n' + i18n + '\n' + mej + s[fin:]

# 11b · El nombre de la tienda en todo lo visible (los textos en inglés se traducen solos con en.json)
s = s.replace('Mi Música', NOMBRE).replace('MI MÚSICA', NOMBRE.upper())

# 12 · Firma del creador, la misma en todas sus apps (publica/creador.txt)
s = s.replace('__CREADOR__', leer('creador.txt').strip())
s = s.replace('__SOPORTE__', SOPORTE)   # al final: la limpieza de nombres de arriba lo estropearía

os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
t = DESTINO + '.tmp'
with io.open(t, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(s)
os.replace(t, DESTINO)

# Comprobación final: nada personal debe quedar en el texto visible ni en el código
restos = []
for palabra in ['Elibel', 'elibel', 'Díaz', 'Dacia', 'piped', 'fonts.googleapis', '050216', 'Emmanuel', 'emmanuel', '2004']:
    for n, linea in enumerate(s.split('\n'), 1):
        if palabra in linea and 'Creada por' not in linea:
            restos.append((palabra, n, linea.strip()[:100]))
print('Escrito', DESTINO)
print('Restos (conviene que sean solo comentarios):', len(restos))
for r in restos:
    print('  ', r)
