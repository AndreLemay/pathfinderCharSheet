import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getDexterityBonus } from "./abilityScoreSelectors";

const getDodgeModifer = (state: CharacterSheetState) => state.armourClass.dodgeModifier
const getDeflectionModifier = (State: CharacterSheetState) => State.armourClass.deflectionModifier
const getArmourAC = (state: CharacterSheetState) => state.armourClass.armourAC
const getShieldAC = (state: CharacterSheetState) => state.armourClass.shieldAC
const getNatAC = (state: CharacterSheetState) => state.armourClass.natArmour
const getSizeModifier = (state: CharacterSheetState) => state.character.size.acModifier

const calcAC = (dex: number, dodge: number, deflect: number, armour: number, shield: number, nat: number, size: number) => {
    return 10 + dex + dodge + deflect + armour + shield + nat + size
}
const calcFlatFooted = (deflect: number, armour: number, shield: number, nat: number, size: number) => {
    return calcAC(0, 0, deflect, armour, shield, nat, size)
}
const calcTouch = (dex: number, dodge: number, deflect: number, size: number) => {
    return calcAC(dex, dodge, deflect, 0, 0, 0, size)
}

export const getDodgeMod = createSelector([getDodgeModifer], (dodge) => dodge)
export const getDeflectionMod = createSelector([getDeflectionModifier], (deflect) => deflect)
export const getArmourMod = createSelector([getArmourAC], (armour) => armour)
export const getShieldMod = createSelector([getShieldAC], (shield) => shield)
export const getNatMod = createSelector([getNatAC], (nat) => nat)
export const getSizeMod = createSelector([getSizeModifier], (size) => size)
export const getAC = createSelector([getDexterityBonus, getDodgeMod, getDeflectionMod, getArmourMod, getShieldMod, getNatMod, getSizeMod], calcAC)
export const getFlatFootedAC = createSelector([getDeflectionMod, getArmourMod, getShieldMod, getNatMod, getSizeMod], calcFlatFooted)
export const getTouchAC = createSelector([getDexterityBonus, getDodgeMod, getDeflectionMod, getSizeMod], calcTouch)