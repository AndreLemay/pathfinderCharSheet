import { action } from 'typesafe-actions'
import { ShieldActionTypes } from './actionTypes'

export const nameUpdate = (name: string) =>
	action(ShieldActionTypes.NAME_UPDATE, name)
export const descriptionUpdate = (desc: string) =>
	action(ShieldActionTypes.DESCRIPTION_UPDATE, desc)
export const checkPenaltyUpdate = (penalty: number) =>
	action(ShieldActionTypes.CHECK_PENALTY_UPDATE, penalty)
export const acUpdate = (ac: number) => action(ShieldActionTypes.AC_UPDATE, ac)
