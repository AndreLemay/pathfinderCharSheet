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
    constructor(name: string, readonly trainedOnly: boolean, readonly checkPenaltyApplies: boolean) {
        super(name)
    }
}

class SkillNameEnum extends Enum<SkillNameValue> {
    constructor() {
        super()
        this.initEnum("Skill")
    }

    Acrobatics: SkillNameValue = new SkillNameValue("Acrobatics", false, true)
    Appraise: SkillNameValue = new SkillNameValue("Appraise", false, false)
    Bluff: SkillNameValue = new SkillNameValue("Bluff", false, false)
    Climb: SkillNameValue = new SkillNameValue("Climb", false, true)
    Craft: SkillNameValue = new SkillNameValue("Craft", false, false)
    Diplomacy: SkillNameValue = new SkillNameValue("Diplomacy", false, false)
    DisableDevice: SkillNameValue = new SkillNameValue("Disable Device", true, true)
    Disguise: SkillNameValue = new SkillNameValue("Disguise", false, false)
    EscapeArtist: SkillNameValue = new SkillNameValue("Escape Artist", false, true)
    Fly: SkillNameValue = new SkillNameValue("Fly", false, true)
    HandleAnimal: SkillNameValue = new SkillNameValue("Handle Animal", true, false)
    Heal: SkillNameValue = new SkillNameValue("Heal", false, false)
    Intimidate: SkillNameValue = new SkillNameValue("Intimidate", false, false)
    KnowledgeArcana: SkillNameValue = new SkillNameValue("Knowledge (Arcana)", true, false)
    KnowledgeDungeoneering: SkillNameValue = new SkillNameValue("Knowledge (Dungeoneering)", true, false)
    KnowledgeEngineering: SkillNameValue = new SkillNameValue("Knowledge (Engineering)", true, false)
    KnowledgeGeography: SkillNameValue = new SkillNameValue("Knowledge (Geography)", true, false)
    KnowledgeHistory: SkillNameValue = new SkillNameValue("Knowledge (History)", true, false)
    KnowledgeLocal: SkillNameValue = new SkillNameValue("Knowledge (Local)", true, false)
    KnowledgeNature: SkillNameValue = new SkillNameValue("Knowledge (Nature", true, false)
    KnowledgeNobility: SkillNameValue = new SkillNameValue("Knowledge (Nobility)", true, false)
    KnowledgePlanes: SkillNameValue = new SkillNameValue("Knowledge (Planes)", true, false)
    KnowledgeReligion: SkillNameValue = new SkillNameValue("Knowledge (Religion)", true, false)
    Linguistics: SkillNameValue = new SkillNameValue("Linguistics", true, false)
    Perception: SkillNameValue = new SkillNameValue("Perception", false, false)
    Perform: SkillNameValue = new SkillNameValue("Perform", false, false)
    Profession: SkillNameValue = new SkillNameValue("Profession", true, false)
    Ride: SkillNameValue = new SkillNameValue("Ride", false, true)
    SenseMotive: SkillNameValue = new SkillNameValue("Sense Motive", false, false)
    SleightOfHand: SkillNameValue = new SkillNameValue("Sleight of Hand", true, true)
    Spellcraft: SkillNameValue = new SkillNameValue("Spellcraft", true, false)
    Stealth: SkillNameValue = new SkillNameValue("Stealth", false, true)
    Survival: SkillNameValue = new SkillNameValue("Survival", false, false)
    Swim: SkillNameValue = new SkillNameValue("Swim", false, false)
    UseMagicDevice: SkillNameValue = new SkillNameValue("Use Magic Device", true, false)
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
    constructor(name: string, readonly acModifier: number) {
        super(name)
    }
}

class SizeEnum extends Enum<SizeValue> {
    constructor() {
        super()
        this.initEnum("Size")
    }

    Fine: SizeValue = new SizeValue("Fine", 8)
    Diminiutive: SizeValue = new SizeValue("Diminiutive", 4)
    Tiny: SizeValue = new SizeValue("Tiny", 2)
    Small: SizeValue = new SizeValue("Small", 1)
    Medium: SizeValue = new SizeValue("Medium", 0)
    Large: SizeValue = new SizeValue("Large", -1)
    Huge: SizeValue = new SizeValue("Huge", -2)
    Gargantuan: SizeValue = new SizeValue("Gargantuan", -4)
    Colossal: SizeValue = new SizeValue("Colossal", -8)
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