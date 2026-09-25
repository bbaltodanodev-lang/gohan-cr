# GOHAN · Onigiri

Web estática en HTML, CSS y JavaScript. Se conserva el contenido, las fotografías,
el selector ES/EN y el pedido por WhatsApp del proyecto original.
Las tarjetas de categorías usan una fotografía principal y un contador de platos.
El acceso «Tu pedido» permite retomar el resumen con sus cantidades y subtotal.
La imagen de onigiri que estaba asignada a Castella de Matcha se reemplazó por
una ilustración SVG identificada como tal; no se eliminó la fotografía original.

## Desarrollo

Requiere Node.js 22.13 o superior y Python 3 para el servidor local.

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:4060/. También funciona con Live Server de VS Code.
El servidor de desarrollo escucha únicamente en la computadora local.

## Verificación

```sh
npm run check
npm test
```

`check` revisa sintaxis de JavaScript y CSS, IDs duplicados, anclas y recursos
locales del HTML. Las pruebas cubren el flujo de pedido, cantidades y total,
ES/EN sin perder el producto, navegación móvil, movimiento reducido y el
funcionamiento sin GSAP o sin almacenamiento del navegador.

Las pruebas DOM no sustituyen una revisión visual en navegador. El nuevo efecto
3D se revisó en el navegador integrado en escritorio y en anchos de 320 y 390
píxeles, sin desbordamiento horizontal. Esto no sustituye una prueba táctil en
teléfonos físicos.

## Animación y publicación

GSAP 3.15.0 y ScrollTrigger se sirven desde `js/vendor/`, sin depender de un CDN.
Se usan entradas secuenciales, revelados al desplazarse y transiciones del menú.
La fotografía principal forma un panel con perspectiva CSS, sello en relieve,
reflejo suave y flotación. Se inclina con el mouse en escritorio y con el avance
del scroll en móvil; no es un modelo tridimensional del alimento. El símbolo del
contacto gira suavemente al desplazarse. La flotación se pausa fuera de pantalla
y cuando la pestaña está oculta.
Se respeta `prefers-reduced-motion`. El scroll de rueda y táctil sigue siendo nativo.

Después de actualizar la dependencia GSAP, regenerar los archivos con:

```sh
npm run vendor
```

Licencia de GSAP: https://gsap.com/standard-license/.
Los archivos distribuidos conservan sus cabeceras de licencia.

No hay compilación: para el alojamiento estático incluir `index.html`, `css/`,
`js/` (también `js/vendor/`), `images/`, `robots.txt` y `sitemap.xml`.
No es necesario publicar `node_modules/`, `tests/`, `scripts/`, ni archivos de Git.
Al publicar nuevas versiones de CSS o JS, actualizar el parámetro `v` de sus
referencias en el HTML para evitar que una caché siga mostrando la versión anterior.

## Historial y recuperación

Se creó un repositorio Git local antes de cambiar el diseño. El punto original
está etiquetado como `antes-css-gsap`. Los cambios no se han subido ni desplegado.

Para ver las diferencias:

```sh
git diff antes-css-gsap -- index.html css/styles.css js/app.js
git log --oneline --decorate
```

Para inspeccionar el estado anterior sin sobrescribir el actual, se puede crear
otra carpeta con `git worktree add ../gohan-web-antes antes-css-gsap` (la carpeta
de destino debe estar disponible). Antes de deshacer cambios futuros, guardarlos
en un commit y usar `git revert` sobre el commit concreto que se quiera deshacer.
