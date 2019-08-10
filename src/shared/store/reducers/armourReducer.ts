import { Reducer } from 'redux'
import * as actions from '../actions/armourActions'
import { ArmourState } from '../types'
import { ArmourType } from '../../api/enums'
import { ActionType } from 'typesafe-actions'
import { ArmourActionTypes } from '../actions/actionTypes'

const initialState: ArmourState = {
	'name': 'No Armour',
	'description': '',
	'type': ArmourType.None,
	'maxSpeed': null,
	'maxDex': null,
	'checkPenalty': 0,
	'ac': 0
}

const armourReducer: Reducer<ArmourState> = (
	state = initialState,
	action: ActionType<typeof actions>
) => {
	switch (action.type) {
		case ArmourActionTypes.NAME_UPDATE: {
			let { name, ...rest } = state

			return { 'name': action.payload, ...rest }
		}
		case ArmourActionTypes.DESCRIPTION_UPDATE: {
			let { description, ...rest } = state

			return { 'description': action.payload, ...rest }
		}
		case ArmourActionTypes.TYPE_UPDATE: {
			let { type, ...rest } = state

			return { 'type': action.payload, ...rest }
		}
		case ArmourActionTypes.MAX_SPEED_UPDATE: {
			let { maxSpeed, ...rest } = state

			return { 'maxSpeed': action.payload, ...rest }
		}
		case ArmourActionTypes.MAX_DEX_UPDATE: {
			let { maxDex, ...rest } = state

			return { 'maxDex': action.payload, ...rest }
		}
		case ArmourActionTypes.CHECK_PENALTY_UPDATE: {
			let { checkPenalty, ...rest } = state

			return { 'checkPenalty': action.payload, ...rest }
		}
		case ArmourActionTypes.AC_UPDATE: {
			let { ac, ...rest } = state

			return { 'ac': action.payload, ...rest }
		}
		default:
			return state
	}
}

export default armourReducer
