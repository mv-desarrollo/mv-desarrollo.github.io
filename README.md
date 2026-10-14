# Sitio web — M&V Desarrollo y Productividad Empresarial

Sitio estático publicado con **GitHub Pages** (gratis, con HTTPS): https://mv-desarrollo.github.io

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Inicio: portada con video, servicios, sectores, normas, nosotros, equipo, nuestro camino, formación y contacto |
| `metodologia.html` | Metodología de trabajo en las implementaciones (8 pasos) |
| `normas.html` | Definición de cada norma (qué es, a quién aplica, beneficios), con filtros por categoría |
| `formacion.html` | Modalidades, catálogo de cursos con buscador y políticas de cursos abiertos |
| `verificar.html` | Verificación de constancias (consulta el registro en Google Sheets vía Apps Script) |
| `aviso-privacidad.html` | Aviso de privacidad |
| `js/config.js` | **Datos editables**: WhatsApp, correo, ubicación, Facebook, Instagram, LinkedIn y URL de la API |
| `css/estilos.css` | Colores y estilos (azul marino `#04234A` + dorado `#C5923C` del logotipo) |
| `video/` | Videos de fondo (MP4 H.264, sin audio) y su imagen de portada `.webp` |
| `img/` | Logotipo, fotos del equipo, infografía y fondo de la constancia |
| `fonts/` | Tipografías alojadas en el sitio (Montserrat, Lato, Great Vibes, Tinos — licencia OFL) |
| `js/vendor/` | Librerías para la constancia: QRious 4.0.2 y jsPDF 4.2.1 (alojadas aquí, sin CDN) |
| `docs/` | Ficha de registro para cursos abiertos (Word) |

## Cambios frecuentes
- **Agregar Facebook / Instagram / LinkedIn:** edita `js/config.js` y pega la URL entre comillas. Se muestran solos en la barra superior y el pie.
- **Cambiar un video:** reemplaza el archivo en `video/` conservando el mismo nombre (MP4, H.264, sin audio, idealmente < 3 MB). Si cambias la escena, reemplaza también la imagen `.webp` con el mismo nombre.
- Después de cambiar CSS o JS, sube el número `?v=20261014` en los `<script>`/`<link>` para que los navegadores carguen la versión nueva.
- Cada cambio que guardes en GitHub se publica en 1–2 minutos.

## Formulario de contacto
No guarda datos: arma el mensaje y lo abre en WhatsApp (o en el correo) del usuario para que lo envíe.
Se puede preseleccionar la norma o el servicio con la URL: `index.html?norma=ISO%209001#contacto`.

## Seguridad
- Aquí solo vive el diseño. Los datos de los participantes están en la hoja privada de Google; la página solo recibe los datos de **una** constancia cuando alguien escribe su código exacto.
- No se cargan scripts ni fuentes de terceros (todo está en el repositorio).
