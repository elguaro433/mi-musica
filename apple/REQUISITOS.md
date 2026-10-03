# Publicar en la App Store: requisitos y estado

Análisis del 3/10/2026, hecho con las Normas de Revisión de Apple (App Review Guidelines) y los requisitos de subida vigentes.
Las normas cambian: antes de enviar cada app hay que releerlas en https://developer.apple.com/app-store/review/guidelines/

> **Nota:** TestFlight (para Emmanuel y Elibel) y App Store pública (para todo el mundo) son cosas distintas.
> TestFlight casi no tiene revisión. La App Store pública sí.

## 1. Cuenta y trámites (los hace Emmanuel, yo no puedo)

| Qué | Detalle |
|---|---|
| Apple Developer Program | 99 €/año, inscripción como **persona** (sale su nombre como vendedor). Con nombre de empresa haría falta un número D-U-N-S. |
| Verificación de identidad | Apple la pide; puede tardar horas o días. |
| Acuerdos en App Store Connect | Aceptar el «Paid Apps Agreement» solo hace falta si vende algo. Apps gratis: no. |
| Estado de «trader» (UE, DSA) | Para distribuir en la UE hay que declarar si se es comerciante. Si se declara, Apple muestra la dirección y el teléfono en la ficha. Decisión de Emmanuel. |
| Clave de API de App Store Connect | Permite que GitHub firme y suba las apps solo. Se guarda como *secret* de GitHub, **nunca en un chat**. |

## 2. Requisitos técnicos (lo que se puede automatizar)

| Requisito | Estado |
|---|---|
| Compilar con **Xcode 26 / SDK de iOS 26** (obligatorio al subir desde el 28/04/2026) | Hecho y comprobado: la app compila con el SDK iphoneos26.5 (Xcode 26.6). |
| Manifiesto de privacidad `PrivacyInfo.xcprivacy` | Hecho (`native/PrivacyInfo.xcprivacy`), se añade al proyecto en cada compilación. |
| Cifrado: `ITSAppUsesNonExemptEncryption = false` (solo HTTPS) | Hecho. |
| Solo iPhone y solo vertical (así no piden capturas de iPad) | Hecho: iPhone y vertical. |
| Icono 1024×1024 **sin transparencia** | Se genera desde `icon-512.png` (ampliado). **Falta un icono propio en 1024 real.** |
| Permiso de audio en segundo plano (`UIBackgroundModes: audio`) | Hecho. Apple lo acepta si la app reproduce audio de verdad. |
| Firmar y subir a TestFlight desde GitHub | Preparado (`.github/workflows/testflight.yml`), **sin probar**: hace falta la cuenta. |
| Sin APIs privadas, sin crashes, funciona sin internet | Sin comprobar en un iPhone real. |

## 3. Ficha de App Store Connect (cada app)

- **Nombre** (máx. 30 caracteres, único en toda la App Store: «Mi Música» seguramente ya existe), subtítulo, descripción, palabras clave.
- **Capturas** del iPhone de pantalla más grande (6,9", 1320×2868). Se pueden sacar del simulador o del iPhone de Elibel.
- **URL de privacidad** (obligatoria) y **URL de soporte** (obligatoria). Borrador en `apple/privacidad.html`.
- **Clasificación por edades** (cuestionario). **Categoría. Copyright.**
- **Etiquetas de privacidad** («nutrition label»): qué datos recoge la app. Mi Música: ninguno propio.
- **Notas para el revisor**: explicar cómo probar la app. Si necesita datos, dar una cuenta de prueba o un modo demo.
- **Declaración de contenido de terceros**: Apple pregunta si la app tiene contenido de terceros y si se tienen derechos.

## 4. Normas de revisión que afectan a cada app

### Mi Música (gratis, para todo el mundo)
| Norma | Riesgo | Qué hacer |
|---|---|---|
| **4.2** Funcionalidad mínima: no vale «una web metida en una app» | **Medio-alto** | El reproductor nativo, la biblioteca sin internet, la radio y el control desde CarPlay/bloqueo son valor real. Cuanto más nativa, mejor. |
| **4.3** Apps repetidas / varias para lo mismo | Bajo | Para la tienda pública, **una sola app y un solo identificador**. Las dos de Emmanuel y Elibel son solo para TestFlight. |
| **5.2.3** Descargar o convertir audio de YouTube, Apple Music, etc. | Bajo | La app no descarga de YouTube (decisión ya cerrada). |
| **5.2.2** Servicios de terceros: debe haber permiso de sus condiciones | **Medio** | Las instancias de **Piped** (buscador de YouTube no oficial) pueden violar las condiciones de YouTube: **quitarlas** en la versión pública. Dejar el reproductor oficial (IFrame) y Audius / Radio Browser / iTunes Search con su atribución. |
| **5.2.5** Vistas previas de Apple | Ninguno | Ya no se usan. Si se mostraran enlaces a Apple, llevarían su logo. |
| **5.1.1** Política de privacidad | Obligatoria | Borrador hecho. |
| Fuentes de Google Fonts (cargan desde Google) | Bajo, pero en la UE es un problema de privacidad | **Incluir las fuentes dentro de la app.** |
| Datos personales dentro de la app | **Alto** | Ver §5. |

### Calendario Familia
- Usa **Firebase Firestore compartido** con datos reales de la familia (cumpleaños, nombres). La clave y las reglas son del proyecto `familia-diaz-gonzalez`.
- **No se puede publicar tal cual**: cualquiera que baje la app vería o tocaría los datos de la familia, o habría que montar cuentas.
- Versión pública: **datos solo en el teléfono de cada persona** (y, más adelante, iCloud). Sin cuentas → no hace falta borrar cuenta ni «Iniciar con Apple».
- Si en algún momento tiene cuentas: borrado de cuenta dentro de la app (5.1.1(v)) e «Iniciar sesión con Apple» si ofrece Google/Facebook (4.8).
- Quitar nombres y parentescos fijos; festivos por país elegible (hoy: Andorra y Venezuela fijos).

### Finanzas
- **Pendiente de revisar** (no he leído su código). Si es un cuaderno de gastos personal con datos solo en el teléfono, es una categoría común y permitida.
- No puede conectar con bancos, dar consejos de inversión ni ejecutar pagos: eso exige ser una entidad financiera con licencia (5.1.1(ix), 3.2.1(viii)).
- Aviso claro de que no es asesoramiento financiero.

### La Gran Aventura Espacial (juego infantil)
- Lleva **fotos y nombres de sus hijos** dentro (`foto-hermanos.jpg`, avatares, «Emiliano», «Emmanuel»). **Hay que quitarlos** antes de publicar nada.
- Si se declara «para niños» (Kids Category): sin publicidad, sin analítica de terceros, sin enlaces al exterior sin control parental (1.3, 5.1.4, COPPA/RGPD). Es lo más exigente: mejor publicarlo **sin la categoría Niños**, con clasificación 4+ y sin recoger nada.

### Lotería Amiga, BuySell365, Trading (no revisadas, solo por el nombre)
- **Loterías y apuestas** (5.3.4): exigen licencia en cada país y bloqueo geográfico. **No son publicables** por un particular.
- **Trading / inversión** (3.2.1(viii), 5.1.1(ix)): solo las publican entidades financieras con licencia. **No son publicables** por un particular.
- **Mercado / compraventa con panel de administración** (BuySell365): obligaría a moderar contenido de usuarios (1.2: filtrar, denunciar, bloquear, contacto) y, si cobra algo digital, a usar las compras de Apple. **Hay que verlo con calma.**

## 5. «Sacar mi información personal» de cada app pública

Lista de lo que hoy está dentro del código de Mi Música y no debe ir en la versión pública:
- Perfiles `Emmanuel` y `Elibel` (`PERSONAS`, saludo, foto), «Cambiar de persona».
- Crédito «Familia Díaz González · Creador: Emmanuel Díaz» y firma.
- Logo y fondos «Emmanuel & Elibel 2004» (iconos, `logo.png`, pantallas de arranque).
- El correo `emmanuel050216@gmail.com` (solo debe aparecer si él decide ponerlo como contacto).
- Textos sobre su familia, su coche (Dacia) y sus teléfonos en la guía (`guia.html`).
La versión **pública** será un modo `publico` sin nombres. La **privada** (TestFlight) sigue con perfiles.

## 6. Plan por fases

1. **Ya (sin cuenta):** compilación con Xcode 26, privacidad, borrador de política, este análisis. ✔
2. **Cuando Apple apruebe la cuenta:** clave de API → *secrets* → TestFlight para Emmanuel y Elibel. Se prueba el audio en iPhone y en el coche.
3. **Versión pública de Mi Música:** modo sin datos personales, nuevo icono, fuentes locales, quitar Piped, nombre único, capturas, ficha, enviar a revisión.
4. **Siguientes apps:** Calendario (datos locales), Aventura Espacial (sin fotos), Finanzas (tras revisarla). Cada una con su plantilla del mismo flujo.
5. Lotería, Trading y BuySell365: **decidir después**, probablemente no se publiquen o se publiquen muy cambiadas.

## 7. Qué no puedo prometer

- Que Apple apruebe una app: la decisión es de un revisor y puede rechazarla la primera vez (es normal; se corrige y se vuelve a enviar).
- Que «todos los iPhone del mundo» la tengan al instante: se elige en qué países se publica, y algunos exigen trámites extra.
- Que el permiso de CarPlay se conceda: se puede solicitar, pero lo decide Apple.
