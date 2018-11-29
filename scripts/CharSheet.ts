enum BonusType {
    Enhancement = "ENHANCEMENT",
    Dodge = "DODGE",
    Deflection = "DEFLECTION",
    Size = "SIZE",
    Temp = "TEMP",
    Morale = "MORALE"
}

enum EnergyType {
    Fire = "FIRE",
    Acid = "ACID",
    Lightning = "Lightning",
}

enum StatType {
    Strength = "STR",
    Dexterity = "DEX",
    Constitution = "CON",
    Intelligence = "INT",
    Wisdom = "WIS",
    Charisma = "CHA",
    Skill = "SKILL",
    ClassLevel = "CLASSLEVEL",
    Initiative = "INITIATIVE",
    Speed = "SPEED",
    BaseAttackBonus = "BAB",
    CombatMnvrBonus = "CMB",
    CombatMnvrDefence = "CMD",
    FortitudeSave = "FORTITUDE",
    ReflexSave = "REFLEX",
    WillSave = "WILL",
    HitPoints = "HP",
    ArmourClass = "AC",
    SpellResistance = "SPELLRES",
    DamageReduction = "DR",
    EnergyResistance = "ER"
}

interface ValueBonus {
    affectedStat: StatType,
    bonusType: BonusType,
    bonusAmount: number,
}

class Equipment {
    name: string;
    description: string;
    bonuses: ValueBonus[];

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        this.name = name;
        this.description = description;
        this.bonuses = bonuses;
    }
}

export class CharacterSheet {
    //Ability Scores
    baseStrength: number = 10;
    additionalStrength: number = 0;
    tempStrength: number = 0;
    calcStrengthBonus = (): number => {
        return Math.floor((this.baseStrength + this.additionalStrength + this.tempStrength - 10) / 2);
    };
    baseDexterity: number = 10;
    additionalDexterity: number = 0;
    tempDexterity: number = 0;
    calcDexterityBonus = (): number => {
        return Math.floor((this.baseDexterity + this.additionalDexterity + this.tempDexterity - 10) / 2);
    };
    baseConstitution: number = 10;
    additionalConstitution: number = 0;
    tempConstitution: number = 0;
    calcConstitutionBonus = (): number => {
        return Math.floor((this.baseConstitution + this.additionalConstitution + this.tempConstitution - 10) / 2);
    };
    baseIntelligence: number = 10;
    additionalIntelligence: number = 0;
    tempIntelligence: number = 0;
    calcIntelligenceBonus = (): number => {
        return Math.floor((this.baseIntelligence + this.additionalIntelligence + this.tempIntelligence - 10) / 2);
    };
    baseWisdom: number = 10;
    additionalWisdom: number = 0;
    tempWisdom: number = 0;
    calcWisdomBonus = (): number => {
        return Math.floor((this.baseWisdom + this.additionalWisdom + this.tempWisdom - 10) / 2);
    };
    baseCharisma: number = 10;
    additionalCharisma: number = 0;
    tempCharisma: number = 0;
    calcCharismaBonus = (): number => {
        return Math.floor((this.baseCharisma + this.additionalCharisma + this.tempCharisma - 10) / 2);
    };
    //Initiative
    featInitiative: number = 0;
    trainingInitiative: number = 0;
    miscInitiative: number = 0;
    calcInitiative = (): number => {
        return this.calcDexterityBonus() + this.featInitiative + this.trainingInitiative + this.miscInitiative;
    };
    //Armour Class
    armourAC: number = 0;
    shieldAC: number = 0;
    naturalAC: number = 0;
    calcAC = (): number => {
        return 10 + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier
            + this.armourAC + this.shieldAC + this.naturalAC + this.sizeModifier;
    };
    calcFlatFootedAC = (): number => {
        return 10 + this.deflectionModifier + this.armourAC + this.shieldAC + this.naturalAC + this.sizeModifier;
    };
    calcTouchAC = (): number => {
        return 10 + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier + this.sizeModifier;
    };
    //Combat Manoeuvres
    miscCMB: number = 0;
    calcCMB = (): number => {
        return this.calcStrengthBonus() + this.baseAttackBonus - this.sizeModifier + this.miscCMB;
    };
    miscCMD: number = 0;
    calcCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier
            + this.baseAttackBonus - this.sizeModifier + this.miscCMD;
    };
    calcFlatFootedCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.deflectionModifier + this.baseAttackBonus - this.sizeModifier + this.miscCMD;
    };
    //Hit Points
    maxHP: number = 0;
    currentHP: number = 0;
    tempHP: number = 0;
    nonLethalHP: number = 0;
    //BAB
    baseAttackBonus: number = 0;
    calcMeleeAttackBonus = (): number => {
        return this.baseAttackBonus + this.calcStrengthBonus();
    };
    calcRangedAttackBonus = (): number => {
        return this.baseAttackBonus + this.calcDexterityBonus();
    };
    attackMoraleBonus: number = 0;
    attackBuffs: number = 0;
    attackNerfs: number = 0;
    calcTempAttackBonus = (): number => {
        return this.attackMoraleBonus + this.attackBuffs - this.attackNerfs;
    };
    damageMoraleBonus: number = 0;
    damageBuffs: number = 0;
    damageNerfs: number = 0;
    calcTempDamageBonus = (): number => {
        return this.damageMoraleBonus + this.damageBuffs - this.damageNerfs;
    }
    //modifiers
    dodgeModifier: number = 0;
    deflectionModifier: number = 0;
    sizeModifier: number = 0;
    //Saves
    baseFortSave: number = 0;
    racialFortSave: number = 0;
    miscFortSave: number = 0;
    tempFortSave: number = 0;
    calcFortSave = (): number => {
        return this.baseFortSave + this.calcConstitutionBonus() + this.racialFortSave + this.miscFortSave + this.tempFortSave;
    };
    baseReflexSave: number = 0;
    racialReflexSave: number = 0;
    miscReflexSave: number = 0;
    tempReflexSave: number = 0;
    calcReflexSave = (): number => {
        return this.baseReflexSave + this.calcDexterityBonus() + this.racialReflexSave + this.miscReflexSave + this.tempReflexSave;
    };
    baseWillSave: number = 0;
    racialWillSave: number = 0;
    miscWillSave: number = 0;
    tempWillSave: number = 0;
    calcWillSave = (): number => {
        return this.baseWillSave + this.calcWisdomBonus() + this.racialWillSave + this.miscWillSave + this.tempWillSave;
    };
}