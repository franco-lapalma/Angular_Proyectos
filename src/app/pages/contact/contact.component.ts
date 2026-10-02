import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact-page">
      <div class="container">
        <header class="page-header">
          <h1 class="page-title">
            <span class="title-icon">📧</span>
            Contacto
          </h1>
          <p class="page-subtitle">¿Tienes preguntas, sugerencias o quieres reportar un error?</p>
        </header>

        <div class="contact-layout">
          <div class="contact-info">
            <div class="info-card">
              <h2 class="info-title">Ponte en contacto</h2>
              <p class="info-text">
                Estoy abierto a feedback, sugerencias de mejora, reportes de bugs 
                o simplemente para charlar sobre Angular, Rick and Morty o desarrollo web.
              </p>

              <div class="contact-methods">
                <a href="mailto:flapalma@frba.utn.edu.ar" class="method-card">
                  <div class="method-icon">📧</div>
                  <div class="method-content">
                    <span class="method-label">Email</span>
                    <span class="method-value">flapalma&#64;frba.utn.edu.ar</span>
                  </div>
                </a>

                <a href="https://github.com/franco-lapalma" target="_blank" rel="noopener noreferrer" class="method-card">
                  <div class="method-icon">💻</div>
                  <div class="method-content">
                    <span class="method-label">GitHub</span>
                    <span class="method-value">github.com/franco-lapalma</span>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/franco-lapalma-1677b126a/" target="_blank" rel="noopener noreferrer" class="method-card">
                  <div class="method-icon">💼</div>
                  <div class="method-content">
                    <span class="method-label">LinkedIn</span>
                    <span class="method-value">linkedin.com/in/franco-lapalma-1677b126a</span>
                  </div>
                </a>
              </div>
            </div>

            <div class="info-card">
              <h2 class="info-title">Sobre el proyecto</h2>
              <ul class="project-info">
                <li>
                  <span class="info-icon">📚</span>
                  <div>
                    <strong>Trabajo Práctico Final</strong>
                    <span>Curso de Angular</span>
                  </div>
                </li>
                <li>
                  <span class="info-icon">📅</span>
                  <div>
                    <strong>Octubre 2026</strong>
                    <span>Fecha de entrega</span>
                  </div>
                </li>
                <li>
                  <span class="info-icon">🎓</span>
                  <div>
                    <strong>Propósito Educativo</strong>
                    <span>Aprendizaje de Angular 17+</span>
                  </div>
                </li>
                <li>
                  <span class="info-icon">🔓</span>
                  <div>
                    <strong>Código Abierto</strong>
                    <span>Disponible en GitHub</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="contact-form-container">
            <div class="form-card">
              <h2 class="form-title">Envía un mensaje</h2>
              <p class="form-subtitle">Completa el formulario y te responderé lo antes posible</p>

              <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" class="contact-form" novalidate>
                <div class="form-row">
                  <div class="form-group">
                    <label for="name" class="form-label">Nombre *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      [(ngModel)]="formData.name"
                      required
                      minlength="2"
                      maxlength="50"
                      #name="ngModel"
                      class="form-input"
                      placeholder="Tu nombre"
                      aria-describedby="name-error"
                    >
                    @if (name.invalid && (name.dirty || name.touched)) {
                      <span class="form-error" id="name-error">
                        @if (name.errors?.['required']) { El nombre es obligatorio }
                        @if (name.errors?.['minlength']) { Mínimo 2 caracteres }
                        @if (name.errors?.['maxlength']) { Máximo 50 caracteres }
                      </span>
                    }
                  </div>

                  <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      [(ngModel)]="formData.email"
                      required
                      email
                      #email="ngModel"
                      class="form-input"
                      placeholder="tu@email.com"
                      aria-describedby="email-error"
                    >
                    @if (email.invalid && (email.dirty || email.touched)) {
                      <span class="form-error" id="email-error">
                        @if (email.errors?.['required']) { El email es obligatorio }
                        @if (email.errors?.['email']) { Formato de email inválido }
                      </span>
                    }
                  </div>
                </div>

                <div class="form-group">
                  <label for="subject" class="form-label">Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    [(ngModel)]="formData.subject"
                    required
                    #subject="ngModel"
                    class="form-select"
                    aria-describedby="subject-error"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="bug">🐛 Reportar bug</option>
                    <option value="feature">✨ Sugerir funcionalidad</option>
                    <option value="question">❓ Pregunta general</option>
                    <option value="feedback">💬 Feedback</option>
                    <option value="other">📝 Otro</option>
                  </select>
                  @if (subject.invalid && (subject.dirty || subject.touched)) {
                    <span class="form-error" id="subject-error">Selecciona un asunto</span>
                  }
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    minlength="10"
                    maxlength="1000"
                    rows="5"
                    #message="ngModel"
                    class="form-textarea"
                    placeholder="Cuéntame en qué puedo ayudarte..."
                    aria-describedby="message-error message-hint"
                  ></textarea>
                  <span class="form-hint" id="message-hint">{{ formData.message.length }}/1000 caracteres</span>
                  @if (message.invalid && (message.dirty || message.touched)) {
                    <span class="form-error" id="message-error">
                      @if (message.errors?.['required']) { El mensaje es obligatorio }
                      @if (message.errors?.['minlength']) { Mínimo 10 caracteres }
                      @if (message.errors?.['maxlength']) { Máximo 1000 caracteres }
                    </span>
                  }
                </div>

                <div class="form-actions">
                  <button
                    type="submit"
                    [disabled]="contactForm.invalid || isSubmitting()"
                    class="btn btn-primary btn-full"
                  >
                    @if (isSubmitting()) {
                      <span class="btn-spinner"></span>
                      Enviando...
                    } @else {
                      <span class="btn-icon">📤</span>
                      Enviar mensaje
                    }
                  </button>
                  <button
                    type="button"
                    (click)="resetForm(contactForm)"
                    class="btn btn-secondary btn-full"
                  >
                    <span class="btn-icon">🔄</span>
                    Limpiar
                  </button>
                </div>

                @if (submitStatus() === 'success') {
                  <div class="toast toast-success" role="alert">
                    <span class="toast-icon">✅</span>
                    <div>
                      <strong>¡Mensaje enviado!</strong>
                      <p>Te responderé lo antes posible. ¡Gracias por contactar!</p>
                    </div>
                  </div>
                } @else if (submitStatus() === 'error') {
                  <div class="toast toast-error" role="alert">
                    <span class="toast-icon">❌</span>
                    <div>
                      <strong>Error al enviar</strong>
                      <p>Inténtalo de nuevo más tarde o contacta directamente por email.</p>
                    </div>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
      min-height: 100vh;
      background: 
        radial-gradient(ellipse at top left, rgba(233, 69, 96, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(15, 52, 96, 0.1) 0%, transparent 50%),
        #0a0a12;
      padding: 2rem;
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin: 0 0 0.5rem;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #ffffff, #e94560);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .page-subtitle {
      color: #a0a0b0;
      font-size: 1.1rem;
      margin: 0;
    }

    .contact-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: start;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 2rem;
    }

    .info-title {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 1rem;
    }

    .info-text {
      color: #a0a0b0;
      line-height: 1.7;
      margin: 0 0 1.5rem;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .method-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
    }

    .method-card:hover {
      border-color: rgba(233, 69, 96, 0.3);
      background: rgba(233, 69, 96, 0.05);
      transform: translateX(4px);
    }

    .method-icon {
      font-size: 1.5rem;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(233, 69, 96, 0.15);
      border-radius: 12px;
    }

    .method-content {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .method-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #707080;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .method-value {
      font-size: 0.9rem;
      color: #e94560;
      font-weight: 500;
    }

    .project-info {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .project-info li {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
    }

    .info-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .project-info div {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .project-info strong {
      color: #ffffff;
      font-size: 0.9rem;
    }

    .project-info span {
      color: #a0a0b0;
      font-size: 0.8rem;
    }

    .form-card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 2rem;
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .form-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.5rem;
    }

    .form-subtitle {
      color: #a0a0b0;
      margin: 0 0 2rem;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: #c0c0d0;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.875rem 1rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #ffffff;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s ease;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #e94560;
      box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.15);
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: #505060;
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0a0b0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 3rem;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
      line-height: 1.6;
    }

    .form-hint {
      font-size: 0.75rem;
      color: #707080;
      text-align: right;
    }

    .form-error {
      font-size: 0.75rem;
      color: #e94560;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .form-error::before {
      content: '⚠';
      font-size: 0.7rem;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      padding: 1rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }

    .btn-full {
      width: 100%;
    }

    .btn-primary {
      background: linear-gradient(135deg, #e94560, #c73659);
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(233, 69, 96, 0.4);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(233, 69, 96, 0.5);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #a0a0b0;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    .btn-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .toast {
      display: flex;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .toast-success {
      background: rgba(0, 212, 126, 0.15);
      border: 1px solid rgba(0, 212, 126, 0.3);
      color: #00d47e;
    }

    .toast-error {
      background: rgba(233, 69, 96, 0.15);
      border: 1px solid rgba(233, 69, 96, 0.3);
      color: #e94560;
    }

    .toast-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .toast strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .toast p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    @media (max-width: 900px) {
      .contact-layout {
        grid-template-columns: 1fr;
      }

      .form-card {
        position: static;
      }
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .info-card,
      .form-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key]?.markAsTouched();
      });
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      // Simulate success (in real app, would call API)
      this.submitStatus.set('success');
      this.resetForm(form);
      
      // Reset status after 5 seconds
      setTimeout(() => this.submitStatus.set('idle'), 5000);
    }, 1500);
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}