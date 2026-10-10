# Sitio web — M&V Desarrollo y Productividad Empresarial

Sitio estático publicado con **GitHub Pages** (gratis, con HTTPS): https://mv-desarrollo.github.io

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página principal |
| `verificar.html` | Verificación de constancias (consulta el registro en Google Sheets vía Apps Script) |
| `js/config.js` | **Datos editables**: WhatsApp, correo, Facebook, Instagram y URL de la API |
| `css/estilos.css` | Colores y estilos (misma identidad que las constancias) |
| `img/` | Logo, fondo de la constancia y logos de organismos |

## Cambios frecuentes
- **Agregar Facebook / Instagram / correo:** edita `js/config.js` y pega la URL entre comillas. Se muestran solos en la barra superior y el pie.
- Cada cambio que guardes en GitHub se publica en 1–2 minutos.

## Seguridad
- Aquí solo vive el diseño. Los datos de los participantes están en la hoja privada de Google; la página solo recibe los datos de **una** constancia cuando alguien escribe su código exacto.
