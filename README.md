# Formulario de Registro Angular

## Descripción del Proyecto

Este proyecto implementa un formulario de registro interactivo utilizando Angular con formularios reactivos y directivas integradas. El formulario incluye validaciones en tiempo real, mensajes de error dinámicos, estilos condicionales y manejo de envío con reset del formulario.

## Características Implementadas

- **Formulario Reactivo**: Creado con `FormBuilder` y validaciones
- **Campos**:
  - Nombre (obligatorio, mínimo 3 caracteres)
  - Email (obligatorio, formato válido)
  - Mensaje (opcional)
- **Directivas Angular**:
  - `*ngIf`: Muestra mensaje de éxito al enviar
  - `*ngFor`: Lista errores de validación por campo
  - `[ngClass]`: Resalta campos inválidos en rojo
  - `[ngStyle]`: Cambia color del título según validez del formulario
- **Botón de envío**: Deshabilitado mientras el formulario sea inválido
- **Envío**: Muestra datos en consola y resetea el formulario

## Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 18 o superior)
- Angular CLI (`npm install -g @angular/cli`)

### Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd angular-formulario
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar la aplicación
```bash
ng serve
```

Navega a `http://localhost:4200/` en tu navegador.

## Ejemplo de Ejecución en Consola

Al completar el formulario correctamente y hacer clic en "Enviar", se muestra en la consola del navegador:

```
Formulario enviado: {nombre: 'Juan Pérez', email: 'juan@example.com', mensaje: 'Hola, este es mi mensaje'}
```

## Capturas de Pantalla

### Formulario con Errores de Validación
![Formulario con errores](screenshots/formulario-errores.png)
*Campos resaltados en rojo con mensajes de error listados mediante \`*ngFor\``

### Formulario Válido
![Formulario válido](screenshots/formulario-valido.png)
*Título en verde, campos con borde verde, botón habilitado*

### Formulario Enviado
![Formulario enviado](screenshots/formulario-enviado.png)
*Mensaje de éxito mostrado con \`*ngIf\` tras envío exitoso*

## Créditos del Autor

- Franco Lapalma
- **Curso**: Desarrollo en Angular 
- **Unidad**: Módulo 1 - Unidad 2: Directivas y Formularios

## Citación de Fuentes

### Bibliografía
- Freeman, A. *Pro Angular 9*. 6ª ed. Apress; 2020.

### Documentación Oficial de Angular
- Angular. (s.f.). *Reactive forms*. https://angular.dev/guide/forms/reactive-forms
- Angular. (s.f.). *Built-in directives*. https://angular.dev/guide/directives
- Angular. (s.f.). *Forms in Angular*. https://angular.dev/guide/forms

### Créditos de Imágenes
- Capturas de pantalla generadas durante la ejecución local de la aplicación.