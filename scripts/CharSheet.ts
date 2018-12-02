export enum BonusType {
    Alchemical,
    Armour,
    Attack,
    Circumstance,
    Competence,
    Deflection,
    Dodge,
    Enhancement,
    Inherent,
    Insight,
    Luck,
    Morale,
    NaturalArmour,
    Profane,
    Racial,
    Resistance,
    Sacred,
    Shield,
    Size,
    Trait
}

let bonusStackingMap: { [key: number]: boolean } = {
    [BonusType.Alchemical]: true,
    [BonusType.Armour]: false,
    [BonusType.Attack]: true,
    [BonusType.Circumstance]: true,
    [BonusType.Competence]: false,
    [BonusType.Deflection]: false,
    [BonusType.Dodge]: true,
    [BonusType.Enhancement]: false,
    [BonusType.Inherent]: true,
    [BonusType.Insight]: false,
    [BonusType.Luck]: false,
    [BonusType.Morale]: false,
    [BonusType.NaturalArmour]: false,
    [BonusType.Profane]: false,
    [BonusType.Racial]: true,
    [BonusType.Resistance]: false,
    [BonusType.Sacred]: false,
    [BonusType.Shield]: false,
    [BonusType.Size]: true,
    [BonusType.Trait]: false
}

export enum Alignment {
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

export enum Gender {
    Male,
    Female,
    Other
}

export enum Size {
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
    ArmourClass,
    AllSaves
}

export enum ArmourType {
    None,
    Light,
    Medium,
    Heavy
}

export class ValueBonus {
    affectedStat: StatType
    bonusType: BonusType
    bonusAmount: number

    constructor(affectedStat: StatType, bonusType: BonusType, bonusAmount: number) {
        this.affectedStat = affectedStat
        this.bonusType = bonusType
        this.bonusAmount = bonusAmount
    }

    asString(short?: boolean): string {
        var retStr = ""

        //amount
        retStr += (this.bonusAmount > 0 ? "+" : "") + this.bonusAmount + " "

        //type
        if (!short) {
            switch (this.bonusType) {
                case BonusType.Alchemical:
                    retStr += "alchemical bonus to "
                    break
                case BonusType.Armour:
                    retStr += "armour bonus to "
                    break
                case BonusType.Attack:
                    retStr += "attack bonus to "
                    break
                case BonusType.Circumstance:
                    retStr += "circumstance bonus to "
                    break
                case BonusType.Competence:
                    retStr += "competence bonus to "
                    break
                case BonusType.Deflection:
                    retStr += "deflection bonus to "
                    break
                case BonusType.Dodge:
                    retStr += "dodge bonus to "
                    break
                case BonusType.Enhancement:
                    retStr += "enhancement bonus to "
                    break
                case BonusType.Inherent:
                    retStr += "inherent bonus to "
                    break
                case BonusType.Insight:
                    retStr += "insight bonus to "
                    break
                case BonusType.Luck:
                    retStr += "luck bonus to "
                    break
                case BonusType.Morale:
                    retStr += "morale bonus to "
                    break
                case BonusType.NaturalArmour:
                    retStr += "natural armour bonus to "
                    break
                case BonusType.Profane:
                    retStr += "profane bonus to "
                    break
                case BonusType.Racial:
                    retStr += "racial bonus to "
                    break
                case BonusType.Resistance:
                    retStr += "resistance bonus to "
                    break
                case BonusType.Sacred:
                    retStr += "sacred bonus to "
                    break
                case BonusType.Shield:
                    retStr += "shield bonus to "
                    break
                case BonusType.Size:
                    retStr += "size bonus to "
                    break
                case BonusType.Trait:
                    retStr += "trait bonus to "
                    break
            }
        }

        //affected stat
        switch (this.affectedStat) {
            case StatType.AllSaves:
                retStr += short ? "saves" : "all saving throws"
                break
            case StatType.ArmourClass:
                retStr += "AC"
                break
            case StatType.Attack:
                retStr += short ? "atk" : "attack"
                break
            case StatType.CMB:
                retStr += "CMB"
                break
            case StatType.CMD:
                retStr += "CMD"
                break
            case StatType.Charisma:
                retStr += short ? "CHA" : "charisma"
                break
            case StatType.Constitution:
                retStr += short ? "CON" : "constitution"
                break
            case StatType.Damage:
                retStr += short ? "dmg" : "damage"
                break
            case StatType.Dexterity:
                retStr += short ? "DEX" : "dexterity"
                break
            case StatType.FortitudeSave:
                retStr += short ? "fort." : "fortitude saves"
                break
            case StatType.Initiative:
                retStr += short ? "init." : "initiative"
                break
            case StatType.Intelligence:
                retStr += short ? "INT" : "intelligence"
                break
            case StatType.ReflexSave:
                retStr += short ? "ref." : "reflex saves"
                break
            case StatType.Strength:
                retStr += short ? "STR" : "strength"
                break
            case StatType.WillSave:
                retStr += short ? "will" : "will saves"
                break
            case StatType.Wisdom:
                retStr += short ? "WIS" : "wisdom"
                break
        }

        return retStr
    }
}

export class Equipment {
    name: string
    bonuses: ValueBonus[] = []

    constructor(name: string, ...bonuses: ValueBonus[]) {
        this.name = name
        this.bonuses = bonuses
    }

    bonusesToString = (short?: boolean): string => {
        var retStr = ""

        for (var i = 0; i < this.bonuses.length; i++) {
            var bonus = this.bonuses[i]

            retStr += bonus.asString(short)

            if (i < this.bonuses.length - 1)
                retStr += ", "
        }

        return retStr
    }
}

class Armour extends Equipment {
    acBonus: number = 0
    type: ArmourType = ArmourType.None
    maxDEX: number = null
    checkPenalty: number = 0
    maxSpeed: number = 0
    constructor(
        name: string,
        ...bonuses: ValueBonus[]) {
        super(name, ...bonuses)
    }
}

class Shield extends Equipment {
    acBonus: number = 0
    checkPenalty: number = 0

    constructor(name: string, ...bonuses: ValueBonus[]) {
        super(name, ...bonuses)
    }
}

export class Skill {
    isClassSkill: boolean = false
    ranks: number = 0
    racialBonus: number = 0
    featBonus: number = 0
    miscBonus: number = 0

    constructor(
        readonly trained: boolean,
        readonly abilityBonus: () => number,
        readonly armourPenalty: () => number = () => { return null }) { }

    calcSkillBonus = (): number => {
        if (this.trained && this.ranks === 0) return null

        return this.abilityBonus() + (this.isClassSkill && this.ranks > 0 ? 3 : 0) + this.ranks + this.racialBonus + this.featBonus
            + this.miscBonus + this.armourPenalty() //expecting this be be negative, so we want to add
    }
}

export class CharacterSheet {
    save = (): any => {
        var characterObj: any = {}
        for (let prop of Object.keys(this)) {
            if (prop === "skills" || typeof this[prop] === "function")
                continue

            characterObj[prop] = this[prop]
        }

        characterObj.skills = {}
        for (let name of Object.keys(this.skills)) {
            let skill: Skill = this.skills[name]
            characterObj.skills[name] = {
                isClassSkill: skill.isClassSkill,
                ranks: skill.ranks,
                racialBonus: skill.racialBonus,
                featBonus: skill.featBonus,
                miscBonus: skill.miscBonus
            }
        }

        return characterObj
    }

    static load = (characterObj: any): CharacterSheet => {
        let sheet = new CharacterSheet()
        for (let prop in characterObj) {
            if (prop === "skills")
                continue

            sheet[prop] = characterObj[prop]
        }

        for (let name in characterObj.skills) {
            let savedSkill = characterObj.skills[name]
            let skill = sheet.skills[name]
            skill.isClassSkill = savedSkill.isClassSkill
            skill.ranks = savedSkill.ranks
            skill.racialBonus = savedSkill.racialBonus
            skill.featBonus = savedSkill.featBonus
            skill.miscBonus = savedSkill.miscBonus
        }

        return sheet
    }

    //Character info
    characterName: string = "Default Name"
    alignment: Alignment = Alignment.TrueNeutral
    gender: Gender = Gender.Male
    race: string = "Human"
    size: Size = Size.Medium

    //Ability Scores
    baseStrength: number = 10
    calcAdditionalStrength = (): number => {
        return this.sumEquipmentBonuses([StatType.Strength],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale)
    }
    tempStrength: number = 0
    calcStrengthBonus = (): number => {
        return Math.floor((this.baseStrength + this.calcAdditionalStrength() + this.tempStrength - 10) / 2)
    }
    baseDexterity: number = 10
    calcAdditionalDexterity = (): number => {
        return this.sumEquipmentBonuses([StatType.Dexterity],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale)
    }
    tempDexterity: number = 0
    calcDexterityBonus = (): number => {
        return Math.floor((this.baseDexterity + this.calcAdditionalDexterity() + this.tempDexterity - 10) / 2)
    }
    baseConstitution: number = 10
    calcAdditionalConstitution = (): number => {
        return this.sumEquipmentBonuses([StatType.Constitution],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale)
    }
    tempConstitution: number = 0
    calcConstitutionBonus = (): number => {
        return Math.floor((this.baseConstitution + this.calcAdditionalConstitution() + this.tempConstitution - 10) / 2)
    }
    baseIntelligence: number = 10
    calcAdditionalIntelligence = (): number => {
        return this.sumEquipmentBonuses([StatType.Intelligence],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent)
    }
    tempIntelligence: number = 0
    calcIntelligenceBonus = (): number => {
        return Math.floor((this.baseIntelligence + this.calcAdditionalIntelligence() + this.tempIntelligence - 10) / 2)
    }
    baseWisdom: number = 10
    calcAdditionalWisdom = (): number => {
        return this.sumEquipmentBonuses([StatType.Wisdom],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent)
    }
    tempWisdom: number = 0
    calcWisdomBonus = (): number => {
        return Math.floor((this.baseWisdom + this.calcAdditionalWisdom() + this.tempWisdom - 10) / 2)
    }
    baseCharisma: number = 10
    calcAdditionalCharisma = (): number => {
        return this.sumEquipmentBonuses([StatType.Charisma],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent)
    }
    tempCharisma: number = 0
    calcCharismaBonus = (): number => {
        return Math.floor((this.baseCharisma + this.calcAdditionalCharisma() + this.tempCharisma - 10) / 2)
    }

    //Initiative
    featInitiative: number = 0
    trainingInitiative: number = 0
    calcMiscInitiative = (): number => {
        return this.sumEquipmentBonuses([StatType.Initiative])
    }
    calcInitiative = (): number => {
        return this.calcDexterityBonus() + this.featInitiative + this.trainingInitiative + this.calcMiscInitiative()
    }

    //Armour Class
    naturalAC: number = 0
    tempAC: number = 0
    spellRes: number = 0
    calcAC = (): number => {
        return 10 + Math.min(this.calcDexterityBonus(), this.armour.maxDEX) + this.calcDodgeBonus() + this.calcDeflectionBonus()
            + this.armour.acBonus + this.shield.acBonus + this.naturalAC + this.sizeModifier + this.tempAC
    }
    calcFlatFootedAC = (): number => {
        return 10 + this.calcDeflectionBonus() + this.armour.acBonus + this.shield.acBonus + this.naturalAC + this.sizeModifier + this.tempAC
    }
    calcTouchAC = (): number => {
        return 10 + this.calcDexterityBonus() + this.calcDodgeBonus() + this.calcDeflectionBonus() + this.sizeModifier + this.tempAC
    }

    //Combat Manoeuvres
    calcMiscCMB = (): number => {
        return this.sumEquipmentBonuses([StatType.CMB], 
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred)
    }
    tempCMB: number = 0
    calcCMB = (): number => {
        return this.calcStrengthBonus() + this.baseAttackBonus - this.sizeModifier + this.calcMiscCMB() + this.tempCMB
    }
    calcMiscCMD = (): number => {
        return this.sumEquipmentBonuses([StatType.CMB],
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred)
    }
    tempCMD: number = 0
    calcCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.calcDexterityBonus() + this.calcDodgeBonus() + this.calcDeflectionBonus()
            + this.baseAttackBonus - this.sizeModifier + this.calcMiscCMD() + this.tempCMD
    }
    calcFlatFootedCMD = (): number => {
        return 10 + this.calcStrengthBonus() + this.calcDeflectionBonus() + this.baseAttackBonus - this.sizeModifier
            + this.calcMiscCMD() + this.tempCMD
    }

    //Hit Points
    maxHP: number = 0
    currentHP: number = 0
    tempHP: number = 0
    nonLethalHP: number = 0
    damageReduction: string = ""
    energyRes: string = ""

    //BAB
    baseAttackBonus: number = 0
    calcMeleeAttackBonus = (): number => {
        return this.baseAttackBonus + this.calcStrengthBonus()
    }
    calcRangedAttackBonus = (): number => {
        return this.baseAttackBonus + this.calcDexterityBonus()
    }
    calcAttackMoraleBonus = (): number => {
        return this.sumEquipmentBonuses([StatType.Attack], BonusType.Morale)
    }
    attackBuffs: number = 0
    attackNerfs: number = 0
    calcTempAttackBonus = (): number => {
        return this.calcAttackMoraleBonus() + this.attackBuffs - this.attackNerfs
    }
    calcDamageMoraleBonus = (): number => {
        return this.sumEquipmentBonuses([StatType.Damage], BonusType.Morale)
    }
    damageBuffs: number = 0
    damageNerfs: number = 0
    calcTempDamageBonus = (): number => {
        return this.calcDamageMoraleBonus() + this.damageBuffs - this.damageNerfs
    }

    //modifiers
    calcDodgeBonus = (): number => {
        return this.sumEquipmentBonuses([StatType.ArmourClass], BonusType.Dodge);
    }
    calcDeflectionBonus = (): number => {
        return this.sumEquipmentBonuses([StatType.ArmourClass], BonusType.Deflection);
    }
    sizeModifier: number = 0

    //Saves
    baseFortSave: number = 0
    racialFortSave: number = 0
    calcMiscFortSave = (): number => {
        return this.sumEquipmentBonuses([StatType.FortitudeSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred)
    }
    tempFortSave: number = 0
    calcFortSave = (): number => {
        return this.baseFortSave + this.calcConstitutionBonus() + this.racialFortSave + this.calcMiscFortSave() + this.tempFortSave
    }
    baseReflexSave: number = 0
    racialReflexSave: number = 0
    calcMiscReflexSave = (): number => {
        return this.sumEquipmentBonuses([StatType.ReflexSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Dodge,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred)
    }
    tempReflexSave: number = 0
    calcReflexSave = (): number => {
        return this.baseReflexSave + this.calcDexterityBonus() + this.racialReflexSave + this.calcMiscReflexSave() + this.tempReflexSave
    }
    baseWillSave: number = 0
    racialWillSave: number = 0
    calcMiscWillSave = (): number => {
        return this.sumEquipmentBonuses([StatType.WillSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred)
    }
    tempWillSave: number = 0
    calcWillSave = (): number => {
        return this.baseWillSave + this.calcWisdomBonus() + this.racialWillSave + this.calcMiscWillSave() + this.tempWillSave
    }

    //equipment (default to "none")
    armour: Armour = new Armour("No Armour")
    shield: Shield = new Shield("No Shield")

    calcArmourCheckPenalty = (): number => {
        return this.armour.checkPenalty + this.shield.checkPenalty
    }

    //skills
    skills: { [name: string]: Skill } = {
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
    }

    //equipment
    equipment: Equipment[] = []

    //if no bonuses are included, assume all bonus types apply
    private sumEquipmentBonuses(statToSum: StatType[], ...includedBonuses: BonusType[]): number {
        var add = 0
        var bonusesByType: { [key: number]: ValueBonus[] } = {}

        //initialize types dictionary based on what's included
        if (includedBonuses.length > 0) {
            includedBonuses.forEach((type: BonusType) => {
                bonusesByType[type] = []
            })
        }
        else {
            Object.keys(BonusType).forEach((type: any) => {
                if (isNaN(type)) {
                    //add to the includedBonses array as well so the reduce later has something to operate on
                    //stupid type casting because TS is annoying with enums... again
                    includedBonuses.push(BonusType[type] as unknown as BonusType)
                    bonusesByType[BonusType[type]] = []
                }
            })
        }

        //sort all equipment bonuses into their respective buckets
        this.equipment.forEach((item) => {
            item.bonuses.forEach((bonus) => {
                if (bonusesByType[bonus.bonusType] !== undefined && statToSum.indexOf(bonus.affectedStat) >= 0)
                    bonusesByType[bonus.bonusType].push(bonus)
            })
        })

        add = includedBonuses.reduce((sum: number, type: BonusType) => {
            if (includedBonuses.length === 0 || bonusStackingMap[type] === true)
                return sum + bonusesByType[type].reduce((acc: number, cur: ValueBonus) => {
                    return acc + cur.bonusAmount
                }, 0)
            else
                return sum + bonusesByType[type].reduce((acc: number, cur: ValueBonus) => {
                    return Math.max(acc, cur.bonusAmount)
                }, 0)
        }, 0)

        return add
    }
}