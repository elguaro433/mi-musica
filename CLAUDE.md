# 🎵 Mi Música — dónde quedamos

> **Para el futuro Claude:** lee `README.md` primero (qué es, qué tiene, cómo
> publicarla). Este documento es solo lo que NO se ve en el código.
> El usuario es **Emmanuel Díaz** (estudiante de ing. informática, vive en
> Andorra, venezolano). Habla en español, tono cercano y honesto, sin sermones.
> **Nunca digas "robar" ideas; se dice "copiar/inspirarse".** Sus apps llevan
> crédito "Familia Díaz González · Creador: Emmanuel Díaz" y firma
> "Emmanuel Díaz".

## 👉 EMPIEZA AQUÍ (sesión del 29/09/2026)

**Lo primero que hay que preguntarle: ¿hizo la prueba en el coche?**
(⚙️ Ajustes → Diagnóstico → Hacer la prueba, y los 5 pasos en su Dacia.)

Todo el proyecto depende de esa respuesta:
- **Si la música suena con la pantalla apagada** → seguimos puliendo la app.
- **Si NO suena** → hay que hablarle del plan B (meter los MP3 en la app
  Música del iPhone con Dispositivos Apple en Windows). Está explicado abajo.

Segunda pregunta: **¿montó la automatización de Atajos** (CarPlay → Se conecta
→ Abrir Mi Música)? Es lo que hace que se abra sola al entrar en el coche.

### Pendientes concretos, por orden
1. Añadir canciones a una lista desde la ficha de la canción. Hoy las listas se
   crean vacías y solo se llenan restaurando una copia. **Es el hueco más
   evidente de la app.**
2. Reordenar la cola a mano.
3. Repasar las 30 emisoras y poner en gris las que hayan muerto.
4. Guía paso a paso de cómo comprar en Amazon Música Digital y meterlo en la
   app (se la prometí y quedó solo resumida en el README).

## Sus aparatos (importa para la maquetación)
- **Emmanuel → iPhone 14 Pro** (393×852)
- **Elibel → iPhone 16 Pro Max** (440×956)
- Coche: **Dacia con CarPlay**. Escucha reggaetón, salsa y bachata
  (CNCO, Manuel Turizo, Marc Anthony, Romeo Santos).
- Hay un comprobador de maquetación en el historial de la sesión: recorre las
  9 pantallas y mide desbordes, letra pequeña y zonas de toque. Si tocas CSS,
  vuelve a pasarlo a 393×852 y 440×956.

## Estado — 28/09/2026 (v1.1.0)

Publicada en https://elguaro433.github.io/mi-musica/ — repo `elguaro433/mi-musica`.

### Lo que se añadió en la v1.1.0
- **Buscador de YouTube escribiendo**, sin clave de Google, vía **Piped**
  (fachada libre). Cinco servidores en fila con `AbortController`; recuerda el
  que funcionó en `localStorage.mm_piped_ok`. Los que responden con CORS hoy:
  `api.piped.private.coffee` y `pipedapi.ducks.party`. El resto suelen dar
  502/000 — por eso la lista con respaldo.
- **Pestaña Descubrir**: Internet Archive limitado a `georgeblood`, `etree` y
  `netlabels`. ⚠️ NO ampliar a otras colecciones: el resto son subidas de
  usuarios y hay discos comerciales pirateados.
- **Modo coche**: tres botones gigantes; aleatorio y repetir se ocultan.
- **Cola persistente**, **repetir de 3 estados**, **vuelta tras interrupción**
  (llamada/GPS) y **Wake Lock** opcional.
- **Calidad real**: lee la cabecera de trama MPEG para el bitrate; las
  emisoras llevan codec/kbps y estrellas. Nunca se recodifica nada.
- **Pantallas de arranque** iOS por aparato (6 imágenes).

### Verificado midiendo, no a ojo
- Maquetación sin un solo problema a **393×852** (14 Pro, el de Emmanuel) y
  **440×956** (16 Pro Max, el de Elibel): sin desbordes, sin letra <9,4 px,
  sin zonas de toque menores de lo que pide Apple.
- Integridad del audio: 4.638.208 bytes entran, 4.638.208 salen, idénticos.
- Las 30 emisoras suenan desde la web publicada.

## Estado anterior

**La app está CONSTRUIDA y probada en el ordenador. NO está publicada.**
Lo único que falta antes de seguir: **que Emmanuel haga la prueba en su Dacia**
(⚙️ Ajustes → Diagnóstico). Todo el proyecto depende de esa prueba.

Verificado ya en Chromium: arranque, perfiles separados, lector ID3
(UTF-16/Latin-1/carátulas/respaldo por nombre), deduplicado por huella,
reproducción local, radio en directo, Media Session, modo seguro y su
recuperación, persistencia tras recargar.

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

## Si la prueba del coche FALLA

Plan B ya hablado: meter los MP3 en la app **Música** del iPhone (el icono rojo
que sí está en CarPlay) con la app **Dispositivos Apple** de Windows. Pierde la
firma y el saludo, gana el icono. ⚠️ Si tiene Apple Music con "Sincronizar
biblioteca", hay que apagarlo.
Plan C (app nativa, Mac + 99 €/año) **descartado**: ni así daría el icono.

## Entorno

- **En este PC hay `git` y `python`. NO hay `node` ni `gh`.** Scripts en Python.
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

## Ideas propuestas y NO hechas

- Añadir canciones a una lista desde la ficha (las listas se crean pero solo se
  llenan restaurando una copia).
- Reordenar la cola a mano.
- Verificar las 30 emisoras periódicamente y poner en gris las muertas.
- Normalizar el volumen entre canciones.
