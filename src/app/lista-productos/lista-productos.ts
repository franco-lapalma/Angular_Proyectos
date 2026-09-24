import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Productos, Producto } from '../productos';
import { DescuentoPipe } from '../descuento-pipe';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css'
})
export class ListaProductos implements OnInit {
  productos: Producto[] = [];
  nuevoNombre = '';
  nuevoPrecio = 0;
  nuevaDescripcion = '';
  mensaje = '';
  descuentoPorcentaje = 10;

  constructor(private productosService: Productos) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productos = this.productosService.getProductos();
  }

  agregarProducto(): void {
    if (!this.nuevoNombre.trim() || this.nuevoPrecio <= 0) {
      this.mensaje = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const producto = this.productosService.addProducto({
      nombre: this.nuevoNombre.trim(),
      precio: this.nuevoPrecio,
      fechaAlta: new Date(),
      descripcion: this.nuevaDescripcion.trim() || undefined
    });

    this.productos = this.productosService.getProductos();
    this.nuevoNombre = '';
    this.nuevoPrecio = 0;
    this.nuevaDescripcion = '';
    this.mensaje = `Producto "${producto.nombre}" agregado correctamente.`;
  }

  eliminarProducto(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (this.productosService.deleteProducto(id)) {
      this.productos = this.productosService.getProductos();
      this.mensaje = producto ? `Producto "${producto.nombre}" eliminado.` : 'Producto eliminado.';
    } else {
      this.mensaje = 'Error al eliminar el producto.';
    }
  }

  limpiarMensaje(): void {
    this.mensaje = '';
  }
}