import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { USUARIOS_ROUTES } from './usuarios.routes';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(USUARIOS_ROUTES), ListaUsuariosComponent],
  exports: [ListaUsuariosComponent]
})
export class UsuariosModule {}