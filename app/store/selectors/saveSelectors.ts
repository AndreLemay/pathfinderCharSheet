import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getConstitutionBonus, getDexterityBonus, getWisdomBonus } from "./abilityScoreSelectors";
import { getBonusTotal } from "./bonusSelectors";
import { StatType, BonusType } from "../../api/enums";

const getBaseFort = (state: CharacterSheetState) => state.saves.baseFortSave
const getBaseReflex = (state: CharacterSheetState) => state.saves.baseReflexSave
const getBaseWill = (state: CharacterSheetState) => state.saves.baseWillSave
const getMiscFort = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Alchemical,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Resistance,
        BonusType.Sacred],
    statToSum: [StatType.FortitudeSave, StatType.AllSaves]
})
const getMiscReflex = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Alchemical,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Resistance,
        BonusType.Sacred],
    statToSum: [StatType.ReflexSave, StatType.AllSaves]
})
const getMiscWill = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Alchemical,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Resistance,
        BonusType.Sacred],
    statToSum: [StatType.WillSave, StatType.AllSaves]
})

const calcSave = (base: number, ability: number, misc: number) => base + ability + misc

export const getFortSave = createSelector([getBaseFort, getConstitutionBonus, getMiscFort], calcSave)
export const getMiscFortSave = createSelector([getMiscFort], fort => fort)
export const getReflexSave = createSelector([getBaseReflex, getDexterityBonus, getMiscReflex], calcSave)
export const getMiscReflexSave = createSelector([getMiscReflex], reflex => reflex)
export const getWillSave = createSelector([getBaseWill, getWisdomBonus, getMiscWill], calcSave)
export const getMiscWillSave = createSelector([getMiscWill], will => will)