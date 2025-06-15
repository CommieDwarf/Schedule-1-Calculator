export enum RANK {
  STREET_RAT = 'Street Rat',
  HOODLUM = 'Hodlum',
  PEDDLER = 'Peddler',
  HUSTLER = 'Hustler',
  BAGMAN = 'Bagman',
  ENFORCER = 'Enforcer',
  SHOT_CALLER = 'Shot Caller',
  BLOCK_BOSS = 'Block Boss',
  UNDERLORD = 'Underlord',
  BARON = 'Baron',
  KINGPIN_I_PLUS = 'Kingpin I +',
}

export interface Rank {
  name: RANK;
  lvl: number;
}
