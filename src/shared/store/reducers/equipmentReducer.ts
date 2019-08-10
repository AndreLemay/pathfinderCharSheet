import { EquipmentState } from '../types'
import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'
import { addEquip, addAttack } from '../actions/toolbarActions'
import * as attackActions from '../actions/attackActions'
import * as equipActions from '../actions/equipmentActions'
import {
	ToolbarActionTypes,
	EquipmentActionTypes,
	AttackActionTypes
} from '../actions/actionTypes'

type ActionsType =
	| typeof addEquip
	| typeof addAttack
	| typeof equipActions
	| typeof attackActions

const intialState: EquipmentState[] = []

const equipmentReducer: Reducer<EquipmentState[]> = (
	state = intialState,
	action: ActionType<ActionsType>
) => {
	switch (action.type) {
		case ToolbarActionTypes.ADD_EQUIP: {
			return [...state, action.payload]
		}
		case ToolbarActionTypes.ADD_ATTACK: {
			return [...state, action.payload.equip]
		}
		case AttackActionTypes.EDIT: {
			return state.map(item => {
				if (item.uuid !== action.payload.equipUuid) return item
				else {
					return {
						'uuid': action.payload.equipUuid,
						'name': action.payload.bundle.name,
						'description': action.payload.bundle.description,
						'bonuses': action.payload.bundle.bonuses
					}
				}
			})
		}
		case EquipmentActionTypes.EDIT: {
			return state.map(item => {
				if (item.uuid !== action.payload.uuid) return item
				else {
					return {
						'uuid': action.payload.uuid,
						...action.payload.equip
					}
				}
			})
		}
		case AttackActionTypes.DELETE: {
			return state.filter(e => e.uuid !== action.payload.equipUuid)
		}
		case EquipmentActionTypes.DELETE: {
			return state.filter(e => e.uuid !== action.payload.uuid)
		}
		default:
			return state
	}
}

export default equipmentReducer
