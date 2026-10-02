import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, Episode, Location, ApiResponse } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse<Character>> {
    return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/character/?page=${page}`);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getEpisodes(page: number = 1): Observable<ApiResponse<Episode>> {
    return this.http.get<ApiResponse<Episode>>(`${this.baseUrl}/episode/?page=${page}`);
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`);
  }

  getLocations(page: number = 1): Observable<ApiResponse<Location>> {
    return this.http.get<ApiResponse<Location>>(`${this.baseUrl}/location/?page=${page}`);
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`);
  }

  searchCharacters(name: string): Observable<ApiResponse<Character>> {
    return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/character/?name=${name}`);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/character/${ids.join(',')}`);
  }
}