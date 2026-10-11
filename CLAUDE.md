# 🎵 Mi Música — dónde quedamos

> **Para el futuro Claude:** lee `README.md` primero (qué es, qué tiene, cómo
> publicarla). Esto es solo lo que NO se ve en el código. La historia completa
> versión a versión está en `git log` (y la versión larga de este fichero,
> en el commit anterior al 11/10/2026).
> El usuario es **Emmanuel Díaz** (estudiante de ing. informática, vive en
> Andorra, venezolano). Habla en español, tono cercano y honesto, sin sermones.
> **Nunca digas "robar" ideas; se dice "copiar/inspirarse".** Sus apps llevan
> crédito "Familia Díaz González · Creador: Emmanuel Díaz" y firma
> "Emmanuel Díaz". **Escribe por voz**: confirmar nombres dudosos.

## Estado (11/10/2026, v2.6)

- Publicada, la usan él (iPhone 14 Pro, 393×852) y Elibel (iPhone 16 Pro Max,
  440×956), ambos iOS 18.7. Coche: Dacia con CarPlay. Escucha reggaetón,
  salsa, bachata.
- Versión **X.Y**; subir SIEMPRE `APP_VERSION` (index.html) y `VERSION` (sw.js)
  juntos. `buscarActualizacion` compara por desigualdad de texto.
- **11/10/2026: retoma la App Store** (estaba en pausa desde el 4/10). Ver
  «App Store» abajo.
- Informes del 11/10 de los dos móviles con la 2.5: sin fallos nuevos. La 2.6
  solo apunta `orden de iOS: ▶/pausa/parar` en la línea de tiempo.

### SIN CONFIRMAR en iPhone (buscar en la línea de tiempo del informe)
- v2.5 radio que reconecta: `fantasma: no, aún está conectando`, `radio: 15 s conectando`.
- v1.37.10 fin de canción sin `ended`: `fin: llegó la pausa de final` (ya visto funcionando el 10/10).
- v2.2/2.3 gestos con el dedo en iPhone real.
- Atajo de Siri «Pon Mi Música» (¿`webapp://` abre la app instalada?).
- Copias de volumen igualado (`OneDrive\Music\Canciones (volumen igualado)`): ¿las pasó?, ¿suenan mejor?

## Cómo trabaja él, y cómo responderle

- Manda **informes de Ajustes** (texto) y **capturas** del iPhone y del coche.
  Leerlos con calma: traen fallos que no menciona. Cuando conteste algo que no
  está en las opciones, dejar de preguntar y ponerse a buscar.
- **Fallos que solo pasan en su móvil: instrumentar la app** (línea de tiempo
  `linea()`, `anotar()`), nunca arreglar a ciegas. Él lo dijo: «¿por qué
  arreglas a ciegas si te dije qué teléfono uso?».
- Antes de acusar a iOS, mirar el registro: la primera prueba del coche falló
  por culpa nuestra (el vigilante cortaba la radio).
- Quiere que **le propongas ideas modernas sin pedirlas**, menos pestañas y
  ruido, letra no pequeña, cuidado con los datos móviles. **Prioridad: SOLIDEZ.**
- Verificar en Chrome (393 y 440) y publicar.

## Decisiones CERRADAS (no volver a ofrecer ni discutir)

- Color neón oscuro morado/rosa. NO dorado.
- Barra de 4: Inicio · Buscar · Radio · Biblioteca. Buscar = Música · YouTube.
- Un enlace por persona, perfil bloqueado (`mm_bloqueado`). Sin PIN ni login.
- Emisoras del teléfono (las ven los dos); ❤️ de cada uno.
- **NO:** bajar audio de YouTube a MP3 (ni webs «YouTube to MP3»), vistas
  previas de 30 s, sugerir Apple Music/Spotify como «solución», Sideloadly o
  firma de 7 días, crossfade/mezcla/Web Audio (deja la app muda con la pantalla
  apagada; quitado en v1.37.3), modo «Mezclar» (`ambient`).
- El menú ⋯ de una canción solo tiene **Eliminar**. ⏮ ⏹ ⏭ en la barrita.
- Traspaso de MP3: Telegram/WhatsApp como Documento → Archivos → Añadir música
  (`guia.html`). OneDrive→iPhone le gastó los datos: no.

## Verdades incómodas ya aceptadas (no contradecirlas)

- **Sin icono en CarPlay** ni Siri «pon X» a secas: solo apps nativas (CarPlay
  además pide permiso a Apple). Lo que hay: «Ahora suena» + volante + Atajo.
- **YouTube se para al bloquear.** Sin solución legal.
- Tiene que abrirse **desde el icono** (Safari borra datos a los 7 días).
- Una web instalada **no puede despertarse sola** tras un audio de WhatsApp si
  iOS no la avisa. La vía de verdad es la app nativa.
- Emisoras `http://` no suenan. Barquisimeto está mal cubierto.
- «Load failed» a itunes.apple.com en los dos iPhone es de su red (Relay
  privado/bloqueadores); Apple contesta bien.
- El sonido «fatal» a todo volumen no es la app: sus MP3 son de 96 kbps y
  saturan (medido con ffmpeg). Solución: copias normalizadas o comprar en 320.

## Audio en iOS: reglas aprendidas a golpes

- **Nunca `audio.pause()` a pelo**: `pausarYo()` pone `pausaMia`/`paradoPorMi`
  y NADA la reenciende. Los mandos de Media Session usan `pausarYo()`.
- **Con `document.hidden` no tocar `audio.src`** (ni recargar ni recrear el
  `<audio>`): iOS no deja arrancar una fuente nueva de fondo → `AbortError`,
  `NotAllowedError`. Como mucho `play()`.
- El vigilante: radio 12 s, canción 4 s (8 s de fondo), solo si `readyState < 3`,
  descarta medidas que llegan tarde (timers congelados).
- Pausa a <3,5 s de salir de la app (blur/hidden/pagehide, en cualquier orden)
  = iOS al salir → seguir (`seguirTrasSalir`). Pausa más tarde = otra app →
  esperar (`trasInterrupcion`) y reanudar con `statechange` de audioSession
  (`navigator.audioSession.state` es `undefined` en iOS 18.7, el evento sí llega).
- Rescate a 45 s y 3 min si no llega aviso de fin; si un reintento llega >5 s
  tarde, la página estuvo dormida → dejar ▶ visible.
- «Fantasma» (`paused=false` pero el tiempo no avanza): `revisarFantasma`;
  no aplica hasta que la fuente ha sonado (`yaSono`).
- Fin de canción: `alAcabarCancion()` desde `ended` Y desde `pause` con
  `audio.ended` (iOS a veces duerme la página antes de `ended`).
- Radio parada = se suelta el `src` (no gasta datos); `playPause()` reconecta.
- `guardar()` con la pantalla apagada falla con blobs («Error preparing
  Blob/File»): se guarda al volver. Carátulas perdidas: `repararCaratulas()`.
- Sin `seekbackward/seekforward` en Media Session (si no, CarPlay pinta ±10 s).
- Carátula para CarPlay: data: JPEG 512 px o https (iOS no carga `blob:`).
- `status-bar-style: black` (no `black-translucent`): con translucent sobraban
  59 px abajo que ningún CSS alcanza.

## Código: cosas que conviene saber

- `index.html` autocontenido, **en CRLF**. Parchear con Python:
  `io.open(p, encoding='utf-8')`, escribir con `newline='\r\n'` **a un temporal
  y `os.replace`** (un `open(p,'w')` que falla deja el fichero en 0 bytes).
  Ojo con `\b` en strings normales de Python dentro de regex (es retroceso).
- En este PC hay `git` y `python`. **No hay `node` ni `gh`.** Servidor local:
  `.claude/launch.json` → `python -m http.server 8770`.
- Iconos: `ICONOS` + `cambiarEmojis` (MutationObserver) cambia cada emoji
  conocido por SVG. **Emoji nuevo en la interfaz → añadirlo a `ICONOS.M`.**
- Gestos: `gestoBajar(o)`, `volverAtras`/`hayAtras`; ponen `window.__swipe`.
  Un `.click()` propio tras un gesto debe poner antes `window.__swipe = 0`.
  `.sw` es el interruptor de Ajustes; las filas deslizables son `.row.desl`.
- Lector ID3 propio (v2.2/2.3/2.4, APIC/PIC). Huella de dedupe = primeros 2 MB +
  tamaño (incluye etiquetas: un MP3 re-etiquetado entra como nuevo). Al añadir
  uno con el mismo título+cantante, `anadirFicheros` sustituye el audio y
  conserva id, ❤️, veces y listas.
- `eliminarCanciones()` borra el audio solo si nadie más lo usa (los perfiles
  comparten blobs). `sw.js` nunca toca IndexedDB.
- `traerConLimite`: descanso por servidor tras 3 fallos, peticiones idénticas unidas.
- Inicio: `reconciliar()` repinta solo bloques cambiados (evita parpadeo).
- `autoReparar()` al entrar; `arrancar()` reintenta 6 veces si IndexedDB no
  abre («Unable to open database file»).
- Siri/enlaces: `?accion=aleatorio`, `?cancion=<texto>` → `ponerLoQuePides()`.
- Los logos de emisora se buscaron **exigiendo que coincida el país** (sin eso,
  a Hit FM le tocaba uno ucraniano). No aflojar ese filtro.
- `logo.png` y splash salen del logo «Emmanuel & Elibel 2004» (original fuera
  del repo). iOS solo coge una pantalla de arranque nueva al volver a añadir el icono.

## App Store (retomada el 11/10/2026)

- **La app de su móvil y la de Elibel NO SE TOCAN.** La de la tienda es una
  copia aparte en `publica/web/`, que se GENERA con
  `python publica/crear_publica.py` (quita perfiles, créditos, YouTube/Piped,
  fuentes de Google, avisos de PWA y autoactualización; falla en voz alta si
  una sustitución ya no encaja). Regenerada a la 2.6 el 11/10. A mano:
  `manifest.json`, `sw.js`, `guia.html`, `privacidad.html` (huecos [FECHA],
  [CORREO], [NOMBRE], [PAÍS] que rellena él), iconos genéricos PROVISIONALES.
- Nativa: `native/` (Capacitor 8.5.2, Node 22, `macos-26`/Xcode 26 en GitHub
  Actions; no hay Mac). `MiAudio.swift` (AVAudioSession playback +
  interrupciones → `window.mmNativo`), `PrivacyInfo.xcprivacy`. Workflows:
  `ios.yml` (2 apps privadas sin firmar, release `ios-latest`),
  `ios-publica.yml` (release `ios-publica-latest`, bundle
  `com.familiadiazgonzalez.mimusica`, él decide el definitivo),
  `testflight.yml` (SIN PROBAR; secrets APPLE_TEAM_ID, ASC_KEY_ID,
  ASC_ISSUER_ID, ASC_KEY_P8 — **nunca por chat**).
- **11/10/2026 — versión pública 1.0 «mejorada full»** (numeración propia:
  `VERSION_PUBLICA` en el script y `publica/web/sw.js`). Lo que solo lleva la
  pública vive en `publica/mejoras.js` y `publica/i18n.js`, que el script mete
  al final del guion principal (sustituye funciones POR ASIGNACIÓN):
  · mundial: país del teléfono (o elegido en una hoja con buscador, 211 regiones
    con `Intl.DisplayNames`); éxitos de Apple sin `genre=12` (`publica/paises_apple.txt`:
    tiendas con lista; si no, EE. UU.); Radio = «Las más escuchadas en <país>»
    (Radio Browser) en vez de las 30 de casa (`EMISORAS = []`).
  · sin YouTube (`abrirVideoId` es un aviso). Temporizador de dormir (luna en
    «Sonando ahora», usa `pausarYo`). «Tu resumen» (top cantantes/canciones/emisoras).
  · **inglés**: si el iPhone no está en español. Traductor de nodos de texto +
    placeholder/aria-label (MutationObserver), tabla `publica/en.json`
    (textos exactos + patrones). Texto nuevo en la app → añadirlo a `en.json`.
    `localStorage.mm_idioma = 'en'|'es'` lo fuerza (para probar).
  · Firma: «Creada por Emmanuel Díaz» (`publica/creador.txt`, la misma para
    todas sus apps; él quiso salir como creador).
  · `privacidad.html`, `terminos.html` (nuevo, remite al EULA estándar de Apple,
    ley de Andorra) y `guia.html`: bilingües. Falta **[CORREO DE CONTACTO]**.
  · Capturas 1320×2868 (6,9") en `apple/capturas/es` y `/en`.
  · OJO: escanear las 676 tiendas de Apple seguidas da 403 un rato (bloqueo temporal).
- Nombre: en la tienda «Mi Música» seguro que choca. Libres en búsqueda:
  «Guaro Music», «Musiquita», «Mi Música Díaz» (guaro = de Barquisimeto, como
  su usuario elguaro433). Solo App Store Connect confirma. Logo: pendiente
  de que elija nombre.
- Requisitos completos en `apple/REQUISITOS.md`.
- Cuenta: 99 €/año la paga y verifica él. Su Apple ID está en región España pero
  vive en Andorra (AD500): hay que poner el Apple ID en Andorra (o uno nuevo)
  antes de inscribirse.
- Pendiente de la pública: fuentes locales (Sora, DM Sans, Caveat), nombre único
  en la tienda, icono 1024 propio, capturas, ficha, probar en iPhone.
- Lotería, Trading y BuySell365 (de `Proyectos\Familia`) probablemente NO
  son publicables por un particular.

## Ideas propuestas y NO hechas

- Reordenar la cola a mano. Guía de comprar MP3 dentro de la app.
- «Tu año en música», dedicar canción, temporizador de dormir con botón.
- Seguir cantantes con página propia; lista «Por comprar».
