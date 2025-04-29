import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-substance',
  imports: [],
  templateUrl: './substance.component.html',
  styleUrl: './substance.component.scss'
})
export class Substance {

  name = input.required<string>();
  imgFilePath = computed(() => {
    const imgName = this.name().replace(" ", "_");
    return `img/substance/${imgName}_Icon.webp`;
  })
}
