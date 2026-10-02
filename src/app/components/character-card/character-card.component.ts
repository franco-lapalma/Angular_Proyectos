import { Component, Input, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { type Character } from '../../interfaces/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <article class="character-card" [class.loading]="isLoading">
      @if (isLoading) {
        <div class="card-skeleton">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text short"></div>
        </div>
      } @else {
        <a [routerLink]="['/personajes', character?.id]" class="card-link" aria-label="Ver detalle de {{ character?.name }}">
          <div class="card-image-wrapper">
            <img 
              [src]="character?.image" 
              [alt]="'Imagen de ' + character?.name"
              class="card-image"
              loading="lazy"
            >
            <div class="status-badge" [class]="'status-' + character?.status.toLowerCase()">
              <span class="status-dot"></span>
              {{ getStatusLabel(character?.status) }}
            </div>
          </div>
          
          <div class="card-content">
            <h3 class="card-name">{{ character?.name }}</h3>
            
            <div class="card-meta">
              <span class="meta-item">
                <span class="meta-icon">🧬</span>
                {{ character?.species }}
              </span>
              <span class="meta-item">
                <span class="meta-icon">{{ getGenderIcon(character?.gender) }}</span>
                {{ getGenderLabel(character?.gender) }}
              </span>
            </div>
            
            <div class="card-origin">
              <span class="origin-icon">📍</span>
              <span class="origin-name">{{ character?.origin?.name }}</span>
            </div>
            
            <div class="card-location">
              <span class="location-icon">📡</span>
              <span class="location-name">{{ character?.location?.name }}</span>
            </div>
          </div>
          
          <div class="card-footer">
            <span class="episode-count">📺 {{ character?.episode?.length || 0 }} episodios</span>
            <span class="view-detail">Ver detalle →</span>
          </div>
        </a>
      }
    </article>
  `,
  styles: [`
    .character-card {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .character-card:hover {
      transform: translateY(-8px);
      border-color: rgba(233, 69, 96, 0.3);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(233, 69, 96, 0.2);
    }

    .card-link {
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .card-image-wrapper {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      background: linear-gradient(135deg, #0f3460, #1a1a2e);
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .character-card:hover .card-image {
      transform: scale(1.05);
    }

    .status-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    .status-alive .status-dot {
      background: #00d47e;
      box-shadow: 0 0 8px #00d47e;
    }

    .status-dead .status-dot {
      background: #e94560;
      box-shadow: 0 0 8px #e94560;
    }

    .status-unknown .status-dot {
      background: #ffa502;
      box-shadow: 0 0 8px #ffa502;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.9); }
    }

    .status-alive { border: 1px solid rgba(0, 212, 126, 0.3); }
    .status-dead { border: 1px solid rgba(233, 69, 96, 0.3); }
    .status-unknown { border: 1px solid rgba(255, 165, 2, 0.3); }

    .card-content {
      padding: 1.25rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-name {
      margin: 0 0 0.75rem;
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8rem;
      color: #a0a0b0;
      background: rgba(255, 255, 255, 0.03);
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
    }

    .meta-icon {
      font-size: 0.85rem;
    }

    .card-origin,
    .card-location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #707080;
      margin-bottom: 0.4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .origin-icon,
    .location-icon {
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    .origin-name,
    .location-name {
      color: #c0c0d0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      background: rgba(0, 0, 0, 0.2);
    }

    .episode-count {
      font-size: 0.75rem;
      color: #808090;
      font-weight: 500;
    }

    .view-detail {
      font-size: 0.8rem;
      font-weight: 600;
      color: #e94560;
      transition: transform 0.2s ease;
    }

    .character-card:hover .view-detail {
      transform: translateX(4px);
    }

    /* Skeleton loading */
    .card-skeleton {
      padding: 1.25rem;
    }

    .skeleton {
      background: linear-gradient(90deg, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    .skeleton-image {
      aspect-ratio: 1;
      border-radius: 12px;
      margin-bottom: 1rem;
    }

    .skeleton-title {
      height: 1.5rem;
      width: 70%;
      margin-bottom: 0.75rem;
    }

    .skeleton-text {
      height: 1rem;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .skeleton-text.short {
      width: 50%;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .loading .card-skeleton {
      pointer-events: none;
    }
  `]
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() isLoading = false;

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
}