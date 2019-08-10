import { action } from 'typesafe-actions'
import { HealthActionTypes } from './actionTypes'

export const currentUpdate = (current: number) =>
	action(HealthActionTypes.CURRENT_UPDATE, current)
export const maxUpdate = (max: number) =>
	action(HealthActionTypes.MAX_UPDATE, max)
export const tempUpdate = (temp: number) =>
	action(HealthActionTypes.TEMP_UPDATE, temp)
export const nonlethalUpdate = (nonlethal: number) =>
	action(HealthActionTypes.NONLETHAL_UPDATE, nonlethal)
export const drUpdate = (dr: string) => action(HealthActionTypes.DR_UPDATE, dr)
export const erUpdate = (er: string) => action(HealthActionTypes.ER_UPDATE, er)
