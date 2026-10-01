import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}

export const PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Laptop', precio: 1200, descripcion: 'Laptop 16GB RAM, 512GB SSD' },
  { id: 2, nombre: 'Mouse', precio: 25, descripcion: 'Mouse inalámbrico ergonómico' },
  { id: 3, nombre: 'Teclado', precio: 80, descripcion: 'Teclado mecánico RGB' },
  { id: 4, nombre: 'Monitor', precio: 300, descripcion: 'Monitor 27 pulgadas 4K' },
];

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-lista-productos',
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html',
})
export class ListaProductosComponent {
  productos = PRODUCTOS;
}

export { ListaProductosComponent as ListaProductos };
