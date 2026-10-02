# Rick & Morty App — TP Final Angular

Aplicación web multisitio desarrollada con **Angular 18+** que consume la **Rick and Morty API** para mostrar personajes, sus detalles, ubicaciones y episodios.

## 🚀 Demo

![Rick & Morty App](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8+-B7178C?style=for-the-badge&logo=rxjs&logoColor=white)

## ✨ Características

### 📋 Páginas Requeridas
- **Inicio** (`/`) — Landing page con hero animado, estadísticas y características
- **Personajes** (`/personajes`) — Listado con búsqueda, filtros y paginación
- **Detalle de Personaje** (`/personajes/:id`) — Vista dinámica con información completa
- **Nosotros** (`/nosotros`) — Información técnica del proyecto
- **Contacto** (`/contacto`) — Formulario validado con feedback visual

### 🔧 Funcionalidades Implementadas
- **Routing** con rutas estáticas y dinámicas (`/personajes/:id`)
- **Consumo de API** mediante servicio inyectable (`HttpClient`)
- **Búsqueda en tiempo real** con debounce (300ms)
- **Filtros múltiples** combinables: estado, género, especie
- **Paginación client-side** tras carga completa en background
- **Estados de carga** con skeletons animados
- **Diseño responsive** mobile-first (breakpoints: 480px, 768px, 1024px)
- **Accesibilidad** (ARIA labels, navegación teclado, contraste WCAG AA)
- **Componentización** clara: header, footer, character-card, páginas

### 🎨 Identidad Visual
- Tema oscuro con gradientes púrpura/rojo
- Tipografía **Inter** (Google Fonts)
- Animaciones CSS nativas (sin librerías externas)
- Sistema de diseño consistente (spacing, colors, radius, shadows)

## 📦 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio (rama Angular-Final)
git clone -b Angular-Final https://github.com/franco-lapalma/Angular_Proyectos.git
cd Angular_Proyectos

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm start
# o: ng serve

# 4. Abrir en navegador
# http://localhost:4200
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo (`ng serve`) |
| `npm run build` | Build de producción (`ng build`) |
| `npm run watch` | Build en modo watch |
| `npm test` | Ejecuta tests unitarios |

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navegación principal con routerLink
│   │   ├── footer/          # Pie de página con links y info
│   │   └── character-card/  # Tarjeta reutilizable de personaje
│   ├── pages/
│   │   ├── home/            # Landing page
│   │   ├── characters/      # Listado + filtros + paginación
│   │   ├── character-detail/# Vista dinámica por ID
│   │   ├── about/           # Info técnica del proyecto
│   │   └── contact/         # Formulario reactivo validado
│   ├── services/
│   │   └── rick-and-morty.service.ts  # HttpClient + API
│   ├── interfaces/
│   │   └── models.ts        # Tipos TypeScript (Character, Episode, etc.)
│   ├── app.routes.ts        # Configuración de rutas
│   ├── app.component.ts     # Componente raíz
│   └── main.ts              # Bootstrap standalone
├── styles.css               # Estilos globales + variables CSS
├── index.html               # HTML principal
└── favicon.svg              # Icono personalizado
```

## 📡 API Utilizada

**Rick and Morty API** — `https://rickandmortyapi.com/`

- **Documentación**: https://rickandmortyapi.com/documentation
- **Endpoints usados**:
  - `GET /character` — Listado paginado de personajes
  - `GET /character/:id` — Detalle de personaje
  - `GET /episode/:id` — Detalle de episodios
- **Ventajas**: Gratuita, sin autenticación, CORS habilitado, datos ricos

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Angular | 18.2+ | Framework principal (standalone components) |
| TypeScript | 5.4+ | Tipado estático |
| RxJS | 7.8+ | Programación reactiva |
| Angular Router | 18.2+ | Navegación SPA |
| HttpClient | 18.2+ | Peticiones HTTP |
| CSS Moderno | - | Grid, Flexbox, Custom Properties, Animaciones |

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| < 480px | Mobile - Stack vertical, navegación compacta |
| 480px - 768px | Tablet - Grid 2 columnas, sidebar colapsable |
| 768px - 1024px | Desktop pequeño - Grid 3-4 columnas |
| > 1024px | Desktop - Layout completo con sidebar fija |

## ♿ Accesibilidad

- Semántica HTML5 correcta (`header`, `nav`, `main`, `section`, `article`, `footer`)
- `routerLink` para navegación interna (no `<a href>`)
- `aria-label` en iconos y botones sin texto visible
- `aria-describedby` en campos de formulario con errores
- Contraste de colores ≥ 4.5:1 (WCAG AA)
- Navegación completa por teclado (Tab, Enter, Escape)
- `focus-visible` visible en todos los elementos interactivos
- `prefers-reduced-motion` respetado

## 📝 Licencia

Proyecto educativo — Trabajo Práctico Final de Angular.
No afiliado oficialmente con Adult Swim ni Rick and Morty.
Datos proporcionados por [Rick and Morty API](https://rickandmortyapi.com/).

---

**Desarrollado con 💚 usando Angular 18+**