import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="about-page">
      <div class="container">
        <header class="page-header">
          <h1 class="page-title">
            <span class="title-icon">ℹ️</span>
            Sobre el Proyecto
          </h1>
          <p class="page-subtitle">Conoce los detalles técnicos y la motivación detrás de esta aplicación</p>
        </header>

        <div class="about-content">
          <section class="about-section">
            <h2 class="section-title">🎯 Objetivo</h2>
            <div class="section-content">
              <p>Esta aplicación fue desarrollada como Trabajo Práctico Final del curso de Angular, demostrando la implementación de los conceptos fundamentales del framework:</p>
              <ul class="feature-list">
                <li><strong>Componentes standalone</strong> - Arquitectura moderna sin NgModules</li>
                <li><strong>Routing avanzado</strong> - Rutas estáticas, dinámicas y lazy loading</li>
                <li><strong>Servicios e inyección de dependencias</strong> - Comunicación con APIs externas</li>
                <li><strong>Reactive Forms & Signals</strong> - Gestión de estado reactiva</li>
                <li><strong>Consumo de API REST</strong> - Integración con Rick and Morty API</li>
                <li><strong>Componentización</strong> - Separación clara de responsabilidades</li>
              </ul>
            </div>
          </section>

          <section class="about-section">
            <h2 class="section-title">🛠️ Stack Tecnológico</h2>
            <div class="tech-grid">
              <article class="tech-card">
                <div class="tech-icon">🅰️</div>
                <h3>Angular 17+</h3>
                <p>Framework principal con standalone components, signals y nuevo control flow</p>
              </article>
              <article class="tech-card">
                <div class="tech-icon">📘</div>
                <h3>TypeScript</h3>
                <p>Tipado estricto para mayor robustez y mantenibilidad del código</p>
              </article>
              <article class="tech-card">
                <div class="tech-icon">⚡</div>
                <h3>RxJS</h3>
                <p>Programación reactiva para manejo de streams y peticiones HTTP</p>
              </article>
              <article class="tech-card">
                <div class="tech-icon">🎨</div>
                <h3>CSS Moderno</h3>
                <p>Grid, Flexbox, Custom Properties, Animaciones nativas</p>
              </article>
              <article class="tech-card">
                <div class="tech-icon">📡</div>
                <h3>HttpClient</h3>
                <p>Cliente HTTP nativo con interceptors y tipado de respuestas</p>
              </article>
              <article class="tech-card">
                <div class="tech-icon">🔧</div>
                <h3>Angular CLI</h3>
                <p>Build optimizado, dev server, testing y linting integrados</p>
              </article>
            </div>
          </section>

          <section class="about-section">
            <h2 class="section-title">📡 API Utilizada</h2>
            <div class="api-info">
              <div class="api-card">
                <div class="api-header">
                  <span class="api-icon">🌌</span>
                  <div>
                    <h3>Rick and Morty API</h3>
                    <p class="api-description">API REST gratuita y abierta con datos de la serie</p>
                  </div>
                </div>
                <ul class="api-features">
                  <li>👥 <strong>826+ personajes</strong> con detalles completos</li>
                  <li>📺 <strong>51 episodios</strong> con fechas y participantes</li>
                  <li>🌍 <strong>126+ ubicaciones</strong> del multiverso</li>
                  <li>🔍 Búsqueda y filtrado nativo</li>
                  <li>📄 Paginación automática</li>
                  <li>⚡ Sin autenticación requerida</li>
                </ul>
                <a href="https://rickandmortyapi.com/documentation" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                  <span class="btn-icon">📚</span>
                  Ver Documentación
                </a>
              </div>
            </div>
          </section>

          <section class="about-section">
            <h2 class="section-title">🏗️ Estructura del Proyecto</h2>
            <div class="structure-content">
              <pre class="structure-tree"><code>src/app/
├── components/
│   ├── header/          # Navegación principal
│   ├── footer/          # Pie de página
│   └── character-card/  # Tarjeta reutilizable
├── pages/
│   ├── home/            # Página de inicio
│   ├── characters/      # Listado con filtros
│   ├── character-detail/# Detalle dinámico
│   ├── about/           # Esta página
│   └── contact/         # Formulario contacto
├── services/
│   └── rick-and-morty.service.ts
├── interfaces/
│   └── models.ts        # Tipos TypeScript
├── app.routes.ts        # Configuración routing
├── app.component.ts     # Componente raíz
└── main.ts              # Bootstrap</code></pre>
            </div>
          </section>

          <section class="about-section">
            <h2 class="section-title">✨ Características Implementadas</h2>
            <div class="features-showcase">
              <div class="feature-showcase">
                <div class="showcase-icon">🔍</div>
                <div>
                  <h3>Búsqueda en tiempo real</h3>
                  <p>Debounce de 300ms para optimizar peticiones mientras el usuario escribe</p>
                </div>
              </div>
              <div class="feature-showcase">
                <div class="showcase-icon">🎛️</div>
                <div>
                  <h3>Filtros múltiples</h3>
                  <p>Estado, género y especie combinables con actualización instantánea</p>
                </div>
              </div>
              <div class="feature-showcase">
                <div class="showcase-icon">📄</div>
                <div>
                  <h3>Paginación client-side</h3>
                  <p>Carga completa en background, paginación fluida sin peticiones extra</p>
                </div>
              </div>
              <div class="feature-showcase">
                <div class="showcase-icon">💀</div>
                <div>
                  <h3>Estados de carga</h3>
                  <p>Skeletons animados para mejor perceived performance</p>
                </div>
              </div>
              <div class="feature-showcase">
                <div class="showcase-icon">📱</div>
                <div>
                  <h3>Diseño Responsive</h3>
                  <p>Mobile-first con breakpoints en 480px, 768px y 1024px</p>
                </div>
              </div>
              <div class="feature-showcase">
                <div class="showcase-icon">♿</div>
                <div>
                  <h3>Accesibilidad</h3>
                  <p>ARIA labels, navegación por teclado, contraste WCAG AA</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-page {
      min-height: 100vh;
      background: 
        radial-gradient(ellipse at top left, rgba(233, 69, 96, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(15, 52, 96, 0.1) 0%, transparent 50%),
        #0a0a12;
      padding: 2rem;
    }

    .container {
      max-width: 900px;
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

    .about-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .about-section {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      padding: 2rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .section-content p {
      color: #c0c0d0;
      line-height: 1.7;
      margin: 0 0 1rem;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .feature-list li {
      color: #a0a0b0;
      line-height: 1.6;
      padding-left: 1.5rem;
      position: relative;
    }

    .feature-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: #e94560;
      font-weight: bold;
    }

    .feature-list strong {
      color: #ffffff;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .tech-card {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
    }

    .tech-card:hover {
      transform: translateY(-4px);
      border-color: rgba(233, 69, 96, 0.3);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    }

    .tech-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .tech-card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.5rem;
    }

    .tech-card p {
      color: #a0a0b0;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }

    .api-card {
      background: linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(15, 52, 96, 0.2) 100%);
      border: 1px solid rgba(233, 69, 96, 0.2);
      border-radius: 20px;
      padding: 2rem;
    }

    .api-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .api-icon {
      font-size: 3rem;
    }

    .api-header h3 {
      margin: 0 0 0.25rem;
      color: #ffffff;
    }

    .api-description {
      color: #a0a0b0;
      margin: 0;
    }

    .api-features {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.75rem;
    }

    .api-features li {
      color: #c0c0d0;
      line-height: 1.5;
    }

    .api-features strong {
      color: #ffffff;
    }

    .structure-content {
      overflow-x: auto;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .structure-tree {
      margin: 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.85rem;
      line-height: 1.8;
      color: #c0c0d0;
    }

    .structure-tree code {
      color: #e94560;
    }

    .features-showcase {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .feature-showcase {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      transition: all 0.3s ease;
    }

    .feature-showcase:hover {
      border-color: rgba(233, 69, 96, 0.3);
      transform: translateX(4px);
    }

    .showcase-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .feature-showcase h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 0.25rem;
    }

    .feature-showcase p {
      color: #a0a0b0;
      font-size: 0.85rem;
      line-height: 1.5;
      margin: 0;
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
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(233, 69, 96, 0.5);
    }

    @media (max-width: 600px) {
      .about-section {
        padding: 1.5rem;
      }

      .api-features {
        grid-template-columns: 1fr;
      }

      .feature-showcase {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class AboutComponent {}