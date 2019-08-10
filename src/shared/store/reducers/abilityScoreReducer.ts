import { Reducer } from 'redux'
import { AbilitiesState } from '../types'
import { AbilityScoreActionTypes } from '../actions/actionTypes'
import * as actions from '../actions/abilityScoreActions'
import { ActionType } from 'typesafe-actions'

const initialState: AbilitiesState = {
	'strength': 10,
	'dexterity': 10,
	'constitution': 10,
	'intelligence': 10,
	'wisdom': 10,
	'charisma': 10
}

const abilityScoreReducer: Reducer<AbilitiesState> = (
	state = initialState,
	action: ActionType<typeof actions>
): AbilitiesState => {
	switch (action.type) {
		case AbilityScoreActionTypes.STRENGTH_UPDATE: {
			let { strength, ...rest } = state

			return { ...rest, 'strength': action.payload }
		}
		case AbilityScoreActionTypes.DEXTERITY_UPDATE: {
			let { dexterity, ...rest } = state

			return { ...rest, 'dexterity': action.payload }
		}
		case AbilityScoreActionTypes.CONSTITUTION_UPDATE: {
			let { constitution, ...rest } = state

			return { ...rest, 'constitution': action.payload }
		}
		case AbilityScoreActionTypes.INTELLIGENCE_UPDATE: {
			let { intelligence, ...rest } = state

			return { ...rest, 'intelligence': action.payload }
		}
		case AbilityScoreActionTypes.WISDOM_UPDATE: {
			let { wisdom, ...rest } = state

			return { ...rest, 'wisdom': action.payload }
		}
		case AbilityScoreActionTypes.CHARISMA_UPDATE: {
			let { charisma, ...rest } = state

			return { ...rest, 'charisma': action.payload }
		}
		default:
			return state
	}
}

export default abilityScoreReducer
