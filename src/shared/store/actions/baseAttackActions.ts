import { action } from 'typesafe-actions'
import { BaseAttackActionTypes } from './actionTypes'

export const baseUpdate = (base: number) =>
	action(BaseAttackActionTypes.BASE_UPDATE, base)
