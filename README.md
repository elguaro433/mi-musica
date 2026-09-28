# 🎵 Mi Música

App de música **personal y privada** para los iPhone de Emmanuel y Elibel.
Música descargada (suena sin internet y en el coche), **30 emisoras de radio**
y YouTube para lo que no tengas.

- **Propietario:** Emmanuel Díaz · Familia Díaz González
- **Estado:** construida, **sin publicar todavía**. Falta la prueba en el coche.

---

## Cómo funciona

```
 iPhone de Emmanuel                    iPhone de Elibel
 ┌──────────────────┐                  ┌──────────────────┐
 │ Su música        │                  │ Su música        │
 │ Sus listas       │   NO se hablan   │ Sus listas       │
 │ Sus favoritos    │ ◄──────╳───────► │ Sus favoritos    │
 └──────────────────┘   (no hay nube)  └──────────────────┘
          └──────────── mismo enlace ───────────┘
                     (GitHub Pages)
```

**No hay servidor ni base de datos en la nube.** Cada teléfono guarda lo suyo
en su propio almacén interno. Es lo contrario del Calendario familiar, que sí
usa Firestore porque allí los dos quieren ver lo mismo.

Dentro de un mismo teléfono hay **dos perfiles de verdad**: cada canción,
lista y favorito lleva marca de dueño. Al cambiar de persona en ⚙️ Ajustes
cambia **todo** lo que ves. No hay contraseña: separa para que no os
confundáis, no para esconder nada.

| Archivo | Para qué |
|---|---|
| `index.html` | La app entera: pantallas, reproductor, lector de etiquetas, radio |
| `manifest.json` | Para instalarla como app (icono, pantalla completa) |
| `sw.js` | Funciona sin internet; con internet siempre coge la versión nueva |
| `icon-*.png`, `favicon.ico` | Iconos |
| `folleto.html` | El folleto de diseño original |

---

## Qué tiene dentro

**Tu música** — Añades MP3 desde Archivos o iCloud con ➕. La app **lee las
etiquetas ID3 ella sola** (título, artista, álbum, género, año y carátula) y
ordena la biblioteca por artista, álbum y género. Si un archivo no tiene
etiquetas, usa el nombre "Artista - Título".

**Un mismo MP3 se guarda una sola vez.** Si los dos tenéis *Pegao*, ocupa la
mitad: cada uno tiene su ficha y comparten el archivo.

**Radio** — 30 emisoras probadas una a una, todas en HTTPS:

| | Emisoras |
|---|---|
| 🇦🇩 Andorra | RNA · Andorra Música · Flaix FM · Flaixbac · Ràdio Valira · SER Andorra |
| 🇻🇪 Barquisimeto | Rumba 100.1 · Fama 98.1 |
| 🇻🇪 Caracas | Éxitos 99.9 · La Mega 107.3 · Planeta 105.3 · KYS FM · Onda 107.9 |
| 🇨🇴 Bogotá | Tropicana · Candela Estéreo · Vibra · Olímpica Stéreo · Bésame · LOS40 Colombia · Radioacktiva |
| 🇪🇸 España | LOS 40 (+Dance, +Urban) · Cadena Dial · KISS FM · Cadena 100 · Hit FM · Rock FM · Máxima · Flaix FM |

Vienen de fábrica y **las ven los dos** (son el catálogo de la casa); los ❤️
de cada uno son suyos. Con **➕ Añadir emisora a mano** pegas cualquier otra,
siempre que empiece por `https://` — las de `http://` el iPhone las bloquea.

**YouTube** — Pegas un enlace y el vídeo se ve dentro. ⚠️ Se para al bloquear
el móvil: lo bloquean Apple y YouTube, no hay forma de evitarlo desde una web.

**Y además:** favoritos, listas propias, aleatorio y repetir, cola "A
continuación", temporizador para dormir, copia de seguridad, y controles en la
pantalla de bloqueo y en el coche (Media Session).

---

## Los diez guardianes

La app se vigila a sí misma. Cada uno tapa un fallo concreto:

| # | Guardián | Qué arregla |
|---|---|---|
| 1 | **Vigilante del audio** | El bug de iOS en que `play()` dice que suena pero no sale sonido. Comprueba si el tiempo avanza de verdad; si no, reintenta 3 veces y al final crea un reproductor nuevo. |
| 2 | **Reconexión de la radio** | Los **túneles de Andorra**. Reintenta a 1, 2, 4, 8… hasta 30 s con desfase aleatorio, y en cuanto vuelve la señal sigue sonando sola. Se rinde tras 10 intentos para no gastar batería. |
| 3 | **Detector de red** | En vez de reintentar a ciegas, reconecta en el instante en que vuelve internet. |
| 4 | **Desbloqueo silencioso** | iOS exige un toque para el primer sonido. Suelta un audio mudo en tu primer toque y así puede encadenar canciones sola. |
| 5 | **Almacén blindado** | Pide `persist()` para que iOS no borre. Mide el hueco antes de guardar y avisa al 80% en vez de reventar. |
| 6 | **Revisión al arrancar** | Si iOS borró un archivo, marca esa canción en gris en vez de colgarse al darle al play. |
| 7 | **Copia de seguridad** | Exporta favoritos, listas, veces escuchadas y emisoras a un `.json` para iCloud Drive. |
| 8 | **Auto-desinfección** | Deja una marca antes de arrancar. Si encuentra dos seguidas, se limpia sola y recarga **una vez** (con cerrojo anti-bucle). Nunca toca tu música. |
| 9 | **Modo seguro** | Si ni eso funciona: Reintentar · Guardar copia · Reparar. Nunca una pantalla en blanco. |
| 10 | **Caja negra** | Guarda los 50 últimos errores. *Ajustes → Copiar informe para Emmanuel*. |

⚠️ **Ninguno de estos derriba un muro de Apple.** Arreglan fallos, no
restricciones del sistema.

---

## ⚠️ Lo que falta: la prueba del coche

Todo esto depende de una pregunta que **solo se responde probándolo**: ¿deja
iOS que una web instalada suene con la pantalla apagada y en CarPlay?

La app trae la prueba dentro: **⚙️ Ajustes → Diagnóstico → Hacer la prueba**.
Comprueba sola lo que puede, y te da la lista de lo que tienes que mirar tú:

1. Pon una canción y **apaga la pantalla** — ¿sigue sonando?
2. ¿Salen los controles en la **pantalla de bloqueo**?
3. Déjala **en pausa 5 minutos** y dale al play desde el bloqueo.
4. Conecta el **CarPlay** y abre «Ahora suena».
5. Toca ⏭ en la pantalla del coche y en el **volante**.

**Sobre CarPlay, la verdad:** Mi Música **no tendrá icono propio** en la
cuadrícula de CarPlay. Eso solo lo dan las apps nativas con un permiso que
Apple concede caso por caso y ligado a publicar en la App Store. Lo que sí
tendrás es tu música en **«Ahora suena»**, con carátula, título, artista y los
botones ⏮ ⏸ ⏭, y el volante funcionando.

---

## Cómo publicarla

1. Crear el repo `mi-musica` en GitHub (`elguaro433`) y activar **Pages** desde
   la rama `main` / raíz.
2. Subir todos los archivos de esta carpeta **menos** `folleto.html` y `.claude/`.
3. Esperar ~1 minuto. Queda en `https://elguaro433.github.io/mi-musica/`.

### Instalarla en cada iPhone

1. Abrir el enlace **en Safari** (⚠️ en Chrome no vale).
2. Compartir → **Añadir a pantalla de inicio**.
3. Abrirla **siempre desde el icono**, no desde Safari.

> **Por qué es obligatorio instalarla:** Safari borra los datos de una web a
> los 7 días sin visitarla. Las apps de la pantalla de inicio están exentas.
> Si la usas dentro de Safari, **pierdes tu biblioteca en una semana**. La app
> te avisa si detecta que la has abierto mal.

### Para publicar cambios

1. Subir `APP_VERSION` en `index.html` **y** `VERSION` en `sw.js`.
2. `git commit` + `git push`. Los teléfonos cogen la versión nueva solos.

---

## Probar en el ordenador

```bash
python -m http.server 8770
```

Y abrir `http://localhost:8770`. Los datos del ordenador y los del móvil son
independientes: no se mezclan.

---

## Cosas que NO hacer

- **No cambiar** el usuario de GitHub (`elguaro433`) ni el nombre del repo:
  dejaría de funcionar la dirección y los teléfonos perderían la app.
- **No borrar IndexedDB** para "arreglar" algo: ahí vive toda la música.
  Para limpiar, usar *Ajustes → Reparar*, que respeta la música.
- **No meter emisoras `http://`**: el iPhone las bloquea y no suenan.
- **No prometer icono en CarPlay.** No se puede.

---

Propiedad de la **Familia Díaz González** · Creador: **Emmanuel Díaz**
