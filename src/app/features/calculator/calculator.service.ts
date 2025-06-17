import { BASE_PRODUCT } from '@core/models/Product.model';
import { Ingredient } from '@core/models/ingredient.model';
import { Injectable, signal } from '@angular/core';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable()
export class CalculatorService {
  public readonly ingredientList = signal<Ingredient[]>([]);

  constructor() {}

  public addProduct(product: BASE_PRODUCT) {}

  public addIngredient(ingredient: Ingredient, index: number): void {
    if (this.ingredientList().length >= MAX_INGREDIENTS_IN_MIX_AMOUNT) {
      return;
    }
    this.ingredientList.update((prev) => {
      return [
        ...prev.slice(0, index),
        { ...ingredient },
        ...prev.slice(index, prev.length),
      ];
    });
  }

  public reorderIngredient(prevIndex: number, currentIndex: number): void {
    this.ingredientList.update((prev) => {
      const newList = [...prev];
      transferArrayItem(newList, newList, prevIndex, currentIndex);
      return newList;
    });
  }

  public removeIngredient(ingredient: Ingredient): void {
    this.ingredientList.update((prev) =>
      prev.filter((ing) => ing !== ingredient),
    );
  }

  public resetIngredientList(): void {
    this.ingredientList.set([]);
  }
}
