import {
    AbilityTypeValue, AlignmentValue, GenderValue, SizeValue, BonusTypeValue, StatTypeValue, SkillNameValue, ArmourTypeValue
} from "../api/enums"
import { EnumValue } from "ts-enums";

export interface AbilityScoreState {
    readonly type: AbilityTypeValue
    readonly base: number
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
}

export interface SaveState {
    readonly baseFortSave: number
    readonly baseReflexSave: number
    readonly baseWillSave: number
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

export default class CharacterSheetState {
    readonly abilities: AbilitiesState
    readonly character: CharacterState
    readonly health: HealthState
    readonly baseAttack: BaseAttackState
    readonly saves: SaveState
    readonly feats: FeatState[]
    readonly skills: { [key: number]: SkillState }
    readonly attacks: AttackState[]
    readonly armour: ArmourState
    readonly shield: ShieldState
    readonly equipment: EquipmentState[]
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

// }