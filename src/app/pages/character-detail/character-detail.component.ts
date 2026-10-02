import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Character, Episode } from '../../interfaces/models';
import { RickAndMortyService } from '../../services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="detail-page">
      @if (isLoading()) {
        <div class="detail-skeleton">
          <div class="skeleton-header">
            <div class="skeleton skeleton-avatar"></div>
            <div class="skeleton-info">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text short"></div>
            </div>
          </div>
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      } @else if (character()) {
        <div class="container">
          <a routerLink="/personajes" class="back-link" aria-label="Volver a personajes">
            <span>←</span> Volver a Personajes
          </a>

          <article class="detail-card">
            <header class="detail-header">
              <div class="detail-avatar-wrapper">
                <img 
                  [src]="character()!.image" 
                  [alt]="'Imagen de ' + character()!.name"
                  class="detail-avatar"
                >
                <div class="status-badge-large" [class]="'status-' + character()!.status.toLowerCase()">
                  <span class="status-dot"></span>
                  {{ getStatusLabel(character()!.status) }}
                </div>
              </div>
              
              <div class="detail-main-info">
                <h1 class="detail-name">{{ character()!.name }}</h1>
                
                <div class="detail-meta">
                  <span class="meta-chip">
                    <span class="chip-icon">🧬</span>
                    {{ character()!.species }}
                  </span>
                  <span class="meta-chip">
                    <span class="chip-icon">{{ getGenderIcon(character()!.gender) }}</span>
                    {{ getGenderLabel(character()!.gender) }}
                  </span>
                  <span class="meta-chip">
                    <span class="chip-icon">#</span>
                    {{ character()!.id }}
                  </span>
                </div>
              </div>
            </header>

            <div class="detail-grid">
              <section class="detail-section origin-section">
                <h2 class="section-title">
                  <span class="section-icon">📍</span>
                  Origen
                </h2>
                <div class="info-card">
                  <div class="info-label">Planeta/Lugar de origen</div>
                  <div class="info-value">{{ character()!.origin.name }}</div>
                  @if (character()!.origin.name !== 'unknown') {
                    <a [routerLink]="['/personajes']" class="info-link" (click)="$event.preventDefault(); filterByOrigin(character()!.origin.name)">
                      Ver personajes de aquí →
                    </a>
                  }
                </div>
              </section>

              <section class="detail-section location-section">
                <h2 class="section-title">
                  <span class="section-icon">📡</span>
                  Ubicación Actual
                </h2>
                <div class="info-card">
                  <div class="info-label">Última ubicación conocida</div>
                  <div class="info-value">{{ character()!.location.name }}</div>
                  @if (character()!.location.name !== 'unknown') {
                    <a [routerLink]="['/personajes']" class="info-link" (click)="$event.preventDefault(); filterByLocation(character()!.location.name)">
                      Ver personajes aquí →
                    </a>
                  }
                </div>
              </section>

              <section class="detail-section episodes-section">
                <h2 class="section-title">
                  <span class="section-icon">📺</span>
                  Episodios ({{ character()!.episode.length }})
                </h2>
                <div class="episodes-list">
                  @for (epUrl of character()!.episode; track epUrl; let i = $index) {
                    <button 
                      class="episode-item"
                      (click)="loadEpisode(epUrl)"
                      [class.loading]="loadingEpisodeUrl() === epUrl"
                    >
                      <span class="episode-number">{{ i + 1 }}</span>
                      <span class="episode-title">
                        {{ episodeTitles().get(epUrl) || 'Cargando...' }}
                      </span>
                      <span class="episode-chevron">→</span>
                    </button>
                  }
                </div>
              </section>
            </div>

            <footer class="detail-footer">
              <div class="footer-info">
                <div class="footer-item">
                  <span class="footer-label">Creado</span>
                  <span class="footer-value">{{ formatDate(character()!.created) }}</span>
                </div>
                <div class="footer-item">
                  <span class="footer-label">Tipo</span>
                  <span class="footer-value">{{ character()!.type || 'No especificado' }}</span>
                </div>
              </div>
              <a [routerLink]="['/personajes']" class="btn btn-primary">
                <span class="btn-icon">←</span>
                Ver más personajes
              </a>
            </footer>
          </article>
        </div>
      } @else {
        <div class="detail-error">
          <div class="error-icon">😵</div>
          <h2>Personaje no encontrado</h2>
          <p>El personaje que buscas no existe o ha sido eliminado de la realidad.</p>
          <a routerLink="/personajes" class="btn btn-primary">Volver a Personajes</a>
        </div>
      }
    </section>
  `,
  styles: [`
    .detail-page {
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

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #a0a0b0;
      text-decoration: none;
      font-weight: 500;
      margin-bottom: 2rem;
      transition: all 0.2s ease;
      padding: 0.5rem 0;
    }

    .back-link:hover {
      color: #e94560;
      transform: translateX(-4px);
    }

    .detail-card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    }

    .detail-header {
      display: flex;
      gap: 2rem;
      padding: 2.5rem;
      background: linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(15, 52, 96, 0.2) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      flex-wrap: wrap;
    }

    .detail-avatar-wrapper {
      position: relative;
      flex-shrink: 0;
    }

    .detail-avatar {
      width: 180px;
      height: 180px;
      border-radius: 20px;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .status-badge-large {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(8px);
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: 1px solid;
    }

    .status-badge-large .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    .status-alive { border-color: rgba(0, 212, 126, 0.5); }
    .status-alive .status-dot { background: #00d47e; box-shadow: 0 0 10px #00d47e; }
    .status-dead { border-color: rgba(233, 69, 96, 0.5); }
    .status-dead .status-dot { background: #e94560; box-shadow: 0 0 10px #e94560; }
    .status-unknown { border-color: rgba(255, 165, 2, 0.5); }
    .status-unknown .status-dot { background: #ffa502; box-shadow: 0 0 10px #ffa502; }

    .detail-main-info {
      flex: 1;
      min-width: 200px;
    }

    .detail-name {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #ffffff, #e94560);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 0.85rem;
      color: #c0c0d0;
    }

    .chip-icon {
      font-size: 0.9rem;
    }

    .detail-grid {
      padding: 2.5rem;
      display: grid;
      gap: 1.5rem;
    }

    .detail-section {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      overflow: hidden;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
      padding: 1.25rem 1.5rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .section-icon {
      font-size: 1.25rem;
    }

    .info-card {
      padding: 1.5rem;
    }

    .info-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #707080;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }

    .info-value {
      font-size: 1.1rem;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 1rem;
      word-break: break-word;
    }

    .info-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: #e94560;
      font-weight: 600;
      font-size: 0.85rem;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .info-link:hover {
      color: #ff6b6b;
    }

    .episodes-list {
      padding: 1rem 1.5rem 1.5rem;
      max-height: 400px;
      overflow-y: auto;
    }

    .episode-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      padding: 0.875rem 1rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      color: #c0c0d0;
      font-size: 0.9rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 0.5rem;
    }

    .episode-item:hover {
      background: rgba(233, 69, 96, 0.1);
      border-color: rgba(233, 69, 96, 0.3);
      color: #ffffff;
      transform: translateX(4px);
    }

    .episode-item.loading {
      opacity: 0.6;
      cursor: wait;
    }

    .episode-number {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(233, 69, 96, 0.2);
      color: #e94560;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    .episode-title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .episode-chevron {
      color: #505060;
      transition: transform 0.2s ease;
    }

    .episode-item:hover .episode-chevron {
      color: #e94560;
      transform: translateX(4px);
    }

    .detail-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2.5rem;
      background: rgba(0, 0, 0, 0.3);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      flex-wrap: wrap;
      gap: 1rem;
    }

    .footer-info {
      display: flex;
      gap: 2rem;
    }

    .footer-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .footer-label {
      font-size: 0.7rem;
      font-weight: 600;
      color: #707080;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .footer-value {
      font-size: 0.85rem;
      color: #a0a0b0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.875rem 1.75rem;
      font-size: 0.95rem;
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

    .detail-error {
      max-width: 500px;
      margin: 4rem auto;
      text-align: center;
      padding: 3rem;
    }

    .error-icon {
      font-size: 5rem;
      margin-bottom: 1rem;
    }

    .detail-error h2 {
      color: #ffffff;
      margin: 0 0 1rem;
    }

    .detail-error p {
      color: #a0a0b0;
      margin: 0 0 2rem;
    }

    /* Skeleton */
    .detail-skeleton {
      max-width: 900px;
      margin: 0 auto;
    }

    .skeleton-header {
      display: flex;
      gap: 2rem;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      flex-wrap: wrap;
    }

    .skeleton-avatar {
      width: 180px;
      height: 180px;
      border-radius: 20px;
    }

    .skeleton-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: center;
    }

    .skeleton-card {
      height: 140px;
      margin: 0 2.5rem 1.5rem;
    }

    .skeleton {
      background: linear-gradient(90deg, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    .skeleton-title {
      height: 2.5rem;
      width: 60%;
    }

    .skeleton-text {
      height: 1.25rem;
      width: 80%;
    }

    .skeleton-text.short {
      width: 40%;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @media (max-width: 768px) {
      .detail-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem 1.5rem;
      }

      .detail-avatar {
        width: 140px;
        height: 140px;
      }

      .detail-grid {
        padding: 1.5rem;
      }

      .detail-footer {
        flex-direction: column;
        padding: 1.5rem;
      }

      .footer-info {
        width: 100%;
        justify-content: space-around;
      }
    }

    @media (max-width: 480px) {
      .detail-page {
        padding: 1rem;
      }

      .episode-item {
        padding: 0.75rem;
      }
    }
  `]
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  character = signal<Character | null>(null);
  isLoading = signal(true);
  episodeTitles = signal<Map<string, string>>(new Map());
  loadingEpisodeUrl = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = +params['id'];
        if (id) {
          this.loadCharacter(id);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCharacter(id: number) {
    this.isLoading.set(true);
    this.character.set(null);
    this.episodeTitles.set(new Map());
    
    this.rickAndMortyService.getCharacter(id).subscribe({
      next: (character) => {
        this.character.set(character);
        this.isLoading.set(false);
        this.loadEpisodeTitles(character.episode);
      },
      error: (error) => {
        console.error('Error loading character:', error);
        this.isLoading.set(false);
      }
    });
  }

  private loadEpisodeTitles(episodeUrls: string[]) {
    episodeUrls.forEach(url => {
      this.rickAndMortyService.getEpisode(this.extractIdFromUrl(url)).subscribe({
        next: (episode) => {
          this.episodeTitles.update(map => {
            const newMap = new Map(map);
            newMap.set(url, `${episode.name} (${episode.episode})`);
            return newMap;
          });
        }
      });
    });
  }

  loadEpisode(url: string) {
    this.loadingEpisodeUrl.set(url);
    // Here you could navigate to an episode detail page
    // For now, just show the title which is already loaded
    setTimeout(() => this.loadingEpisodeUrl.set(null), 500);
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +(parts[parts.length - 1] ?? 0);
  }

  filterByOrigin(origin: string) {
    // Navigate to characters page with origin filter
    // This would require adding origin filter to the characters component
  }

  filterByLocation(location: string) {
    // Navigate to characters page with location filter
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'Alive': 'Vivo',
      'Dead': 'Muerto',
      'unknown': 'Desconocido'
    };
    return labels[status] || status;
  }

  getGenderLabel(gender: string): string {
    const labels: Record<string, string> = {
      'Female': 'Femenino',
      'Male': 'Masculino',
      'Genderless': 'Sin género',
      'unknown': 'Desconocido'
    };
    return labels[gender] || gender;
  }

  getGenderIcon(gender: string): string {
    const icons: Record<string, string> = {
      'Female': '♀',
      'Male': '♂',
      'Genderless': '⚲',
      'unknown': '❓'
    };
    return icons[gender] || '❓';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}