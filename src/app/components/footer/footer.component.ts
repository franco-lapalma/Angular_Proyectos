import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">🧪</span>
            <span class="logo-text">Rick & Morty</span>
          </div>
          <p class="footer-tagline">Explora el multiverso de Rick y Morty</p>
          <div class="social-links">
            <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="API de Rick and Morty">
              <span>📚</span>
            </a>
            <a href="https://github.com/franco-lapalma" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
              <span>💻</span>
            </a>
            <a href="https://adultswim.com/videos/rick-and-morty" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Adult Swim">
              <span>📺</span>
            </a>
          </div>
        </div>

        <div class="footer-section footer-links">
          <h4 class="footer-title">Navegación</h4>
          <ul class="footer-list">
            <li><a routerLink="/" routerLinkActive="active">🏠 Inicio</a></li>
            <li><a routerLink="/personajes" routerLinkActive="active">👽 Personajes</a></li>
            <li><a routerLink="/nosotros" routerLinkActive="active">ℹ️ Nosotros</a></li>
            <li><a routerLink="/contacto" routerLinkActive="active">📧 Contacto</a></li>
          </ul>
        </div>

        <div class="footer-section footer-info">
          <h4 class="footer-title">Información</h4>
          <ul class="footer-list">
            <li>📡 API: <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noopener noreferrer">Rick and Morty API</a></li>
            <li>🔧 Framework: Angular 17+</li>
            <li>💚 TypeScript & RxJS</li>
            <li>🎨 CSS Moderno (Grid, Flexbox)</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © 2026 Rick & Morty App — Proyecto educativo Angular
        </p>
        <p class="disclaimer">
          No afiliado oficialmente con Adult Swim o Rick and Morty. Datos proporcionados por <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">Rick and Morty API</a>.
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
      border-top: 3px solid #0f3460;
      margin-top: auto;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem 2rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 3rem;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: #e94560;
    }

    .footer-logo .logo-text {
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .footer-tagline {
      color: #a0a0b0;
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      font-size: 1.25rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .social-link:hover {
      background: rgba(233, 69, 96, 0.2);
      border-color: #e94560;
      transform: translateY(-3px) scale(1.1);
    }

    .footer-title {
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 1rem;
      position: relative;
      padding-bottom: 0.5rem;
    }

    .footer-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, #e94560, #ff6b6b);
      border-radius: 2px;
    }

    .footer-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .footer-list a {
      color: #a0a0b0;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      display: inline-block;
    }

    .footer-list a:hover,
    .footer-list a.active {
      color: #e94560;
      transform: translateX(5px);
    }

    .footer-info .footer-list li {
      color: #a0a0b0;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .footer-info .footer-list a {
      color: #e94560;
      font-weight: 500;
    }

    .footer-info .footer-list a:hover {
      color: #ff6b6b;
      text-decoration: underline;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 1.5rem 2rem;
      text-align: center;
    }

    .copyright {
      color: #606070;
      font-size: 0.9rem;
      margin: 0 0 0.5rem;
    }

    .disclaimer {
      color: #404050;
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.5;
    }

    .disclaimer a {
      color: #e94560;
      text-decoration: none;
    }

    .disclaimer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 900px) {
      .footer-container {
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      .footer-brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 600px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem 1.5rem;
      }
    }
  `]
})
export class FooterComponent {}