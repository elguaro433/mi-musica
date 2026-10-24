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

## Estado (24/10/2026, v2.13)

- Publicada, la usan él (iPhone 14 Pro, 393×852) y Elibel (iPhone 16 Pro Max,
  440×956), ambos iOS 18.7. Coche: Dacia con CarPlay. Escucha reggaetón,
  salsa, bachata.
- Versión **X.Y**; subir SIEMPRE `APP_VERSION` (index.html) y `VERSION` (sw.js)
  juntos. `buscarActualizacion` compara por desigualdad de texto.
- **11/10/2026: retoma la App Store** (estaba en pausa desde el 4/10). Ver
  «App Store» abajo.
- Informes del 11/10 de los dos móviles con la 2.5: sin fallos nuevos. La 2.6
  solo apunta `orden de iOS: ▶/pausa/parar` en la línea de tiempo.

- **v2.7 (15/10) — rutina del día a día:** (1) «Lo de siempre» arriba en Inicio
  (`tarjetaRutina`/`loDeSiempre`): cada `playing` apunta en `mm_rutina_<yo>`
  la emisora (`r:<url>`) o tu música (`m`), una vez cada 45 min; propone lo que
  más DÍAS distintos pusiste a esta hora (±75 min, primero mismo tipo de día
  laborable/finde), mínimo 3 días en 30. Se esconde si ya suena eso.
  (2) Temporizador para dormir en la privada: luna en «Sonando ahora»
  (`hojaDormir`, `ponerDormir(-1)` = al acabar esta canción, usa `pausarYo`).
  Quitado de `publica/mejoras.js` (ahora lo hereda). (3) `?accion=rutina` para
  el Atajo de CarPlay (si no hay rutina aún, sigue el ajuste «Al abrir»).
  Probado en Chrome a 393 y 440 con datos simulados.

- **v2.8 (15/10) — informe más útil:** su informe de la 2.7 sin fallos (el paso
  de canción con pantalla apagada va bien). Línea de tiempo de 70 → 250 líneas
  (70 cubrían ~4 h y un fantasma de las 15:23 quedó sin detalle), fuera
  `audio:suspend`, «iOS dice: undefined» ya no llena los avisos, se apuntan ⏭/⏮
  de iOS y cada `pausarYo()`, y «app abierta» dice el tipo de carga
  (navigate/reload) y si iOS la había cerrado o abrió en segundo plano (a las
  16:19 la página se recargó sola en segundo plano con la música en pausa).

- **v2.9 (15/10) — Compartir:** botón «Compartir» junto a «Letra» en «Sonando
  ahora» (canciones, radio, Audius). 1er toque dibuja una imagen 1080×1920
  (`tarjetaCompartir`: carátula, título, cantante, «Mi Música») y abre hoja;
  2º toque `navigator.share({files})` (iOS exige el toque justo antes). «Solo el
  texto y el enlace» (canción → búsqueda de YouTube; radio → solo texto). Logos
  sin CORS → `images.weserv.nl` (añadido a la privacidad pública). En YouTube,
  «Compartir vídeo» manda `https://youtu.be/<id>` directo. Él eligió: WhatsApp
  (chat y estado), Telegram, Instagram = menú de compartir de iOS. NO se manda el
  MP3 (es música comprada/de otros). Falta probar en iPhone.

- **v2.10 (16/10) — arreglo del informe:** su informe de la 2.9 sin fallos (a
  las 11:49 la radio se paró por orden de iOS, 19 min después de salir: coche/
  auriculares; bien). Pero la 2.8 guardaba 250 líneas y el informe solo
  imprimía `LINEA.slice(-45)`: ahora salen todas. `iOS audioSession:undefined`
  solo se apunta si algo suena. Aún no había probado Compartir.

- **v2.11 (23/10) — radio en el coche, del informe del 22-23/10:** (1) la red se cortó con
  la pantalla apagada e iOS dio el directo por terminado (`pause`+`ended`): nadie hacía nada,
  35 min muda. Ahora `ended` de radio: delante → reconecta; de fondo → `play()` y si no, ▶ visible.
  `playPause()` reconecta la radio si `audio.ended`/`networkState 3`. (2) `pause` de radio a los
  pocos s de un `stalled`/`waiting` (`tAtasco` < 30 s) NO es otra app: se prueba `play()`; si
  falla, se espera como siempre. (3) Al abrir, volvía sola y su toque en el ▶ (aún visible) la
  paraba: un toque < 2 s tras una vuelta automática (`tAutoVuelta`) no la para. (4) `pausarYo()`
  borra `interrumpida` y los temporizadores de rescate/reanudar (quedaba una de 40 min «pendiente»).
  (5) Dos reconexiones de radio se pisaban al volver (AbortError): las vueltas automáticas
  cancelan el `reintento` en cola y `programarReconexion` no cambia la fuente si hubo una hace < 3 s.

- **v2.12 (24/10) — informe del 24/10 con la 2.11:** CONFIRMADO en iPhone: `radio: el directo se cortó (ended)
  [en segundo plano]` → `play() tras el corte aceptado` (10:01) y «Lo de siempre» al abrir (07:48 y 10:12).
  (1) 09:07:13: el reenganche del fantasma (`reengancharAudio`) y un reintento de radio se pisaron (AbortError,
  6 s en pausa): el reenganche de radio cancela `reintento`, marca `tAutoVuelta` y no hace `load()` + `src`
  (dos cargas); si su `play()` falla con la app delante, reconecta por `programarReconexion` en vez de
  `pausaLimpia`. (2) 12:19:52: una canción nunca llegó a `playing` (38 min «conectando»; el vigilante solo
  mira lo que ya sonó). Plazo de arranque en `tocarCancion`: a 7 s apunta `canción: 7 s sin arrancar · rs ns
  err KB precargada/de fondo` y prueba `play()`; delante → +5 s la relee del teléfono; de fondo → la relee al
  volver (`cancionAtascada`). Una sola relectura por canción (`yaReleida`).

- **v2.13 (24/10) — apps de los niños:** Emiliano y Emmanuel Alejandro, **cada uno con su tablet Lenovo
  Android**, con YouTube (lo eligió él). Perfiles `emiliano` y `alejandro` en `PERSONAS` (nombre del
  segundo: «Emmanuel Alejandro»), enlaces `emiliano.html` / `alejandro.html` (`?p=…`), `manifest-<perfil>.json`
  con `id` propio (en Android cada uno es una app). En Android: aviso de instalar desde el menú ⋮ de Chrome
  (en vez del de Safari) y `accept="audio/*,…"` en «Añadir música». En el iPhone no cambia nada.

### SIN CONFIRMAR en iPhone (buscar en la línea de tiempo del informe)
- v2.12: `canción: 7 s sin arrancar` (¿qué rs/ns/err da en el iPhone?), `fantasma: la radio se reconecta por el camino normal`.
- v2.11 radio con cortes de red (el `ended` de fondo ya CONFIRMADO el 24/10): `radio: el directo se cortó (ended)`, `radio: la pausa vino tras un corte de red`, `play() tras el corte aceptado/rechazado`, `toque justo cuando ya volvía sola`.
- v2.9 Compartir: `compartido con imagen/texto/vídeo`; ¿sale «Mi estado» en WhatsApp y la historia en Instagram?
- v2.7 `?accion=rutina` (el Atajo). «Lo de siempre» al abrir ya CONFIRMADO el 24/10.
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
- Un enlace por persona, perfil bloqueado (`mm_bloqueado`). Sin PIN ni login. Personas: emmanuel, elibel,
  emiliano y alejandro (Emmanuel Alejandro); los niños en sus tablets Android.
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

> Cuentas de Apple y Google (para todas sus apps): `..\..\Tiendas de apps\LEEME.md`.

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
- Cuenta: 99 €/año la paga y verifica él. Vive en Andorra (AD500), pero **Andorra
  NO tiene App Store** (no sale en support.apple.com/118205; itunes lookup country=ad
  da 0): el Apple ID se queda en España (11/10/2026). App gratis → sin NIE ni
  datos fiscales; en la UE declararse «no comerciante» (DSA) para no publicar
  dirección/teléfono.
- **11/10/2026 — inscripción BLOQUEADA** (Apple ID emmanueldiazsanchez@icloud.com,
  Individual): la web da «error desconocido» tras aceptar el acuerdo, y la app
  Apple Developer dice «not available for this Apple Account». El formulario fija
  la región en España y exige que coincida con la residencia. Escrito a soporte
  de Apple (caso **102993277547**). Aún no ha pagado nada. Esperar su respuesta.
- Plan B mirado el 11/10: Google Play SÍ admite desarrolladores de Andorra (25 $ una vez,
  DNI/pasaporte + tarjeta a su nombre; cuenta personal = prueba cerrada con 12
  testers 14 días). `native/` solo tiene iOS: Android habría que montarlo (audio de fondo).
  **YA TIENE cuenta de Play Console pagada**: «Emmanuel Díaz», cuenta personal, ID
  4991395051998351480 (con otra cuenta de Google, no emmanuel050216). Le faltan
  dos pasos obligatorios: verificar un móvil Android real (app Play Console) y el
  teléfono de contacto (tras verificar identidad). No tiene móvil Android propio.
- Pendiente de la pública: fuentes locales (Sora, DM Sans, Caveat), nombre único
  en la tienda, icono 1024 propio, capturas, ficha, probar en iPhone.
- Lotería, Trading y BuySell365 (de `Proyectos\Familia`) probablemente NO
  son publicables por un particular.

## Ideas propuestas y NO hechas

- Reordenar la cola a mano. Guía de comprar MP3 dentro de la app.
- «Tu año en música», dedicar canción.
- Seguir cantantes con página propia; lista «Por comprar».
