import { Component, inject, signal } from '@angular/core';
import { IngredientList } from '@features/calculator/ingredient-list/ingredient-list.component';
import { CalculatorService } from './calculator.service';
import { INGREDIENTS_TOKEN } from '@core/constants/ingredients.token';
import { Ingredient as IngredientModel } from '@core/models/ingredient.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';

@Component({
  selector: 'app-calculator',
  imports: [IngredientList],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
  providers: [CalculatorService],
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  readonly baseIngredients = inject(INGREDIENTS_TOKEN);

  readonly currentMix = this.calculatorService.mixList;

  baseIngredientsDropDisabled = signal(false);

  constructor() {}

  onCurrentMixDragStart() {
    this.baseIngredientsDropDisabled.set(true);
    console.log('Start');
  }

  onCurrentMixDragEnd() {
    this.baseIngredientsDropDisabled.set(false);
  }

  onIngredientDrop(event: CdkDragDrop<IngredientModel[]>) {
    console.log('DROP');
    const ingredient = event.previousContainer.data[event.previousIndex];
    if (!event.isPointerOverContainer) {
      this.calculatorService.removeIngredient(ingredient);
    } else if (event.previousContainer.id === event.container.id) {
      this.calculatorService.changeOrder(
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      this.calculatorService.addIngredient(ingredient, event.currentIndex);
    }
  }

  onAllIngredientsDrop(event: CdkDragDrop<IngredientModel[]>) {
    if (event.container !== event.previousContainer) {
      this.calculatorService.removeIngredient(
        event.previousContainer.data[event.previousIndex],
      );
    }
  }

  protected readonly MAX_INGREDIENTS_IN_MIX_AMOUNT =
    MAX_INGREDIENTS_IN_MIX_AMOUNT;
}
