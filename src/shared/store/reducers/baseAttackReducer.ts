import { BaseAttackState } from '../types'
import * as actions from '../actions/baseAttackActions'
import { Reducer } from 'redux'
import { ActionType } from 'typesafe-actions'
import { BaseAttackActionTypes } from '../actions/actionTypes'

const initialState: BaseAttackState = {
	'base': 0
}

const baseAttackReducer: Reducer<BaseAttackState> = (
	state = initialState,
	action: ActionType<typeof actions>
): BaseAttackState => {
	switch (action.type) {
		case BaseAttackActionTypes.BASE_UPDATE: {
			let { base, ...rest } = state

			return { 'base': action.payload, ...rest }
		}
		default:
			return state
	}
}

export default baseAttackReducer
