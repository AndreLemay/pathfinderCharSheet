import {
    AlignmentValue, GenderValue, SizeValue, BonusTypeValue, StatTypeValue, SkillNameValue, ArmourTypeValue, DamageDieValue, AbilityTypeValue
} from "../api/enums"

export interface AbilitiesState {
    readonly strength: number
    readonly dexterity: number
    readonly constitution: number
    readonly intelligence: number
    readonly wisdom: number
    readonly charisma: number
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
    readonly uuid: string
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
    readonly uuid: string
    readonly name: string
    readonly description: string
    readonly range: number
    readonly type: string
    readonly dmgDieCount: number
    readonly dmgDie: DamageDieValue
    readonly critRange: number
    readonly critMultiplier: number
    readonly toHitBonusAbility: AbilityTypeValue
    readonly dmgBonusAbility: AbilityTypeValue
    readonly equipId: string
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
    readonly uuid: string
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