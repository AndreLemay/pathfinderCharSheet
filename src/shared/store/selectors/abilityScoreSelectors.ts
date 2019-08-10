import { createSelector } from 'reselect'
import CharacterSheetState from '../types'
import { getBonusTotal } from './bonusSelectors'
import { BonusType, StatType } from '../../api/enums'

const getBaseStr = (state: CharacterSheetState) => state.abilities.strength
const getAddStr = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Strength]
	})
const getBaseDex = (state: CharacterSheetState) => state.abilities.dexterity
const getAddDex = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Dexterity]
	})
const getBaseCon = (state: CharacterSheetState) => state.abilities.constitution
const getAddCon = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Constitution]
	})
const getBaseInt = (state: CharacterSheetState) => state.abilities.intelligence
const getAddInt = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Intelligence]
	})
const getBaseWis = (state: CharacterSheetState) => state.abilities.wisdom
const getAddWis = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Wisdom]
	})
const getBaseCha = (state: CharacterSheetState) => state.abilities.charisma
const getAddCha = (state: CharacterSheetState) =>
	getBonusTotal(state, {
		'includedBonuses': [
			BonusType.Alchemical,
			BonusType.Enhancement,
			BonusType.Inherent,
			BonusType.Morale
		],
		'statToSum': [StatType.Charisma]
	})

const calcAbilityBonus = (base: number, additional: number) =>
	Math.floor((base + additional - 10) / 2)

export const getStrengthBonus = createSelector(
	[getBaseStr, getAddStr],
	calcAbilityBonus
)
export const getDexterityBonus = createSelector(
	[getBaseDex, getAddDex],
	calcAbilityBonus
)
export const getConstitutionBonus = createSelector(
	[getBaseCon, getAddCon],
	calcAbilityBonus
)
export const getIntelligenceBonus = createSelector(
	[getBaseInt, getAddInt],
	calcAbilityBonus
)
export const getWisdomBonus = createSelector(
	[getBaseWis, getAddWis],
	calcAbilityBonus
)
export const getCharismaBonus = createSelector(
	[getBaseCha, getAddCha],
	calcAbilityBonus
)
export const getAdditionalStrength = createSelector(
	[getAddStr],
	add => add
)
export const getAdditionalDexterity = createSelector(
	[getAddDex],
	add => add
)
export const getAdditionalConstitution = createSelector(
	[getAddCon],
	add => add
)
export const getAdditionalIntelligence = createSelector(
	[getAddInt],
	add => add
)
export const getAdditionalWisdom = createSelector(
	[getAddWis],
	add => add
)
export const getAdditionalCharisma = createSelector(
	[getAddCha],
	add => add
)
