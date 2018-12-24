import { Enum, EnumValue } from "ts-enums"

export class AbilityTypeValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}
class AbilityTypeEnum extends Enum<AbilityTypeValue> {
    constructor() {
        super()
        this.initEnum("AbilityType")
    }

    Strength: AbilityTypeValue = new AbilityTypeValue("STR")
    Dexterity: AbilityTypeValue = new AbilityTypeValue("DEX")
    Constitution: AbilityTypeValue = new AbilityTypeValue("CON")
    Intelligence: AbilityTypeValue = new AbilityTypeValue("INT")
    Wisdom: AbilityTypeValue = new AbilityTypeValue("WIS")
    Charisma: AbilityTypeValue = new AbilityTypeValue("CHA")
}
export const AbilityType: AbilityTypeEnum = new AbilityTypeEnum()

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
export const BonusType: BonusTypeEnum = new BonusTypeEnum()

export class SkillNameValue extends EnumValue {
    constructor(name: string, 
        readonly trainedOnly: boolean, 
        readonly checkPenaltyApplies: boolean,
        readonly bonusFromAbility: AbilityTypeValue) {
        super(name)
    }
}
class SkillNameEnum extends Enum<SkillNameValue> {
    constructor() {
        super()
        this.initEnum("Skill")
    }

    Acrobatics: SkillNameValue = new SkillNameValue("Acrobatics", false, true, AbilityType.Dexterity)
    Appraise: SkillNameValue = new SkillNameValue("Appraise", false, false, AbilityType.Intelligence)
    Bluff: SkillNameValue = new SkillNameValue("Bluff", false, false, AbilityType.Charisma)
    Climb: SkillNameValue = new SkillNameValue("Climb", false, true, AbilityType.Strength)
    Craft: SkillNameValue = new SkillNameValue("Craft", false, false, AbilityType.Intelligence)
    Diplomacy: SkillNameValue = new SkillNameValue("Diplomacy", false, false, AbilityType.Charisma)
    DisableDevice: SkillNameValue = new SkillNameValue("Disable Device", true, true, AbilityType.Dexterity)
    Disguise: SkillNameValue = new SkillNameValue("Disguise", false, false, AbilityType.Charisma)
    EscapeArtist: SkillNameValue = new SkillNameValue("Escape Artist", false, true, AbilityType.Dexterity)
    Fly: SkillNameValue = new SkillNameValue("Fly", false, true, AbilityType.Dexterity)
    HandleAnimal: SkillNameValue = new SkillNameValue("Handle Animal", true, false, AbilityType.Charisma)
    Heal: SkillNameValue = new SkillNameValue("Heal", false, false, AbilityType.Wisdom)
    Intimidate: SkillNameValue = new SkillNameValue("Intimidate", false, false, AbilityType.Charisma)
    KnowledgeArcana: SkillNameValue = new SkillNameValue("Knowledge (Arcana)", true, false, AbilityType.Intelligence)
    KnowledgeDungeoneering: SkillNameValue = new SkillNameValue("Knowledge (Dungeoneering)", true, false, AbilityType.Intelligence)
    KnowledgeEngineering: SkillNameValue = new SkillNameValue("Knowledge (Engineering)", true, false, AbilityType.Intelligence)
    KnowledgeGeography: SkillNameValue = new SkillNameValue("Knowledge (Geography)", true, false, AbilityType.Intelligence)
    KnowledgeHistory: SkillNameValue = new SkillNameValue("Knowledge (History)", true, false, AbilityType.Intelligence)
    KnowledgeLocal: SkillNameValue = new SkillNameValue("Knowledge (Local)", true, false, AbilityType.Intelligence)
    KnowledgeNature: SkillNameValue = new SkillNameValue("Knowledge (Nature)", true, false, AbilityType.Intelligence)
    KnowledgeNobility: SkillNameValue = new SkillNameValue("Knowledge (Nobility)", true, false, AbilityType.Intelligence)
    KnowledgePlanes: SkillNameValue = new SkillNameValue("Knowledge (Planes)", true, false, AbilityType.Intelligence)
    KnowledgeReligion: SkillNameValue = new SkillNameValue("Knowledge (Religion)", true, false, AbilityType.Intelligence)
    Linguistics: SkillNameValue = new SkillNameValue("Linguistics", true, false, AbilityType.Intelligence)
    Perception: SkillNameValue = new SkillNameValue("Perception", false, false, AbilityType.Wisdom)
    Perform: SkillNameValue = new SkillNameValue("Perform", false, false, AbilityType.Charisma)
    Profession: SkillNameValue = new SkillNameValue("Profession", true, false, AbilityType.Wisdom)
    Ride: SkillNameValue = new SkillNameValue("Ride", false, true, AbilityType.Dexterity)
    SenseMotive: SkillNameValue = new SkillNameValue("Sense Motive", false, false, AbilityType.Wisdom)
    SleightOfHand: SkillNameValue = new SkillNameValue("Sleight of Hand", true, true, AbilityType.Dexterity)
    Spellcraft: SkillNameValue = new SkillNameValue("Spellcraft", true, false, AbilityType.Intelligence)
    Stealth: SkillNameValue = new SkillNameValue("Stealth", false, true, AbilityType.Dexterity)
    Survival: SkillNameValue = new SkillNameValue("Survival", false, false, AbilityType.Wisdom)
    Swim: SkillNameValue = new SkillNameValue("Swim", false, false, AbilityType.Strength)
    UseMagicDevice: SkillNameValue = new SkillNameValue("Use Magic Device", true, false, AbilityType.Charisma)
}
export const SkillName: SkillNameEnum = new SkillNameEnum()

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
export const Alignment: AlignmentEnum = new AlignmentEnum()

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
export const Gender: GenderEnum = new GenderEnum()

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
export const Size: SizeEnum = new SizeEnum()

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
export const StatType: StatTypeEnum = new StatTypeEnum()

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
export const ArmourType: ArmourTypeEnum = new ArmourTypeEnum()

export class DamageDieValue extends EnumValue {
    constructor(name: string) {
        super(name)
    }
}
class DamageDieEnum extends Enum<DamageDieValue> {
    constructor() {
        super()
        this.initEnum("DamageDie")
    }

    2: DamageDieValue = new DamageDieValue("2")
    3: DamageDieValue = new DamageDieValue("3")
    4: DamageDieValue = new DamageDieValue("4")
    6: DamageDieValue = new DamageDieValue("6")
    8: DamageDieValue = new DamageDieValue("8")
    10: DamageDieValue = new DamageDieValue("10")
    12: DamageDieValue = new DamageDieValue("12")
    20: DamageDieValue = new DamageDieValue("20")
}
export const DamageDie: DamageDieEnum = new DamageDieEnum()