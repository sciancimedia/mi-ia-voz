# Mi IA Voz — build propio en GitHub Actions

Todo está preparado en esta carpeta para compilar **«Mi IA Voz»** desde la
fuente de PocketPal AI v1.22.1 (licencia MIT) en GitHub Actions:
**sin Plus** (sin menú, sin pantalla de cobro, manos libres desbloqueado),
con el nombre y el sello familiar, y con el mismo `applicationId`
(`com.pocketpalai`) para que se instale **como actualización** sobre la app
actual conservando los datos.

Todavía no se ha subido nada a ningún sitio: falta la cuenta de GitHub del
propietario (ver «Pasos» más abajo).

---

## Cómo sale sin Plus (sin tocar el código)

No se ha modificado ni una línea del código funcional ni del gate:

- `babel.config.js` solo activa la puerta de pago si la variable de entorno
  `PLUS_STORE_GATE` vale `'true'` al compilar.
- Con la puerta apagada, `src/services/plus/gate.ts` hace
  `isPlusAvailable() = false` (el menú ni se dibuja) e
  `isPlusUnlocked() = true` (el manos libres por voz queda activo sin pagar).
- Nuestro workflow define `PLUS_STORE_GATE: 'false'` explícitamente y aborta
  si alguien lo pusiera a `true`.
- ⚠️ El workflow oficial `release.yml` pone `PLUS_STORE_GATE: 'true'` (es el
  build de tienda). **No usarlo.** El nuestro es `build-mi-ia-voz.yml`.
- El build incluye el paso oficial de verificación
  `scripts/verify-plus-gate.sh <apk> --ungated`, que falla si el APK saliera
  con la puerta activada.

## Firma: por qué el APK de GitHub se re-firma en local

El workflow **no** crea keystore release ni usa contraseñas. Verificado en
`android/app/build.gradle`: sin `APP_RELEASE_STORE_PASSWORD` /
`APP_RELEASE_KEY_PASSWORD`, el buildType `release` cae a la firma **debug**
(imprime un aviso y firma con `debug.keystore`). Por tanto:

- El APK que baja de GitHub viene firmado con la clave debug genérica.
- **No instalarlo tal cual**: la app ya instalada está firmada con el
  keystore del propietario, y Android rechaza actualizaciones con firma
  distinta.
- Tras descargarlo, se re-firma en local con `apksigner` y el keystore del
  propietario (el mismo de los rebranding de Document Editor / Mi IA Voz,
  guardado fuera de este repo). Comando tipo:

  ```bash
  apksigner sign --ks <keystore-del-propietario> \
    --out Mi-IA-Voz.apk app-prod-release.apk
  ```

  (Este paso lo hace Enzo en local; la contraseña no se escribe en ningún
  archivo.)
- El `applicationId` es `com.pocketpalai` (intacto) y el `versionCode` de la
  fuente es **159** (`versionName 1.22.1`), mayor que el de la app instalada
  (1.22.0): Android lo aceptará como actualización y conservará datos,
  modelos descargados y Pals.

## Archivos cambiados o agregados (working tree, sin commit)

Nuevos:

| Archivo | Qué es |
|---|---|
| `.github/workflows/build-mi-ia-voz.yml` | Workflow propio: solo `workflow_dispatch`, job único Android basado en el `build-android` de `ci.yml`. |
| `LEEME-GITHUB.md` | Este archivo. |
| `android/app/src/main/res/mipmap-{mdpi,hdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher_foreground.png` | Primer plano del icono adaptativo con el sello (5 densidades). |

Modificados:

| Archivo | Cambio |
|---|---|
| `.gitignore` | Excepción al final: la regla `workflows/` (pensada para artefactos del dev-team) atrapaba también los workflows **nuevos** de `.github/workflows/`; sin la excepción, `build-mi-ia-voz.yml` no se podría subir y Actions no lo vería. Los 4 workflows oficiales ya estaban trackeados y no les afecta. |
| `android/app/src/main/res/values/strings.xml` | `app_name`: «PocketPal» → «Mi IA Voz». |
| `android/app/src/main/res/values/ic_launcher_background.xml` | Fondo del icono adaptativo: `#FFFFFF` → `#1A2623` (el mismo del rebranding entregado). |
| `android/app/src/main/res/mipmap-{mdpi…xxxhdpi}/ic_launcher.png` e `ic_launcher_round.png` | Iconos del sello, copiados byte a byte del rebranding ya entregado (`~/workspace/mi-ia/work-voz/decodificada/res/`). |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` e `ic_launcher_round.xml` | Versión del rebranding entregado: fondo `@color/ic_launcher_background` + primer plano `@mipmap/ic_launcher_foreground`. |

Intactos a propósito:

- `applicationId "com.pocketpalai"` en `android/app/build.gradle`.
- `app.json` (`name`/`displayName`): `name` es el ID de registro de React
  Native y debe coincidir con `MainActivity.getMainComponentName()`
  ("PocketPal"); cambiarlo rompería la app. El nombre visible en Android es
  `app_name` de `strings.xml`, igual que en el rebranding ya entregado.
- Los 4 workflows originales (`ci.yml`, `release.yml`, `e2e-tests.yml`,
  `l10n-upload.yml`), el gate y todo el código funcional.

## Seguridad: qué NO hay en este repo

Verificado en el working tree:

- No existe `.env` ni `android/app/google-services.json`: los crea el runner
  en cada build con la receta dummy oficial de `ci.yml`, y ambos están en
  `.gitignore` (nunca entrarían en un commit).
- No hay ningún keystore del propietario. El `.gitignore` ya bloquea
  `*.keystore`. El único `debug.keystore` presente es la clave debug
  estándar de Android que trae el repo original de PocketPal (pública y
  conocida; sirve solo para el build de CI, se sustituye al re-firmar).
- El workflow no usa ningún secreto de GitHub (`secrets.*` no aparece):
  funciona en cualquier cuenta sin configurar nada.

## Público o privado: recomendación

**Público.** Razones:

- El contenido es el código de PocketPal, que ya es público y MIT, más un
  nombre y unos iconos. No hay ningún secreto ni dato personal dentro
  (verificado arriba).
- En repos públicos, los minutos de GitHub Actions en runners Linux son
  **ilimitados y gratis**. Este build es pesado (React Native + llama.cpp /
  whisper compilados desde fuentes): la primera vez puede tardar del orden
  de 40–90 min.
- En repos privados, el plan gratis incluye ~2.000 min/mes: daría para 1–2
  builds al mes y el artifact (≈280 MB) también consume cuota de
  almacenamiento.

Si aun así se prefiere privado, el workflow funciona igual; solo hay que
vigilar la cuota de minutos.

## Pasos

### 1. Crear la cuenta y el repo (una sola vez)

1. Crear una cuenta gratuita en https://github.com (si no se tiene).
2. Crear un repositorio nuevo, p. ej. llamado `mi-ia-voz`, **público**, y
   **sin** marcar README/.gitignore/license (debe nacer vacío para poder
   subir este árbol tal cual).
3. En esta carpeta, apuntar el remoto al repo nuevo y subir (la carpeta es
   un clon *shallow* del repo oficial; el origen actual es el de PocketPal):

   ```bash
   cd ~/workspace/mi-ia-src
   git remote set-url origin https://github.com/<TU-USUARIO>/mi-ia-voz.git
   git add -A
   git commit -m "Mi IA Voz: marca propia y workflow de build sin Plus"
   git push -u origin main
   ```

   Si `git push` se quejara del clon shallow, ejecutar antes
   `git fetch --unshallow` y repetir el push.

### 2. Lanzar el build

1. En el repo de GitHub: pestaña **Actions**.
2. En la lista de la izquierda: **«Build Mi IA Voz (Android)»**.
3. Botón **Run workflow** → rama `main` → **Run workflow**.
4. Esperar a que el job `build-android` termine en verde. Incluye las
   verificaciones oficiales de payload, de ausencia de código de
   automatización y `verify-plus-gate.sh --ungated` (prueba de que el Plus
   salió apagado).

### 3. Descargar el APK

1. Abrir la ejecución terminada del workflow.
2. Al final de la página, sección **Artifacts** → descargar **`mi-ia-voz-apk`**
   (es un .zip que contiene `app-prod-release.apk`).
3. El artifact se conserva **30 días** (`retention-days: 30`): descargar
   pronto.
4. Re-firmar en local con `apksigner` + el keystore del propietario
   (ver «Firma» arriba) e instalar en el teléfono: se aplicará como
   actualización de la «Mi IA Voz» actual.

## Notas y límites honestos

- **APK único universal**: el proyecto compila un solo APK con
  `arm64-v8a` + `x86_64` (abiFilters de `build.gradle`), igual que el APK
  oficial del que salió el rebranding actual. En el Fold (arm64) funciona
  tal cual; no hay splits por ABI configurados en el proyecto.
- **`.env` dummy**: el build usa la receta dummy oficial de CI. El chat
  local, los modelos, la voz y los Pals funcionan sin conexión; las
  funciones en línea de PalsHub/Supabase apuntan a URLs dummy y no
  conectarán (igual que en los builds de CI oficiales).
- **Hexagon SDK**: el workflow incluye el paso oficial
  `setup-hexagon-sdk` (aceleración NPU en Snapdragon), como `ci.yml` y
  `release.yml`. Según los propios comentarios del proyecto, sin él el
  build también termina bien y simplemente sale sin ese backend; si ese paso
  fallara en el repo nuevo, se puede borrar del workflow perdiendo solo la
  aceleración NPU.
- **Primera ejecución lenta**: sin cachés, `yarn install` + la compilación
  nativa desde fuentes es la parte larga. Las siguientes usan las cachés de
  `node_modules` y del árbol `.cxx` de llama.rn, como en el CI oficial.
- Este build **no** se ha ejecutado todavía en GitHub (no hay cuenta aún):
  el workflow es una adaptación fiel del job `build-android` de `ci.yml`
  v1.22.1 con las diferencias listadas en su cabecera, pero la primera
  corrida real es la que lo confirma.
