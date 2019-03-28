import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getDexterityBonus } from "./abilityScoreSelectors";
import { getBonusTotal } from "./bonusSelectors";
import { StatType, BonusType, BonusTypeValue } from "../../api/enums";

const getDodgeModifer = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Dodge],
    statToSum: [StatType.ArmourClass]
})
const getDeflectionModifier = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Deflection],
    statToSum: [StatType.ArmourClass]
})
const getArmourAC = (state: CharacterSheetState) => Math.max(state.armour.ac, getBonusTotal(state, {
    includedBonuses: [BonusType.Armour],
    statToSum: [StatType.ArmourClass]
}))
const getShieldAC = (state: CharacterSheetState) => Math.max(state.shield.ac, getBonusTotal(state, {
    includedBonuses: [BonusType.Shield],
    statToSum: [StatType.ArmourClass]
}))
const getNatAC = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.NaturalArmour],
    statToSum: [StatType.ArmourClass]
}) + getBonusTotal(state, {
    includedBonuses: [BonusType.Enhancement],
    statToSum: [StatType.NaturalArmour]
})
const getSizeModifier = (state: CharacterSheetState) => state.character.size.acModifier
const getMaxDex = (state: CharacterSheetState) => state.armour.maxDex

const getArmourCheckPenalty = (state: CharacterSheetState) => state.armour.checkPenalty
const getShieldCheckPenalty = (state: CharacterSheetState) => state.shield.checkPenalty

const calcAC = (dex: number, dodge: number, deflect: number, armour: number, shield: number, nat: number, size: number, maxDex: number) => {
    return 10 + (maxDex !== null ? Math.min(dex, maxDex) : dex) + dodge + deflect + armour + shield + nat + size
}
const calcFlatFooted = (deflect: number, armour: number, shield: number, nat: number, size: number) => {
    return calcAC(0, 0, deflect, armour, shield, nat, size, 0)
}
const calcTouch = (dex: number, dodge: number, deflect: number, size: number, maxDex: number) => {
    return calcAC(dex, dodge, deflect, 0, 0, 0, size, maxDex)
}

export const getArmourPenalty = createSelector([getArmourCheckPenalty, getShieldCheckPenalty], (armour, shield) => armour + shield)

export const getDodgeMod = createSelector([getDodgeModifer], dodge => dodge)
export const getDeflectionMod = createSelector([getDeflectionModifier], deflect => deflect)
export const getArmourMod = createSelector([getArmourAC], armour => armour)
export const getShieldMod = createSelector([getShieldAC], shield => shield)
export const getNatMod = createSelector([getNatAC], nat => nat)
export const getSizeMod = createSelector([getSizeModifier], size => size)
export const getAC = createSelector([getDexterityBonus, getDodgeMod, getDeflectionMod, getArmourMod, getShieldMod, getNatMod, getSizeMod, getMaxDex], calcAC)
export const getFlatFootedAC = createSelector([getDeflectionMod, getArmourMod, getShieldMod, getNatMod, getSizeMod], calcFlatFooted)
export const getTouchAC = createSelector([getDexterityBonus, getDodgeMod, getDeflectionMod, getSizeMod, getMaxDex], calcTouch)