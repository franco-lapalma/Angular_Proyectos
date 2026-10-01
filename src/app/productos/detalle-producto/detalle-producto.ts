import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PRODUCTOS, Producto } from '../lista-productos/lista-productos';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-detalle-producto',
  styleUrl: './detalle-producto.css',
  templateUrl: './detalle-producto.html',
})
export class DetalleProductoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  producto?: Producto;
  id?: string | null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const numId = Number(this.id);
    this.producto = PRODUCTOS.find((p) => p.id === numId);
  }
}

export { DetalleProductoComponent as DetalleProducto };
