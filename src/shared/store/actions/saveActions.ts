import { action } from 'typesafe-actions'
import { SaveActionTypes } from './actionTypes'

export const fortUpdate = (base: number) =>
	action(SaveActionTypes.FORT_UPDATE, base)
export const reflexUpdate = (base: number) =>
	action(SaveActionTypes.REFLEX_UPDATE, base)
export const willUpdate = (base: number) =>
	action(SaveActionTypes.WILL_UPDATE, base)
