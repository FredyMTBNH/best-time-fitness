<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Directrices de Desarrollo y Agentes (AGENTS.md)
Proyecto: **Best Time Fitness - Web Rework**  
Stack: Next.js (App Router), TypeScript, Tailwind CSS, GSAP / Framer Motion.

---

## 1. Visión General del Proyecto
Este proyecto es una landing page de alto impacto visual orientada a la conversión y modernización de la marca Best Time Fitness. Aunque no procesa transacciones bancarias directas ni almacena bases de datos de usuarios en el servidor, debe mantener los más altos estándares de rendimiento, accesibilidad, diseño responsive y protección de datos de los visitantes.

---

## 2. Identidad Visual y Paleta de Colores

Para mantener una estética consistente, enérgica y con alto contraste en toda la interfaz, cualquier agente o desarrollador debe apegarse estrictamente a la siguiente selección de tokens/clases de color:

### 2.1 Fondos (Backgrounds permitidos)
* `stone-950` (Fondo principal base, oscuro/carbón)
* `mist-300` (Superficies neutras o contrastes claros)
* `yellow-400` (Fondos destacados de alto impacto o acentos)

### 2.2 Textos (Tipografía permitida)
* `yellow-400` (Títulos destacados, palabras clave, acentos de marca)
* `white/90` (Cuerpo de texto sobre fondos oscuros, subtítulos legibles)
* `stone-950` (Texto principal sobre fondos amarillos o claros)

### 2.3 Botones (Acciones y CTAs permitidos)
* `stone-950` (Botones de contraste oscuro)
* `amber-200/80` (Botones secundarios sutiles con transparencia)
* `yellow-400` (Botones de llamada a la acción principal / Primary CTA)

### 2.4 Iconos (Iconografía permitida)
* `yellow-400` (Iconos sobre fondos oscuros o tarjetas)
* `stone-950` (Iconos sobre botones o superficies amarillas/claras)

---

## 3. Seguridad de Datos (Privacy & Static Landing Security)

Dado que este proyecto opera como una landing page promocional y de captación de leads, las reglas de seguridad deben centrarse en la higiene del cliente, prevención de fugas de datos y enlaces seguros con terceros:

* **Zero-Secrets en el Cliente:**
  * Prohibido exponer credenciales, API keys privadas o tokens de servicios de analítica/CRM en variables de entorno con prefijo público (`NEXT_PUBLIC_`) a menos que sean estrictamente públicas por diseño (ej. tokens públicos de mapas o IDs de tracking de GA4).
  * No colocar números de contacto personales, tokens de autenticación o endpoints privados hardcodeados en el código fuente.
* **Seguridad en Integraciones y Enlaces Externos:**
  * Todo enlace saliente hacia plataformas externas (App Store, Google Play, WhatsApp, Google Maps, web de rutinas de terceros) debe usar siempre el protocolo HTTPS seguro.
  * Todo elemento `<a>` con `target="_blank"` debe incluir obligatoriamente el atributo `rel="noopener noreferrer"` para mitigar vulnerabilidades de *tabnabbing* y proteger la sesión del usuario.
* **Manejo de Formularios y Captación de Leads:**
  * Si se incluye un formulario de contacto o solicitud de clase muestra, **no almacenar datos personales (PII) en `localStorage` ni `sessionStorage`**.
  * Sanitizar y validar los inputs en tiempo de cliente (con librerías tipo Zod) antes de enviarlos a webhooks o APIs externas.
* **Cabeceras de Seguridad y Dependencias:**
  * Mantener configuradas cabeceras HTTP defensivas en `next.config.js` / middleware (como `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`) para evitar ataques de *clickjacking*.
  * No introducir scripts de terceros o píxeles de rastreo que no hayan sido auditados o aprobados previamente.

---

## 4. Legibilidad, Estilo de Código y Enfoque Mobile-First (Responsive Design)

### 4.1 Mentalidad Responsive y Mobile-First
La mayor parte del tráfico proviene de dispositivos móviles. Todo componente debe concebirse y codificarse pensando primero en la pantalla de un smartphone y escalar progresivamente hacia desktop:

* **Estrategia Tailwind Mobile-First:**
  * Las clases base sin prefijo corresponden estrictamente a la vista móvil (320px–480px).
  * Usa los breakpoints (`sm:`, `md:`, `lg:`, `xl:`) exclusivamente para sobreescribir o expandir el diseño en pantallas mayores, **nunca para parches inversos**.
  * *Ejemplo correcto:* `className="flex flex-col p-4 md:flex-row md:p-8"` (en lugar de diseñar para escritorio y parchar con trucos inversos).
* **Adaptabilidad de Sliders y Canvas:**
  * Componentes interactivos como `CurtainSlider` o `ScaleSlider` deben recalcular sus dimensiones en base al ancho dinámico del contenedor y ajustar el número de columnas o tarjetas visibles según el viewport (`matchMedia` o `ResizeObserver`).
  * En pantallas móviles (`< 768px`), priorizar gestos táctiles fluidos (touch swipe con umbrales cortos) y reducir la complejidad de las animaciones para evitar saturar la GPU del teléfono.
* **Touch Targets y Ergonomía Móvil:**
  * Todo botón, flecha de navegación de sliders o enlace táctil debe respetar un área interactiva mínima de **44x44px** para facilitar el tap sin fricción.
  * Respetar los márgenes de seguridad en dispositivos con *safe-area-inset* (notch y barras de navegación de iOS/Android).
* **Imágenes Responsivas:**
  * Utilizar `sizes` adecuados en `next/image` para no descargar imágenes con resolución 4K/Desktop en pantallas móviles.

### 4.2 Estándares de TypeScript y React
* **Tipado Estricto:**
  * Prohibido el uso de `any`. Definir interfaces específicas para cada estructura de datos (Planes, Clases, Sedes, Sliders).
  * Validar referencias del DOM nulas (`useRef<HTMLDivElement | null>(null)`) mediante guardas tempranas (`if (!element) return;`) para garantizar compilaciones limpias en producción sin advertencias de *possibly null*.
* **Aislamiento de Interactividad ('use client'):**
  * Empujar la directiva `'use client'` a las hojas del árbol de componentes (únicamente a los carruseles, acordeones o botones que requieran eventos de React o GSAP).
  * Mantener las secciones estáticas y contenedores como Server Components para optimizar el bundle inicial y el First Contentful Paint (FCP).

---

## 5. Criterios de Aceptación para Agentes de Código
Antes de dar por completado un cambio o componente, el agente debe verificar:
1. ¿El código compila limpiamente con `npm run build` sin errores de tipos o referencias nulas?
2. ¿Se respetaron estrictamente las clases y combinaciones de la paleta de identidad visual?
3. ¿Se probó la vista en resolución móvil (375px) asegurando que no haya scroll horizontal involuntario (`overflow-x: hidden`)?
4. ¿Las animaciones respetan la preferencia del usuario (`prefers-reduced-motion`)?
5. ¿Los enlaces externos incluyen `rel="noopener noreferrer"` y protocolo seguro?