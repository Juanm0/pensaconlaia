# Pensá con IA — Usar IA sin dejar de pensar

Sitio estático hecho con HTML, CSS y JavaScript. No necesita backend, instalación ni claves de API.

## Estructura

- `index.html`: contenido y secciones de la web.
- `css/style.css`: estilos, colores y diseño responsive.
- `js/script.js`: video de YouTube, menú móvil y desafío interactivo.

## Agregar tu video de YouTube

1. Subí el video a YouTube.
2. Copiá el enlace del video. Por ejemplo: `https://www.youtube.com/watch?v=abcdefghijk`
3. Abrí `js/script.js`.
4. Reemplazá `PEGAR_LINK_DE_YOUTUBE_ACA` en la variable `YOUTUBE_URL` por tu enlace completo.
5. Guardá los cambios. El video se mostrará al comienzo de la sección de video.

El video debe permitir la inserción (embedding). Si YouTube indica que el propietario no permite reproducirlo en otros sitios, revisá esa opción en YouTube Studio.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub.
2. Subí `index.html`, la carpeta `css`, la carpeta `js` y este README.
3. En el repositorio, entrá a **Settings → Pages**.
4. En **Build and deployment**, elegí **Deploy from a branch**.
5. Elegí la rama `main` y la carpeta `/ (root)`, y guardá.
6. Esperá a que GitHub Pages publique el sitio.

## Personalizar

- Cambiá el nombre “Pensá con IA” directamente en `index.html`.
- Los colores principales están al principio de `css/style.css`, dentro de `:root`.
- La sección de entrevistas está preparada para agregar el video editado más adelante.
- No se recopilan datos ni se guardan respuestas del desafío.
