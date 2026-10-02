# 🎵 Mi Música — dónde quedamos

> **Para el futuro Claude:** lee `README.md` primero (qué es, qué tiene, cómo
> publicarla). Este documento es solo lo que NO se ve en el código.
> El usuario es **Emmanuel Díaz** (estudiante de ing. informática, vive en
> Andorra, venezolano). Habla en español, tono cercano y honesto, sin sermones.
> **Nunca digas "robar" ideas; se dice "copiar/inspirarse".** Sus apps llevan
> crédito "Familia Díaz González · Creador: Emmanuel Díaz" y firma
> "Emmanuel Díaz".

## 🆕 Sesión del 30/09/2026 (v1.13.0 → v1.14.0) — LEER ANTES QUE LO DE ABAJO

Lo de abajo es de la v1.7.0; esto es lo que cambió después y manda sobre ello.
- **Inicio ya no depende de los MP3.** Trae éxitos de hoy (Apple, `itunes.apple.com/{pais}/rss/topsongs/.../genre=12/json`, con CORS), Audius, emisoras top de Radio Browser y «Porque escuchas a…» (saca el artista del historial). Caché en `mm_ini_<pais>`, 30 min. País elegible (`mm_pais_<yo>`).
- **Historial** (`mm_hist_<yo>`, `anotarHisto`) y **emisoras más oídas** (`mm_radio_n_<yo>`, `contarRadio`).
- **Buscar → 🎧 Música** (primera pestaña): artista en Apple iTunes Search (carátula + 30 s de vista previa + enlaces de compra Apple/Amazon/Qobuz) y debajo las completas de Audius. «Escucharla entera» abre el vídeo de YouTube. **Descubrir pasó a ser solo «📼 Clásicos»** (Internet Archive).
- **Radio:** busca sola mientras escribes (nombre, ciudad/estado, país, etiqueta; «Líder» sí sale). Arriba: «Radios de éxitos», «Por estilo» (un toque = suena la más escuchada) y «Las que más oyes». KYS FM 101.5 quitada (caída).
- **YouTube:** ya no dice «Guardar vídeo» (era mentira: solo guardaba el enlace). Es un ❤️; salen en Biblioteca → Favoritas.
- **Copia de seguridad** ahora guarda también corazones de Audius/Apple, vídeos, historial, emisoras más oídas, país, foto y ajustes.
- **LO QUE EL USUARIO PIDIÓ Y NO SE HIZO (decidido, no volver a ofrecer):** bajar audio de YouTube a MP3 / webs «YouTube to MP3», aunque sea «uso personal» y firme un documento. No se construye. Tampoco sugerir Apple Music/Spotify como «solución»: lo vivió como que no respondía a lo que pedía. Lo legal que sí hay: comprar MP3 (Amazon/Qobuz/Apple), radio, Audius.
- **v1.16.0 — menos pestañas (se quejó de fatiga):** Buscar tiene 3 (Música · Radio · YouTube; «Clásicos» es un botón al final de Música y «Mi música» ya no está: lo tuyo sale en Música como «En tu música»). Biblioteca tiene 3 (Mi música · Favoritas · Listas) y **arranca en Mi música**; Todas/Artistas/Álbumes son un selector dentro, con buscador. Inicio enseña «Tu música» arriba. Antes arrancaba en Favoritas y no encontraba sus canciones.
- **Su música del PC** (OneDrive `Music`, 75 MP3 sueltos: 52 canciones + 23 mezclas de >1 h) se preparó en `OneDrive\Music\Para la app` (52 copias con nombre real, etiquetas y portada; originales intactos). Las mezclas y `musica vieja` se dejaron fuera a propósito (1,2 GB).
- **Guía `guia.html`** (https://elguaro433.github.io/mi-musica/guia.html): pasos para traer los MP3 de OneDrive al iPhone; botón «Cómo traer mi música del PC» en Biblioteca (vacía) y Ajustes → Tus datos. **Verificado:** la carpeta `Para la app` está ya en onedrive.live.com (vía Chrome del usuario) y la app importó las 52 en ~1 s con 46 portadas, sin pérdidas. Lo que NO se puede hacer desde el PC: elegir los archivos en el selector del iPhone (la app vive en el móvil). Pendiente: compartir la carpeta con Elibel (hace falta su correo Microsoft).
- **v1.17.0:** la barra de abajo tiene 4 botones, **Inicio · Buscar · Radio · Biblioteca** (Radio en el centro, como la app de pago que le gustó). Radio sigue siendo `pestana==='radio'` dentro de la vista Buscar, pero `marcarBarra()` la trata como pantalla propia (título «Radio», sin pestañas). Buscar = Música · YouTube. Cabecera fija casi opaca (se transparentaban los bordes de las tarjetas). Fuera el «(50)» del informe de errores: era el tope del registro, no 50 fallos.
- **Nube ordenada (30/09/2026):** `OneDrive\Music` = `Canciones` (53) · `Mezclas` (22) · `_Sistema` (imágenes de Windows) + Apple Music / iTunes / Playlists intactas. 65 repetidas a la **papelera de reciclaje** (audio verificado idéntico; manifiesto en el scratchpad de la sesión). **Ya no se usa la ruta OneDrive→iPhone**: al bajar desde la nube le consumió todos sus datos móviles. Ojo: la huella de dedupe de la app (primeros 2 MB + tamaño) incluye las etiquetas ID3, así que un MP3 re-etiquetado entra como canción nueva.
- **v1.18.0 — eliminar música:** ⋯ de cada canción → «Eliminar de la app»; Biblioteca → «Seleccionar para eliminar» (casillas, «Todas», «Eliminar (n)»); Ajustes → Tus datos → «Borrar toda mi música». Siempre con hoja de confirmación. `eliminarCanciones()` borra la canción, su audio **solo si nadie más lo usa** (los dos perfiles comparten el blob), la quita de listas y cola, y si sonaba la para. **Método de traspaso vigente:** Telegram/WhatsApp (como Documento) → Guardar en Archivos → En mi iPhone → Añadir música (ver `guia.html`).
- **v1.19.0 — datos y arranque (1/10/2026):** (1) El 30/09 un error en su iPhone: «Unable to open database file on disk» = WebKit no pudo abrir el archivo de IndexedDB (poco espacio o teléfono bloqueado al arrancar). Ahora `arrancar()` reintenta 6 veces (1,5 s) antes de la pantalla de emergencia, que explica la causa y tiene «Liberar espacio: borrar la música de la app». (2) Ahorro de datos: portadas de 240 px (Apple) / 150 px (Audius) en listas, estantes de 10-15, Inicio se refresca cada 4 h (con `AJ.ahorro`, nunca solo). Medido: un refresco completo de Inicio ≈ 0,4 MB de JSON + 1-2,5 MB de imágenes antes de este cambio. (3) Fuga arreglada: el iframe de YouTube seguía cargando al cambiar de pantalla; `ir()` lo quita. (4) Ajustes → Internet: estimación de datos de radio (`mm_datos`, por reloj: la radio sigue con la pantalla apagada) + interruptor de ahorro. (5) Arranque: logo grande en la pantalla de carga y en las 6 `splash-*.png` (64 % del ancho, orillas suavizadas) — **iOS solo coge la pantalla de arranque nueva al volver a añadir el icono** (haría falta copia de seguridad antes). «Quién eres» sin letra pequeña.
- **Logo nuevo (1/10/2026):** el de «Emmanuel & Elibel 2004» (webp vertical que mandó). Recorte del marco `crop(0,55,1024,1275)`; iconos cuadrados con el marco al 97 % de la altura; `logo.png` (720 px, orillas transparentes) para la carga y «Quién eres»; 6 `splash-*.png` con el logo al 88 % del ancho. Generado con Pillow desde el original; el original NO está en el repo (estaba en las imágenes de la conversación).
- **v1.20.0 (1/10/2026):** Biblioteca → Mi música tiene arriba **Reproducir** y **Aleatorio** (el aleatorio baraja la cola entera, sin repetir). El menú ⋯ de una canción solo tiene **Eliminar** (él pidió quitar «añadir a lista», «poner a continuación» y «favorita»; el corazón ya es favorito). Quitado «Seleccionar para eliminar» (el código `bibSel` queda dormido). Al acabar una canción arranca la siguiente sola (ya era así); ahora `precargarSiguiente()` deja leído el audio de la siguiente. **Crossfade NO se hace a propósito:** `audio.volume` no funciona en iOS y enganchar Web Audio (`createMediaElementSource`) puede dejar sin sonido la app con la pantalla apagada; no se arriesga el audio del coche. **Volumen sin control desde la web.**
- **v1.21.0 (1/10/2026):** (1) BUG de Elibel: desde la v1.19.2 el `?p=emmanuel` del manifest de Emmanuel pisaba el perfil guardado y a ella le saludaba «Emmanuel». Ahora el perfil guardado manda; solo `?p=elibel` (elibel.html) gana siempre. Su móvil quizá tenga guardado «emmanuel»: Ajustes → Cambiar de persona → Elibel, una vez. (2) Portadas: un fallo de red ya NO se guarda como «sin portada» (clave nueva `mm_portadas2`), y una imagen rota muestra el dibujo del estilo en vez de un hueco. (3) Inicio: «Tu música» se rehace sola al cambiar de canción; el repintado va con respiro de 350 ms y la caché se lee antes del primer pintado (parpadeo). (4) Radio: fuera «Radios de éxitos», «Por estilo», «Las que más oyes», las sugerencias de países y «pegar enlace»; queda el botón «Buscar cualquier emisora del mundo».
- **v1.22.0 (1/10/2026) — autoreparación:** `autoReparar()` al entrar (borra datos `mm_*` con JSON roto, limpia la cola y las listas de canciones que ya no existen); `repararCancion()` si un MP3 da error de audio (1º lo relee de la base de datos, 2º salta a la siguiente, máx. 8 seguidas); la caja negra junta fallos repetidos en una línea con contador `n`; las portadas caen a Deezer si Apple no contesta; con la pantalla apagada no se guardan blobs (iOS da «Error preparing Blob/File»), se guardan al volver. Probado en el navegador con 3 WAV sintéticos: Reproducir, Aleatorio, paso automático e Inicio actualizado.
- **v1.23.0 (1/10/2026) — coche (CarPlay):** foto de la Dacia mostraba nota genérica, «Sin álbum» y botones ±10 s. Causas: (1) existían los handlers `seekbackward/seekforward`, que hacen que iOS pinte ±10 s en vez de anterior/siguiente → quitados; (2) la carátula `blob:` no la carga iOS y la de Apple (`portadaDe`) nunca iba al coche → `ponerMetadata()` pasa la del MP3 como data: JPEG 512 px, la remota por https, y se reenvía cuando llega la portada; (3) el álbum «Sin álbum» ahora se muestra como «Mi Música». El «Web» de arriba a la derecha lo pone iOS (es el origen de la web app), no se puede cambiar. SIN CONFIRMAR en el coche.
- **v1.24.0 (1/10/2026):** (1) «Ahora suena» y la barrita mostraban un cuadro de color aunque la canción tuviera portada: `pintarAhora` creaba y revocaba blob URLs en carrera. Ahora usa `urlCaratula()` (estable), PRUEBA cada imagen candidata (carátula → logo → portada de Apple/Deezer) y si ninguna carga pone iniciales (radio) o 🎵. «A continuación» usa `cuadroCancion`. Las emisoras sin logo llevan insignia con iniciales. (2) **Mezcla entre canciones** (Ajustes → Coche, APAGADA por defecto, reinicia la app): Web Audio con ganancia, baja 4 s y sube 3 s; si el audio no corre 2 s después de sonar se apaga sola y reinicia. NO es solapado real (una sola etiqueta audio); es fundido. SIN PROBAR en iPhone con pantalla apagada.
- **v1.25.0:** en «Sonando ahora» la flecha de cerrar es un SVG grande (zona de toque 52 px) y la barra se arrastra con el dedo (pointer events, bolita, tiempo en vivo, 34 px de alto; en modo coche 44). La radio en directo oculta la bolita.
- **v1.26.0 (1/10/2026):** (1) **Mezcla con solape de verdad** (Ajustes → Coche, apagada por defecto): dos `<audio>` + Web Audio; a ~9 s del final se deja lista la siguiente en el 2º reproductor (`MZ.b`), a ~4 s entra mientras la otra baja, y al acabar el principal se coloca en el mismo punto y hace el relevo (80 ms). El 2º reproductor se «desbloquea» con el primer toque (iOS). Si falla algo: se cancela el solape; si el audio no corre o hay que recrear el `<audio>`, se apaga la mezcla y se recarga. Probado en Chrome (ganancias y relevo); SIN PROBAR en iPhone con pantalla apagada. (2) Rediseño de «Sonando ahora»: botones SVG propios, play/pausa grande con degradado y latido, barra fina con bolita pequeña y tiempos DEBAJO (antes la bolita tapaba los números); fuera la línea «WAV ~128 kbps», «Sin álbum» y el ⬇️ de las filas. (3) **Quitar emisoras:** 🗑 en cada fila de Radio, hoja de confirmación; las de fábrica se esconden (`mm_emi_ocultas`), las añadidas se borran de la base; Ajustes → Tus datos → «Restaurar emisoras quitadas».
- **v1.27.0 (1/10/2026):** deslizar una fila a la izquierda (canciones y emisoras) enseña ❤️ y 🗑 (clase `.row.desl`; OJO: `.sw` ya es el interruptor de Ajustes, no reutilizar). Fuera de las filas el ❤️/⋯/🗑 visibles; solo queda un corazón pequeño si es favorita. Él se queja de que no le propongo cosas modernas por iniciativa: **proponer ideas actuales sin que las pida**.
- **v1.28.0:** Biblioteca → Mi música tiene un cuarto selector **Géneros**. `generoDe(c)` usa el género de las etiquetas (normalizado con `GENEROS_REGLAS`) y, si falta, `clasificarGeneros()` se lo pregunta a Apple (fallback Deezer), lo guarda en `c.genero` y no repite (`mm_gen_no`). Al abrir un género: Reproducir, Aleatorio y «Crear lista» (si ya existe con ese nombre, la actualiza). Corre al entrar (6 s) y al abrir Géneros, solo con la app a la vista y con internet.
- **v1.29.0:** **Fuera las vistas previas de 30 s** (él: «yo no quiero nada de 30 segundos»). Tocar una canción de Apple (Inicio, Buscar → Música, historial) llama a `reproducirCompleta()`: primero busca la misma en Audius (suena entera y sigue con la pantalla apagada); si no está, abre el vídeo en YouTube (solo con la pantalla encendida). El ⋯ de la fila deja Escucharla entera / Guardar en favoritas. NO volver a ofrecer previews.
- **v1.30.0:** YouTube limpio: solo el vídeo + «Guardar vídeo» (❤️, va a Biblioteca → Favoritas; se guarda el ENLACE, no se baja). Fuera el consejo de datos, el aviso largo de iOS y el botón Cerrar. Reproductor con la API de YouTube (`montarReproductorYT`): si el dueño no deja verlo (errores 100/101/150) salta solo al siguiente resultado (`ytFallo`, `ytProbados`). Probado con un id falso (error 150 → siguiente).
- **v1.31.0 (1/10/2026) — lo que recomendé y él aprobó:** (1) **Listas automáticas** (`listasAuto`): Toda mi música, Lo más escuchado, Añadidas hace poco, Favoritas y 4 géneros; chips en Inicio y sección «Automáticas» en Biblioteca → Listas; un toque = suena barajada (`tocarAuto`). (2) **Radio · un toque** en Inicio: la última + las que más oyes (`radioRapida`). (3) **Novedades**: discos de los últimos 13 meses de los cantantes de su biblioteca + los que siga (`mm_sigue_<yo>`), vía iTunes search+lookup, caché 24 h (`mm_nov_<yo>`); al tocar, `reproducirCompleta` (Audius o YouTube). Probado con datos reales de Apple.
- **v1.31.1 (auditoría 1/10/2026):** recorridas las 11 pantallas a 393 px sin desbordes ni letra <10,5 px; ninguna llamada a función inexistente (análisis estático); 0 errores JS. Único fallo: los paneles ❤️/🗑 ocultos ensanchaban el scroll (503/393) → `.swa{display:none}` hasta abrir. Ya publicado y verificado en la web (index, sw, manifests, guía → 200).
- **v1.32.0:** fuera el botón «Seguir con …» de Inicio (no le gustaba). Chip «Toda mi música» más grande, con icono SVG de mezclar con degradado (`IC_MEZCLA`, clase `.chipauto.principal`). **Quitar la reproducción:** con la música PARADA, deslizar la barrita de abajo (`#mini`) a la izquierda llama a `quitarReproduccion()` (para, suelta el audio, vacía `actual` y la cola, borra la ficha del coche/pantalla de bloqueo); no toca la música guardada. Sonando no se quita (evita accidentes).
- **v1.33.0:** logos de emisora: 29 de 30 de casa ya tienen (faltaba Andorra Música, Radio Valira, Éxitos 99.9, Onda 107.9, LOS40 Urban; solo Máxima FM no tiene en ningún sitio → iniciales). Las emisoras del mundo sin `favicon` usan el icono de su web (`google.com/s2/favicons`, 128 px) y `logoMalo()` pone iniciales si la imagen es <40 px o falla. En una búsqueda «Venezuela», 66 de 68 filas con imagen.
- **v1.34.0 (1/10/2026) — convivir con otras apps de sonido:** Elibel vio que al oír un audio de WhatsApp/Telegram la música se reenganchaba sola a los 1,2 s y le cortaba el audio (era `trasInterrupcion`). Ahora NO se pelea: marca `interrumpida`, dice «En pausa · otra app está sonando» y SOLO sigue cuando (a) iOS avisa por `navigator.audioSession` (`statechange` → `active`), (b) vuelves a la app y la sesión no está `interrupted`, o (c) tocas ▶/volante. La radio se reengancha al directo. Cada cambio de estado de iOS se anota en el informe como `sonido: iOS dice: …` para calibrar con su móvil (NO se pudo probar con WhatsApp real). **Actualizaciones:** `buscarActualizacion()` compara `APP_VERSION` con la publicada al abrir y al volver a la app; si es nueva y no suena nada, `reparar()` la pone; si suena, espera a que se pare. Botón «Buscar actualización» en Ajustes. Causa de que la app de Elibel fuera atrasada: una PWA de iOS dormida no recarga; hay que cerrarla del todo UNA vez (las versiones <1.34 no se actualizan solas).
- **v1.35.0 — un enlace por persona, perfil BLOQUEADO:** `/emmanuel.html` y `/elibel.html` (redirigen a `index.html?p=…`). La primera vez que se abre con `?p=` se guarda `mm_bloqueado`; desde ahí esa app es SIEMPRE de esa persona (script en la cabecera: `window.__QUIEN`, y pone el manifiesto y el nombre del icono de iOS de esa persona). Fuera «Cambiar de persona» de Ajustes; la pantalla «¿Quién eres?» ya no sale nunca. Con `?p=` distinto el enlace manda (así se repara). PERSONAS lleva `sexo` (m/f) por si hace falta. OJO con las expresiones regulares escritas desde Python: `` en un string normal se convierte en carácter de retroceso (rompió el enlace; usar `(?![a-z])` o strings raw).
- **v1.35.1:** él dijo que la app de Elibel «sale todo lo viejo / no sale la mezcla» tras abrir el enlace nuevo. Verificado: la web publicada carga 1.35.x limpia en un navegador sin caché. Sospechas: (a) instalación nueva = biblioteca vacía → sin «Toda mi música», sin «Tu música» (los chips salen solo con canciones); (b) un icono viejo que sigue sirviendo una versión dormida. Medidas: la versión se ve en Inicio («· v1.35.1»); `limpiar.html` (borra SW+cachés, no la música; OJO: solo afecta al almacén donde se abra — Safari y la PWA instalada tienen almacenes SEPARADOS); recarga automática al cambiar de service worker. PENDIENTE: preguntarle qué versión pone en Inicio/Ajustes en el móvil de ella.
- **v1.35.2:** WhatsApp/Telegram seguían sin poder sonar. Quedaban DOS rutas que le quitaban el sonido a la otra app: (1) la radio se reconectaba sola tras el `error` que provoca la interrupción (`programarReconexion`) → ahora `otraAppTieneElSonido()` lo impide (audioSession `interrupted` o pausa ajena <20 s); (2) con la mezcla activa, `MZ.ctx.onstatechange` hacía `resume()` al instante → quitado. Probado: radio + pausa externa + error = 0 intentos de `play()`. Las versiones <1.34 siguen peleando: comprobar la versión que sale en Inicio.
- **v1.35.4:** tras la v1.34 la música de Elibel (iPhone 16 Pro Max) se paraba sola al salir de la app: ese iPhone manda un `pause` suelto al salir y el viejo reintento de 1,2 s lo tapaba; al quitarlo se vio. Ahora `trasInterrupcion` distingue: pausa a <3 s de `blur/pagehide/hidden` y sin sesión `interrupted` → es «salir de la app» y la música SIGUE (350 ms); si no → otra app (WhatsApp, llamada) y espera. Ambos casos se anotan (`sonido:`). Informe de Ajustes ahora comparte por la hoja de iOS y lleva SW, cachés, sesión de audio, perfil fijado. Layout a 440×956: sin desbordes. REGLA: lo que arregle una interrupción NO debe volver a tapar el síntoma de iOS 26 (pause al salir).
- **v1.35.5:** su iPhone (14 Pro) funciona bien; el de Elibel (16 Pro Max) paraba la música al salir de la app y no la dejaba ver WhatsApp/galería. La 1.35.4 asumía que el aviso de «salí de la app» llega ANTES del `pause`; si llega después no hacía nada. Ahora se cubren los dos órdenes (`marcarSalida` reanuda si hubo pausa <3,5 s antes; `trasInterrupcion` reanuda si el aviso fue <3,5 s antes) y `seguirTrasSalir` reintenta `play()` 4 veces (0,7/1,4/2,1 s). Una pausa que llega >3,5 s tras salir = otra app (WhatsApp, llamada, grabar vídeo) → espera. Casos A/B/C/D probados en simulación. SIN CONFIRMAR en el iPhone de ella: pedirle el informe de Ajustes tras reproducir el fallo (mira «Instalada», versión, y los avisos `sonido:`).
- **v1.36.0:** fuera el cuadro discontinuo «Seguir un cantante y ver sus novedades» (salía mientras cargaban las novedades y luego la fila las sustituía: parecía un fallo). Ajustes → Internet → «Ocultar novedades de cantantes» (`AJ.sinNovedades`) quita la fila entera.
- **v1.36.1:** el iPhone de Elibel (16 Pro Max, v1.35.5 confirmada en su captura) SIGUE parando la música al salir, así que la hipótesis de orden de avisos no bastaba. Ahora se registra una LÍNEA DE TIEMPO (`linea()`, `mm_linea`, ring de 70) con audio:*, ventana:blur/focus/pagehide/pageshow, visibilidad, audioSession y errores de `play()`, y va en el informe. Además `navigator.audioSession.type = 'playback'`. SIGUIENTE PASO: leer el informe que mande ella tras: reproducir → salir a WhatsApp/galería → volver → Ajustes → Enviar informe. Si `play()` sale rechazado con NotAllowedError al salir, la vía es otra (no se puede reanudar desde segundo plano) y hay que impedir la pausa, no repararla.
- **v1.36.2 — causa hallada con su informe (iPhone 16 Pro Max, iOS 18.7):** salir de la app YA NO paraba la música (arreglo 1.35.5 ok). El fallo era la **mezcla activada** en su móvil: tras un audio de WhatsApp el `AudioContext` pasa a `interrupted` y vuelve a `running` pero MUDO (Safari reanuda el `<audio>` solo, la app lo ve «sonando» sin sonido). Ahora: analizador de señal (`MZ.an`, `hayMuestra`), al volver de una interrupción se hace suspend/resume y se mide; si hay silencio → mezcla apagada + recarga (`comprobarSonidoMezcla`). Además `navigator.audioSession.state` es `undefined` en iOS 18.7 (el tipo sí existe): no fiarse del estado, solo del tiempo desde `blur/hidden`. «Load failed» de Apple y «Deezer no responde» en su red: portadas/novedades fallan en su móvil (revisar bloqueadores/Relay privado). Si la mezcla vuelve a dar problemas: quitarla del todo.
- **v1.36.3:** con la mezcla apagada todo bien en el iPhone de Elibel EXCEPTO que tras el audio de WhatsApp la música no volvía sola hasta que ella entraba en la app. Del informe (iOS 18.7): `audioSession.state` es `undefined` pero el evento `statechange` SÍ llega en segundo plano — el primero es el inicio de la interrupción y los siguientes (6-10 s después) el final. Ahora un `statechange` >2,5 s después de la pausa → `reanudarTrasInterrupcion` (1,5 s después, con 3 reintentos). Además se reanuda al volver a la app (focus/pageshow/visibility) y con CUALQUIER toque en la pantalla (cuenta como gesto). Pendiente de confirmar en su móvil si `play()` desde segundo plano lo deja iOS (se anota `play() tras la interrupción rechazado` en la línea de tiempo).
- **v1.36.6:** (1) Parpadeo de Inicio: `reconciliar()` repinta solo los bloques cuyo HTML cambió (los demás conservan su nodo y sus imágenes; medido: 28 de 29 bloques reutilizados al cambiar uno) y las portadas que llegan una a una usan `pintarVistaSuave()` (700 ms). (2) Perfil en Ajustes: círculo grande con la foto, nombre debajo, toque en el círculo = poner/cambiar foto, ✕ pequeña = quitarla (ids `a-foto`, `a-quitarfoto` ahora son spans). Informe de Emmanuel (v1.36.4): `pagehide` 8 s tras salir con música sonando a las 21:12 (la página se descargó; sin `audio:pause` antes) → vigilar si vuelve a pasar; probablemente recargas por las actualizaciones seguidas.
- **v1.36.7 (2/10/2026) — audio «fantasma»:** tras un audio de WhatsApp, música propia: al volver la app enseñaba ⏸ sin sonar y sin ficha de bloqueo. Causa probable: iOS deja el `<audio>` con `paused=false` pero mudo, sin evento `pause`; `play()` no hace nada y todos los reintentos miraban `audio.paused`. `revisarFantasma()` mide si `currentTime` avanza (al volver, al tocar, +2/+6 s tras un `statechange` de audioSession); si no, `reengancharAudio()` (pausa+play, o recarga la fuente) y si iOS no deja, ▶ de verdad. Probado con un fantasma simulado; SIN CONFIRMAR en iPhone: pedir el informe (busca «fantasma» en la línea de tiempo).
- **v1.36.8:** su informe con v1.36.7 mostró que el fantasma es REAL (`playing t=43` y el tiempo clavado 25 s tras acabar WhatsApp) y que pausa+play NO lo cura (iOS sí acepta `play()` en segundo plano). Ahora escala: nivel 0 pausa+play, 1 recarga la fuente y restaura el tiempo, 2-3 `recrearAudio()`, 4 enseña ▶. Verifica a los 2,5 s cada vez. SIN CONFIRMAR en iPhone: mirar «fantasma: reenganche nivel N» en su informe.
- **v1.36.9:** su informe con v1.36.8 (t=26 clavado tras WhatsApp) demostró que recargar la fuente o recrear el `<audio>` EMPEORA en segundo plano (`stalled`, `AbortError`, luego `NotAllowedError`). Un `<audio>` intacto y pausado sí se reanuda con un toque. Ahora en segundo plano: reactivar `audioSession.type` (auto→playback) + pausa, 450 ms, play (máx. 2 veces) y si no, `pausaLimpia()` (▶ real, ficha de bloqueo). Con la app a la vista se permite además recargar la fuente. `recrearAudio()` ya no se usa para el fantasma. SIN CONFIRMAR en iPhone: mirar si el `play()` tras reactivar la sesión consigue que el tiempo avance.
- **Siguiente (propuesto, sin hacer):** seguir cantantes + «novedades» en Inicio (iTunes `lookup ... sort=recent`), página de cantante con discos, «Reproducir éxitos» en cadena con YouTube (solo pantalla encendida), lista «Por comprar».

## 👉 EMPIEZA AQUÍ (tras la sesión del 29/09/2026 noche, v1.7.0)

**La prueba del coche está SUPERADA.** El 29/09 Emmanuel la repitió en su
Dacia con la v1.3.0 y **la música siguió sonando con la pantalla apagada**.
El riesgo que tenía el proyecto en vilo desde el principio ya no existe. El
plan B (MP3 en la app Música con Dispositivos Apple) **queda en el cajón**;
no lo vuelvas a ofrecer. La moraleja, que vale para siempre: la primera
prueba falló y **la culpa era nuestra, no de iOS**. Antes de acusar a Apple,
mirar el registro de errores.

**Lo que hay que preguntarle al empezar:**
1. ¿Montó por fin la **automatización de Atajos** (CarPlay → Se conecta →
   Abrir Mi Música)? El 29/09 seguía sin hacerlo.
2. ¿Se sigue abriendo sola **la app de cámara de Xiaomi** al poner la radio
   en el coche? **Eso NO es cosa nuestra** — revisado el código entero, no
   hay una sola línea que pueda abrir otra app. Las dos sospechas: una
   **cámara de salpicadero Xiaomi/70mai** que enciende su wifi al arrancar el
   coche, o una automatización suya en **Atajos**. Sin resolver.
3. **¿Desapareció el hueco de abajo con la v1.7.0?** Debería: se le quitó
   el `black-translucent`. A cambio la app ya no pinta detrás del reloj.
   Si le molesta ese cambio, hay que buscar otra vía.
4. **¿Quiere de vuelta la copia de seguridad?** Se quitó de Ajustes porque
   él lo pidió, pero era lo único que salvaba favoritos y listas si iOS
   borra los datos. Se le avisó al publicar la v1.7.0.
5. **YouTube y Descubrir están sin tocar.** Pidió que YouTube se parezca más
   a YouTube y dijo de Descubrir «ahí tenemos que trabajar mucho tú y yo».
   Son los dos trabajos grandes que quedan.

### Cómo trabaja él, y cómo hay que responderle

El 29/09 dijo **«hay muchos fallos, necesito que verifiquemos muchas cosas
primero»** y luego mandó capturas. **Es así como trabaja: manda fotos del
iPhone y del coche.** Míralas con calma, que en ellas hay fallos que él no
menciona (en las del 29/09 estaba la barra de progreso de la radio en
CarPlay, que nadie había visto). Cuando le des a elegir entre opciones y
conteste algo que no está en la lista, **deja de preguntar y ponte a buscar
tú**: eso es lo que quiere.

### Pendientes concretos

1. **Reordenar la cola a mano.**
2. **Repasar las 30 emisoras** y poner en gris las muertas. (No fiarse de un
   fallo en el móvil: comprobar por fuera con `curl`.) Ahora hay una vía
   mejor: preguntarle a Radio Browser por cada una.
3. **Interruptor de «letra más grande»** para el coche. En la v1.5.0 ya
   subieron todas las letras pequeñas, así que corre menos prisa.
4. **Logos para las 18 emisoras que se quedaron sin él.** El script está en
   el historial; exige que coincida el país, no lo aflojes.
5. **Guía de comprar MP3** (Qobuz o Amazon Música Digital) paso a paso dentro
   de la app. Bajó de prioridad: el 29/09 eligió el buscador de emisoras
   antes que esto, y con el buscador ya tiene música actual.

### Lo que pidió y NO se puede hacer
**Bajar el audio de los vídeos de YouTube a MP3.** Va contra las condiciones
de uso de YouTube y desde una web en el iPhone es técnicamente imposible.
Ya está dicho y aceptado; no hace falta suavizarlo ni volver a ofrecerlo.

**Sobre «música actual y gratis para descargar»:** no existe legalmente.
Investigado el 29/09. Lo que sí hay es (a) **radio en directo**, que ya está
resuelto con el buscador del mundo, y (b) **comprar los MP3** en Qobuz o
Amazon (sin candado, descargables). 7digital ya casi no vende a particulares
y Bandcamp tiene poco reggaetón comercial.

## Sus aparatos (importa para la maquetación)
- **Emmanuel → iPhone 14 Pro** (393×852)
- **Elibel → iPhone 16 Pro Max** (440×956)
- Coche: **Dacia con CarPlay**. Escucha reggaetón, salsa y bachata
  (CNCO, Manuel Turizo, Marc Anthony, Romeo Santos).
- Hay un comprobador de maquetación en el historial de la sesión: recorre las
  9 pantallas y mide desbordes, letra pequeña y zonas de toque. Si tocas CSS,
  vuelve a pasarlo a 393×852 y 440×956.

## El hueco negro de abajo: RESUELTO en la v1.7.0

Costó cinco versiones y tres intentos fallidos. **Si vuelve algo parecido,
empieza por aquí.**

Medido en su iPhone 14 Pro con la tarjeta de Ajustes que se puso para esto:

```
pantalla del aparato : 393 x 852
ventana de la app    : 393 x 793      <- 59 px menos
safe-area arriba     : 59             <- exactamente los que faltan
barra                : 717 -> 793 (alto 76), hueco debajo: 0
```

**La causa:** con `apple-mobile-web-app-status-bar-style: black-translucent`,
iOS dibuja la web detrás de la barra de estado (empieza en `y=0`) pero le da
una ventana de solo `alto − safe-area-inset-top`, y la pega arriba. Sobra esa
misma altura por abajo, y **la app no puede pintar ahí**: el hueco medido
desde dentro es 0.

**El arreglo (v1.7.0):** `status-bar-style` a **`black`**. La ventana empieza
bajo el reloj pero mide lo que tiene que medir. Se pierde el fondo a sangre
tras el reloj — él lo sabe, se le dijo al publicarlo.

### Lo que NO era, ya descartado con pruebas
- El colchón de la barra (bajado de 34 a 16 px: nada).
- Que faltara fondo (`#barra::after` con 180 px: nada — y eso fue lo que
  demostró que el hueco estaba **fuera** de la ventana).
- Poner el `body` del color de la barra (v1.6.1): disimulaba, no resolvía.
- Las pantallas de arranque: las 6 tienen el tamaño exacto en píxeles que
  pide cada aparato (verificado leyendo la cabecera de cada PNG).

### La lección
**Tres versiones arreglando a ciegas algo que no se reproduce en el
ordenador.** Él lo dijo claro: «¿por qué arreglas a ciegas si te dije qué
teléfono uso?». Cuando un fallo solo pase en su móvil, lo primero es
**instrumentar la app para que se mida sola** y poner el dato donde él pueda
fotografiarlo. La tarjeta se quitó en la v1.7.0 porque ya había hecho su
trabajo; si hace falta otra vez, está en el historial de git (v1.5.2).

## Estado — 29/09/2026 (v1.7.0)

Publicada en https://elguaro433.github.io/mi-musica/ — repo `elguaro433/mi-musica`.

### v1.4.0 — seis fallos que se veían a simple vista
- **El ❤️ que no era un ❤️.** `filaCancion` se pasaba a `.map()` a pelo, así
  que su segundo argumento no era el id de una lista sino el **índice**. En
  Inicio y en Buscar → Mi música, solo la primera fila sacaba corazón y las
  demás una ✕ que no hacía nada. **Este era el fallo que él veía.**
- **La cabecera se comía su propio texto**: la máscara de desvanecido iba en
  el `.vhead` entero. Ahora en un `::before`. El saludo pasó a 16,5 px claro.
- El colchón de la barra de abajo, de 34 px a 16 (`--sabn`).
- Todas las letras pequeñas subieron (calidad y estrellas de 9,5 a 11 px).
- La radio en directo ya no hereda la barra de progreso de la canción
  anterior en CarPlay: se borra `setPositionState()`.
- La app ya **no se trae todos los MP3 a memoria** al arrancar ni al abrir
  Ajustes. Hay `claves(store)` y `existe(store,k)` para eso.

### v1.5.0 — las emisoras del mundo, y cada una con su cara
- **Buscador de Radio Browser** en Buscar → Radio. Sin clave. Se pregunta por
  nombre **y** por etiqueta a la vez. Solo `https://`. Fuera los nombres de
  más de 70 caracteres (granjas de etiquetas). Cuatro servidores en fila,
  recuerda el bueno en `mm_rb_ok`: el 29/09 respondían `de1` y `de2`, no
  `fi1` ni `at1`. Países traducidos y con bandera.
- **Logos de emisora**, también en CarPlay y en la pantalla de bloqueo. 12 de
  las 30 de casa, **exigiendo que coincida el país**: sin ese filtro a Hit FM
  le tocaba uno ucraniano y a KISS FM uno mexicano. Las otras 18, a su color.
  Un logo se ve entero (`contain`), no recortado como una carátula.
- `.enc` — dentro de `.r-s` (que es flex) el texto suelto no se encogía y
  empujaba la calidad fuera de la pantalla.

### v1.7.0 — el repaso grande de aspecto
Repasó Ajustes tarjeta por tarjeta y la pantalla entera. Lo que salió:
- **Las carátulas no se veían en las listas.** Solo en "Ahora suena": las
  filas pintaban un cuadro liso aunque el MP3 trajera carátula. Ese era el
  origen real de "tantos cuadros con colores". Ahora `cuadroCancion()` la
  enseña, con las direcciones cacheadas en `CARATS` y soltadas al cambiar
  de persona.
- **Y si no la trae**, el cuadro lleva un dibujo según el estilo
  (`ESTILOS` + `iconoEstilo()`): trompeta para salsa, micro para reggaetón,
  guitarra para rock… sacado del género, el álbum o el título.
- **Favoritas**: pestaña propia, la primera de Biblioteca (`filtro` arranca
  ahí). Junta sus emisoras y sus canciones del corazón.
- **Ajustes, solo lo que usa.** Fuera: Esta pantalla, Espacio, Copia de
  seguridad, Temporizador, Diagnóstico y Fuentes. `diagnostico()` y
  `ponerDormir()` siguen en el código pero ya no tienen botón.
- **Foto de perfil** por persona, en `localStorage.mm_foto_<quien>`, encogida
  a 256 px. En localStorage y no en IndexedDB a propósito: son 4 KB y no
  merece la pena arriesgar una migración del esquema por una foto.
- **Los iconos de la barra** eran caracteres de texto minúsculos (⌂ ⌕ ☰).
  Ahora son SVG de 27 px con `stroke-width` mayor cuando están activos.
- **Modo coche** fuera de Inicio (estorbaba a diario para algo de una vez al
  día), con `AJ.cocheEnInicio` por si lo quiere de vuelta.

### v1.6.0 — la letra, y que la elija él
- Los **88 `font-size` son `calc(Npx * var(--esc))`**. Un solo número mueve
  toda la tipografía. Eso resolvió de paso el pendiente del interruptor de
  letra grande, que antes era caro porque "todo está en px".
- Normal `1.12`, Grande `1.26`, Muy grande `1.42`, en ⚙️ Ajustes. Se guarda en
  `mm_ajustes.letra` y se aplica en `cargarAjustes()`, antes de pintar nada.
- Las pestañas fijas topan en `min(var(--esc), 1.14)`: se reparten el ancho a
  partes iguales y pasado eso se recortaban a "Mi mú…".
- Más aire en las filas y más contraste en `--muted` y `--dim`.

### v1.5.2 — 19 logos de 30
Segunda pasada probando variantes del nombre (sin frecuencia, sin FM, la
palabra fuerte), **siempre exigiendo que coincida el país o que sea el mismo
stream**. Entraron Tropicana, Olímpica, Candela, Vibra, Bésame, Rumba y
Planeta — las suyas. Las 11 que faltan no tienen logo https en la base.
**No aflojar el filtro de país**: sin él, a Hit FM le tocaba un logo ucraniano
y a KISS FM uno mexicano.

### Verificado midiendo, no a ojo
- Maquetación sin un solo problema a **393×852** y **440×956**, repasada de
  nuevo en la v1.5.0 con las filas de emisoras del mundo pintadas.
- Los 12 logos cargan de verdad (comprobados en el navegador, no con Python:
  su almacén de certificados da falsos negativos).
- Guardar una emisora del mundo y escucharla: probado con clics de verdad.
- Integridad del audio: 4.638.208 bytes entran, 4.638.208 salen, idénticos.

## Decisiones CERRADAS (no volver a preguntar)

1. **Color:** neón oscuro morado/rosa (el de `folleto.html`). **NO dorado.**
2. **Barra inferior de 3:** Inicio · Buscar · Biblioteca. Radio y YouTube son
   **pestañas dentro de Buscar**.
3. **Sin claves de ningún tipo.** Radio Browser no las pide. **Jamendo se
   descartó** (pide `client_id`) y **Free Music Archive** también.
4. **"Descubrir" (Internet Archive) se cayó del plan.** La radio ocupó su
   sitio: Internet Archive solo daba dominio público, y él escucha éxitos
   comerciales (CNCO, Manuel Turizo, salsa). Si algún día se retoma, va en la
   v2 y en un rincón.
5. **Perfiles: opción B.** Se le ofreció A (un móvil = una persona) y eligió B
   (perfiles de verdad, cada cosa con marca de dueño). Lo sabe y lo quiere.
6. **Sin PIN, sin login.** "Aquí es seguro todo".
7. Las emisoras son **del teléfono** (las ven los dos); los ❤️ son de cada uno.
   Al cambiar de persona, la música **se para** y la cola se vacía.

## Verdades incómodas ya explicadas y aceptadas

No hace falta volver a suavizarlas, pero **no las contradigas**:

- **NO habrá icono en la cuadrícula de CarPlay.** Requiere app nativa +
  entitlement que Apple ata a publicar en la App Store. Lo que sí hay:
  "Ahora suena" con carátula y mandos del volante. Él ya lo sabe y lo aceptó.
- **YouTube se para al bloquear.** Apple + YouTube. Sin solución legal.
- **Safari borra los datos a los 7 días**; instalada en la pantalla de inicio
  está exenta. Por eso **tiene que abrirla desde el icono**, y por eso se
  descartó la idea de `display:browser` que yo mismo había propuesto antes.
- **El audio de fondo en PWA de iOS es inestable** (regresión en iOS 26,
  bug histórico de los 30 s en pausa). Es EL riesgo del proyecto.
- **Emisoras `http://` no suenan** (mixed content). Solo HTTPS.
- **Barquisimeto está mal cubierto**: Rumbera Network, Más Network, OK 101.5,
  Sabrosa y Durísima dan 401 o no están. Por eso existe el ➕ a mano.

## Planes B y C: ya no hacen falta

La prueba del coche salió bien el 29/09/2026, así que **no vuelvas a sacar
esto** salvo que algún día el audio de fondo se rompa de verdad.

Queda apuntado por si acaso: el **plan B** era meter los MP3 en la app
**Música** del iPhone (el icono rojo que sí está en CarPlay) con **Dispositivos
Apple** de Windows — gana el icono, pierde la firma y el saludo, y si tiene
Apple Music con "Sincronizar biblioteca" hay que apagarlo primero. El **plan
C** (app nativa, Mac + 99 €/año) estaba descartado ya: ni así daría el icono.

## Entorno

- **En este PC hay `git` y `python`. NO hay `node` ni `gh`.** Scripts en Python.
- ⚠️ **`index.html` está en CRLF.** Al parchearlo con Python, leer con
  `io.open(p, encoding='utf-8')` (traduce a `
`) y escribir con
  `newline='

'`. Y **escribir siempre a un temporal y `os.replace`**: un
  `open(p,'w')` trunca el fichero antes de fallar, y así se quedó en 0 bytes
  una vez (se recuperó con `git restore`, pero por poco).
- Repo pendiente de crear: `elguaro433/mi-musica`. Mirar cómo están montadas
  las otras apps en `Desktop/Proyectos-Hijos` (Calendario, AventuraEspacial).
- Servidor local: `.claude/launch.json` → `python -m http.server 8770`.
- El usuario **escribe por voz**: confirmar nombres dudosos.

## Cosas del código que conviene saber

- `index.html` es autocontenido y lleva las 30 emisoras **embebidas** (para que
  la radio esté disponible sin red al abrir). Se generaron y probaron una a una.
- El lector ID3 es propio, sin librerías. Maneja v2.2/2.3/2.4, encodings
  ISO-8859-1 / UTF-16 (con y sin BOM) / UTF-8, y APIC/PIC para la carátula.
- La huella de deduplicado son los **primeros 2 MB + el tamaño**, no el fichero
  entero: con 8 MB por canción, digerirlo todo era lento de más.
- `CANCIONES` guarda los Blob de carátula en memoria (son referencias, no datos).
- El `<audio>` vive en `#audio-caja` y **no se recrea al navegar** — solo lo
  recrea el guardián nº 1 como último recurso, y primero intenta reasignar
  `src` sobre el mismo elemento para no perder el desbloqueo de iOS.
- `sw.js` **nunca toca IndexedDB**. Borrar sus cachés no borra ni una canción.
- Los diez guardianes están documentados en el README con su número; en el
  código llevan comentarios `Guardián nº N`.
- **El guardián nº 1 fue el gran fallo del 28/09/2026.** Vigilaba con 2,4 s de
  margen y, si `currentTime` no avanzaba, reasignaba `audio.src`. En radio en
  directo con datos móviles eso es un bache normal, así que cortaba la emisora
  sola cada 20 s; y con la pantalla apagada era mortal, porque iOS no deja
  arrancar una fuente nueva de fondo. Ahora: 12 s en radio y 4 s en canción,
  solo actúa si `readyState < 3`, descarta las medidas que llegan tarde
  (iOS congela los temporizadores con la pantalla apagada) y **con
  `document.hidden` no toca la fuente jamás**: como mucho reintenta `play()`.
- **`paradoPorMi`** es la bandera de «lo paraste tú». La ponen `pausarYo()` y
  `cambiarPersona()`, y la respetan `programarReconexion`, `trasInterrupcion`,
  `vigilar`, el evento `online` y el `visibilitychange`. **Nunca llamar a
  `audio.pause()` a pelo** —los mandos de Media Session lo hacían, y por eso la
  radio se encendía sola cada vez que la parabas desde el volante.
- Parar la radio **suelta** el `src` (deja de tirar de datos). Por eso
  `playPause()` reconecta desde `actual.url` si no hay `src`.
- **`viendoVideo`** hace que mande el vídeo de YouTube: al abrirlo se para la
  música, al cerrarlo no vuelve sola, y darle al ▶ cierra el vídeo. Una cosa
  suena cada vez.
- `anotar()` añade `[PANTALLA APAGADA]` cuando `document.hidden`. Es lo que
  permitirá saber por fin si iOS nos corta el audio de fondo.
- La **hoja de acciones** (`#hoja` + `abrirHoja`/`cerrarHoja`) es el único
  componente tipo modal de la app. De ahí cuelga meter canciones en listas.
  `listaAbierta` guarda qué ficha de lista estás mirando, igual que `ytVerId`
  e `iaAbierto` hacen en la pestaña Buscar.

## Ideas propuestas y NO hechas

- Reordenar la cola a mano.
- Verificar las 30 emisoras periódicamente y poner en gris las muertas.
- Normalizar el volumen entre canciones.
- Logos para las 18 emisoras de casa que se quedaron sin él.
- Guía de comprar MP3 paso a paso dentro de la app.

**Ya hechas, no las propongas otra vez:** el buscador de emisoras del mundo
(v1.5.0), los logos de emisora (v1.5.0) y subir el tamaño de la letra
pequeña (v1.4.0).
