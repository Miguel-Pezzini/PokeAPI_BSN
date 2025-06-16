import { Component, OnInit  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonGrid, IonContent, IonRow, IonCol } from '@ionic/angular/standalone';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, PokemonCardComponent],
})
export class HomePage implements OnInit {
 pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

   ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
  this.pokemonService.getPokemons(0, 20).pipe(
    switchMap(results => {
      const detailsObservables = results.map(pokemon =>
        this.pokemonService.getPokemonDetails(pokemon.name)
      );
      return forkJoin(detailsObservables);
    })
  ).subscribe({
    next: (detailedPokemons) => {
      this.pokemons = detailedPokemons;
    },
    error: (err) => {
      console.error('Erro ao carregar detalhes dos pokémons:', err);
    }
  });
}
}
