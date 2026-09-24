import { Component } from '@angular/core';
import { ListaProductos } from './lista-productos/lista-productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductos],
  template: `<app-lista-productos />`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Gestión de Productos';
}