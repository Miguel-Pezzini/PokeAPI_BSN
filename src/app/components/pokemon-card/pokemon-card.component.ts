import { Component, Input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [CommonModule, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent],
})
export class PokemonCardComponent{
  @Input() pokemon!: { name: string, id: string, types: Array<any> };
  constructor() { }

  capitalizeFirstLetter(text: string): string {
    if (!text) return ''; 
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
