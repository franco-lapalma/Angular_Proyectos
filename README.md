# Angular Productos - Gestión y Visualización de Datos con Pipes

## Descripción del Proyecto

Este proyecto es una aplicación Angular que demuestra la gestión de productos mediante servicios, la inyección de dependencias, el uso de pipes estándar (currency, date) y la creación de un pipe personalizado (descuento). La aplicación permite listar, agregar y eliminar productos de forma interactiva.

## Características Implementadas

### Servicio Productos
- **getProductos()**: Obtiene la lista completa de productos
- **addProducto()**: Agrega un nuevo producto a la lista
- **deleteProducto()**: Elimina un producto por su ID
- Los datos se almacenan en un array local simulado con 5 productos iniciales

### Componente ListaProductos
- Inyección del servicio `Productos` mediante inyección de dependencias
- Carga inicial de productos en `ngOnInit`
- Formulario reactivo para agregar nuevos productos
- Tabla con visualización de productos usando pipes
- Botones para eliminar productos
- Mensaje dinámico cuando la lista está vacía

### Pipes Estándar
- **currency**: Formatea precios en Euros (EUR)
- **date**: Formatea la fecha de alta en formato dd/MM/yyyy

### Pipe Personalizado: descuento
- Recibe el precio base y un porcentaje de descuento
- Calcula y devuelve el precio final con descuento aplicado
- Valida que el porcentaje esté entre 0 y 100

## Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Pasos para ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd angular-productos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación en modo desarrollo**
   ```bash
   ng serve
   ```

4. **Abrir en el navegador**
   Navega a `http://localhost:4200/`

### Compilar para producción
```bash
ng build
```
Los archivos compilados se generarán en el directorio `dist/angular-productos/`.

## Estructura del Proyecto

```
src/
├── app/
│   ├── productos.ts              # Servicio y interface Producto
│   ├── descuento-pipe.ts         # Pipe personalizado descuento
│   ├── lista-productos/          # Componente principal
│   │   ├── lista-productos.ts    # Lógica del componente
│   │   ├── lista-productos.html  # Plantilla con pipes e interactividad
│   │   ├── lista-productos.css   # Estilos
│   │   └── lista-productos.spec.ts
│   ├── app.ts                    # Componente raíz
│   ├── app.config.ts             # Configuración de la aplicación
│   └── app.css                   # Estilos globales
└── main.ts                       # Punto de entrada
```

## Capturas de Pantalla

### Lista de Productos Cargada
La aplicación muestra una tabla con 5 productos iniciales al cargar:
- ID, Nombre, Precio Original, Precio con Descuento, Fecha de Alta, Acciones

### Aplicación de Pipes Estándar
- **Currency Pipe**: Los precios se muestran en formato €1.234,56
- **Date Pipe**: Las fechas se muestran en formato dd/MM/yyyy (ej: 15/01/2024)

### Pipe Personalizado Descuento en Funcionamiento
- El campo "Descuento a aplicar (%)" permite cambiar el porcentaje
- La columna "Precio con Descuento" se actualiza en tiempo real
- Ejemplo: Precio 1200,50€ con 10% descuento = 1.080,45€

### Comportamiento al Agregar/Eliminar
- **Agregar**: Completa el formulario y presiona "Agregar" → El producto aparece en la tabla
- **Eliminar**: Presiona "Eliminar" en cualquier fila → El producto se remueve de la tabla
- **Lista vacía**: Al eliminar todos los productos, aparece mensaje "No hay productos en la lista..."

## Créditos

**Autor**: Franco Lapalma
**Curso**: Desarrollo en Angular
**Unidad**: Módulo 1 - Unidad 3  
**Tema**: Gestión y visualización de datos con pipes

## Bibliografía y Fuentes

### Libros
- Freeman, A. *Pro Angular 9*. 6ª ed. Apress; 2020.

### Documentación Oficial Angular
- Angular. *Understanding dependency injection*. https://angular.dev/guide/di/dependency-injection
- Angular. *Welcome to the Angular tutorial*. https://angular.dev/tutorials/learn-angular
- Angular. *What is Angular?*. https://angular.dev/overview
- Angular. *Pipes*. https://angular.dev/guide/pipes
- Angular. *Services*. https://angular.dev/guide/services

### Recursos Adicionales
- Angular CLI Documentation: https://angular.dev/tools/cli
- TypeScript Documentation: https://www.typescriptlang.org/docs/

## Licencia

Proyecto educativo para fines académicos.