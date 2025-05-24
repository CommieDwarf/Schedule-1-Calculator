import { Component, input } from '@angular/core';
import { Mix } from '@core/models/mix.model';

@Component({
  selector: 'app-mix',
  imports: [],
  templateUrl: './mix.component.html',
  styleUrl: './mix.component.scss',
})
export class MixComponent {
  mix = input.required<Mix>();

  get productImgPath() {
    //TODO: zrób może pipe do nazw plików ikon
    const imgFileName = `${this.mix().product.replace(" ", "_")}_Icon.webp`;
    return `img/product/${imgFileName}`;
  }

  constructor() {}
}
