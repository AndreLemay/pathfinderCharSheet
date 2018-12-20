import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getStrengthBonus, getDexterityBonus } from "./abilityScoreSelectors";

const getBaseAttack = (state: CharacterSheetState) => state.baseAttack.base

const calcAttackBonus = (base: number, bonus: number) => base + bonus

export const getMeleeAttackBonus = createSelector([getBaseAttack, getStrengthBonus], calcAttackBonus)
export const getRangedAttackBonus = createSelector([getBaseAttack, getDexterityBonus], calcAttackBonus)