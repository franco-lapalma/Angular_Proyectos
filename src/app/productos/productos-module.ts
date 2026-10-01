import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTOS_ROUTES } from './productos.routes';
import { ListaProductosComponent } from './lista-productos/lista-productos';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCTOS_ROUTES),
    ListaProductosComponent,
    DetalleProductoComponent
  ],
  exports: [ListaProductosComponent, DetalleProductoComponent]
})
export class ProductosModule {}