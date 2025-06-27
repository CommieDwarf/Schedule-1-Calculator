import { Component, inject, signal } from '@angular/core';
import { IngredientList } from '@features/calculator/ingredient-list/ingredient-list.component';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';
import { CalculatorService } from '@features/calculator/calculator.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Ingredient as IngredientModel } from '@core/models/ingredient.model';
import { BASE_PRODUCT } from '@core/models/Product.model';
import { INGREDIENT_MAP } from '@core/constants/ingredients.constant';

@Component({
  selector: 'app-recipe-builder',
  imports: [IngredientList],
  templateUrl: './recipe-builder.component.html',
  styleUrl: './recipe-builder.component.scss',
})
export class RecipeBuilderComponent {
  private readonly calculatorService = inject(CalculatorService);
  protected readonly sourceIngredients = Array.from(INGREDIENT_MAP.values());
  protected readonly mixedIngredients = this.calculatorService.ingredientList;
  protected readonly sourceDragDisabled = signal(false);

  protected readonly BASE_PRODUCT = BASE_PRODUCT;

  protected readonly MAX_INGREDIENTS_IN_MIX_AMOUNT =
    MAX_INGREDIENTS_IN_MIX_AMOUNT;

  constructor() {}

  protected disableSourceDrag() {
    this.sourceDragDisabled.set(true);
  }

  protected enableSourceDrag() {
    this.sourceDragDisabled.set(false);
  }

  protected onIngredientDrop(event: CdkDragDrop<IngredientModel[]>) {
    const ingredient = event.previousContainer.data[event.previousIndex];
    if (!event.isPointerOverContainer) {
      this.calculatorService.removeIngredient(ingredient);
    } else if (event.previousContainer.id === event.container.id) {
      this.calculatorService.reorderIngredient(
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      this.calculatorService.addIngredient(ingredient, event.currentIndex);
    }
  }

  protected removeFromCurrentMix(event: CdkDragDrop<IngredientModel[]>) {
    if (event.container !== event.previousContainer) {
      this.calculatorService.removeIngredient(
        event.previousContainer.data[event.previousIndex],
      );
    }
  }
}
