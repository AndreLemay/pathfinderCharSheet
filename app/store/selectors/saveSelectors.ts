import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getConstitutionBonus, getDexterityBonus, getWisdomBonus } from "./abilityScoreSelectors";

const getBaseFort = (state: CharacterSheetState) => state.saves.baseFortSave
const getBaseReflex = (state: CharacterSheetState) => state.saves.baseReflexSave
const getBaseWill = (state: CharacterSheetState) => state.saves.baseWillSave
const getMiscFort = (state: CharacterSheetState) => state.saves.miscFortBonus
const getMiscReflex = (state: CharacterSheetState) => state.saves.miscReflexBonus
const getMiscWill = (state: CharacterSheetState) => state.saves.miscWillBonus

const calcSave = (base: number, ability: number, misc: number) => base + ability + misc

export const getFortSave = createSelector([getBaseFort, getConstitutionBonus, getMiscFort], calcSave)
export const getReflexSave = createSelector([getBaseReflex, getDexterityBonus, getMiscReflex], calcSave)
export const getWillSave = createSelector([getBaseWill, getWisdomBonus, getMiscWill], calcSave)