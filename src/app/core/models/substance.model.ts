import { EFFECT } from './effect.model';

export enum SUBSTANCE {
  ADDY = 'Addy',
  BANANA = 'Banana',
  BATTERY = 'Battery',
  CHILI = 'Chili',
  CUKE = 'Cuke',
  DONUT = 'Donut',
  ENERGY_DRINK = 'Energy Drink',
  FLU_MEDICINE = 'Flu Medicine',
  GASOLINE = 'Gasoline',
  HORSE_SEMEN = 'Horse Semen',
  IODINE = 'Iodine',
  MEGA_BEAN = 'Mega Bean',
  MOTOR_OIL = 'Motor Oil',
  MOUTH_WASH = 'Mouth Wash',
  PARACETAMOL = 'Paracetamol',
  VIAGRA = 'Viagra',
}

export type ReplaceEffectMap = ReadonlyMap<EFFECT, EFFECT>;

export interface Substance {
  name: SUBSTANCE;
  effectReplaceMap: ReplaceEffectMap;
}

export const SUBSTANCES = Object.freeze(
  Object.values(SUBSTANCE).map((value) => {
    return {
      name: value,
    };
  }),
);
