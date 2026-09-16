import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  registroForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: [''],
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  getErrorMessages(controlName: string): string[] {
    const control = this.registroForm.get(controlName);
    const errors: string[] = [];
    if (control?.errors && (control.dirty || control.touched || this.submitted)) {
      if (control.errors['required']) {
        errors.push(`${this.getFieldLabel(controlName)} es obligatorio`);
      }
      if (control.errors['minlength']) {
        errors.push(`${this.getFieldLabel(controlName)} debe tener al menos 3 caracteres`);
      }
      if (control.errors['email']) {
        errors.push('El email debe tener un formato válido');
      }
    }
    return errors;
  }

  getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      nombre: 'Nombre',
      email: 'Email',
      mensaje: 'Mensaje',
    };
    return labels[controlName] || controlName;
  }

  isInvalid(controlName: string): boolean {
    const control = this.registroForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched || this.submitted));
  }

  isValid(controlName: string): boolean {
    const control = this.registroForm.get(controlName);
    return !!(control?.valid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      this.registroForm.reset();
      this.submitted = false;
    }
  }
}