import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Character } from '../../interfaces/models';
import { RickAndMortyService } from '../../services/rick-and-morty.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CharacterCardComponent],
  template: `
    <section class="characters-page">
      <div class="page-header">
        <div class="container">
          <h1 class="page-title">
            <span class="title-icon">👽</span>
            Personajes
          </h1>
          <p class="page-subtitle">Explora a todos los habitantes del multiverso de Rick y Morty</p>
        </div>
      </div>

      <div class="container">
        <div class="characters-layout">
          <aside class="sidebar">
            <div class="sidebar-section">
              <h3 class="sidebar-title">Filtros</h3>
              
              <div class="filter-group">
                <label for="search" class="filter-label">Buscar por nombre</label>
                <div class="search-wrapper">
                  <input
                    type="text"
                    id="search"
                    [(ngModel)]="searchTerm"
                    (ngModelChange)="onSearchChange($event)"
                    placeholder="Ej: Rick, Morty, Summer..."
                    class="search-input"
                    aria-label="Buscar personaje por nombre"
                  >
                  @if (searchTerm) {
                    <button (click)="clearSearch()" class="search-clear" aria-label="Limpiar búsqueda">×</button>
                  }
                </div>
              </div>

              <div class="filter-group">
                <label for="status" class="filter-label">Estado</label>
                <select
                  id="status"
                  [(ngModel)]="selectedStatus"
                  (ngModelChange)="onFilterChange()"
                  class="filter-select"
                  aria-label="Filtrar por estado"
                >
                  <option value="">Todos los estados</option>
                  <option value="Alive">🟢 Vivo</option>
                  <option value="Dead">🔴 Muerto</option>
                  <option value="unknown">⚪ Desconocido</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="gender" class="filter-label">Género</label>
                <select
                  id="gender"
                  [(ngModel)]="selectedGender"
                  (ngModelChange)="onFilterChange()"
                  class="filter-select"
                  aria-label="Filtrar por género"
                >
                  <option value="">Todos los géneros</option>
                  <option value="Male">♂ Masculino</option>
                  <option value="Female">♀ Femenino</option>
                  <option value="Genderless">⚲ Sin género</option>
                  <option value="unknown">❓ Desconocido</option>
                </select>
              </div>

              <div class="filter-group">
                <label for="species" class="filter-label">Especie</label>
                <select
                  id="species"
                  [(ngModel)]="selectedSpecies"
                  (ngModelChange)="onFilterChange()"
                  class="filter-select"
                  aria-label="Filtrar por especie"
                >
                  <option value="">Todas las especies</option>
                  @for (species of availableSpecies(); track species) {
                    <option [value]="species">{{ species }}</option>
                  }
                </select>
              </div>

              <button (click)="clearFilters()" class="btn btn-clear" [disabled]="!hasActiveFilters()">
                Limpiar filtros
              </button>
            </div>

            <div class="sidebar-section sidebar-stats">
              <h3 class="sidebar-title">Estadísticas</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-value">{{ filteredCharacters().length }}</span>
                  <span class="stat-label">Mostrando</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ totalCharacters() }}</span>
                  <span class="stat-label">Total API</span>
                </div>
              </div>
            </div>
          </aside>

          <main class="main-content">
            @if (isLoading() && characters().length === 0) {
              <div class="loading-grid">
                @for (item of [1,2,3,4,5,6]; track item) {
                  <app-character-card [isLoading]="true" />
                }
              </div>
            } @else if (filteredCharacters().length === 0 && !isLoading()) {
              <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No se encontraron personajes</h3>
                <p>Intenta cambiar los filtros o busca con otro nombre</p>
                <button (click)="clearFilters()" class="btn btn-primary">Limpiar filtros</button>
              </div>
            } @else {
              <div class="results-info">
                <span class="results-count">
                  {{ filteredCharacters().length }} de {{ totalCharacters() }} personajes
                </span>
              </div>

              <div class="characters-grid">
                @for (character of paginatedCharacters(); track character.id) {
                  <app-character-card [character]="character" />
                }
              </div>

              @if (totalPages() > 1) {
                <nav class="pagination" aria-label="Paginación de personajes">
                  <button
                    (click)="goToPage(currentPage() - 1)"
                    [disabled]="currentPage() === 1"
                    class="page-btn"
                    aria-label="Página anterior"
                  >
                    ← Anterior
                  </button>
                  
                  <div class="page-numbers">
                    @for (page of visiblePages(); track page) {
                      <button
                        (click)="goToPage(page)"
                        [class.active]="page === currentPage()"
                        class="page-number"
                        [attr.aria-label]="'Página ' + page"
                        [attr.aria-current]="page === currentPage() ? 'page' : null"
                      >
                        {{ page }}
                      </button>
                    }
                  </div>
                  
                  <button
                    (click)="goToPage(currentPage() + 1)"
                    [disabled]="currentPage() === totalPages()"
                    class="page-btn"
                    aria-label="Página siguiente"
                  >
                    Siguiente →
                  </button>
                </nav>
              }
            }
          </main>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .characters-page {
      min-height: 100vh;
      background: 
        radial-gradient(ellipse at top left, rgba(233, 69, 96, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(15, 52, 96, 0.1) 0%, transparent 50%),
        #0a0a12;
    }

    .page-header {
      padding: 3rem 2rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin: 0 0 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #ffffff, #e94560);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-icon {
      font-size: 1.2em;
    }

    .page-subtitle {
      color: #a0a0b0;
      font-size: 1.1rem;
      margin: 0;
    }

    .characters-layout {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
      padding: 2rem;
      align-items: start;
    }

    .sidebar {
      position: sticky;
      top: 100px;
      height: fit-content;
    }

    .sidebar-section {
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .sidebar-title {
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .filter-group {
      margin-bottom: 1.25rem;
    }

    .filter-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #a0a0b0;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .search-wrapper {
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 3rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #e94560;
      box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.15);
    }

    .search-input::placeholder {
      color: #505060;
    }

    .search-clear {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      background: none;
      border: none;
      color: #707080;
      font-size: 1.25rem;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .search-clear:hover {
      background: rgba(233, 69, 96, 0.2);
      color: #e94560;
    }

    .filter-select {
      width: 100%;
      padding: 0.75rem 1rem;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: #ffffff;
      font-size: 0.9rem;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0a0b0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      padding-right: 3rem;
    }

    .filter-select:focus {
      outline: none;
      border-color: #e94560;
      box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.15);
    }

    .btn-clear {
      width: 100%;
      padding: 0.75rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #a0a0b0;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-clear:hover:not(:disabled) {
      border-color: #e94560;
      color: #e94560;
      background: rgba(233, 69, 96, 0.1);
    }

    .btn-clear:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .sidebar-stats {
      background: linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(15, 52, 96, 0.2));
      border-color: rgba(233, 69, 96, 0.2);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }

    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 800;
      color: #e94560;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      color: #707080;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .main-content {
      min-width: 0;
    }

    .loading-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-state h3 {
      color: #ffffff;
      margin: 0 0 0.5rem;
    }

    .empty-state p {
      color: #a0a0b0;
      margin: 0 0 1.5rem;
    }

    .results-info {
      margin-bottom: 1.5rem;
    }

    .results-count {
      font-size: 0.9rem;
      color: #707080;
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
      padding: 1.5rem 0;
      flex-wrap: wrap;
    }

    .page-btn {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #e94560;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .page-btn:hover:not(:disabled) {
      border-color: #e94560;
      background: rgba(233, 69, 96, 0.1);
    }

    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .page-numbers {
      display: flex;
      gap: 0.5rem;
    }

    .page-number {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #a0a0b0;
      font-weight: 600;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .page-number:hover {
      border-color: #e94560;
      color: #e94560;
    }

    .page-number.active {
      background: linear-gradient(135deg, #e94560, #c73659);
      border-color: #e94560;
      color: #ffffff;
      box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
    }

    @media (max-width: 1024px) {
      .characters-layout {
        grid-template-columns: 1fr;
      }

      .sidebar {
        position: static;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .sidebar-section {
        margin-bottom: 0;
      }
    }

    @media (max-width: 600px) {
      .characters-layout {
        padding: 1.5rem 1rem;
      }

      .page-numbers {
        display: none;
      }

      .page-btn {
        flex: 1;
        text-align: center;
      }
    }
  `]
})
export class CharactersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  characters = signal<Character[]>([]);
  filteredCharacters = signal<Character[]>([]);
  isLoading = signal(true);
  currentPage = signal(1);
  totalPages = signal(1);
  totalCharacters = signal(0);
  availableSpecies = signal<string[]>([]);

  searchTerm = '';
  selectedStatus = '';
  selectedGender = '';
  selectedSpecies = '';

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.loadAllCharacters();
    this.setupSearchDebounce();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(term => {
        this.searchTerm = term;
        this.currentPage.set(1);
        this.applyFilters();
      });
  }

  loadAllCharacters() {
    this.isLoading.set(true);
    this.rickAndMortyService.getCharacters(1).subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.totalCharacters.set(response.info.count);
        this.totalPages.set(response.info.pages);
        this.extractSpecies(response.results);
        this.applyFilters();
        this.isLoading.set(false);
        
        // Load remaining pages in background
        this.loadRemainingPages(response.info.pages);
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.isLoading.set(false);
      }
    });
  }

  private loadRemainingPages(totalPages: number) {
    for (let page = 2; page <= totalPages; page++) {
      this.rickAndMortyService.getCharacters(page).subscribe({
        next: (response) => {
          this.characters.update(current => [...current, ...response.results]);
          this.extractSpecies(response.results);
          this.applyFilters();
        }
      });
    }
  }

  private extractSpecies(characters: Character[]) {
    const species = new Set(characters.map(c => c.species).filter(s => s));
    this.availableSpecies.update(current => {
      const combined = new Set([...current, ...species]);
      return Array.from(combined).sort();
    });
  }

  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }

  onFilterChange() {
    this.currentPage.set(1);
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.characters();

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(term));
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(c => c.status === this.selectedStatus);
    }

    if (this.selectedGender) {
      filtered = filtered.filter(c => c.gender === this.selectedGender);
    }

    if (this.selectedSpecies) {
      filtered = filtered.filter(c => c.species === this.selectedSpecies);
    }

    this.filteredCharacters.set(filtered);
    this.totalPages.set(Math.ceil(filtered.length / 20) || 1);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchSubject.next('');
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedGender = '';
    this.selectedSpecies = '';
    this.currentPage.set(1);
    this.searchSubject.next('');
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.searchTerm ||
      this.selectedStatus ||
      this.selectedGender ||
      this.selectedSpecies
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  paginatedCharacters = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * 20;
    return this.filteredCharacters().slice(start, start + 20);
  });

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];
    
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  });
}