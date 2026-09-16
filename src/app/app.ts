import { Component } from '@angular/core';
import { Registro } from './registro/registro';

@Component({
  imports: [Registro],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = 'Formulario de Registro Angular';
}