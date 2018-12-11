import { Enum, EnumValue } from "ts-enums"

//#region implementation
export class BonusTypeValue extends EnumValue {
    constructor(name: string, readonly stacksWithSelf: boolean = false) {
        super(name)
    }
}

class BonusTypeEnum extends Enum<BonusTypeValue> {
    constructor() {
        super()
        this.initEnum("BonusType")
    }

    Alchemical: BonusTypeValue = new BonusTypeValue("Alchemical", true)
    Armour: BonusTypeValue = new BonusTypeValue("Armour")
    Attack: BonusTypeValue = new BonusTypeValue("Attack", true)
    Circumstance: BonusTypeValue = new BonusTypeValue("Circumstance", true)
    Competence: BonusTypeValue = new BonusTypeValue("Competence")
    Deflection: BonusTypeValue = new BonusTypeValue("Deflection")
    Dodge: BonusTypeValue = new BonusTypeValue("Dodge", true)
    Enhancement: BonusTypeValue = new BonusTypeValue("Enhancement")
    Inherent: BonusTypeValue = new BonusTypeValue("Inherent", true)
    Insight: BonusTypeValue = new BonusTypeValue("Insight")
    Luck: BonusTypeValue = new BonusTypeValue("Luck")
    Morale: BonusTypeValue = new BonusTypeValue("Morale")
    NaturalArmour: BonusTypeValue = new BonusTypeValue("Natural Armour")
    Profane: BonusTypeValue = new BonusTypeValue("Profane")
    Racial: BonusTypeValue = new BonusTypeValue("Racial", true)
    Resistance: BonusTypeValue = new BonusTypeValue("Resistance")
    Sacred: BonusTypeValue = new BonusTypeValue("Sacred")
    Shield: BonusTypeValue = new BonusTypeValue("Shield")
    Size: BonusTypeValue = new BonusTypeValue("Size")
    Trait: BonusTypeValue = new BonusTypeValue("Trait")
}

export class SkillNameValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}

class SkillNameEnum extends Enum<SkillNameValue> {
    constructor() {
        super()
        this.initEnum("Skill")
    }

    Acrobatics: SkillNameValue = new SkillNameValue("Acrobatics")
    Appraise: SkillNameValue = new SkillNameValue("Appraise")
    Bluff: SkillNameValue = new SkillNameValue("Bluff")
    Climb: SkillNameValue = new SkillNameValue("Climb")
    Craft: SkillNameValue = new SkillNameValue("Craft")
    Diplomacy: SkillNameValue = new SkillNameValue("Diplomacy")
    DisableDevice: SkillNameValue = new SkillNameValue("Disable Device")
    Disguise: SkillNameValue = new SkillNameValue("Disguise")
    EscapeArtist: SkillNameValue = new SkillNameValue("Escape Artist")
    Fly: SkillNameValue = new SkillNameValue("Fly")
    HandleAnimal: SkillNameValue = new SkillNameValue("Handle Animal")
    Heal: SkillNameValue = new SkillNameValue("Heal")
    Intimidate: SkillNameValue = new SkillNameValue("Intimidate")
    KnowledgeArcana: SkillNameValue = new SkillNameValue("Knowledge (Arcana)")
    KnowledgeDungeoneering: SkillNameValue = new SkillNameValue("Knowledge (Dungeoneering)")
    KnowledgeEngineering: SkillNameValue = new SkillNameValue("Knowledge (Engineering)")
    KnowledgeGeography: SkillNameValue = new SkillNameValue("Knowledge (Geography)")
    KnowledgeHistory: SkillNameValue = new SkillNameValue("Knowledge (History)")
    KnowledgeLocal: SkillNameValue = new SkillNameValue("Knowledge (Local)")
    KnowledgeNature: SkillNameValue = new SkillNameValue("Knowledge (Nature")
    KnowledgeNobility: SkillNameValue = new SkillNameValue("Knowledge (Nobility)")
    KnowledgePlanes: SkillNameValue = new SkillNameValue("Knowledge (Planes)")
    KnowledgeReligion: SkillNameValue = new SkillNameValue("Knowledge (Religion)")
    Linguistics: SkillNameValue = new SkillNameValue("Linguistics")
    Perception: SkillNameValue = new SkillNameValue("Perception")
    Perform: SkillNameValue = new SkillNameValue("Perform")
    Profession: SkillNameValue = new SkillNameValue("Profession")
    Ride: SkillNameValue = new SkillNameValue("Ride")
    SenseMotive: SkillNameValue = new SkillNameValue("Sense Motive")
    SleightOfHand: SkillNameValue = new SkillNameValue("Sleight of Hand")
    Spellcraft: SkillNameValue = new SkillNameValue("Spellcraft")
    Stealth: SkillNameValue = new SkillNameValue("Stealth")
    Survival: SkillNameValue = new SkillNameValue("Survival")
    Swim: SkillNameValue = new SkillNameValue("Swim")
    UseMagicDevice: SkillNameValue = new SkillNameValue("Use Magic Device")
}

export class AlignmentValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}

class AlignmentEnum extends Enum<AlignmentValue> {
    constructor() {
        super()
        this.initEnum("Alignment")
    }

    LawfulGood: AlignmentValue = new AlignmentValue("Lawful Good")
    LawfulNeutral: AlignmentValue = new AlignmentValue("Lawful Neutral")
    LawfulEvil: AlignmentValue = new AlignmentValue("Lawful Evil")
    NeutralGood: AlignmentValue = new AlignmentValue("Neutral Good")
    TrueNeutral: AlignmentValue = new AlignmentValue("True Neutral")
    NeutralEvil: AlignmentValue = new AlignmentValue("Neutral Evil")
    ChaoticGood: AlignmentValue = new AlignmentValue("Chaotic Good")
    ChaoticNeutral: AlignmentValue = new AlignmentValue("Chaotic Neutral")
    ChaoticEvil: AlignmentValue = new AlignmentValue("Chaotic Evil")
}

export class GenderValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}

class GenderEnum extends Enum<GenderValue> {
    constructor() {
        super()
        this.initEnum("Gender")
    }

    Male: GenderValue = new GenderValue("Male")
    Female: GenderValue = new GenderValue("Female")
    Other: GenderValue = new GenderValue("Other")
}

export class SizeValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}

class SizeEnum extends Enum<SizeValue> {
    constructor() {
        super()
        this.initEnum("Size")
    }

    Small: SizeValue = new SizeValue("Small")
    Medium: SizeValue = new SizeValue("Medium")
    Large: SizeValue = new SizeValue("Large")
}

export class StatTypeValue extends EnumValue {
    constructor(name: string, readonly shortName: string = name) {
        super(name)
    }
}

class StatTypeEnum extends Enum<StatTypeValue> {
    constructor() {
        super()
        this.initEnum("StatType")
    }

    Strength: StatTypeValue = new StatTypeValue("Strength", "STR")
    Dexterity: StatTypeValue = new StatTypeValue("Dexterity", "DEX")
    Constitution: StatTypeValue = new StatTypeValue("Constitution", "CON")
    Intelligence: StatTypeValue = new StatTypeValue("Inteligence", "INT")
    Wisdom: StatTypeValue = new StatTypeValue("Wisdom", "WIS")
    Charisma: StatTypeValue = new StatTypeValue("Charisma", "CHA")
    Initiative: StatTypeValue = new StatTypeValue("Initiative", "Init.")
    BaseAttack: StatTypeValue = new StatTypeValue("Base Attack", "BAB")
    Damage: StatTypeValue = new StatTypeValue("Damage", "dmg")
    CMB: StatTypeValue = new StatTypeValue("CMB")
    CMD: StatTypeValue = new StatTypeValue("CMD")
    FortitudeSave: StatTypeValue = new StatTypeValue("Fortitude", "Fort.")
    ReflexSave: StatTypeValue = new StatTypeValue("Reflex", "Ref.")
    WillSave: StatTypeValue = new StatTypeValue("Will")
    ArmourClass: StatTypeValue = new StatTypeValue("AC")
    Shield: StatTypeValue = new StatTypeValue("Shield AC")
    NaturalArmour: StatTypeValue = new StatTypeValue("Natural AC", "Nat. AC")
    AllSaves: StatTypeValue = new StatTypeValue("All Saves", "saves")
}

export class ArmourTypeValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}

class ArmourTypeEnum extends Enum<ArmourTypeValue> {
    constructor() {
        super()
        this.initEnum("ArmourType")
    }

    None: ArmourTypeValue = new ArmourTypeValue("None")
    Light: ArmourTypeValue = new ArmourTypeValue("Light")
    Medium: ArmourTypeValue = new ArmourTypeValue("Medium")
    Heavy: ArmourTypeValue = new ArmourTypeValue("Heavy")
}
//#endregion

//#region exports
export const Alignment: AlignmentEnum = new AlignmentEnum()
export const ArmourType: ArmourTypeEnum = new ArmourTypeEnum()
export const BonusType: BonusTypeEnum = new BonusTypeEnum()
export const Gender: GenderEnum = new GenderEnum()
export const Size: SizeEnum = new SizeEnum()
export const SkillName: SkillNameEnum = new SkillNameEnum()
export const StatType: StatTypeEnum = new StatTypeEnum()

//#endregion