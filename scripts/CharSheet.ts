export enum BonusType {
    Enhancement,
    Dodge,
    Deflection,
    Morale
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

export enum StatType {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Wisdom,
    Charisma,
    Initiative,
    Attack,
    Damage,
    CMB,
    CMD,
    FortitudeSave,
    ReflexSave,
    WillSave,
    ArmourClass
}

enum ArmourType {
    None,
    Light,
    Medium,
    Heavy
}

export class ValueBonus {
    affectedStat: StatType;
    bonusType: BonusType;
    bonusAmount: number;

    constructor(affectedStat: StatType, bonusType: BonusType, bonusAmount: number) {
        this.affectedStat = affectedStat;
        this.bonusType = bonusType;
        this.bonusAmount = bonusAmount;
    }

    asString(): string {
        var retStr = "";

        //amount
        retStr += (this.bonusAmount > 0 ? "+" : "") + this.bonusAmount;

        //type
        switch (this.bonusType) {
            case BonusType.Enhancement:
                retStr += " enhancement bonus to ";
                break;
            case BonusType.Morale:
                retStr += " morale bonus to ";
                break;
            case BonusType.Deflection:
                retStr += " deflection bonus to ";
                break;
            case BonusType.Dodge:
                retStr += " dodge bonus to ";
                break;
        }

        //affected stat
        switch (this.affectedStat) {
            case StatType.ArmourClass:
                retStr += "AC";
                break;
            case StatType.Attack:
                retStr += "attack";
                break;
            case StatType.CMB:
                retStr += "CMB";
                break;
            case StatType.CMD:
                retStr += "CMD";
                break;
            case StatType.Charisma:
                retStr += "charisma";
                break;
            case StatType.Constitution:
                retStr += "constitution";
                break;
            case StatType.Damage:
                retStr += "damage";
                break;
            case StatType.Dexterity:
                retStr += "dexterity";
                break;
            case StatType.FortitudeSave:
                retStr += "fortitude saves";
                break;
            case StatType.Initiative:
                retStr += "initiative";
                break;
            case StatType.Intelligence:
                retStr += "intelligence";
                break;
            case StatType.ReflexSave:
                retStr += "reflex saves";
                break;
            case StatType.Strength:
                retStr += "strength";
                break;
            case StatType.WillSave:
                retStr += "will saves";
                break;
            case StatType.Wisdom:
                retStr += "wisdom";
                break;
        }

        return retStr;
    };
}

export class Equipment {
    name: string;
    description: string;
    bonuses: ValueBonus[] = [];

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        this.name = name;
        this.description = description;
        this.bonuses = bonuses;
    }

    bonusesToString = (): string => {
        var retStr = "";

        for (var i = 0; i < this.bonuses.length; i++) {
            var bonus = this.bonuses[i];

            retStr += bonus.asString();

            if (i < this.bonuses.length - 1)
                retStr += ", ";
        }

        return retStr;
    }
}

class Armour extends Equipment {
    acBonus: number = 0;
    type: ArmourType = ArmourType.None;
    maxDEX: number = null;
    checkPenalty: number = 0;
    maxSpeed: number = 0;
    constructor(
        name: string,
        description: string,
        ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses);
    }
}

class Shield extends Equipment {
    acBonus: number = 0;
    checkPenalty: number = 0;

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses);
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
        readonly armourPenalty: () => number = () => { return null; }) { }

    calcSkillBonus = (): number => {
        if (this.trained && this.ranks === 0) return null;

        return this.abilityBonus() + (this.isClassSkill && this.ranks > 0 ? 3 : 0) + this.ranks + this.racialBonus + this.featBonus
            + this.miscBonus + this.armourPenalty(); //expecting this be be negative, so we want to add
    }
}

export class CharacterSheet {
    save = (): any => {
        var characterObj: any = {};
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

    static load = (characterObj: any): CharacterSheet => {
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
    naturalAC: number = 0;
    tempAC: number = 0;
    spellRes: number = 0;
    calcAC = (): number => {
        return 10 + Math.min(this.calcDexterityBonus(), this.armour.maxDEX) + this.dodgeModifier + this.deflectionModifier
            + this.armour.acBonus + this.shield.acBonus + this.naturalAC + this.sizeModifier + this.tempAC;
    };
    calcFlatFootedAC = (): number => {
        return 10 + this.deflectionModifier + this.armour.acBonus + this.shield.acBonus + this.naturalAC + this.sizeModifier + this.tempAC;
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

    //equipment (default to "none")
    armour: Armour = new Armour("No Armour", "Feels like I'm wearong nothing at all");
    shield: Shield = new Shield("No Shield", "Even a gnarled log would be better");

    calcArmourCheckPenalty = (): number => {
        return this.armour.checkPenalty + this.shield.checkPenalty
    }

    //skills
    skills: { [name: string]: Skill; } = {
        "acrobatics": new Skill(false, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "appraise": new Skill(false, this.calcIntelligenceBonus),
        "bluff": new Skill(false, this.calcCharismaBonus),
        "climb": new Skill(false, this.calcStrengthBonus, this.calcArmourCheckPenalty),
        "craft": new Skill(false, this.calcIntelligenceBonus),
        "diplomacy": new Skill(false, this.calcCharismaBonus),
        "disableDevice": new Skill(true, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "disguise": new Skill(false, this.calcCharismaBonus),
        "escapeArtist": new Skill(false, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "fly": new Skill(false, this.calcDexterityBonus, this.calcArmourCheckPenalty),
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
        "ride": new Skill(false, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "senseMotive": new Skill(false, this.calcWisdomBonus),
        "sleightOfHand": new Skill(true, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "spellcraft": new Skill(true, this.calcIntelligenceBonus),
        "stealth": new Skill(false, this.calcDexterityBonus, this.calcArmourCheckPenalty),
        "survival": new Skill(false, this.calcWisdomBonus),
        "swim": new Skill(false, this.calcStrengthBonus, this.calcArmourCheckPenalty),
        "useMagicDevice": new Skill(true, this.calcCharismaBonus)
    };

    //equipment
    equipment: Equipment[] = [];
}