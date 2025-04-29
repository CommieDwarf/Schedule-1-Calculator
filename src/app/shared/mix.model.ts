import { SUBSTANCE } from "./substance.model";
import { Effect, EFFECT_LIST, EFFECTS } from "./effect.model";
import { BASE_PRODUCT } from "./Product.model";

export interface Mix {
    id: string,
    name: string,
    author: string,
    substances: SUBSTANCE[],
    product: BASE_PRODUCT
    cost: number,
    sell: number,
    //netProfit
    effects: Effect[],
    rank: string // temp,
}


export const DUMMY_MIXES: Mix[] = [
    {
        id: "abcd",
        name: "Specjał Dejnia",
        author: "Dejnio",
        substances: [SUBSTANCE.VIAGRA, SUBSTANCE.DONUT],
        product: BASE_PRODUCT.OG_KUSH,
        cost: 15,
        sell: 100,
        effects: EFFECT_LIST,
        rank: "peddler III",
    }, 
    {
        id: "qieruqwioruqw",
        name: "Specjał Dejnia",
        author: "Dejnio",
        substances: [SUBSTANCE.VIAGRA, SUBSTANCE.DONUT, SUBSTANCE.CUKE, SUBSTANCE.BANANA],
        product: BASE_PRODUCT.GRANDDADDY_PURPLE,
        cost: 15,
        sell: 120,
        effects: EFFECT_LIST,
        rank: "street rat III",
    }
]