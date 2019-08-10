import { AttackState } from '../types'
import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'
import { addAttack } from '../actions/toolbarActions'
import * as attackActions from '../actions/attackActions'
import * as equipActions from '../actions/equipmentActions'
import {
	ToolbarActionTypes,
	AttackActionTypes,
	EquipmentActionTypes
} from '../actions/actionTypes'

type AttackActions =
	| typeof addAttack
	| typeof attackActions
	| typeof equipActions

const initialState: AttackState[] = []

const attackReducer: Reducer<AttackState[]> = (
	state = initialState,
	action: ActionType<AttackActions>
) => {
	switch (action.type) {
		case ToolbarActionTypes.ADD_ATTACK: {
			return [...state, action.payload.attack]
		}
		case AttackActionTypes.EDIT: {
			return state.map(item => {
				if (item.uuid !== action.payload.attackUuid) return item
				else {
					return {
						'uuid': action.payload.attackUuid,
						'name': action.payload.bundle.name,
						'description': action.payload.bundle.description,
						'range': action.payload.bundle.range,
						'type': action.payload.bundle.type,
						'critRange': action.payload.bundle.critRange,
						'critMultiplier': action.payload.bundle.critMultiplier,
						'dmgDieCount': action.payload.bundle.dmgDieCount,
						'dmgDie': action.payload.bundle.dmgDie,
						'toHitBonusAbility': action.payload.bundle.toHitBonusAbility,
						'dmgBonusAbility': action.payload.bundle.dmgBonusAbility,
						'equipId': action.payload.equipUuid
					}
				}
			})
		}
		case EquipmentActionTypes.EDIT: {
			return state.map(item => {
				if (item.equipId !== action.payload.uuid) return item
				else {
					return {
						...item,
						'name': action.payload.equip.name,
						'description': action.payload.equip.description
					}
				}
			})
		}
		case AttackActionTypes.DELETE: {
			return state.filter(a => a.uuid !== action.payload.attackUuid)
		}
		case EquipmentActionTypes.DELETE: {
			return state.filter(a => a.equipId !== action.payload.uuid)
		}
		default:
			return state
	}
}

export default attackReducer
