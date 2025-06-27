import { BASE_PRODUCT, BaseProduct } from '@core/models/Product.model';
import { INGREDIENT, Ingredient } from '@core/models/ingredient.model';
import { effect, Injectable, signal } from '@angular/core';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Effect, EFFECT } from '@core/models/effect.model';
import { INGREDIENT_MAP } from '@core/constants/ingredients.constant';
import { EFFECT_MAP } from '@core/constants/effects.constant';
import { BASE_PRODUCT_MAP } from '@core/constants/product.constant';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public readonly ingredientList = signal<Ingredient[]>([]);
  public readonly baseProduct = signal<BaseProduct | undefined>(undefined);
  public readonly effects = signal<Effect[]>([]);
  public readonly sellPrice = signal<number>(0);

  private readonly INGREDIENTS_MAP = INGREDIENT_MAP;
  private readonly EFFECT_MAP = EFFECT_MAP;
  private readonly BASE_PRODUCT_MAP = BASE_PRODUCT_MAP;

  constructor() {
    effect(() => {
      // to sie zateguje
      const _ = this.ingredientList();
      const _2 = this.baseProduct();
      this.calculate();
    });
  }

  public setProduct(product: BaseProduct | BASE_PRODUCT) {
    if (typeof product === 'string') {
      this.baseProduct.set(this.getBaseProduct(product));
    } else {
      this.baseProduct.set(product);
    }
  }

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

  private calculate(): void {
    const baseProduct = this.baseProduct();
    if (!baseProduct) {
      return;
    }
    this.effects.set(
      Array.from(this.calcEffects(baseProduct, this.ingredientList())),
    );
    this.sellPrice.set(this.calcPrice(baseProduct, this.effects()));
  }

  private calcCost(ingredients: Ingredient[]) {}

  private calcPrice(baseProduct: BaseProduct, effects: Effect[]): number {
    const totalMultiplier = effects
      .map((effect) => effect.multiplier)
      .reduce((acc, multiplier) => acc + multiplier);

    return Math.round(baseProduct.basePrice * (1 + totalMultiplier));
  }

  private calcEffects(
    baseProduct: BaseProduct,
    ingredients: Ingredient[],
  ): Set<Effect> {
    let effects: Set<Effect> = new Set([
      ...baseProduct.effects.map((effect) => this.getEffect(effect)),
    ]);
    ingredients.forEach((ingredient) => {
      effects = this.replaceEffects(effects, ingredient);
    });

    return effects;
  }

  private replaceEffects(effects: Set<Effect>, ingredient: Ingredient) {
    const newEffects = new Set<Effect>();

    for (const effect of effects) {
      const replacement = ingredient.replacesEffects[effect.name as EFFECT];
      newEffects.add(replacement ? this.getEffect(replacement) : effect);
    }

    newEffects.add(this.getEffect(ingredient.baseEffect));
    return newEffects;
  }

  private getEffect(effect: EFFECT) {
    const ef = this.EFFECT_MAP.get(effect);
    if (!ef) {
      throw new Error(`${effect} is missing in EFFECT_MAP`);
    }
    return ef;
  }
  private getIngredient(ingredient: INGREDIENT) {
    const ing = this.INGREDIENTS_MAP.get(ingredient);
    if (!ing) {
      throw new Error(`${effect} is missing in INGREDIENTS_MAP`);
    }
    return ing;
  }
  private getBaseProduct(baseProduct: BASE_PRODUCT) {
    const bProduct = this.BASE_PRODUCT_MAP.get(baseProduct);
    if (!bProduct) {
      throw new Error(`${effect} is missing in BASE_PRODUCT_MAP`);
    }
    return bProduct;
  }
}
