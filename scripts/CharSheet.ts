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

enum Alignment {
    LawfulGood,
    LawfulNeutral,
    LawfulEvil,
    NeutralGood,
    TrueNeutral,
    NeutralEvil,
    ChaoticGood,
    ChaoticNeutral,
    ChaoticEvil
}

enum Gender {
    Male,
    Female,
    Other
}

enum Size {
    Small,
    Medium,
    Large
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

interface SavedCharacter {
    characterName?: string,
    alignment?: Alignment,
    gender?: Gender,
    race?: string,
    size?: Size,
    baseStrength?: number,
    additionalStrength?: number,
    tempStrength?: number,
    baseDexterity?: number,
    additionalDexterity?: number,
    tempDexterity?: number,
    baseConstitution?: number,
    additionalConstitution?: number,
    tempConstitution?: number,
    baseIntelligence?: number,
    additionalIntelligence?: number,
    tempIntelligence?: number,
    baseWisdom?: number,
    additionalWisdom?: number,
    tempWisdom?: number,
    baseCharisma?: number,
    additionalCharisma?: number,
    tempCharisma?: number,
    featInitiative?: number,
    trainingInitiative?: number,
    miscInitiative?: number,
    armourAC?: number,
    shieldAC?: number,
    naturalAC?: number,
    tempAC?: number,
    spellRes?: number,
    miscCMB?: number,
    tempCMB?: number,
    miscCMD?: number,
    tempCMD?: number,
    maxHP?: number,
    currentHP?: number,
    tempHP?: number,
    nonLethalHP?: number,
    damageReduction?: string,
    energyRes?: string,
    baseAttackBonus?: number,
    attackMoraleBonus?: number,
    attackBuffs?: number,
    attackNerfs?: number,
    damageMoraleBonus?: number,
    damageBuffs?: number,
    damageNerfs?: number,
    dodgeModifier?: number,
    deflectionModifier?: number,
    sizeModifier?: number,
    baseFortSave?: number,
    racialFortSave?: number,
    miscFortSave?: number,
    tempFortSave?: number,
    baseReflexSave?: number,
    racialReflexSave?: number,
    miscReflexSave?: number,
    tempReflexSave?: number,
    baseWillSave?: number,
    racialWillSave?: number,
    miscWillSave?: number,
    tempWillSave?: number,
    armourPenalty?: number,
    skills?: {
        [name: string]: {
            isClassSkill: boolean,
            ranks: number,
            racialBonus: number,
            featBonus: number,
            miscBonus: number
        };
    },
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

export class Skill {
    isClassSkill: boolean = false;
    ranks: number = 0;
    racialBonus: number = 0;
    featBonus: number = 0;
    miscBonus: number = 0;

    constructor(
        readonly trained: boolean,
        readonly abilityBonus: () => number,
        readonly armourPenalty: () => number = () => { return 0; }) { }

    calcSkillBonus = (): number => {
        if (this.trained && this.ranks === 0) return null;

        return this.abilityBonus() + (this.isClassSkill && this.ranks > 0 ? 3 : 0) + this.ranks + this.racialBonus + this.featBonus
            + this.miscBonus + this.armourPenalty(); //expecting this be be negative, so we want to add
    }
}

export class CharacterSheet {
    save = (): SavedCharacter => {
        var characterObj: SavedCharacter = {};
        for (let prop of Object.keys(this)) {
            if (prop === "skills" || typeof this[prop] === "function")
                continue;

            characterObj[prop] = this[prop];
        }

        characterObj.skills = {}
        for (let name of Object.keys(this.skills)) {
            let skill: Skill = this.skills[name];
            characterObj.skills[name] = {
                isClassSkill: skill.isClassSkill,
                ranks: skill.ranks,
                racialBonus: skill.racialBonus,
                featBonus: skill.featBonus,
                miscBonus: skill.miscBonus
            }
        }

        return characterObj;
    };

    static load = (characterObj: SavedCharacter): CharacterSheet => {
        let sheet = new CharacterSheet();
        for (let prop in characterObj) {
            if (prop === "skills")
                continue;

            sheet[prop] = characterObj[prop];
        }

        for (let name in characterObj.skills) {
            let savedSkill = characterObj.skills[name];
            let skill = sheet.skills[name];
            skill.isClassSkill = savedSkill.isClassSkill;
            skill.ranks = savedSkill.ranks;
            skill.racialBonus = savedSkill.racialBonus;
            skill.featBonus = savedSkill.featBonus;
            skill.miscBonus = savedSkill.miscBonus;
        }

        return sheet;
    }

    //Character info
    characterName: string = "Default Name";
    alignment: Alignment = Alignment.TrueNeutral;
    gender: Gender = Gender.Male;
    race: string = "Human";
    size: Size = Size.Medium;

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
    tempAC: number = 0;
    spellRes: number = 0;
    calcAC = (): number => {
        return 10 + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier
            + this.armourAC + this.shieldAC + this.naturalAC + this.sizeModifier + this.tempAC;
    };
    calcFlatFootedAC = (): number => {
        return 10 + this.deflectionModifier + this.armourAC + this.shieldAC + this.naturalAC + this.sizeModifier + this.tempAC;
    };
    calcTouchAC = (): number => {
        return 10 + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier + this.sizeModifier + this.tempAC;
    };
    //Combat Manoeuvres
    miscCMB: number = 0;
    tempCMB: number = 0;
    calcCMB = (): number => {
        return this.calcStrengthBonus() + this.baseAttackBonus - this.sizeModifier + this.miscCMB + this.tempCMB;
    };
    miscCMD: number = 0;
    tempCMD: number = 0;
    calcCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.calcDexterityBonus() + this.dodgeModifier + this.deflectionModifier
            + this.baseAttackBonus - this.sizeModifier + this.miscCMD + this.tempCMD;
    };
    calcFlatFootedCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.deflectionModifier + this.baseAttackBonus - this.sizeModifier
            + this.miscCMD + this.tempCMD;
    };
    //Hit Points
    maxHP: number = 0;
    currentHP: number = 0;
    tempHP: number = 0;
    nonLethalHP: number = 0;
    damageReduction: string = "";
    energyRes: string = "";
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
    //skills
    armourPenalty: number = 0;
    getArmourPenalty = (): number => {
        return this.armourPenalty;
    }
    skills: { [name: string]: Skill; } = {
        "acrobatics": new Skill(false, this.calcDexterityBonus, this.getArmourPenalty),
        "appraise": new Skill(false, this.calcIntelligenceBonus),
        "bluff": new Skill(false, this.calcCharismaBonus),
        "climb": new Skill(false, this.calcStrengthBonus, this.getArmourPenalty),
        "craft": new Skill(false, this.calcIntelligenceBonus),
        "diplomacy": new Skill(false, this.calcCharismaBonus),
        "disableDevice": new Skill(true, this.calcDexterityBonus, this.getArmourPenalty),
        "disguise": new Skill(false, this.calcCharismaBonus),
        "escapeArtist": new Skill(false, this.calcDexterityBonus, this.getArmourPenalty),
        "fly": new Skill(false, this.calcDexterityBonus, this.getArmourPenalty),
        "handleAnimal": new Skill(true, this.calcCharismaBonus),
        "heal": new Skill(false, this.calcWisdomBonus),
        "intimidate": new Skill(false, this.calcCharismaBonus),
        "knowledgeArcana": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeDungeoneering": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeEngineering": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeGeography": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeHistory": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeLocal": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeNature": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeNobility": new Skill(true, this.calcIntelligenceBonus),
        "knowledgePlanes": new Skill(true, this.calcIntelligenceBonus),
        "knowledgeReligion": new Skill(true, this.calcIntelligenceBonus),
        "linguistics": new Skill(true, this.calcIntelligenceBonus),
        "perception": new Skill(false, this.calcWisdomBonus),
        "perform": new Skill(false, this.calcCharismaBonus),
        "profession": new Skill(true, this.calcWisdomBonus),
        "ride": new Skill(false, this.calcDexterityBonus, this.getArmourPenalty),
        "senseMotive": new Skill(false, this.calcWisdomBonus),
        "sleightOfHand": new Skill(true, this.calcDexterityBonus, this.getArmourPenalty),
        "spellcraft": new Skill(true, this.calcIntelligenceBonus),
        "stealth": new Skill(false, this.calcDexterityBonus, this.getArmourPenalty),
        "survival": new Skill(false, this.calcWisdomBonus),
        "swim": new Skill(false, this.calcStrengthBonus, this.getArmourPenalty),
        "useMagicDevice": new Skill(true, this.calcCharismaBonus)
    };
}