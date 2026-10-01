import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-lista-usuarios',
  styleUrl: './lista-usuarios.css',
  templateUrl: './lista-usuarios.html',
})
export class ListaUsuariosComponent {
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Ana García', email: 'ana@example.com', rol: 'Admin' },
    { id: 2, nombre: 'Juan Pérez', email: 'juan@example.com', rol: 'Usuario' },
    { id: 3, nombre: 'María López', email: 'maria@example.com', rol: 'Editor' },
    { id: 4, nombre: 'Carlos Ruiz', email: 'carlos@example.com', rol: 'Usuario' },
  ];
}

export { ListaUsuariosComponent as ListaUsuarios };
