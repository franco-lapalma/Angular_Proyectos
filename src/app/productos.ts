import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  fechaAlta: Date;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Productos {
  private productos: Producto[] = [
    { id: 1, nombre: 'Laptop', precio: 1200.50, fechaAlta: new Date('2024-01-15'), descripcion: 'Laptop de alta gama' },
    { id: 2, nombre: 'Mouse', precio: 25.99, fechaAlta: new Date('2024-02-20'), descripcion: 'Mouse inalámbrico' },
    { id: 3, nombre: 'Teclado', precio: 89.90, fechaAlta: new Date('2024-03-10'), descripcion: 'Teclado mecánico' },
    { id: 4, nombre: 'Monitor', precio: 350.00, fechaAlta: new Date('2024-04-05'), descripcion: 'Monitor 27 pulgadas' },
    { id: 5, nombre: 'Auriculares', precio: 120.00, fechaAlta: new Date('2024-05-12'), descripcion: 'Auriculares con cancelación de ruido' }
  ];
  private nextId = 6;

  getProductos(): Producto[] {
    return [...this.productos];
  }

  addProducto(producto: Omit<Producto, 'id'>): Producto {
    const nuevoProducto: Producto = {
      ...producto,
      id: this.nextId++
    };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  deleteProducto(id: number): boolean {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      return true;
    }
    return false;
  }
}