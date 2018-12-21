import {
    AbilityTypeValue, AlignmentValue, GenderValue, SizeValue, BonusTypeValue, StatTypeValue, SkillNameValue, ArmourTypeValue
} from "../api/enums"
import { EnumValue } from "ts-enums";

export interface AbilityScoreState {
    readonly type: AbilityTypeValue
    readonly base: number
    readonly additional: number
}

export interface AbilitiesState {
    readonly strength: AbilityScoreState
    readonly dexterity: AbilityScoreState
    readonly constitution: AbilityScoreState
    readonly intelligence: AbilityScoreState
    readonly wisdom: AbilityScoreState
    readonly charisma: AbilityScoreState
}

export interface CharacterState {
    readonly name: string
    readonly alignment: AlignmentValue
    readonly gender: GenderValue
    readonly race: string
    readonly size: SizeValue
}

export interface HealthState {
    readonly current: number
    readonly max: number
    readonly temp: number
    readonly nonlethal: number
    readonly damageResistance: string
    readonly energyResistance: string
}

export interface BaseAttackState {
    readonly base: number
    readonly miscBonus: number
}

export interface SaveState {
    readonly baseFortSave: number
    readonly miscFortBonus: number
    readonly baseReflexSave: number
    readonly miscReflexBonus: number
    readonly baseWillSave: number
    readonly miscWillBonus: number
}

export interface FeatState {
    readonly name: string
    readonly description: string
    readonly bonuses: ValueBonus[]
    readonly active: boolean
}

export interface SkillState {
    readonly isClassSkill: boolean
    readonly ranks: number
    readonly miscBonus: number
    readonly featBonus: number
    readonly armourPenalty: number
}

export interface AttackState {
    readonly name: string
    readonly description: string
    readonly range: string
    readonly type: string
    readonly damage: string
    readonly critical: string
}

export interface ArmourState {
    readonly name: string
    readonly description: string
    readonly type: ArmourTypeValue
    readonly maxSpeed: number
    readonly maxDex: number
    readonly checkPenalty: number
    readonly ac: number
}

export interface ShieldState {
    readonly name: string
    readonly description: string
    readonly checkPenalty: number
    readonly ac: number
}

export interface EquipmentState {
    readonly name: string
    readonly description: string
    readonly bonuses: ValueBonus[]
}

//temporary until everything is set up to be calculated
export interface ArmourClassState {
    readonly dodgeModifier: number
    readonly deflectionModifier: number
    readonly armourAC: number
    readonly shieldAC: number
    readonly natArmour: number
}

export interface CombatManeuverState {
    readonly miscCMB: number
    readonly miscCMD: number
}

export interface InitiativeState {
    readonly miscInitiative: number
}

export default class CharacterSheetState {
    readonly abilities: AbilitiesState
    readonly character: CharacterState
    readonly health: HealthState
    readonly baseAttack: BaseAttackState
    readonly saves: SaveState
    readonly feats: FeatState[]
    readonly skills: { [key: number]: SkillState }
    readonly armourClass: ArmourClassState
    readonly combatManeuvers: CombatManeuverState
    readonly attacks: AttackState[]
    readonly armour: ArmourState
    readonly shield: ShieldState
    readonly equipment: EquipmentState[]
    readonly initiative: InitiativeState
}

export class ValueBonus {
    constructor(readonly affected: StatTypeValue | SkillNameValue,
        readonly bonusType: BonusTypeValue,
        readonly bonusAmount: number) {
    }

    asString(short?: boolean): string {
        var retStr = ""

        //amount
        retStr += (this.bonusAmount > 0 ? "+" : "") + this.bonusAmount + " "

        //type
        if (!short) {
            retStr += this.bonusType.description + " bonus to "
        }

        //affected stat
        if (this.affected instanceof StatTypeValue)
            retStr += short ? this.affected.shortName : this.affected.description
        else
            retStr += this.affected.description

        return retStr
    }
}

// export class Skill {
//     isClassSkill: boolean = false
//     ranks: number = 0

//     constructor(
//         readonly skillName: enums.SkillNameValue,
//         readonly trained: boolean,
//         readonly abilityBonus: () => number,
//         readonly miscBonus: (skill: enums.SkillNameValue, ...bonuses: enums.BonusTypeValue[]) => number,
//         readonly featBonus: (skill: enums.SkillNameValue, ...bonuses: enums.BonusTypeValue[]) => number,
//         readonly armourPenalty: () => number = () => { return null }, ) { }

//     //need a noargs version of this so the renderer process can call it without being able to pass arguments
//     calcMiscBonus = (): number => {
//         return this.miscBonus(this.skillName,
//             enums.BonusType.Circumstance,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred)
//     }

//     calcFeatBonus = (): number => {
//         return this.featBonus(this.skillName,
//             enums.BonusType.Circumstance,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred)
//     }

//     calcSkillBonus = (): number => {
//         if (this.trained && this.ranks === 0) return null

//         return this.abilityBonus() + (this.isClassSkill && this.ranks > 0 ? 3 : 0) + this.ranks + this.calcFeatBonus()
//             + this.armourPenalty() //expecting this be be negative, so we want to add 
//             + this.calcMiscBonus()
//     }
// }

// export class CharacterSheet {
//     calcAdditionalStrength = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.Strength],
//             enums.BonusType.Alchemical,
//             enums.BonusType.Enhancement,
//             enums.BonusType.Inherent,
//             enums.BonusType.Morale) +
//             this.sumFeatStatBonuses([enums.StatType.Strength],
//                 enums.BonusType.Alchemical,
//                 enums.BonusType.Enhancement,
//                 enums.BonusType.Inherent,
//                 enums.BonusType.Morale)
//     }
//     //Initiative
//     calcMiscInitiative = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.Initiative]) + this.sumFeatStatBonuses([enums.StatType.Initiative])
//     }
//     calcInitiative = (): number => {
//         return this.calcDexterityBonus() + this.calcMiscInitiative()
//     }

//     //Armour Class
//     calcNatAC = () => {
//         return Math.max(this.sumEquipmentStatBonuses([enums.StatType.ArmourClass], enums.BonusType.NaturalArmour), 
//                 this.sumFeatStatBonuses([enums.StatType.ArmourClass], enums.BonusType.NaturalArmour)) +
//             Math.max(this.sumEquipmentStatBonuses([enums.StatType.NaturalArmour], enums.BonusType.Enhancement),
//                 this.sumFeatStatBonuses([enums.StatType.NaturalArmour], enums.BonusType.Enhancement))
//     }
//     tempAC: number = 0
//     spellRes: number = 0
//     calcAC = (): number => {
//         return 10 + Math.min(this.calcDexterityBonus(), this.armour.maxDEX) + this.calcDodgeBonus() + this.calcDeflectionBonus()
//             + this.calcArmourAC() + this.calcShieldAC() + this.calcNatAC() + this.sizeModifier + this.tempAC
//     }
//     private calcArmourAC = (): number => {
//         return Math.max(this.armour.acBonus, this.sumEquipmentStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Armour), this.sumFeatStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Armour))
//     }
//     private calcShieldAC = (): number => {
//         return Math.max(this.shield.acBonus, this.sumEquipmentStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Shield), this.sumFeatStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Shield))
//     }
//     calcFlatFootedAC = (): number => {
//         return 10 + this.calcDeflectionBonus() + this.calcArmourAC() + this.calcShieldAC() + this.calcNatAC() + this.sizeModifier + this.tempAC
//     }
//     calcTouchAC = (): number => {
//         return 10 + this.calcDexterityBonus() + this.calcDodgeBonus() + this.calcDeflectionBonus() + this.sizeModifier + this.tempAC
//     }

//     //Combat Manoeuvres
//     calcMiscCMB = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.CMB],
//             enums.BonusType.Circumstance,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.CMB],
//                 enums.BonusType.Circumstance,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Sacred)
//     }
//     tempCMB: number = 0
//     calcCMB = (): number => {
//         return this.calcStrengthBonus() + this.baseAttackBonus - this.sizeModifier + this.calcMiscCMB() + this.tempCMB
//     }
//     calcMiscCMD = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.CMD],
//             enums.BonusType.Circumstance,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.CMD],
//                 enums.BonusType.Circumstance,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Sacred)
//     }
//     tempCMD: number = 0
//     calcCMD = (): number => {
//         return 10 + this.calcStrengthBonus() + this.calcDexterityBonus() + this.calcDodgeBonus() + this.calcDeflectionBonus()
//             + this.baseAttackBonus - this.sizeModifier + this.calcMiscCMD() + this.tempCMD
//     }
//     calcFlatFootedCMD = (): number => {
//         return 10 + this.calcStrengthBonus() + this.calcDeflectionBonus() + this.baseAttackBonus - this.sizeModifier
//             + this.calcMiscCMD() + this.tempCMD
//     }

//     //Hit Points
//     maxHP: number = 0
//     currentHP: number = 0
//     tempHP: number = 0
//     nonLethalHP: number = 0
//     damageReduction: string = ""
//     energyRes: string = ""

//     //BAB
//     baseAttackBonus: number = 0
//     calcMeleeAttackBonus = (): number => {
//         return this.baseAttackBonus + this.calcStrengthBonus() + this.calcMiscAttackBonus()
//     }
//     calcRangedAttackBonus = (): number => {
//         return this.baseAttackBonus + this.calcDexterityBonus() + this.calcMiscAttackBonus()
//     }
//     calcMiscAttackBonus = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.BaseAttack],
//             enums.BonusType.Circumstance,
//             enums.BonusType.Competence,
//             enums.BonusType.Enhancement,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred,
//             enums.BonusType.Size) +
//             this.sumFeatStatBonuses([enums.StatType.BaseAttack],
//                 enums.BonusType.Circumstance,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Enhancement,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Sacred,
//                 enums.BonusType.Size)
//     }
//     calcMiscDamageBonus = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.Damage],
//             enums.BonusType.Enhancement,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.Damage],
//                 enums.BonusType.Enhancement,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Sacred)
//     }

//     //modifiers
//     calcDodgeBonus = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Dodge);
//     }
//     calcDeflectionBonus = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.ArmourClass], enums.BonusType.Deflection);
//     }
//     sizeModifier: number = 0

//     //Saves
//     baseFortSave: number = 0
//     calcMiscFortSave = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.FortitudeSave, enums.StatType.AllSaves],
//             enums.BonusType.Alchemical,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Resistance,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.FortitudeSave, enums.StatType.AllSaves],
//                 enums.BonusType.Alchemical,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Resistance,
//                 enums.BonusType.Sacred)
//     }
//     calcFortSave = (): number => {
//         return this.baseFortSave + this.calcConstitutionBonus() + this.calcMiscFortSave()
//     }
//     baseReflexSave: number = 0
//     calcMiscReflexSave = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.ReflexSave, enums.StatType.AllSaves],
//             enums.BonusType.Alchemical,
//             enums.BonusType.Competence,
//             enums.BonusType.Dodge,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Resistance,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.ReflexSave, enums.StatType.AllSaves],
//                 enums.BonusType.Alchemical,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Dodge,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Resistance,
//                 enums.BonusType.Sacred)
//     }
//     calcReflexSave = (): number => {
//         return this.baseReflexSave + this.calcDexterityBonus() + this.calcMiscReflexSave()
//     }
//     baseWillSave: number = 0
//     calcMiscWillSave = (): number => {
//         return this.sumEquipmentStatBonuses([enums.StatType.WillSave, enums.StatType.AllSaves],
//             enums.BonusType.Alchemical,
//             enums.BonusType.Competence,
//             enums.BonusType.Insight,
//             enums.BonusType.Luck,
//             enums.BonusType.Morale,
//             enums.BonusType.Profane,
//             enums.BonusType.Resistance,
//             enums.BonusType.Sacred) +
//             this.sumFeatStatBonuses([enums.StatType.WillSave, enums.StatType.AllSaves],
//                 enums.BonusType.Alchemical,
//                 enums.BonusType.Competence,
//                 enums.BonusType.Insight,
//                 enums.BonusType.Luck,
//                 enums.BonusType.Morale,
//                 enums.BonusType.Profane,
//                 enums.BonusType.Resistance,
//                 enums.BonusType.Sacred)
//     }
//     calcWillSave = (): number => {
//         return this.baseWillSave + this.calcWisdomBonus() + this.calcMiscWillSave()
//     }

//     //equipment (default to "none")
//     armour: Armour = new Armour("No Armour", "")
//     shield: Shield = new Shield("No Shield", "")

//     calcArmourCheckPenalty = (): number => {
//         return this.armour.checkPenalty + this.shield.checkPenalty
//     }

//     private sumBonuses = (from: Equipment[], statToSum: EnumValue[], ...includedBonuses: enums.BonusTypeValue[]): number => {
//         var add = 0
//         var bonusesByType: { [key: number]: ValueBonus[] } = {}

//         //initialize types dictionary based on what's included
//         if (includedBonuses.length > 0) {
//             includedBonuses.forEach((type: enums.BonusTypeValue) => {
//                 bonusesByType[type.ordinal] = []
//             })

//             //these affect everything, so just add them always
//             bonusesByType[enums.BonusType.Racial.ordinal] = []
//             bonusesByType[enums.BonusType.Trait.ordinal] = []
//         }
//         else {
//             enums.BonusType.values.forEach((type: enums.BonusTypeValue) => {
//                 includedBonuses.push(type)
//                 bonusesByType[type.ordinal] = []
//             })
//         }

//         //sort all equipment bonuses into their respective buckets
//         from.forEach((item) => {
//             item.bonuses.forEach((bonus) => {
//                 if (bonusesByType[bonus.bonusType.ordinal] !== undefined && statToSum.indexOf(bonus.affected) >= 0)
//                     bonusesByType[bonus.bonusType.ordinal].push(bonus)
//             })
//         })

//         add = includedBonuses.reduce((sum: number, type: enums.BonusTypeValue) => {
//             if (includedBonuses.length === 0 || type.stacksWithSelf)
//                 return sum + bonusesByType[type.ordinal].reduce((acc: number, cur: ValueBonus) => {
//                     return acc + cur.bonusAmount
//                 }, 0)
//             else
//                 return sum + bonusesByType[type.ordinal].reduce((acc: number, cur: ValueBonus) => {
//                     return Math.max(acc, cur.bonusAmount)
//                 }, 0)
//         }, 0)

//         return add
//     }

//     //equipment
//     equipment: Equipment[] = []

//     //if no bonuses are included, assume all bonus types apply
//     private sumEquipmentStatBonuses = (statToSum: enums.StatTypeValue[], ...includedBonuses: enums.BonusTypeValue[]): number => {
//         return this.sumBonuses(this.equipment, statToSum, ...includedBonuses)
//     }

//     //if no bonuses are included, assume all bonus types apply
//     private sumEquipmentSkillBonuses = (statToSum: enums.SkillNameValue, ...includedBonuses: enums.BonusTypeValue[]): number => {
//         return this.sumBonuses(this.equipment, [statToSum], ...includedBonuses)
//     }

//     feats: Feat[] = []

//     //if no bonuses are included, assume all bonus types apply
//     private sumFeatStatBonuses = (statToSum: enums.StatTypeValue[], ...includedBonuses: enums.BonusTypeValue[]): number => {
//         return this.sumBonuses(this.feats.filter((item) => { return item.active }), statToSum, ...includedBonuses)
//     }

//     //if no bonuses are included, assume all bonus types apply
//     private sumFeatSkillBonuses = (statToSum: enums.SkillNameValue, ...includedBonuses: enums.BonusTypeValue[]): number => {
//         return this.sumBonuses(this.feats.filter((item) => { return item.active }), [statToSum], ...includedBonuses)
//     }

//     //skills
//     skills: { [name: number]: Skill } = {
//         [enums.SkillName.Acrobatics.ordinal]: new Skill(enums.SkillName.Acrobatics, false,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Appraise.ordinal]: new Skill(enums.SkillName.Appraise, false,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Bluff.ordinal]: new Skill(enums.SkillName.Bluff, false,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Climb.ordinal]: new Skill(enums.SkillName.Climb, false,
//             this.calcStrengthBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Craft.ordinal]: new Skill(enums.SkillName.Craft, false,
//             this.calcIntelligenceBonus, this.sumFeatSkillBonuses, this.sumEquipmentSkillBonuses),
//         [enums.SkillName.Diplomacy.ordinal]: new Skill(enums.SkillName.Diplomacy, false,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.DisableDevice.ordinal]: new Skill(enums.SkillName.DisableDevice, true,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Disguise.ordinal]: new Skill(enums.SkillName.Disguise, false,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.EscapeArtist.ordinal]: new Skill(enums.SkillName.EscapeArtist, false,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Fly.ordinal]: new Skill(enums.SkillName.Fly, false,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.HandleAnimal.ordinal]: new Skill(enums.SkillName.HandleAnimal, true,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Heal.ordinal]: new Skill(enums.SkillName.Heal, false,
//             this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Intimidate.ordinal]: new Skill(enums.SkillName.Intimidate, false,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeArcana.ordinal]: new Skill(enums.SkillName.KnowledgeArcana, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeDungeoneering.ordinal]: new Skill(enums.SkillName.KnowledgeDungeoneering, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeEngineering.ordinal]: new Skill(enums.SkillName.KnowledgeEngineering, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeGeography.ordinal]: new Skill(enums.SkillName.KnowledgeGeography, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeHistory.ordinal]: new Skill(enums.SkillName.KnowledgeHistory, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeLocal.ordinal]: new Skill(enums.SkillName.KnowledgeLocal, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeNature.ordinal]: new Skill(enums.SkillName.KnowledgeNature, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeNobility.ordinal]: new Skill(enums.SkillName.KnowledgeNobility, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgePlanes.ordinal]: new Skill(enums.SkillName.KnowledgePlanes, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.KnowledgeReligion.ordinal]: new Skill(enums.SkillName.KnowledgeReligion, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Linguistics.ordinal]: new Skill(enums.SkillName.Linguistics, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Perception.ordinal]: new Skill(enums.SkillName.Perception, false,
//             this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Perform.ordinal]: new Skill(enums.SkillName.Perform, false,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Profession.ordinal]: new Skill(enums.SkillName.Profession, true,
//             this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Ride.ordinal]: new Skill(enums.SkillName.Ride, false,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.SenseMotive.ordinal]: new Skill(enums.SkillName.SenseMotive, false,
//             this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.SleightOfHand.ordinal]: new Skill(enums.SkillName.SleightOfHand, true,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Spellcraft.ordinal]: new Skill(enums.SkillName.Spellcraft, true,
//             this.calcIntelligenceBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Stealth.ordinal]: new Skill(enums.SkillName.Stealth, false,
//             this.calcDexterityBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.Survival.ordinal]: new Skill(enums.SkillName.Survival, false,
//             this.calcWisdomBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses),
//         [enums.SkillName.Swim.ordinal]: new Skill(enums.SkillName.Swim, false, 
//             this.calcStrengthBonus, this.sumEquipmentSkillBonuses, this.calcArmourCheckPenalty),
//         [enums.SkillName.UseMagicDevice.ordinal]: new Skill(enums.SkillName.UseMagicDevice, true,
//             this.calcCharismaBonus, this.sumEquipmentSkillBonuses, this.sumFeatSkillBonuses)
//     }
// }