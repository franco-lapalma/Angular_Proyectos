import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
  standalone: true
})
export class DescuentoPipe implements PipeTransform {
  transform(precio: number, porcentaje: number): number {
    if (typeof precio !== 'number' || typeof porcentaje !== 'number') {
      return precio;
    }
    if (porcentaje < 0 || porcentaje > 100) {
      return precio;
    }
    const descuento = precio * (porcentaje / 100);
    return Number((precio - descuento).toFixed(2));
  }
}