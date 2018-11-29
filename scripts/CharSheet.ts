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
    baseStrength: number = 0;
    additionalStrength: number = 0;
    tempStrength: number = 0;
    getStrengthBonus = (): number => {
        return Math.floor((this.baseStrength + this.additionalStrength + this.tempStrength - 10) / 2);
    };
    baseDexterity: number = 0;
    additionalDexterity: number = 0;
    tempDexterity: number = 0;
    getDexterityBonus = (): number => {
        return Math.floor((this.baseDexterity + this.additionalDexterity + this.tempDexterity - 10) / 2);
    };
    baseConstitution: number = 0;
    additionalConstitution: number = 0;
    tempConstitution: number = 0;
    getConstitutionBonus = (): number => {
        return Math.floor((this.baseConstitution + this.additionalConstitution + this.tempConstitution - 10) / 2);
    };
    baseIntelligence: number = 0;
    additionalIntelligence: number = 0;
    tempIntelligence: number = 0;
    getIntelligenceBonus = (): number => {
        return Math.floor((this.baseIntelligence + this.additionalIntelligence + this.tempIntelligence - 10) / 2);
    };
    baseWisdom: number = 0;
    additionalWisdom: number = 0;
    tempWisdom: number = 0;
    getWisdomBonus = (): number => {
        return Math.floor((this.baseWisdom + this.additionalWisdom + this.tempWisdom - 10) / 2);
    };
    baseCharisma: number = 0;
    additionalCharisma: number = 0;
    tempCharisma: number = 0;
    getCharismaBonus = (): number => {
        return Math.floor((this.baseCharisma + this.additionalCharisma + this.tempCharisma - 10) / 2);
    };
    //Initiative
    baseInitiative: number;
    getTotalInitiative() {

    };
    //Combat Manoeuvres
    baseCMB: number;
    getTotalCMB() {

    };
    baseCMD: number;
    getTotalCMD() {

    };
    getFlatFootedCMD() {

    };
    //Armour Class
    baseAC: number;
    getTotalAC() {

    };
    getFlatFootedAC() {

    };
    getTouchAC() {

    };
    //Hit Points
    maxHP: number;
    currentHP: number;
    tempHP: number;
    nonLethalHP: number;
    //Saves
    baseFortSave: number;
    getTotalFortSave() {

    };
    baseReflexSave: number;
    getTotalReflexSave() {

    };
    baseWillSave: number;
    getTotalWillSave() {

    };
}