import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getSizeMod, getDodgeMod, getDeflectionMod } from "./armourClassSelectors";
import { getStrengthBonus, getDexterityBonus } from "./abilityScoreSelectors";
import { getBonusTotal } from "./bonusSelectors";
import { StatType, BonusType } from "../../api/enums";

const getBAB = (state: CharacterSheetState) => state.baseAttack.base
const getMiscCMBonus = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Circumstance,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Sacred],
    statToSum: [StatType.CMB]
})
const getMiscCMDefence = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Circumstance,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Sacred],
    statToSum: [StatType.CMD]
})

const calcCMB = (strBonus: number, bab: number, sizeMod: number, miscCMB: number) => {
    return strBonus + bab - sizeMod + miscCMB
}
const calcCMD = (strBonus: number, dexBonus: number, dodge: number, deflect: number, bab: number, sizeMod: number, miscCMD: number) => {
    return 10 + strBonus + dexBonus + dodge + deflect + bab - sizeMod + miscCMD
}
const calcFlatFooted = (strBonus: number, deflect: number, bab: number, sizeMod: number, miscCMD: number) => {
    return 10 + strBonus + deflect + bab - sizeMod + miscCMD
}

export const getMiscCMB = createSelector([getMiscCMBonus], cmb => cmb)
export const getMiscCMD = createSelector([getMiscCMDefence], cmd => cmd)
export const getCMB = createSelector([getStrengthBonus, getBAB, getSizeMod, getMiscCMBonus], calcCMB)
export const getCMD = createSelector([getStrengthBonus, getDexterityBonus, getDodgeMod, getDeflectionMod, getBAB, getSizeMod, getMiscCMD], calcCMD)
export const getFlatFooted = createSelector([getStrengthBonus, getDeflectionMod, getBAB, getSizeMod, getMiscCMDefence], calcFlatFooted)