import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="home-page">
      <div class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Explora el Multiverso
          </div>
          
          <h1 class="hero-title">
            <span class="title-line">Rick & Morty</span>
            <span class="title-line highlight">Universo</span>
          </h1>
          
          <p class="hero-description">
            Descubre todos los personajes, ubicaciones y episodios de la aclamada serie de Adult Swim. 
            Navega por las dimensiones y conoce a los habitantes más extraños del multiverso.
          </p>
          
          <div class="hero-actions">
            <a routerLink="/personajes" class="btn btn-primary">
              <span class="btn-icon">👽</span>
              Ver Personajes
            </a>
            <a routerLink="/nosotros" class="btn btn-secondary">
              <span class="btn-icon">ℹ️</span>
              Sobre el Proyecto
            </a>
          </div>
          
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">826+</span>
              <span class="stat-label">Personajes</span>
            </div>
            <div class="stat">
              <span class="stat-number">51</span>
              <span class="stat-label">Episodios</span>
            </div>
            <div class="stat">
              <span class="stat-number">100+</span>
              <span class="stat-label">Ubicaciones</span>
            </div>
            <div class="stat">
              <span class="stat-number">∞</span>
              <span class="stat-label">Dimensiones</span>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="portal-ring">
            <div class="portal-inner">
              <div class="portal-core"></div>
            </div>
            <div class="particles"></div>
          </div>
        </div>
      </div>

      <section class="features">
        <div class="container">
          <h2 class="section-title">¿Qué encontrarás?</h2>
          <div class="features-grid">
            <article class="feature-card">
              <div class="feature-icon">👽</div>
              <h3 class="feature-title">Personajes</h3>
              <p class="feature-description">Explora más de 800 personajes con sus estados, especies, orígenes y ubicaciones actuales.</p>
              <a routerLink="/personajes" class="feature-link">Ver listado →</a>
            </article>
            
            <article class="feature-card">
              <div class="feature-icon">🌌</div>
              <h3 class="feature-title">Ubicaciones</h3>
              <p class="feature-description">Viaja por planetas, estaciones espaciales y dimensiones alternativas del multiverso.</p>
              <a routerLink="/personajes" class="feature-link">Explorar →</a>
            </article>
            
            <article class="feature-card">
              <div class="feature-icon">📺</div>
              <h3 class="feature-title">Episodios</h3>
              <p class="feature-description">Revive cada aventura con detalles de emisión, personajes participantes y más.</p>
              <a routerLink="/personajes" class="feature-link">Ver episodios →</a>
            </article>
            
            <article class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3 class="feature-title">Búsqueda</h3>
              <p class="feature-description">Encuentra instantáneamente cualquier personaje por nombre con búsqueda en tiempo real.</p>
              <a routerLink="/personajes" class="feature-link">Buscar →</a>
            </article>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <div class="cta-card">
            <div class="cta-content">
              <h2 class="cta-title">¿Listo para la aventura?</h2>
              <p class="cta-text">Comienza tu viaje por el multiverso ahora mismo. Wubba lubba dub dub!</p>
            </div>
            <a routerLink="/personajes" class="btn btn-primary btn-large">
              <span class="btn-icon">🚀</span>
              Entrar al Multiverso
            </a>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [`
    .home-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .hero {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      align-items: center;
      position: relative;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(ellipse at 20% 20%, rgba(233, 69, 96, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(15, 52, 96, 0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 1;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(233, 69, 96, 0.15);
      border: 1px solid rgba(233, 69, 96, 0.3);
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #e94560;
      margin-bottom: 1.5rem;
      width: fit-content;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: #e94560;
      border-radius: 50%;
      animation: blink 1.5s ease-in-out infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 900;
      line-height: 1.1;
      margin: 0 0 1.5rem;
      letter-spacing: -2px;
    }

    .title-line {
      display: block;
      background: linear-gradient(135deg, #ffffff 0%, #a0a0b0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-line.highlight {
      background: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.15rem;
      line-height: 1.7;
      color: #a0a0b0;
      margin: 0 0 2rem;
      max-width: 500px;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
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

    .btn-primary {
      background: linear-gradient(135deg, #e94560, #c73659);
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(233, 69, 96, 0.4);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(233, 69, 96, 0.5);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      color: #e94560;
      border: 1px solid rgba(233, 69, 96, 0.3);
    }

    .btn-secondary:hover {
      background: rgba(233, 69, 96, 0.1);
      transform: translateY(-3px);
    }

    .btn-large {
      padding: 1.25rem 2.5rem;
      font-size: 1.1rem;
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    .hero-stats {
      display: flex;
      gap: 2.5rem;
      flex-wrap: wrap;
    }

    .stat {
      text-align: left;
    }

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 900;
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      color: #707080;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .portal-ring {
      width: 350px;
      height: 350px;
      position: relative;
      animation: rotate 20s linear infinite;
    }

    .portal-inner {
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-radius: 50%;
      background: linear-gradient(135deg, #e94560, #0f3460, #ff6b6b) border-box;
      -webkit-mask: 
        linear-gradient(#fff 0 0) padding-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      position: relative;
      overflow: hidden;
    }

    .portal-inner::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(
        from 0deg,
        transparent 0%,
        rgba(233, 69, 96, 0.3) 25%,
        transparent 50%,
        rgba(15, 52, 96, 0.3) 75%,
        transparent 100%
      );
      animation: spin 3s linear infinite reverse;
    }

    .portal-core {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      background: radial-gradient(circle, rgba(233, 69, 96, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      animation: breathe 2s ease-in-out infinite;
    }

    .particles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(2px 2px at 20% 30%, #e94560, transparent),
        radial-gradient(2px 2px at 80% 70%, #0f3460, transparent),
        radial-gradient(1px 1px at 40% 80%, #ff6b6b, transparent),
        radial-gradient(1px 1px at 60% 20%, #ffffff, transparent);
      background-size: 200px 200px;
      animation: floatParticles 15s linear infinite;
      opacity: 0.6;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes breathe {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
    }

    @keyframes floatParticles {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(-50px, -50px) rotate(360deg); }
    }

    .features {
      padding: 5rem 2rem;
      background: linear-gradient(180deg, transparent 0%, rgba(15, 52, 96, 0.1) 100%);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 3rem;
      background: linear-gradient(135deg, #ffffff, #a0a0b0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .feature-card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      border-color: rgba(233, 69, 96, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: floatIcon 3s ease-in-out infinite;
    }

    @keyframes floatIcon {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.75rem;
    }

    .feature-description {
      font-size: 0.95rem;
      color: #a0a0b0;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    .feature-link {
      color: #e94560;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .feature-link:hover {
      color: #ff6b6b;
    }

    .cta-section {
      padding: 5rem 2rem;
    }

    .cta-card {
      max-width: 700px;
      margin: 0 auto;
      background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
      border: 1px solid rgba(233, 69, 96, 0.2);
      border-radius: 24px;
      padding: 3rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .cta-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(233, 69, 96, 0.05) 0%, transparent 70%);
      animation: rotate 30s linear infinite;
    }

    .cta-content {
      position: relative;
      z-index: 1;
    }

    .cta-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #ffffff, #e94560);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .cta-text {
      font-size: 1.15rem;
      color: #a0a0b0;
      margin: 0 0 2rem;
      line-height: 1.6;
    }

    @media (max-width: 1024px) {
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 3rem 1.5rem;
      }

      .hero-content {
        order: 2;
      }

      .hero-visual {
        order: 1;
      }

      .hero-actions {
        justify-content: center;
      }

      .hero-stats {
        justify-content: center;
      }

      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 600px) {
      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-card {
        padding: 2rem 1.5rem;
      }

      .cta-title {
        font-size: 1.75rem;
      }
    }
  `]
})
export class HomeComponent {}