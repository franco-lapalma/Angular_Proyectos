import { Injectable } from '@angular/core';

const KEY = 'ultimoModulo';

@Injectable({ providedIn: 'root' })
export class StorageService {
  guardarUltimoModulo(ruta: string): void {
    try {
      localStorage.setItem(KEY, ruta);
    } catch {}
  }

  obtenerUltimoModulo(): string | null {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  limpiar(): void {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  }
}
