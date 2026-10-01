import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios-module').then(m => m.UsuariosModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos-module').then(m => m.ProductosModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];