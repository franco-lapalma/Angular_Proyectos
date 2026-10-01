import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

// AppRoutingModule: configuración del routing principal.
// / -> inicio, /usuarios lazy, /productos lazy, /** -> redirect.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
