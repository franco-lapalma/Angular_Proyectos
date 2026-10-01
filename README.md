# Angular Modular Routing — Módulo 1 Unidad 4

Aplicación modular con rutas y almacenamiento en navegador.

## Descripción breve
App Angular 22 con:
- `AppModule` + `AppRoutingModule` (principal, en `src/app/app.module.ts` y `app-routing.module.ts`)
- `UsuariosModule` (`src/app/usuarios/usuarios-module.ts`) con `USUARIOS_ROUTES`
- `ProductosModule` (`src/app/productos/productos-module.ts`) con `PRODUCTOS_ROUTES`
- Routing principal en `src/app/app.routes.ts`:
  - `/` → `HomeComponent`
  - `/usuarios` → lazy `UsuariosModule`
  - `/productos` → lazy `ProductosModule`
  - `**` → redirect `/`
- Ruta dinámica `/productos/:id` → `DetalleProductoComponent` (lee `:id` con `ActivatedRoute.snapshot.paramMap`)
- Navegación con `routerLink`, `routerLinkActive` y `router-outlet` (ver `app.html`, `home.html`, listas)
- `localStorage` clave `ultimoModulo` vía `StorageService` (`src/app/core/storage.service.ts`): guarda `/usuarios`, `/productos/...` o `/` en cada `NavigationEnd`, y al iniciar redirige a esa última sección. Botón "Borrar memoria" limpia la clave.
- Build producción verificado: genera chunks `usuarios-module` y `productos-module` (lazy loading real).

> Nota Angular 22: el bootstrap es standalone (`main.ts` + `app.config.ts` con `provideRouter(routes)`). `AppModule`/`AppRoutingModule` se incluyen como wrappers que reutilizan las mismas `routes` para cumplir la consigna de módulos.

## Instrucciones
```bash
git clone -b "Tarea-N°4" https://github.com/franco-lapalma/Angular_Proyectos.git
cd Angular_Proyectos

npm install
npx ng serve
# abrir http://localhost:4200/
```

Rutas a probar:
- `/` inicio
- `/usuarios` lista usuarios
- `/productos` lista productos
- `/productos/1`, `/productos/2`, ... detalle dinámico

Probar localStorage:
1. Ir a `/productos/2`
2. Recargar (F5) → debe volver a `/productos/2` (o última sección)
3. Abrir DevTools → Application → Local Storage → `ultimoModulo`

## Build producción
```bash
npx ng build --configuration production
# salida en dist/angular-modular-routing/
```

## Despliegue
Plataforma elegida: **Vercel**.

Configuración usada:
- Framework: `Angular`
- Build Command: `npm run build` (`npx ng build --configuration production`)
- Output Directory: `dist/angular-modular-routing/browser`
- Rewrites SPA en `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/angular-modular-routing/browser",
  "framework": "angular",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
- Fallback Netlify alternativo en `public/_redirects`: `/* /index.html 200`

Pasos:
1. Push rama `Tarea-N°4` a `https://github.com/franco-lapalma/Angular_Proyectos`
2. Vercel → Add New → Project → Import `Angular_Proyectos` (branch `Tarea-N°4`)
3. Deploy → verificar `/`, `/usuarios`, `/productos`, `/productos/2` y refresh (requiere rewrite a `index.html`).

Enlace publicado: https://angular-proyectos-3nhrjfacq-franco-lapalmas-projects.vercel.app/

Rutas verificadas en producción: `/`, `/usuarios`, `/productos`, `/productos/2` (con refresh, gracias al rewrite a `index.html`).

## Créditos
- Autor: Franco Lapalma — Curso: *Angular avanzado* — Unidad: *Módulo 1 Unidad 4*
- Repo: https://github.com/franco-lapalma/Angular_Proyectos/tree/Tarea-N%C2%B04
- Fecha: 2026-10-01

## Bibliografía
- Freeman, A. Pro Angular 9. 6ª ed. Apress; 2020.
- Angular. Other common Routing Tasks. https://angular.dev/guide/routing/common-router-tasks
- Angular. NgModules. https://angular.dev/guide/ngmodules/overview
- Angular. Deployment. https://angular.dev/tools/cli/deployment
- MDN Web Docs. Window: localStorage property. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN Web Docs. Window: sessionStorage property. https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
