import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(offset: number = 0, limit: number = 10): Observable<any[]> {
    return this.http.get<any>(`${this.apiURL}?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results)
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${name}`);
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }
}