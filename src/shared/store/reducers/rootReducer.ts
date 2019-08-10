import { combineReducers, Reducer } from 'redux'
import CharacterSheetState, {
	AttackState,
	EquipmentState,
	ValueBonus,
	FeatState
} from '../types'
import abilityScores from './abilityScoreReducer'
import characterState from './characterStateReducer'
import health from './healthReducer'
import baseAttack from './baseAttackReducer'
import saves from './saveReducer'
import feats from './featsReducer'
import skills from './skillsReducer'
import attacks from './attacksReducer'
import armour from './armourReducer'
import shield from './shieldReducer'
import equipment from './equipmentReducer'
import { ActionType } from 'typesafe-actions'
import * as abilityScoreActions from '../actions/abilityScoreActions'
import * as armourActions from '../actions/armourActions'
import * as baseAttackActions from '../actions/baseAttackActions'
import * as characterStateActions from '../actions/characterStateActions'
import * as featActions from '../actions/featActions'
import * as healthActions from '../actions/healthActions'
import * as saveActions from '../actions/saveActions'
import * as shieldActions from '../actions/shieldActions'
import * as skillActions from '../actions/skillActions'
import * as toolbarActions from '../actions/toolbarActions'
import { ToolbarActionTypes } from '../actions/actionTypes'
import {
	ArmourType,
	Alignment,
	Gender,
	Size,
	DamageDie,
	StatType,
	SkillName,
	BonusType,
	AbilityTypeValue,
	AbilityType
} from '../../api/enums'

type RootAction =
	| typeof abilityScoreActions
	| typeof armourActions
	| typeof baseAttackActions
	| typeof characterStateActions
	| typeof featActions
	| typeof healthActions
	| typeof saveActions
	| typeof shieldActions
	| typeof skillActions
	| typeof toolbarActions

const appReducer = combineReducers<CharacterSheetState>({
	abilities: abilityScores,
	character: characterState,
	health,
	baseAttack,
	saves,
	feats,
	skills,
	attacks,
	armour,
	shield,
	equipment
})

const rootReducer: Reducer<CharacterSheetState> = (
	state: CharacterSheetState,
	action: ActionType<RootAction>
) => {
	let savAsState = (obj: any): CharacterSheetState => {
		// fuuuuuck type safety amirite?
		let saveState: CharacterSheetState = {
			abilities: {
				strength: obj.abilities.strength,
				dexterity: obj.abilities.dexterity,
				constitution: obj.abilities.constitution,
				intelligence: obj.abilities.intelligence,
				wisdom: obj.abilities.wisdom,
				charisma: obj.abilities.charisma
			},
			armour: {
				ac: obj.armour.ac,
				checkPenalty: obj.armour.checkPenalty,
				description: obj.armour.description,
				maxDex: obj.armour.maxDex,
				maxSpeed: obj.armour.maxSpeed,
				name: obj.armour.name,
				type: ArmourType.values[obj.armour.type]
			},
			attacks: (obj.attacks as any[]).map(item => {
				let atk: AttackState = {
					uuid: item.uuid,
					critMultiplier: item.critMultiplier,
					critRange: item.critRange,
					description: item.description,
					dmgDie: DamageDie.values[item.dmgDie],
					dmgDieCount: item.dmgDieCount,
					name: item.name,
					range: item.range,
					type: item.type,
					toHitBonusAbility: AbilityType.values[item.toHitBonusAbility],
					dmgBonusAbility: AbilityType.values[item.dmgBonusAbility],
					equipId: item.equipId
				}

				return atk
			}),
			baseAttack: {
				base: obj.baseAttack.base
			},
			character: {
				alignment: Alignment.values[obj.character.alignment],
				gender: Gender.values[obj.character.gender],
				name: obj.character.name,
				race: obj.character.race,
				size: Size.values[obj.character.size]
			},
			equipment: (obj.equipment as any[]).map(item => {
				let equip: EquipmentState = {
					uuid: item.uuid,
					name: item.name,
					description: item.description,
					bonuses: (item.bonuses as any[]).map(bon => {
						let affected =
							bon.affectedType === 'stat'
								? StatType.values[bon.affected]
								: SkillName.values[bon.affected]

						return new ValueBonus(
							affected,
							BonusType.values[bon.bonusType],
							bon.bonusAmount
						)
					})
				}

				return equip
			}),
			feats: (obj.feats as any[]).map(item => {
				let feat: FeatState = {
					uuid: item.uuid,
					name: item.name,
					description: item.description,
					bonuses: (item.bonuses as any[]).map(bon => {
						let affected =
							bon.affectedType === 'stat'
								? StatType.values[bon.affected]
								: SkillName.values[bon.affected]

						return new ValueBonus(
							affected,
							BonusType.values[bon.bonusType],
							bon.bonusAmount
						)
					}),
					active: item.active
				}

				return feat
			}),
			health: {
				current: obj.health.current,
				damageResistance: obj.health.damageResistance,
				energyResistance: obj.health.energyResistance,
				max: obj.health.max,
				nonlethal: obj.health.nonlethal,
				temp: obj.health.temp
			},
			saves: {
				baseFortSave: obj.saves.baseFortSave,
				baseReflexSave: obj.saves.baseReflexSave,
				baseWillSave: obj.saves.baseWillSave
			},
			shield: {
				ac: obj.shield.ac,
				checkPenalty: obj.shield.checkPenalty,
				description: obj.shield.description,
				name: obj.shield.name
			},
			skills: {}
		}

		for (let key in obj.skills) {
			if (saveState.hasOwnProperty(+key)) {
				saveState.skills[+key] = {
					isClassSkill: obj.skills[key].isClassSkill,
					ranks: obj.skills[key].ranks
				}
			}
		}

		return saveState
	}

	switch (action.type) {
		case ToolbarActionTypes.LOAD: {
			return savAsState(action.payload.data)
		}
		default:
			return appReducer(state, action)
	}
}

export default rootReducer
