import { BASE_PRODUCT, BaseProduct } from '@core/models/Product.model';
import { INGREDIENT, Ingredient } from '@core/models/ingredient.model';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { MAX_INGREDIENTS_IN_MIX_AMOUNT } from '@core/constants/game.constants';
import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Effect, EFFECT } from '@core/models/effect.model';
import { BASE_PRODUCTS_MAP_TOKEN } from '@core/constants/product.constant';
import { INGREDIENTS_MAP_TOKEN } from '@core/constants/ingredients.constant';
import { EFFECTS_MAP_TOKEN } from '@core/constants/effects.constant';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly INGREDIENTS_MAP = inject(INGREDIENTS_MAP_TOKEN);
  private readonly EFFECTS_MAP = inject(EFFECTS_MAP_TOKEN);
  private readonly BASE_PRODUCTS_MAP = inject(BASE_PRODUCTS_MAP_TOKEN);

  private readonly _ingredientList = signal<Ingredient[]>([]);
  private readonly _baseProduct = signal<BaseProduct>(
    this.getBaseProduct(BASE_PRODUCT.OG_KUSH),
  );
  private readonly _effects = signal<Effect[]>([]);
  private readonly _sellPrice = signal<number>(0);
  private readonly _cost = signal<number>(0);

  constructor() {
    effect(() => {
      // to sie zateguje
      const _ = this._ingredientList();
      const _2 = this._baseProduct();
      this.calculate();
    });
  }

  get ingredientList(): WritableSignal<Ingredient[]> {
    return this._ingredientList;
  }

  get baseProduct(): WritableSignal<BaseProduct | undefined> {
    return this._baseProduct;
  }

  get effects(): WritableSignal<Effect[]> {
    return this._effects;
  }

  get sellPrice(): WritableSignal<number> {
    return this._sellPrice;
  }

  get cost(): WritableSignal<number> {
    return this._cost;
  }

  public setProduct(product: BaseProduct | BASE_PRODUCT) {
    if (typeof product === 'string') {
      this._baseProduct.set(this.getBaseProduct(product));
    } else {
      this._baseProduct.set(product);
    }
  }

  public addIngredient(ingredient: Ingredient, index: number): void {
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

  public reorderIngredient(prevIndex: number, currentIndex: number): void {
    this._ingredientList.update((prev) => {
      const newList = [...prev];
      transferArrayItem(newList, newList, prevIndex, currentIndex);
      return newList;
    });
  }

  public removeIngredient(ingredient: Ingredient): void {
    this._ingredientList.update((prev) =>
      prev.filter((ing) => ing !== ingredient),
    );
  }

  public resetIngredientList(): void {
    this._ingredientList.set([]);
  }

  private calculate(): void {
    const baseProduct = this._baseProduct();
    if (!baseProduct) {
      return;
    }
    this._effects.set(
      Array.from(this.calcEffects(baseProduct, this._ingredientList())),
    );
    this._sellPrice.set(this.calcPrice(baseProduct, this._effects()));
    console.log('ingrtedients: ', this._ingredientList());
    this._cost.set(this.calcCost(this._ingredientList()));
  }

  private calcCost(ingredients: Ingredient[]) {
    return ingredients
      .map((ingredients) => ingredients.cost)
      .reduce((totalCost, cost) => totalCost + cost, 0);
  }

  private calcPrice(baseProduct: BaseProduct, effects: Effect[]): number {
    const totalMultiplier = effects
      .map((effect) => effect.multiplier)
      .reduce((acc, multiplier) => acc + multiplier, 0);

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
    const ef = this.EFFECTS_MAP.get(effect);
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
    const bProduct = this.BASE_PRODUCTS_MAP.get(baseProduct);
    if (!bProduct) {
      throw new Error(`${effect} is missing in BASE_PRODUCT_MAP`);
    }
    return bProduct;
  }
}
