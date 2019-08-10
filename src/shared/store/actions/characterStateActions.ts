import { action } from 'typesafe-actions'
import { CharacterStateActionTypes } from './actionTypes'
import { AlignmentValue, GenderValue, SizeValue } from '../../api/enums'

export const nameUpdate = (name: string) =>
	action(CharacterStateActionTypes.NAME_UPDATE, name)
export const alignmentUpdate = (align: AlignmentValue) =>
	action(CharacterStateActionTypes.ALIGNMENT_UPDATE, align)
export const genderUpdate = (gender: GenderValue) =>
	action(CharacterStateActionTypes.GENDER_UPDATE, gender)
export const raceUpdate = (race: string) =>
	action(CharacterStateActionTypes.RACE_UPDATE, race)
export const sizeUpdate = (size: SizeValue) =>
	action(CharacterStateActionTypes.SIZE_UPDATE, size)
