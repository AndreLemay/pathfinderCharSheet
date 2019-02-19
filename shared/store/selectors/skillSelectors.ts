import { AbilityType, SkillName, BonusType, StatType } from "../../api/enums";
import CharacterSheetState from "../types";
import { getStrengthBonus, getDexterityBonus, getConstitutionBonus, getIntelligenceBonus, getWisdomBonus, getCharismaBonus } from "./abilityScoreSelectors";
import { createSelector } from "reselect";
import { OwnProps } from "../../containers/IndividualSkillContainer";
import { getBonusTotal } from "./bonusSelectors";

const getAbilityBonus = (state: CharacterSheetState, props: OwnProps) => {
    switch (SkillName.values[props.skillOrd].bonusFromAbility) {
        case AbilityType.Strength: {
            return getStrengthBonus(state)
        }
        case AbilityType.Dexterity: {
            return getDexterityBonus(state)
        }
        case AbilityType.Constitution: {
            return getConstitutionBonus(state)
        }
        case AbilityType.Intelligence: {
            return getIntelligenceBonus(state)
        }
        case AbilityType.Wisdom: {
            return getWisdomBonus(state)
        }
        case AbilityType.Charisma: {
            return getCharismaBonus(state)
        }
    }
}
const getClassSkill = (state: CharacterSheetState, props: OwnProps) => state.skills[props.skillOrd].isClassSkill
const getRanks = (state: CharacterSheetState, props: OwnProps) => state.skills[props.skillOrd].ranks
const getMiscBonus = (state: CharacterSheetState, props: OwnProps) => getBonusTotal(state, {
    includedBonuses: [BonusType.Circumstance,
        BonusType.Competence,
        BonusType.Insight,
        BonusType.Luck,
        BonusType.Morale,
        BonusType.Profane,
        BonusType.Sacred],
    statToSum: [SkillName.values[props.skillOrd]]
})
const getArmourPenalty = (state: CharacterSheetState, props: OwnProps) => 
    SkillName.values[props.skillOrd].checkPenaltyApplies ? state.armour.checkPenalty + state.shield.checkPenalty : 0

const calcSkillBonus = (abilityBonus: number, ranks: number, miscBonus: number,
    armourPenalty: number, isClassSkill: boolean) => {
    return abilityBonus + (isClassSkill && ranks > 0 ? 3 : 0) + ranks + miscBonus 
        + armourPenalty //expecting this be be negative, so we want to add 
}

export const makeGetSkillBonus = () => {
    return createSelector([getAbilityBonus, getRanks, getMiscBonus, getArmourPenalty, getClassSkill],
        calcSkillBonus)
}

export const makeGetSkillAbilityBonus = () => {
    return createSelector([getAbilityBonus], abilityBonus => abilityBonus)
}

export const makeGetSkillMiscBonus = () => {
    return createSelector([getMiscBonus], bonus => bonus)
}
