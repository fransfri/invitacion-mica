# Invitacion de cumpleanos

Sitio estatico para la invitacion y confirmacion de asistencia de Mica. No requiere instalar dependencias: abre `index.html` en un navegador.

## Personalizar el evento

Edita `config.js` para cambiar el nombre, fecha, hora, lugar, direccion, nota y fecha limite de confirmacion. Los textos actuales indican los datos que faltan completar.

## Recibir confirmaciones en Google Sheets

1. Crea una hoja de calculo de Google y abre **Extensiones > Apps Script**.
2. Reemplaza el contenido del editor con `google-apps-script.gs` y guarda.
3. En **Implementar > Nueva implementacion**, elige **Aplicacion web**, ejecuta como tu cuenta y permite el acceso a cualquier persona con el enlace.
4. Implementa y copia la URL de la aplicacion web.
5. Pega esa URL en `rsvpEndpoint` dentro de `config.js`.
6. Prueba un envio desde `index.html` y confirma que la fila aparece en la hoja.

Google Apps Script no permite leer la respuesta desde esta pagina por las restricciones del navegador. La invitacion envia el RSVP y muestra la confirmacion cuando la solicitud termina; valida la primera prueba directamente en la hoja.

## Publicar

Sube `index.html`, `styles.css`, `config.js`, `app.js` y `mica-photo-web.jpg` a cualquier hosting de sitios estaticos, manteniendo todos en la misma carpeta. No publiques `IMG_3427.jpg`: es el original adjunto y conserva metadatos de ubicacion. La foto optimizada que usa la invitacion ya esta orientada y sin metadatos EXIF.