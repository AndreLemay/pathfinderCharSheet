import { HealthState } from '../types'
import { Reducer } from 'redux'
import * as actions from '../actions/healthActions'
import { ActionType } from 'typesafe-actions'
import { HealthActionTypes } from '../actions/actionTypes'

const initialState: HealthState = {
	'current': 0,
	'max': 0,
	'temp': 0,
	'nonlethal': 0,
	'damageResistance': '',
	'energyResistance': ''
}

const healthReducer: Reducer<HealthState> = (
	state = initialState,
	action: ActionType<typeof actions>
): HealthState => {
	switch (action.type) {
		case HealthActionTypes.CURRENT_UPDATE: {
			let { current, ...rest } = state

			return { 'current': action.payload, ...rest }
		}
		case HealthActionTypes.MAX_UPDATE: {
			let { max, ...rest } = state

			return { 'max': action.payload, ...rest }
		}
		case HealthActionTypes.TEMP_UPDATE: {
			let { temp, ...rest } = state

			return { 'temp': action.payload, ...rest }
		}
		case HealthActionTypes.NONLETHAL_UPDATE: {
			let { nonlethal, ...rest } = state

			return { 'nonlethal': action.payload, ...rest }
		}
		case HealthActionTypes.DR_UPDATE: {
			let { damageResistance, ...rest } = state

			return { 'damageResistance': action.payload, ...rest }
		}
		case HealthActionTypes.ER_UPDATE: {
			let { energyResistance, ...rest } = state

			return { 'energyResistance': action.payload, ...rest }
		}
		default:
			return state
	}
}

export default healthReducer
