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

**Radio** — 30 emisoras probadas una a una, todas en HTTPS, **y un buscador
de todas las demás** (v1.5.0). Escribe un estilo (`reggaeton`, `salsa`,
`bachata`, `vallenato`) o una ciudad (`Medellín`, `Santo Domingo`) y pulsa
buscar: la app pregunta a **Radio Browser**, la base libre y colaborativa de
emisoras, **sin clave de ningún tipo**. La táctil suena al momento; el ➕ la
guarda para siempre y entonces la ven los dos. Solo salen emisoras `https://`,
porque las `http://` el iPhone las bloquea.

Se pregunta por **nombre y por etiqueta a la vez**, porque quien escribe
"salsa" no tiene por qué saber cuál de las dos cosas es. Los nombres de más de
70 caracteres se descartan: son granjas de etiquetas que solo ensucian la
lista. Cuatro servidores en fila con `AbortController`, y se recuerda el que
funcionó en `localStorage.mm_rb_ok` — igual que con Piped. El 29/09/2026
respondían `de1` y `de2`; `fi1` y `at1`, no.

**Cada emisora con su logo** (v1.5.0). Las del buscador traen el suyo de la
propia base. De las 30 de casa, **12 tienen logo comprobado**: se buscaron uno
a uno exigiendo que **coincidiera el país**, no solo el nombre — sin ese filtro
a Hit FM le tocaba un logo ucraniano y a KISS FM uno mexicano. Las otras 18 se
quedan con su color: mejor sin logo que con el logo de otra. El logo se ve
**entero** (`contain`), no recortado, y es lo que sale en CarPlay y en la
pantalla de bloqueo cuando la emisora lo tiene.

Las 30 de casa:

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

**YouTube** — **Escribes lo que quieras y busca**, sin ninguna clave de Google.
Usa Piped, una fachada libre de YouTube, con cinco servidores en fila: si uno
está caído pasa al siguiente solo y recuerda cuál funcionó. También puedes
pegar un enlace. ⚠️ El vídeo se para al bloquear el móvil: lo bloquean Apple y
YouTube, no hay forma de evitarlo desde una web.

**Descubrir** — Música **legal y gratis** de Internet Archive, filtrada a las
tres colecciones limpias: `georgeblood` (78 rpm en dominio público), `etree`
(conciertos que los grupos autorizan) y `netlabels` (licencia Creative Commons).
Se descarga a tu biblioteca de un toque. Aquí no hay éxitos comerciales.

**Coche y auriculares** — Un **modo coche** con tres botones gigantes (atrás,
play, adelante) para no apartar la vista. La cola sobrevive a cerrar la app.
Repetir tiene tres estados: apagado, toda la lista, una sola. Y si una llamada
o el GPS cortan la música, **vuelve sola** cuando terminan.

**Calidad** — La app **nunca recodifica**: guarda el archivo byte por byte tal
como entra. Lee la cabecera real del MP3 y te enseña el bitrate de verdad
(«MP3 320 kbps»). Las emisoras llevan su calidad y estrellas: ★★★ desde 256
kbps equivalentes, ★★ desde 128, ★ desde 96. Cuenta que **HE-AAC rinde cerca
del doble** que MP3, así que 64 kbps HE-AAC suenan como 128 de MP3.

### Listas que se llenan de verdad (v1.3.0)

Cada canción lleva un **⋯** a la derecha. Ahí dentro:

- **Añadir a una lista** — elige una de las tuyas o crea una nueva con esa
  canción ya dentro.
- **Ponerla a continuación** — se cuela justo después de la que suena.
- **Marcar como favorita**.

El mismo **⋯** está arriba en «Sonando ahora», para la que está sonando.

Y al tocar una lista en **Biblioteca → Listas** ya no se pone a sonar a lo
bruto: se abre su ficha, con **▶ Reproducir la lista**, **➕ Añadir canciones**
(puedes meter varias de un tirón) y una **✕** en cada canción para sacarla de
la lista sin borrarla de la biblioteca.

**Y además:** favoritos, aleatorio, cola "A continuación",
temporizador para dormir, copia de seguridad, mantener la pantalla encendida, y
controles en la pantalla de bloqueo y en el coche (Media Session).


## El tamaño de la letra lo eliges tú (v1.6.0)

⚙️ Ajustes → **Tamaño de la letra**: Normal, Grande o Muy grande. No es un
apaño en cuatro sitios: **los 88 `font-size` de la app son
`calc(Npx * var(--esc))`**, así que un solo número los mueve todos a la vez y
nada se descoloca. El normal es `1.12` (un 12 % por encima de la v1.5), Grande
`1.26` y Muy grande `1.42`. Se guarda en `mm_ajustes.letra` y se aplica en
`cargarAjustes()`, antes de pintar nada.

Las cuatro pestañas de Buscar se reparten el ancho a partes iguales, así que
su letra crece solo hasta `1.14`: pasado eso se recortaban a "Mi mú…".

Comprobado a 393×852 y 440×956 en los tres tamaños: sin desbordes, sin texto
cortado sin querer y sin zonas de toque por debajo de 32 px.

---

## Que el iPhone vaya en armonía con la app

Tres cosas que no están en el código pero cambian mucho la experiencia:

### 1. Que se abra sola al entrar en el coche ⭐

Lo más parecido a tener icono en CarPlay, y funciona de verdad:

1. Abre la app **Atajos** → pestaña **Automatización**
2. **Crear automatización personal** → **CarPlay** → marca **Se conecta**
3. **Ejecutar inmediatamente** (para que no te pregunte)
4. Acción: **Abrir app** → **Mi Música**

A partir de ahí, enchufas el móvil al Dacia y Mi Música se abre sola. Le das a
▶ una vez y ya controlas todo desde la pantalla del coche y el volante.

### 2. Pantalla de arranque propia

Ya está hecho: hay una imagen por cada iPhone (`splash-393x852.png` para el
14 Pro, `splash-440x956.png` para el 16 Pro Max, y cuatro más). Al abrir desde
el icono no hay fogonazo blanco — sale la nota y la firma sobre el fondo neón.

### 3. "Oye Siri, pon mi música"

En **Atajos** → **+** → **Abrir app** → **Mi Música**, ponle de nombre
*"Poner mi música"*. Luego basta con decírselo a Siri.

## Dónde guardar los MP3 en el iPhone

La app se queda con **su propia copia** dentro del teléfono (por eso suena sin
internet). Los archivos originales conviene tenerlos ordenados:

1. **Archivos → iCloud Drive**, crear una carpeta **Mi Música**.
2. **Ajustes → Safari → Descargas → iCloud Drive**, para que lo que bajes caiga ahí.
3. Mover ahí los MP3 comprados o descargados.
4. En la app: **Biblioteca → ➕ Añadir música → iCloud Drive → Mi Música**.

Los de iCloud quedan de respaldo: si se borra la app, se vuelven a añadir desde
ahí. La misma guía está dentro de la app, en **⚙️ Ajustes → Dónde guardar tus MP3**.

## Dónde comprar música legal (para que sea tuya)

Necesitas **el archivo**, no una suscripción:

| Tienda | Qué te llevas |
|---|---|
| **Amazon Música Digital** (amazon.es) | MP3 con etiquetas y carátula — el más cómodo |
| **Bandcamp** | MP3 320 o FLAC, y al artista le llega ~85% |
| **Qobuz** · **7digital** | MP3/FLAC |

⚠️ El **iTunes Store** vende canciones, pero caen en la app Música del iPhone,
no en Archivos: sacarlas para meterlas aquí es un lío.

Gratis y legal: **Jamendo**, **Free Music Archive**, **ccMixter**, **Musopen**,
**Pixabay Music** y Bandcamp "name your price".

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

## ✅ La prueba del coche: superada

Durante semanas todo el proyecto dependió de una pregunta que **solo se
respondía probándolo**: ¿deja iOS que una web instalada suene con la pantalla
apagada y en CarPlay?

> **29/09/2026 — sí.** Emmanuel repitió la prueba en su Dacia con la v1.3.0 y
> **la música siguió sonando con la pantalla apagada**. El riesgo que tenía el
> proyecto en vilo desde el principio ya no existe. El **plan B** (meter los
> MP3 en la app Música del iPhone con Dispositivos Apple) queda en el cajón:
> no hace falta.

La moraleja vale para el futuro: **la primera prueba falló y la culpa era
nuestra, no de iOS.** Antes de acusar a Apple, mirar el registro.

> **28/09/2026 — la primera prueba salió mal, y así se descubrió por qué.** Con la pantalla
> apagada no sonaba, y el informe traía cortes de radio cada 20 s. Midiendo el
> stream por fuera resultó que la emisora estaba perfecta (515 KB en 35 s sin
> un corte): quien cortaba era el **guardián nº 1** de la propia app, que daba
> la alarma a los 2,4 s sin avance y reasignaba la fuente. Arreglado en la
> v1.2.0. **Hay que repetir la prueba.** Ahora el registro de errores marca
> `[PANTALLA APAGADA]` en cada anotación, así que el informe lo dirá sin
> ninguna duda. (Y al repetirla con la v1.3.0, sonó.)

La app sigue trayendo la prueba dentro, por si alguna vez hay que repetirla: **⚙️ Ajustes → Diagnóstico → Hacer la prueba**.
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
- **No poner al guardián nº 1 a vigilar la radio con poco margen.** Un bache
  de 2 s en directo es normal; si se reasigna la fuente por eso, se corta la
  emisora sola. Radio 12 s, canción 4 s, y solo si `readyState < 3`.
- **No llamar a `audio.pause()` a pelo.** Hay que usar `pausarYo()`, que deja
  la bandera `paradoPorMi`. Si no, la app cree que fue una llamada entrante y
  vuelve a encender la música sola.
- **No montar un descargador de YouTube.** Va contra sus condiciones de uso y
  además desde una web instalada es imposible (haría falta servidor propio).
  Ya se preguntó; la respuesta es no, y las alternativas están arriba en
  *Dónde comprar música legal*.

---

Propiedad de la **Familia Díaz González** · Creador: **Emmanuel Díaz**
