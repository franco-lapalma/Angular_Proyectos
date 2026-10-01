import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';

// AppModule: módulo principal. En Angular 22 el bootstrap es standalone
// (ver main.ts + app.config.ts), este NgModule documenta la estructura
// exigida por la consigna y reutiliza el mismo AppRoutingModule.
@NgModule({
  imports: [BrowserModule, AppRoutingModule, App],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
