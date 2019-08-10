import { SkillState } from '../types'
import { Reducer } from 'redux'
import * as actions from '../actions/skillActions'
import { ActionType } from 'typesafe-actions'
import { SkillActionTypes } from '../actions/actionTypes'
import { SkillName } from '../../api/enums'

const initialState: { [key: number]: SkillState } = SkillName.values.reduce(
	(obj, skill) => {
		obj[skill.ordinal] = {
			'isClassSkill': false,
			'ranks': 0
		}

		return obj
	},
	{} as { [key: number]: SkillState }
)

const skillsReducer: Reducer<{ [key: number]: SkillState }> = (
	state = initialState,
	action: ActionType<typeof actions>
) => {
	switch (action.type) {
		case SkillActionTypes.CLASS_SKILL_UPDATE: {
			let { [action.payload.skillOrd]: skill, ...rest } = state
			let { isClassSkill, ...sRest } = skill
			let newSkill = { 'isClassSkill': action.payload.classSkill, ...sRest }

			return { [action.payload.skillOrd]: newSkill, ...rest }
		}
		case SkillActionTypes.RANKS_UPDATE: {
			let { [action.payload.skillOrd]: skill, ...rest } = state
			let { ranks, ...sRest } = skill
			let newSkill = { 'ranks': action.payload.ranks, ...sRest }

			return { [action.payload.skillOrd]: newSkill, ...rest }
		}
		default:
			return state
	}
}

export default skillsReducer
