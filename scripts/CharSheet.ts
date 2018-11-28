enum BonusType {
    Enhancement = "ENHANCEMENT",
    Dodge = "DODGE",
    Deflection = "DEFLECTION",
    Size = "SIZE",
    Temp = "TEMP",
    Morale = "MORALE"
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
    DamageReduction = "DR"
}

interface ValueBonus {
    affectedStat: StatType,
    bonusType: BonusType,
    bonusAmount: Number,
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
    baseStrength: Number;
    getTotalStrength() {

    };
    baseDexterity: Number;
    getTotalDexterity() {

    };
    baseConstitution: Number;
    getTotalConstitution() {

    };
    baseIntelligence: Number;
    getTotalIntelligence() {

    };
    baseWisdom: Number;
    getTotalWisdom() {

    };
    baseCharisma: Number;
    getTotalCharisma() {

    };
    //Initiative
    baseInitiative: Number;
    getTotalInitiative() {

    };
    //Combat Manoeuvres
    baseCMB: Number;
    getTotalCMB() {

    };
    baseCMD: Number;
    getTotalCMD() {

    };
    getFlatFootedCMD() {

    };
    //Armour Class
    baseAC: Number;
    getTotalAC() {

    };
    getFlatFootedAC() {

    };
    getTouchAC() {

    };
    //Hit Points
    maxHP: Number;
    currentHP: Number;
    tempHP: Number;
    nonLethalHP: Number;
    //Saves
    baseFortSave: Number;
    getTotalFortSave() {

    };
    baseReflexSave: Number;
    getTotalReflexSave() {

    };
    baseWillSave: Number;
    getTotalWillSave() {

    };
    //Resists
    baseSpellRes: Number;
    getTotalSpellRes() {

    }
    baseDR: Number;
    getTotalDR() {

    }


}