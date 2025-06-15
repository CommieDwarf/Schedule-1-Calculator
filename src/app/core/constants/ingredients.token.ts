import { InjectionToken } from '@angular/core';
import { Ingredient } from '@core/models/ingredient.model';
import { INGREDIENTS } from '@core/constants/ingredients.constant';

export const INGREDIENTS_TOKEN = new InjectionToken<Ingredient[]>(
  'Ingredients constant',
);

export const INGREDIENTS_PROVIDER = {
  provide: INGREDIENTS_TOKEN,
  useValue: INGREDIENTS.map((ingredient) => ingredient),
};
