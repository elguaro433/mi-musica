# 🎵 Mi Música

App de música **personal y privada** para los iPhone de Emmanuel y Elibel:
tu música (suena sin internet y en el coche), radio del mundo entero,
novedades y YouTube para lo que no tengas.

- **Propietario:** Emmanuel Díaz · Familia Díaz González
- **Estado:** publicada y en uso diario (v2.6, octubre de 2026)
- **Dirección:** https://elguaro433.github.io/mi-musica/ — repo `elguaro433/mi-musica` (GitHub Pages, rama `main`)

---

## Cómo funciona

No hay servidor ni nube. Cada teléfono guarda lo suyo en su almacén interno
(IndexedDB). Cada persona tiene **su enlace** y la app queda fijada a ella:

| Enlace | Para |
|---|---|
| `/emmanuel.html` | iPhone 14 Pro de Emmanuel |
| `/elibel.html` | iPhone 16 Pro Max de Elibel |

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera (pantallas, reproductor, lector ID3, radio, 30 emisoras de casa) |
| `sw.js` | Funciona sin internet; con internet siempre coge la versión nueva |
| `manifest.json`, `manifest-elibel.json` | Instalarla como app (uno por persona) |
| `emmanuel.html`, `elibel.html` | Enlace de cada persona (redirigen a `index.html?p=…`) |
| `guia.html` | Guía para pasar los MP3 al iPhone (Telegram/WhatsApp → Archivos) |
| `limpiar.html` | Borra service worker y cachés **sin tocar la música** |
| `icon-*.png`, `favicon.ico`, `logo.png`, `splash-*.png` | Iconos, logo y pantallas de arranque |
| `publica/` | Copia genérica para la App Store, se **genera** con `python publica/crear_publica.py` |
| `native/`, `.github/workflows/` | App nativa de iOS (Capacitor) compilada en GitHub. **En pausa** |
| `apple/` | Requisitos de Apple y borrador de política de privacidad |

---

## Qué tiene

**Barra de abajo:** Inicio · Buscar · Radio · Biblioteca.

- **Inicio:** listas automáticas (Toda mi música, Lo más escuchado, Añadidas
  hace poco, Favoritas, géneros), radio de un toque, éxitos de hoy por país
  (Apple), novedades de tus cantantes y avisos (copia semanal, poco espacio).
- **Buscar:** Música (Apple + Audius; lo tuyo sale como «En tu música»;
  tocar una canción la busca entera en Audius o abre el vídeo) · YouTube.
- **Radio:** 30 emisoras de casa (Andorra, Venezuela, Colombia, España) y
  buscador de todas las del mundo (Radio Browser, sin clave, solo `https://`).
  Las que no responden salen en gris 3 días. Se pueden quitar con 🗑.
- **Biblioteca:** Mi música (Todas/Artistas/Álbumes/Géneros, Reproducir,
  Aleatorio) · Favoritas · Listas.
- **Sonando ahora:** carátula con su color de fondo, letra sincronizada
  (LRCLIB), cola «A continuación», barra arrastrable.
- **Gestos:** bajar para cerrar, subir la barrita para abrir, deslizar desde
  el borde izquierdo para volver, deslizar una fila a la izquierda (❤️ / 🗑).
- **Coche:** carátula y logo en CarPlay y pantalla de bloqueo, mandos del
  volante (anterior/siguiente), sigue con la pantalla apagada.
- **Siri:** con un Atajo que abre `?cancion=<lo dicho>` («pon la radio
  favorita», «pon Shakira»…) o `?accion=aleatorio`.
- **Ajustes:** al abrir la app (seguir/aleatorio/nada), color, tamaño de
  letra, coche, internet y datos, tu música y copias, informe para Emmanuel.

La app **nunca recodifica**: guarda cada MP3 byte por byte. Un mismo MP3 que
tengáis los dos se guarda una sola vez.

---

## Publicar cambios

1. Subir `APP_VERSION` en `index.html` **y** `VERSION` en `sw.js` (formato X.Y).
2. `git commit` + `git push`. Los teléfonos la cogen solos al abrir la app
   (si suena algo, esperan a que se pare).
3. Si se tocó la app y se quiere la copia pública al día:
   `python publica/crear_publica.py`.

## Probar en el ordenador

```bash
python -m http.server 8770
```

Y abrir `http://localhost:8770`. Antes de publicar cambios de aspecto,
mirarla a **393×852** y **440×956** (los dos iPhone).

---

## Cosas que NO hacer

- **No cambiar** el usuario de GitHub ni el nombre del repo: los teléfonos perderían la app.
- **No borrar IndexedDB** para «arreglar» algo: ahí vive toda la música.
- **No meter emisoras `http://`**: el iPhone las bloquea.
- **No llamar a `audio.pause()` a pelo**: usar `pausarYo()` (pone `paradoPorMi`).
- **No reasignar `audio.src` con la pantalla apagada**: iOS no deja arrancar una fuente nueva de fondo.
- **No usar Web Audio** (mezcla, crossfade, volumen): con la pantalla apagada deja la app muda. Se quitó en la v1.37.3.
- **No montar un descargador de YouTube** ni vistas previas de 30 s.
- **No prometer icono en CarPlay** ni que Siri la use como app de música: solo las apps nativas.

---

Propiedad de la **Familia Díaz González** · Creador: **Emmanuel Díaz**
