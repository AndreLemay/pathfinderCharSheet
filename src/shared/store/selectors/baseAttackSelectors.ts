import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getStrengthBonus, getDexterityBonus } from "./abilityScoreSelectors";
import { getBonusTotal } from "./bonusSelectors";
import { StatType, BonusType } from "../../api/enums";

const getBaseAttack = (state: CharacterSheetState) => state.baseAttack.base
const getMiscAttack = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Circumstance,
        BonusType.Competence,
        BonusType.Enhancement,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Sacred,
        BonusType.Size],
    statToSum: [StatType.BaseAttack]
})
const getMiscDamage = (state: CharacterSheetState) => getBonusTotal(state, {
    includedBonuses: [BonusType.Enhancement,
            BonusType.Luck,
            BonusType.Morale,
            BonusType.Profane,
            BonusType.Sacred],
    statToSum: [StatType.Damage]
})

const calcAttackBonus = (base: number, bonus: number, misc: number) => base + bonus + misc

export const getDamageBonus = createSelector([getMiscDamage], dmg => dmg)
export const getMiscAttackBonus = createSelector([getMiscAttack], atk => atk)
export const getMeleeAttackBonus = createSelector([getBaseAttack, getStrengthBonus, getMiscAttack], calcAttackBonus)
export const getRangedAttackBonus = createSelector([getBaseAttack, getDexterityBonus, getMiscAttack], calcAttackBonus)