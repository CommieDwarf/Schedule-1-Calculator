export enum EFFECT {
    ANTI_GRAVITY = "Anti-Gravity",
    ATHLETIC = "Athletic",
    BALDING = "Balding",
    BRIGHT_EYED = "Bright-Eyed",
    CALMING = "Calming",
    CALORIE_DENSE = "Calorie-Dense",
    CYCLOPEAN = "Cyclopean",
    DISORIENTING = "Disorienting",
    ELECTRIFYING = "Eletrifying",
    ENERGIZING = "Energizing",
    EUPHORIC = "Euphoric",
    EXPLOSIVE = "Explosive",
    FOCUSED = "Focused",
    FOGGY = "Foggy",
    GINGERITIS = "Gingeritis",
    GLOWING = "Glowing",
    JENNERISING = "Jennerising",
    LAXATIVE = "Laxative",
    LONG_FACED = "Long Faced",
    MUNCHIES = "Munchies",
    PARANOIA = "Paranoia",
    REFRESHING = "Refreshing",
    SCHIZOPHRENIA = "Schizophrenia",
    SEDATING = "Sedating",
    SEIZURE_INDUCING  = "Seizure Inducing",
    SHRINKING = "Shrinking",
    SLIPPERY = "Slippery",
    SMELLY = "Smelly",
    SNEAKY = "Sneaky",
    SPICY = "Spicy",
    THOUGHT_PROVOKING = "Tought Provoking",
    TOXIC = "Toxic",
    TROPIC_THUNDER = "Tropic Thunder",
    ZOMBIFYING = "Zombifying"
}


export interface Effect {
    name: EFFECT,
    multiplier: number,
    color: string,
}

export const EFFECT_LIST: Effect[] = [
    {
        name: EFFECT.ANTI_GRAVITY,
        multiplier: 0.54,
        color: "#235bcb",
    },
    {
        name: EFFECT.ATHLETIC,
        multiplier: 0.32,
        color: "#75c8fd",
    },
    {
        name: EFFECT.BALDING,
        multiplier: 0.30,
        color: "#c79232",
    },
    {
        name: EFFECT.BRIGHT_EYED,
        multiplier: 0.40,
        color: "#bef7fd",
    },
    {
        name: EFFECT.CALMING,
        multiplier: 0.10,
        color: "#fed09b"
    },
    {
        name: EFFECT.CALORIE_DENSE,
        multiplier: 0.28,
        color: "#fe84f4",
    },
    {
        name: EFFECT.CYCLOPEAN,
        multiplier: 0.56,
        color: "#fec174"
    },
    {
        name: EFFECT.DISORIENTING,
        multiplier: 0,
        color: "#fe7551",
    },
    {
        name: EFFECT.ELECTRIFYING,
        multiplier: 0.50,
        color: "#55c8fd",
    },
    {
        name: EFFECT.ENERGIZING,
        multiplier: 0.22,
        color: "#9afe6d",
    },
    {
        name: EFFECT.EUPHORIC,
        multiplier: 0.18,
        color: "#feee74"
    },
    {
        name: EFFECT.EXPLOSIVE,
        multiplier: 0,
        color: "#fe4b40",
    },
    {
        name: EFFECT.FOCUSED,
        multiplier: 0.16,
        color: "#75f1fd",
    },
    {
        name: EFFECT.FOGGY,
        multiplier: 0.36,
        color: "#b0b0af",
    },
    {
        name: EFFECT.GINGERITIS,
        multiplier: 0.20,
        color: "#fe8829",
    },
    {
        name: EFFECT.GLOWING,
        multiplier: 0.48,
        color: "#85e459",
    },
    {
        name: EFFECT.JENNERISING,
        multiplier: 0.42,
        color: "#fe8df8",
    },
    {
        name: EFFECT.LAXATIVE,
        multiplier: 0,
        color: "#763c25",
    },
    {
        name: EFFECT.LONG_FACED,
        multiplier: 0.52,
        color: "#fed961",
    },
    {
        name: EFFECT.MUNCHIES,
        multiplier: 0.12,
        color: "#c96e57",
    },
    {
        name: EFFECT.PARANOIA,
        multiplier: 0,
        color: "#c46762"
    },
    {
        name: EFFECT.REFRESHING,
        multiplier: 0.14,
        color: "#b2fe98",
    },
    {
        name: EFFECT.SCHIZOPHRENIA,
        multiplier: 0,
        color: "#645afd",
    },
    {
        name: EFFECT.SEDATING,
        multiplier: 0.26,
        color: "#6b5fd8"
    },
    {
        name: EFFECT.SEIZURE_INDUCING,
        multiplier: 0,
        color: "#fee900"
    },
    {
        name: EFFECT.SHRINKING,
        multiplier: 0.60,
        color: "#b6feda",
    },
    {
        name: EFFECT.SLIPPERY,
        multiplier: 0.34,
        color: "#a2dffd",
    },
    {
        name: EFFECT.SMELLY,
        multiplier: 0,
        color: "#7dbc31",
    },
    {
        name: EFFECT.SNEAKY,
        multiplier: 0.24,
        color: "#7b7b7b",
    },
    {
        name: EFFECT.SPICY,
        multiplier: 0.38,
        color: "#fe6b4c",
    },
    {
        name: EFFECT.THOUGHT_PROVOKING,
        multiplier: 0.44,
        color: "#fea0cb",
    },
    {
        name: EFFECT.TOXIC,
        multiplier: 0,
        color: "#5f9a31",
    },
    {
        name: EFFECT.TROPIC_THUNDER,
        multiplier: 0.46,
        color: "#fe9f47",
    },
    {
        name: EFFECT.ZOMBIFYING,
        multiplier: 0.58,
        color: "#71ab5d",
    }
]


const EFFECTS = new Map<EFFECT, Effect>();

EFFECT_LIST.forEach((effect) => {
    Object.freeze(effect);
    EFFECTS.set(effect.name, effect);
})

export { EFFECTS };

