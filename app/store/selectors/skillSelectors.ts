import { AbilityType, SkillName } from "../../api/enums";
import CharacterSheetState from "../types";
import { getStrengthBonus, getDexterityBonus, getConstitutionBonus, getIntelligenceBonus, getWisdomBonus, getCharismaBonus } from "./abilityScoreSelectors";
import { createSelector } from "reselect";
import { OwnProps } from "../../containers/IndividualSkillContainer";

const getAbilityBonus = (props: OwnProps, state: CharacterSheetState) => {
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
const getClassSkill = (props: OwnProps, state: CharacterSheetState) => state.skills[props.skillOrd].isClassSkill
const getRanks = (props: OwnProps, state: CharacterSheetState) => state.skills[props.skillOrd].ranks
const getFeatBonus = (props: OwnProps, state: CharacterSheetState) => state.skills[props.skillOrd].featBonus
const getMiscBonus = (props: OwnProps, state: CharacterSheetState) => state.skills[props.skillOrd].miscBonus
const getArmourPenalty = (props: OwnProps, state: CharacterSheetState) => state.skills[props.skillOrd].armourPenalty

const calcSkillBonus = (abilityBonus: number, ranks: number, featBonus: number, miscBonus: number,
    armourPenalty: number, isClassSkill: boolean) => {
    return abilityBonus + (isClassSkill && ranks > 0 ? 3 : 0) + ranks + featBonus
        + armourPenalty //expecting this be be negative, so we want to add 
        + miscBonus
}

export const makeGetSkillBonus = () => {
    return createSelector([getAbilityBonus, getRanks, getFeatBonus, getMiscBonus, getArmourPenalty, getClassSkill],
        calcSkillBonus)
}

export const makeGetSkillAbilityBonus = () => {
    return createSelector([getAbilityBonus], (abilityBonus) => abilityBonus)
}
