import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss',
})
export class Ingredient {
  name = input.required<string>();

  imgFilePath = computed(() => {
    const imgName = this.name().replace(' ', '_');
    return `img/ingredient/${imgName}_Icon.webp`;
  });
}
