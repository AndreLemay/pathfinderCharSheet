import {createSelector} from "reselect"
import CharacterSheetState from "../types";

const getBaseStr = (state: CharacterSheetState) => state.abilities.strength.base
const getAddStr = (state: CharacterSheetState) => state.abilities.strength.additional
const getBaseDex = (state: CharacterSheetState) => state.abilities.dexterity.base
const getAddDex = (state: CharacterSheetState) => state.abilities.dexterity.additional
const getBaseCon = (state: CharacterSheetState) => state.abilities.constitution.base
const getAddCon = (state: CharacterSheetState) => state.abilities.constitution.additional
const getBaseInt = (state: CharacterSheetState) => state.abilities.intelligence.base
const getAddInt = (state: CharacterSheetState) => state.abilities.intelligence.additional
const getBaseWis = (state: CharacterSheetState) => state.abilities.wisdom.base
const getAddWis = (state: CharacterSheetState) => state.abilities.wisdom.additional
const getBaseCha = (state: CharacterSheetState) => state.abilities.charisma.base
const getAddCha = (state: CharacterSheetState) => state.abilities.charisma.additional

const calcAbilityBonus = (base: number, additional: number) => Math.floor((base + additional - 10) / 2)

export const getStrengthBonus = createSelector([getBaseStr, getAddStr], calcAbilityBonus)
export const getDexterityBonus = createSelector([getBaseDex, getAddDex], calcAbilityBonus)
export const getConstitutionBonus = createSelector([getBaseCon, getAddCon], calcAbilityBonus)
export const getIntelligenceBonus = createSelector([getBaseInt, getAddInt], calcAbilityBonus)
export const getWisdomBonus = createSelector([getBaseWis, getAddWis], calcAbilityBonus)
export const getCharismaBonus = createSelector([getBaseCha, getAddCha], calcAbilityBonus)