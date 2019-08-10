import { SaveState } from '../types'
import { Reducer } from 'redux'
import * as actions from '../actions/saveActions'
import { ActionType } from 'typesafe-actions'
import { SaveActionTypes } from '../actions/actionTypes'

const initialState: SaveState = {
	'baseFortSave': 0,
	'baseReflexSave': 0,
	'baseWillSave': 0
}

const saveReducer: Reducer<SaveState> = (
	state = initialState,
	action: ActionType<typeof actions>
): SaveState => {
	switch (action.type) {
		case SaveActionTypes.FORT_UPDATE: {
			let { baseFortSave, ...rest } = state

			return { 'baseFortSave': action.payload, ...rest }
		}
		case SaveActionTypes.REFLEX_UPDATE: {
			let { baseReflexSave, ...rest } = state

			return { 'baseReflexSave': action.payload, ...rest }
		}
		case SaveActionTypes.WILL_UPDATE: {
			let { baseWillSave, ...rest } = state

			return { 'baseWillSave': action.payload, ...rest }
		}
		default:
			return state
	}
}

export default saveReducer
