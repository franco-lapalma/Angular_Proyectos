import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { StorageService } from './core/storage.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private router = inject(Router);
  private storage = inject(StorageService);

  ngOnInit(): void {
    // Al recargar: redirigir automáticamente a la última sección visitada.
    const ultima = this.storage.obtenerUltimoModulo();
    const actual = this.router.url;
    if (ultima && (actual === '/' || actual === '')) {
      if (ultima !== '/' && ultima.startsWith('/')) {
        this.router.navigateByUrl(ultima);
      }
    }

    // Guardar último módulo visitado en cada navegación exitosa.
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        if (url.startsWith('/usuarios') || url.startsWith('/productos')) {
          this.storage.guardarUltimoModulo(url);
        } else if (url === '/') {
          this.storage.guardarUltimoModulo('/');
        }
      });
  }

  limpiarHistorial(): void {
    this.storage.limpiar();
  }
}
