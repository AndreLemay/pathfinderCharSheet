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

export enum SkillName {
    Acrobatics,
    Appraise,
    Bluff,
    Climb,
    Craft,
    Diplomacy,
    DisableDevice,
    Disguise,
    EscapeArtist,
    Fly,
    HandleAnimal,
    Heal,
    Intimidate,
    KnowledgeArcana,
    KnowledgeDungeoneering,
    KnowledgeEngineering,
    KnowledgeGeography,
    KnowledgeHistory,
    KnowledgeLocal,
    KnowledgeNature,
    KnowledgeNobility,
    KnowledgePlanes,
    KnowledgeReligion,
    Linguistics,
    Perception,
    Perform,
    Profession,
    Ride,
    SenseMotive,
    SleightOfHand,
    Spellcraft,
    Stealth,
    Survival,
    Swim,
    UseMagicDevice
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
    //because enums in TS basically just compile down to string->number/number->string maps, 
    //we can't accept StatType or SkillName, because they'll be effectively the same and there
    //won't be any way to tell whether this bonus is to a stat or a skill (unless manually
    //initializing the values in both enums so there's no overlap.. but then there's no point in having
    //separate enums). Instead we just have to assume one is always going to be null
    affectedStat: StatType
    affectedSkill: SkillName
    bonusType: BonusType
    bonusAmount: number

    constructor(affectedStat: StatType, affectedSkill: SkillName, bonusType: BonusType, bonusAmount: number) {
        this.affectedStat = affectedStat
        this.affectedSkill = affectedSkill
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
                retStr += short ? "CHA" : "Charisma"
                break
            case StatType.Constitution:
                retStr += short ? "CON" : "Constitution"
                break
            case StatType.Damage:
                retStr += short ? "dmg" : "damage"
                break
            case StatType.Dexterity:
                retStr += short ? "DEX" : "Dexterity"
                break
            case StatType.FortitudeSave:
                retStr += short ? "fort." : "Fortitude Saves"
                break
            case StatType.Initiative:
                retStr += short ? "init." : "Initiative"
                break
            case StatType.Intelligence:
                retStr += short ? "INT" : "Intelligence"
                break
            case StatType.ReflexSave:
                retStr += short ? "ref." : "Reflex Saves"
                break
            case StatType.Strength:
                retStr += short ? "STR" : "Strength"
                break
            case StatType.WillSave:
                retStr += short ? "will" : "Will Saves"
                break
            case StatType.Wisdom:
                retStr += short ? "WIS" : "Wisdom"
                break
        }

        //affected skill (don't get a short version)
        switch (this.affectedSkill) {
            case SkillName.Acrobatics:
                retStr += "Acrobatics"
                break
            case SkillName.Appraise:
                retStr += "Appraise"
                break
            case SkillName.Bluff:
                retStr += "Bluff"
                break
            case SkillName.Climb:
                retStr += "Climb"
                break
            case SkillName.Craft:
                retStr += "Craft"
                break
            case SkillName.Diplomacy:
                retStr += "Diplomacy"
                break
            case SkillName.DisableDevice:
                retStr += "Disable Device"
                break
            case SkillName.Disguise:
                retStr += "Disguise"
                break
            case SkillName.EscapeArtist:
                retStr += "Escape Artist"
                break
            case SkillName.Fly:
                retStr += "Fly"
                break
            case SkillName.HandleAnimal:
                retStr += "Handle Animal"
                break
            case SkillName.Heal:
                retStr += "Heal"
                break
            case SkillName.Intimidate:
                retStr += "Intimidate"
                break
            case SkillName.KnowledgeArcana:
                retStr += "Knowledge (Arcana)"
                break
            case SkillName.KnowledgeDungeoneering:
                retStr += "Knowledge (Dungeoneering)"
                break
            case SkillName.KnowledgeEngineering:
                retStr += "Knowledge (Engineering)"
                break
            case SkillName.KnowledgeGeography:
                retStr += "Knowledge (Geography)"
                break
            case SkillName.KnowledgeHistory:
                retStr += "Knowledge (History)"
                break
            case SkillName.KnowledgeLocal:
                retStr += "Knowledge (Local)"
                break
            case SkillName.KnowledgeNature:
                retStr += "Knowledge (Nature)"
                break
            case SkillName.KnowledgeNobility:
                retStr += "Knowledge (Nobility)"
                break
            case SkillName.KnowledgePlanes:
                retStr += "Knowledge (Planes)"
                break
            case SkillName.KnowledgeReligion:
                retStr += "Knowldge (Religion)"
                break
            case SkillName.Linguistics:
                retStr += "Linguistics"
                break
            case SkillName.Perception:
                retStr += "Perception"
                break
            case SkillName.Perform:
                retStr += "Perform"
                break
            case SkillName.Profession:
                retStr += "Profession"
                break
            case SkillName.Ride:
                retStr += "Ride"
                break
            case SkillName.SenseMotive:
                retStr += "Sense Motive"
                break
            case SkillName.SleightOfHand:
                retStr += "Sleight Of Hand"
                break
            case SkillName.Spellcraft:
                retStr += "Spellcraft"
                break
            case SkillName.Stealth:
                retStr += "Stealth"
                break
            case SkillName.Survival:
                retStr += "Survival"
                break
            case SkillName.Swim:
                retStr += "Swim"
                break
            case SkillName.UseMagicDevice:
                retStr += "Use Magic Device"
                break
        }

        return retStr
    }
}

export class Equipment {
    name: string
    description: string
    bonuses: ValueBonus[] = []

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        this.name = name
        this.description = description
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

//identical functionality to equipment, extending so we can reuse the same bonus summing functions
export class Feat extends Equipment {
    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses)
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
        description: string,
        ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses)
    }
}

class Shield extends Equipment {
    acBonus: number = 0
    checkPenalty: number = 0

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses)
    }
}

export class Weapon extends Equipment {
    range: number = 0
    damageType: string[] = []
    damageAmount: number = 1
    damageDie: number = 2
    critRange: number = 20
    critMultiplier: number = 2

    constructor(name: string, description: string, ...bonuses: ValueBonus[]) {
        super(name, description, ...bonuses)
    }
}

export class Skill {
    isClassSkill: boolean = false
    ranks: number = 0

    constructor(
        readonly skillName: SkillName,
        readonly trained: boolean,
        readonly abilityBonus: () => number,
        readonly miscBonus: (skill: SkillName, ...bonuses: BonusType[]) => number,
        readonly featBonus: (skill: SkillName, ...bonuses: BonusType[]) => number,
        readonly armourPenalty: () => number = () => { return null }, ) { }

    //need a noargs version of this so the renderer process can call it without being able to pass arguments
    calcMiscBonus = (): number => {
        return this.miscBonus(this.skillName,
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred)
    }

    calcFeatBonus = (): number => {
        return this.featBonus(this.skillName,
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred)
    }

    calcSkillBonus = (): number => {
        if (this.trained && this.ranks === 0) return null

        return this.abilityBonus() + (this.isClassSkill && this.ranks > 0 ? 3 : 0) + this.ranks + this.calcFeatBonus()
            + this.armourPenalty() //expecting this be be negative, so we want to add 
            + this.calcMiscBonus()
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
                ranks: skill.ranks
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
        return this.sumEquipmentStatBonuses([StatType.Strength],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale) + 
            this.sumFeatStatBonuses([StatType.Strength],
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
        return this.sumEquipmentStatBonuses([StatType.Dexterity],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale) +
            this.sumFeatStatBonuses([StatType.Dexterity],
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
        return this.sumEquipmentStatBonuses([StatType.Constitution],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent,
            BonusType.Morale) + 
            this.sumFeatStatBonuses([StatType.Constitution],
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
        return this.sumEquipmentStatBonuses([StatType.Intelligence],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent) + 
            this.sumFeatStatBonuses([StatType.Intelligence],
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
        return this.sumEquipmentStatBonuses([StatType.Wisdom],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent) + 
            this.sumFeatStatBonuses([StatType.Wisdom],
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
        return this.sumEquipmentStatBonuses([StatType.Charisma],
            BonusType.Alchemical,
            BonusType.Enhancement,
            BonusType.Inherent) + 
            this.sumFeatStatBonuses([StatType.Charisma],
                BonusType.Alchemical,
                BonusType.Enhancement,
                BonusType.Inherent)
    }
    tempCharisma: number = 0
    calcCharismaBonus = (): number => {
        return Math.floor((this.baseCharisma + this.calcAdditionalCharisma() + this.tempCharisma - 10) / 2)
    }

    //Initiative
    calcMiscInitiative = (): number => {
        return this.sumEquipmentStatBonuses([StatType.Initiative]) + this.sumFeatStatBonuses([StatType.Initiative])
    }
    calcInitiative = (): number => {
        return this.calcDexterityBonus() + this.calcMiscInitiative()
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
        return this.sumEquipmentStatBonuses([StatType.CMB],
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.CMB],
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
        return this.sumEquipmentStatBonuses([StatType.CMB],
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.CMB],
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
    calcMiscAttackBonus = (): number => {
        return this.sumEquipmentStatBonuses([StatType.Attack],
            BonusType.Circumstance,
            BonusType.Competence,
            BonusType.Enhancement,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred,
            BonusType.Size) + 
            this.sumFeatStatBonuses([StatType.Attack],
                BonusType.Circumstance,
                BonusType.Competence,
                BonusType.Enhancement,
                BonusType.Insight,
                BonusType.Luck,
                BonusType.Morale,
                BonusType.Profane,
                BonusType.Sacred,
                BonusType.Size)
    }
    calcMiscDamageBonus = (): number => {
        return this.sumEquipmentStatBonuses([StatType.Damage],
            BonusType.Enhancement,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.Damage],
                BonusType.Enhancement,
                BonusType.Luck,
                BonusType.Morale,
                BonusType.Profane,
                BonusType.Sacred)
    }

    //modifiers
    calcDodgeBonus = (): number => {
        return this.sumEquipmentStatBonuses([StatType.ArmourClass], BonusType.Dodge);
    }
    calcDeflectionBonus = (): number => {
        return this.sumEquipmentStatBonuses([StatType.ArmourClass], BonusType.Deflection);
    }
    sizeModifier: number = 0

    //Saves
    baseFortSave: number = 0
    calcMiscFortSave = (): number => {
        return this.sumEquipmentStatBonuses([StatType.FortitudeSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.FortitudeSave, StatType.AllSaves],
                BonusType.Alchemical,
                BonusType.Competence,
                BonusType.Insight,
                BonusType.Luck,
                BonusType.Morale,
                BonusType.Profane,
                BonusType.Resistance,
                BonusType.Sacred)
    }
    calcFortSave = (): number => {
        return this.baseFortSave + this.calcConstitutionBonus() + this.calcMiscFortSave()
    }
    baseReflexSave: number = 0
    calcMiscReflexSave = (): number => {
        return this.sumEquipmentStatBonuses([StatType.ReflexSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Dodge,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.ReflexSave, StatType.AllSaves],
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
    calcReflexSave = (): number => {
        return this.baseReflexSave + this.calcDexterityBonus() + this.calcMiscReflexSave()
    }
    baseWillSave: number = 0
    calcMiscWillSave = (): number => {
        return this.sumEquipmentStatBonuses([StatType.WillSave, StatType.AllSaves],
            BonusType.Alchemical,
            BonusType.Competence,
            BonusType.Insight,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Resistance,
            BonusType.Sacred) + 
            this.sumFeatStatBonuses([StatType.WillSave, StatType.AllSaves],
                BonusType.Alchemical,
                BonusType.Competence,
                BonusType.Insight,
                BonusType.Luck,
                BonusType.Morale,
                BonusType.Profane,
                BonusType.Resistance,
                BonusType.Sacred)
    }
    calcWillSave = (): number => {
        return this.baseWillSave + this.calcWisdomBonus() + this.calcMiscWillSave()
    }

    //equipment (default to "none")
    armour: Armour = new Armour("No Armour", "")
    shield: Shield = new Shield("No Shield", "")

    calcArmourCheckPenalty = (): number => {
        return this.armour.checkPenalty + this.shield.checkPenalty
    }

    private sumStatBonuses = (from: Equipment[], statToSum: StatType[], ...includedBonuses: BonusType[]): number => {
        var add = 0
        var bonusesByType: { [key: number]: ValueBonus[] } = {}

        //initialize types dictionary based on what's included
        if (includedBonuses.length > 0) {
            includedBonuses.forEach((type: BonusType) => {
                bonusesByType[type] = []
            })

            //these affect everything, so just add them always
            bonusesByType[BonusType.Racial] = []
            bonusesByType[BonusType.Trait] = []
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
        from.forEach((item) => {
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

    private sumSkillBonuses = (from: Equipment[], statToSum: SkillName, ...includedBonuses: BonusType[]): number => {
        var add = 0
        var bonusesByType: { [key: number]: ValueBonus[] } = {}

        //initialize types dictionary based on what's included
        if (includedBonuses.length > 0) {
            includedBonuses.forEach((type: BonusType) => {
                bonusesByType[type] = []
            })

            //these affect everything, so just add them always
            bonusesByType[BonusType.Racial] = []
            bonusesByType[BonusType.Trait] = []
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
        from.forEach((item) => {
            item.bonuses.forEach((bonus) => {
                if (bonusesByType[bonus.bonusType] !== undefined && statToSum === bonus.affectedSkill)
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

    //equipment
    equipment: Equipment[] = []

    //if no bonuses are included, assume all bonus types apply
    private sumEquipmentStatBonuses = (statToSum: StatType[], ...includedBonuses: BonusType[]): number => {
        return this.sumStatBonuses(this.equipment, statToSum, ...includedBonuses)
    }

    //if no bonuses are included, assume all bonus types apply
    private sumEquipmentSkillBonuses = (statToSum: SkillName, ...includedBonuses: BonusType[]): number => {
        return this.sumSkillBonuses(this.equipment, statToSum, ...includedBonuses)
    }

    feats: Feat[] = []

    //if no bonuses are included, assume all bonus types apply
    private sumFeatStatBonuses = (statToSum: StatType[], ...includedBonuses: BonusType[]): number => {
        return this.sumStatBonuses(this.feats, statToSum, ...includedBonuses)
    }

    //if no bonuses are included, assume all bonus types apply
    private sumFeatSkillBonuses = (statToSum: SkillName, ...includedBonuses: BonusType[]): number => {
        return this.sumSkillBonuses(this.feats, statToSum, ...includedBonuses)
    }

    //skills
    skills: { [name: number]: Skill } = {
        [SkillName.Acrobatics]: new Skill(SkillName.Acrobatics, false, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Appraise]: new Skill(SkillName.Appraise, false, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Bluff]: new Skill(SkillName.Bluff, false, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Climb]: new Skill(SkillName.Climb, false, 
            this.calcStrengthBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Craft]: new Skill(SkillName.Craft, false, 
            this.calcIntelligenceBonus, this.sumFeatSkillBonuses, this.sumEquipmentSkillBonuses),
        [SkillName.Diplomacy]: new Skill(SkillName.Diplomacy, false, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.DisableDevice]: new Skill(SkillName.DisableDevice, true, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Disguise]: new Skill(SkillName.Disguise, false, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.EscapeArtist]: new Skill(SkillName.EscapeArtist, false, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Fly]: new Skill(SkillName.Fly, false, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.HandleAnimal]: new Skill(SkillName.HandleAnimal, true, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Heal]: new Skill(SkillName.Heal, false, 
            this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Intimidate]: new Skill(SkillName.Intimidate, false, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeArcana]: new Skill(SkillName.KnowledgeArcana, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeDungeoneering]: new Skill(SkillName.KnowledgeDungeoneering, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeEngineering]: new Skill(SkillName.KnowledgeEngineering, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeGeography]: new Skill(SkillName.KnowledgeGeography, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeHistory]: new Skill(SkillName.KnowledgeHistory, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeLocal]: new Skill(SkillName.KnowledgeLocal, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeNature]: new Skill(SkillName.KnowledgeNature, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeNobility]: new Skill(SkillName.KnowledgeNobility, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgePlanes]: new Skill(SkillName.KnowledgePlanes, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.KnowledgeReligion]: new Skill(SkillName.KnowledgeReligion, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Linguistics]: new Skill(SkillName.Linguistics, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Perception]: new Skill(SkillName.Perception, false, 
            this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Perform]: new Skill(SkillName.Perform, false, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Profession]: new Skill(SkillName.Profession, true, 
            this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Ride]: new Skill(SkillName.Ride, false, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.SenseMotive]: new Skill(SkillName.SenseMotive, false, 
            this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.SleightOfHand]: new Skill(SkillName.SleightOfHand, true, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Spellcraft]: new Skill(SkillName.Spellcraft, true, 
            this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Stealth]: new Skill(SkillName.Stealth, false, 
            this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.Survival]: new Skill(SkillName.Survival, false, 
            this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
        [SkillName.Swim]: new Skill(SkillName.Swim, false, this.calcStrengthBonus, this.sumEquipmentSkillBonuses, this.calcArmourCheckPenalty),
        [SkillName.UseMagicDevice]: new Skill(SkillName.UseMagicDevice, true, 
            this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses)
    }
}