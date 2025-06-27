import { EFFECT, Effect } from '@core/models/effect.model';

export const EFFECTS: Record<EFFECT, Effect> = {
  [EFFECT.ANTI_GRAVITY]: {
    name: EFFECT.ANTI_GRAVITY,
    multiplier: 0.54,
    color: '#235bcb',
  },
  [EFFECT.ATHLETIC]: {
    name: EFFECT.ATHLETIC,
    multiplier: 0.32,
    color: '#75c8fd',
  },
  [EFFECT.BALDING]: {
    name: EFFECT.BALDING,
    multiplier: 0.3,
    color: '#c79232',
  },
  [EFFECT.BRIGHT_EYED]: {
    name: EFFECT.BRIGHT_EYED,
    multiplier: 0.4,
    color: '#bef7fd',
  },
  [EFFECT.CALMING]: {
    name: EFFECT.CALMING,
    multiplier: 0.1,
    color: '#fed09b',
  },
  [EFFECT.CALORIE_DENSE]: {
    name: EFFECT.CALORIE_DENSE,
    multiplier: 0.28,
    color: '#fe84f4',
  },
  [EFFECT.CYCLOPEAN]: {
    name: EFFECT.CYCLOPEAN,
    multiplier: 0.56,
    color: '#fec174',
  },
  [EFFECT.DISORIENTING]: {
    name: EFFECT.DISORIENTING,
    multiplier: 0,
    color: '#fe7551',
  },
  [EFFECT.ELECTRIFYING]: {
    name: EFFECT.ELECTRIFYING,
    multiplier: 0.5,
    color: '#55c8fd',
  },
  [EFFECT.ENERGIZING]: {
    name: EFFECT.ENERGIZING,
    multiplier: 0.22,
    color: '#9afe6d',
  },
  [EFFECT.EUPHORIC]: {
    name: EFFECT.EUPHORIC,
    multiplier: 0.18,
    color: '#feee74',
  },
  [EFFECT.EXPLOSIVE]: {
    name: EFFECT.EXPLOSIVE,
    multiplier: 0,
    color: '#fe4b40',
  },
  [EFFECT.FOCUSED]: {
    name: EFFECT.FOCUSED,
    multiplier: 0.16,
    color: '#75f1fd',
  },
  [EFFECT.FOGGY]: {
    name: EFFECT.FOGGY,
    multiplier: 0.36,
    color: '#b0b0af',
  },
  [EFFECT.GINGERITIS]: {
    name: EFFECT.GINGERITIS,
    multiplier: 0.2,
    color: '#fe8829',
  },
  [EFFECT.GLOWING]: {
    name: EFFECT.GLOWING,
    multiplier: 0.48,
    color: '#85e459',
  },
  [EFFECT.JENNERISING]: {
    name: EFFECT.JENNERISING,
    multiplier: 0.42,
    color: '#fe8df8',
  },
  [EFFECT.LAXATIVE]: {
    name: EFFECT.LAXATIVE,
    multiplier: 0,
    color: '#763c25',
  },
  [EFFECT.LONG_FACED]: {
    name: EFFECT.LONG_FACED,
    multiplier: 0.52,
    color: '#fed961',
  },
  [EFFECT.MUNCHIES]: {
    name: EFFECT.MUNCHIES,
    multiplier: 0.12,
    color: '#c96e57',
  },
  [EFFECT.PARANOIA]: {
    name: EFFECT.PARANOIA,
    multiplier: 0,
    color: '#c46762',
  },
  [EFFECT.REFRESHING]: {
    name: EFFECT.REFRESHING,
    multiplier: 0.14,
    color: '#b2fe98',
  },
  [EFFECT.SCHIZOPHRENIA]: {
    name: EFFECT.SCHIZOPHRENIA,
    multiplier: 0,
    color: '#645afd',
  },
  [EFFECT.SEDATING]: {
    name: EFFECT.SEDATING,
    multiplier: 0.26,
    color: '#6b5fd8',
  },
  [EFFECT.SEIZURE_INDUCING]: {
    name: EFFECT.SEIZURE_INDUCING,
    multiplier: 0,
    color: '#fee900',
  },
  [EFFECT.SHRINKING]: {
    name: EFFECT.SHRINKING,
    multiplier: 0.6,
    color: '#b6feda',
  },
  [EFFECT.SLIPPERY]: {
    name: EFFECT.SLIPPERY,
    multiplier: 0.34,
    color: '#a2dffd',
  },
  [EFFECT.SMELLY]: {
    name: EFFECT.SMELLY,
    multiplier: 0,
    color: '#7dbc31',
  },
  [EFFECT.SNEAKY]: {
    name: EFFECT.SNEAKY,
    multiplier: 0.24,
    color: '#7b7b7b',
  },
  [EFFECT.SPICY]: {
    name: EFFECT.SPICY,
    multiplier: 0.38,
    color: '#fe6b4c',
  },
  [EFFECT.THOUGHT_PROVOKING]: {
    name: EFFECT.THOUGHT_PROVOKING,
    multiplier: 0.44,
    color: '#fea0cb',
  },
  [EFFECT.TOXIC]: {
    name: EFFECT.TOXIC,
    multiplier: 0,
    color: '#5f9a31',
  },
  [EFFECT.TROPIC_THUNDER]: {
    name: EFFECT.TROPIC_THUNDER,
    multiplier: 0.46,
    color: '#fe9f47',
  },
  [EFFECT.ZOMBIFYING]: {
    name: EFFECT.ZOMBIFYING,
    multiplier: 0.58,
    color: '#71ab5d',
  },
};

export const EFFECT_MAP = new Map<EFFECT, Effect>(
  Object.entries(EFFECTS) as [EFFECT, Effect][],
);
