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
