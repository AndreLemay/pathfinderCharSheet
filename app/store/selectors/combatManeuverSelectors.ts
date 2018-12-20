import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getSizeMod, getDodgeMod, getDeflectionMod } from "./armourClassSelectors";
import { getStrengthBonus, getDexterityBonus } from "./abilityScoreSelectors";

const getBAB = (state: CharacterSheetState) => state.baseAttack.base
const getMiscCMB = (state: CharacterSheetState) => state.combatManeuvers.miscCMB
const getMiscCMD = (state: CharacterSheetState) => state.combatManeuvers.miscCMD

const calcCMB = (strBonus: number, bab: number, sizeMod: number, miscCMB: number) => {
    return strBonus + bab - sizeMod + miscCMB
}
const calcCMD = (strBonus: number, dexBonus: number, dodge: number, deflect: number, bab: number, sizeMod: number, miscCMD: number) => {
    return 10 + strBonus + dexBonus + dodge + deflect + bab - sizeMod + miscCMD
}
const calcFlatFooted = (strBonus: number, deflect: number, bab: number, sizeMod: number, miscCMD: number) => {
    return 10 + strBonus + deflect + bab - sizeMod + miscCMD
}

export const getCMB = createSelector([getStrengthBonus, getBAB, getSizeMod, getMiscCMB], calcCMB)
export const getCMD = createSelector([getStrengthBonus, getDexterityBonus, getDodgeMod, getDeflectionMod, getBAB, getSizeMod, getMiscCMD], calcCMD)
export const getFlatFooted = createSelector([getStrengthBonus, getDeflectionMod, getBAB, getSizeMod, getMiscCMD], calcFlatFooted)