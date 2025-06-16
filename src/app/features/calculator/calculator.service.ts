import { BASE_PRODUCT } from '@core/models/Product.model';
import { Ingredient } from '@core/models/ingredient.model';
import { Injectable, signal } from '@angular/core';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';
import { transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable()
export class CalculatorService {
  private _ingredientList = signal<Ingredient[]>([]);

  get ingredientList() {
    return this._ingredientList;
  }

  constructor() {}

  addProduct(product: BASE_PRODUCT) {}

  addIngredient(ingredient: Ingredient, index: number) {
    if (this._ingredientList().length >= MAX_INGREDIENTS_IN_MIX_AMOUNT) {
      return;
    }
    this._ingredientList.update((prev) => {
      return [
        ...prev.slice(0, index),
        { ...ingredient },
        ...prev.slice(index, prev.length),
      ];
    });
  }

  changeIngredientOrder(prevIndex: number, currentIndex: number) {
    this._ingredientList.update((prev) => {
      const newList = [...prev];
      transferArrayItem(newList, newList, prevIndex, currentIndex);
      return newList;
    });
  }

  removeIngredient(ingredient: Ingredient) {
    this._ingredientList.update((prev) =>
      prev.filter((ing) => ing !== ingredient),
    );
  }

  resetIngredientList() {
    this._ingredientList.set([]);
  }
}
