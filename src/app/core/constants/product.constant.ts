import { BASE_PRODUCT, BaseProduct } from '@core/models/Product.model';
import { RANK } from '@core/models/rank.model';
import { EFFECT } from '@core/models/effect.model';

// Partial un till rest is implemented
export const BASE_PRODUCTS: Partial<Record<BASE_PRODUCT, BaseProduct>> = {
  [BASE_PRODUCT.OG_KUSH]: {
    name: BASE_PRODUCT.OG_KUSH,
    rank: {
      name: RANK.STREET_RAT,
      lvl: 1,
    },
    basePrice: 35,
    cost: 30,
    effects: [EFFECT.CALMING],
  },
  [BASE_PRODUCT.SOUR_DIESEL]: {
    name: BASE_PRODUCT.SOUR_DIESEL,
    rank: {
      name: RANK.STREET_RAT,
      lvl: 5,
    },
    cost: 35,
    basePrice: 40,
    effects: [EFFECT.REFRESHING],
  },
  [BASE_PRODUCT.GREEN_CRACK]: {
    name: BASE_PRODUCT.GREEN_CRACK,
    rank: {
      name: RANK.HOODLUM,
      lvl: 3,
    },
    cost: 40,
    basePrice: 35,
    effects: [EFFECT.ENERGIZING],
  },
  [BASE_PRODUCT.GRANDDADDY_PURPLE]: {
    name: BASE_PRODUCT.GRANDDADDY_PURPLE,
    rank: {
      name: RANK.HOODLUM,
      lvl: 5,
    },
    cost: 45,
    basePrice: 35,
    effects: [EFFECT.SEDATING],
  },
};

export const BASE_PRODUCT_MAP = new Map<BASE_PRODUCT, BaseProduct>(
  Object.entries(BASE_PRODUCTS) as [BASE_PRODUCT, BaseProduct][],
);
