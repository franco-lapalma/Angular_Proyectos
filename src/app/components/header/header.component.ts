import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <a routerLink="/" class="logo" aria-label="Rick and Morty App - Inicio">
          <span class="logo-icon">🧪</span>
          <span class="logo-text">Rick & Morty</span>
        </a>
        
        <nav class="nav" aria-label="Navegación principal">
          <ul class="nav-list">
            <li>
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                <span class="nav-icon">🏠</span> Inicio
              </a>
            </li>
            <li>
              <a routerLink="/personajes" routerLinkActive="active" class="nav-link">
                <span class="nav-icon">👽</span> Personajes
              </a>
            </li>
            <li>
              <a routerLink="/nosotros" routerLinkActive="active" class="nav-link">
                <span class="nav-icon">ℹ️</span> Nosotros
              </a>
            </li>
            <li>
              <a routerLink="/contacto" routerLinkActive="active" class="nav-link">
                <span class="nav-icon">📧</span> Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-bottom: 3px solid #0f3460;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      color: #e94560;
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .logo:hover {
      transform: scale(1.02);
      color: #ff6b6b;
    }

    .logo-icon {
      font-size: 2rem;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(5deg); }
    }

    .logo-text {
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .nav-list {
      display: flex;
      gap: 0.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      color: #a0a0b0;
      text-decoration: none;
      font-weight: 500;
      font-size: 1rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(15, 52, 96, 0.2));
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .nav-link:hover {
      color: #ffffff;
      background: rgba(233, 69, 96, 0.15);
      transform: translateY(-2px);
    }

    .nav-link:hover::before {
      opacity: 1;
    }

    .nav-link.active {
      color: #e94560;
      background: rgba(233, 69, 96, 0.2);
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 3px;
      background: linear-gradient(90deg, #e94560, #ff6b6b);
      border-radius: 3px 3px 0 0;
    }

    .nav-icon {
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .nav-list {
        flex-wrap: wrap;
        justify-content: center;
      }

      .nav-link {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class HeaderComponent {}