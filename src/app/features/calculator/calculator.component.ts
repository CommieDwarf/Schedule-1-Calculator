import { Component, inject, Signal } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { RecipeBuilderComponent } from '@features/calculator/recipe-builder/recipe-builder.component';
import { BASE_PRODUCT } from '@core/models/Product.model';
import { Effect } from '@core/models/effect.model';

@Component({
  selector: 'app-calculator',
  imports: [RecipeBuilderComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [],
})
export class CalculatorComponent {
  private readonly calcService = inject(CalculatorService);

  constructor() {
    this.calcService.setProduct(BASE_PRODUCT.OG_KUSH);
  }

  get sellPrice(): Signal<number> {
    return this.calcService.sellPrice;
  }

  get effects(): Signal<Effect[]> {
    return this.calcService.effects;
  }
}
