import { EFFECT } from './effect.model';
import { RANK, Rank } from './rank.model';

interface Product {
  cost: number;
  effects: EFFECT[];
}

export enum BASE_PRODUCT {
  COCAINE = 'Cocaine',
  GRANDDADDY_PURPLE = 'Granddaddy Purple',
  GREEN_CRACK = 'Green Crack',
  METH = 'Meth',
  OG_KUSH = 'OG Kush',
  SOUR_DIESEL = 'Sour Diesel',
}

interface BaseProduct extends Product {
  name: BASE_PRODUCT;
  rank: Rank;
}

export const BASE_PRODUCT_LIST: BaseProduct[] = [
  {
    name: BASE_PRODUCT.OG_KUSH,
    rank: {
      name: RANK.STREET_RAT,
      lvl: 1,
    },
    cost: 30,
    effects: [EFFECT.CALMING],
  },
  {
    name: BASE_PRODUCT.SOUR_DIESEL,
    rank: {
      name: RANK.STREET_RAT,
      lvl: 5,
    },
    cost: 35,
    effects: [EFFECT.REFRESHING],
  },
  {
    name: BASE_PRODUCT.GREEN_CRACK,
    rank: {
      name: RANK.HOODLUM,
      lvl: 3,
    },
    cost: 40,
    effects: [EFFECT.ENERGIZING],
  },
  {
    name: BASE_PRODUCT.GRANDDADDY_PURPLE,
    rank: {
      name: RANK.HOODLUM,
      lvl: 5,
    },
    cost: 45,
    effects: [EFFECT.SEDATING],
  },
];
