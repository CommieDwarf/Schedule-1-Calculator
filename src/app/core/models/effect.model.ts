export enum EFFECT {
  ANTI_GRAVITY = 'Anti-Gravity',
  ATHLETIC = 'Athletic',
  BALDING = 'Balding',
  BRIGHT_EYED = 'Bright-Eyed',
  CALMING = 'Calming',
  CALORIE_DENSE = 'Calorie-Dense',
  CYCLOPEAN = 'Cyclopean',
  DISORIENTING = 'Disorienting',
  ELECTRIFYING = 'Eletrifying',
  ENERGIZING = 'Energizing',
  EUPHORIC = 'Euphoric',
  EXPLOSIVE = 'Explosive',
  FOCUSED = 'Focused',
  FOGGY = 'Foggy',
  GINGERITIS = 'Gingeritis',
  GLOWING = 'Glowing',
  JENNERISING = 'Jennerising',
  LAXATIVE = 'Laxative',
  LONG_FACED = 'Long Faced',
  MUNCHIES = 'Munchies',
  PARANOIA = 'Paranoia',
  REFRESHING = 'Refreshing',
  SCHIZOPHRENIA = 'Schizophrenia',
  SEDATING = 'Sedating',
  SEIZURE_INDUCING = 'Seizure Inducing',
  SHRINKING = 'Shrinking',
  SLIPPERY = 'Slippery',
  SMELLY = 'Smelly',
  SNEAKY = 'Sneaky',
  SPICY = 'Spicy',
  THOUGHT_PROVOKING = 'Tought Provoking',
  TOXIC = 'Toxic',
  TROPIC_THUNDER = 'Tropic Thunder',
  ZOMBIFYING = 'Zombifying',
}

export interface Effect {
  name: EFFECT;
  multiplier: number;
  color: string;
}
