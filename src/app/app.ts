import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Mi Primera App en Angular');
  protected readonly nombre = signal('Franco Lapalma');
  protected readonly motivo = signal('Quiero aprender Angular para desarrollar aplicaciones web modernas, escalables y mantenibles, aprovechando su potente ecosistema y arquitectura basada en componentes.');
  protected readonly mensajeInterpolado = signal('¡Hola desde Angular con interpolación!');
}
