import { AbilityScoreActionTypes } from './actionTypes'
import { action } from 'typesafe-actions'

export const strengthUpdate = (base: number) =>
	action(AbilityScoreActionTypes.STRENGTH_UPDATE, base)
export const dexterityUpdate = (base: number) =>
	action(AbilityScoreActionTypes.DEXTERITY_UPDATE, base)
export const constitutionUpdate = (base: number) =>
	action(AbilityScoreActionTypes.CONSTITUTION_UPDATE, base)
export const intelligenceUpdate = (base: number) =>
	action(AbilityScoreActionTypes.INTELLIGENCE_UPDATE, base)
export const wisdomUpdate = (base: number) =>
	action(AbilityScoreActionTypes.WISDOM_UPDATE, base)
export const charismaUpdate = (base: number) =>
	action(AbilityScoreActionTypes.CHARISMA_UPDATE, base)
