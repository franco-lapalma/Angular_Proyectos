import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto';

export const PRODUCTOS_ROUTES: Routes = [
  {
    path: '',
    component: ListaProductosComponent
  },
  {
    path: ':id',
    component: DetalleProductoComponent
  }
];