import { EFFECT } from './effect.model';
import { Rank } from './rank.model';

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

export interface BaseProduct extends Product {
  name: BASE_PRODUCT;
  rank: Rank;
  basePrice: number;
}
