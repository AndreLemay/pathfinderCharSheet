import { action } from 'typesafe-actions'
import { ArmourActionTypes } from './actionTypes'
import { ArmourTypeValue } from '../../api/enums'

export const nameUpdate = (name: string) =>
	action(ArmourActionTypes.NAME_UPDATE, name)
export const descriptionUpdate = (description: string) =>
	action(ArmourActionTypes.DESCRIPTION_UPDATE, description)
export const typeUpdate = (type: ArmourTypeValue) =>
	action(ArmourActionTypes.TYPE_UPDATE, type)
export const maxSpeedUpdate = (maxSpeed: number) =>
	action(ArmourActionTypes.MAX_SPEED_UPDATE, maxSpeed)
export const maxDexUpdate = (maxDex: number) =>
	action(ArmourActionTypes.MAX_DEX_UPDATE, maxDex)
export const checkPenaltyUpdate = (checkPenalty: number) =>
	action(ArmourActionTypes.CHECK_PENALTY_UPDATE, checkPenalty)
export const acUpdate = (ac: number) => action(ArmourActionTypes.AC_UPDATE, ac)
