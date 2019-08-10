import { action } from 'typesafe-actions'
import { SkillActionTypes } from './actionTypes'
import { OwnProps } from '../../containers/IndividualSkillContainer'

export const classSkillUpdate = (props: OwnProps, classSkill: boolean) =>
	action(SkillActionTypes.CLASS_SKILL_UPDATE, {
		'skillOrd': props.skillOrd,
		classSkill
	})
export const ranksUpdate = (props: OwnProps, ranks: number) =>
	action(SkillActionTypes.RANKS_UPDATE, { 'skillOrd': props.skillOrd, ranks })
