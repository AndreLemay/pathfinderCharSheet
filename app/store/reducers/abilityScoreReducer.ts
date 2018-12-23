import { Reducer } from "redux"
import { AbilitiesState } from "../types";
import { AbilityType } from "../../api/enums";
import { AbilityScoreActionTypes } from "../actions/actionTypes";
import * as actions from "../actions/abilityScoreActions"
import { ActionType } from "typesafe-actions";

const initialState: AbilitiesState = {
    strength: {
        type: AbilityType.Strength,
        base: 10
    },
    dexterity: {
        type: AbilityType.Dexterity,
        base: 10
    },
    constitution: {
        type: AbilityType.Constitution,
        base: 10
    },
    intelligence: {
        type: AbilityType.Intelligence,
        base: 10
    },
    wisdom: {
        type: AbilityType.Wisdom,
        base: 10
    },
    charisma: {
        type: AbilityType.Charisma,
        base: 10
    }
}

const abilityScoreReducer: Reducer<AbilitiesState> = (state = initialState, action: ActionType<typeof actions>): AbilitiesState => {
    switch (action.type) {
        case AbilityScoreActionTypes.STRENGTH_UPDATE: {
            let { strength, ...rest } = state
            let newStr = { ...strength }
            newStr.base = action.payload
            return { ...rest, strength: newStr }
        }
        case AbilityScoreActionTypes.DEXTERITY_UPDATE: {
            let { dexterity, ...rest } = state
            let newDex = { ...dexterity }
            newDex.base = action.payload
            return { ...rest, dexterity: newDex }
        }
        case AbilityScoreActionTypes.CONSTITUTION_UPDATE: {
            let { constitution, ...rest } = state
            let newCon = { ...constitution }
            newCon.base = action.payload
            return { ...rest, constitution: newCon }
        }
        case AbilityScoreActionTypes.INTELLIGENCE_UPDATE: {
            let { intelligence, ...rest } = state
            let newInt = { ...intelligence }
            newInt.base = action.payload
            return { ...rest, intelligence: newInt }
        }
        case AbilityScoreActionTypes.WISDOM_UPDATE: {
            let { wisdom, ...rest } = state
            let newWis = { ...wisdom }
            newWis.base = action.payload
            return { ...rest, wisdom: newWis }
        }
        case AbilityScoreActionTypes.CHARISMA_UPDATE: {
            let { charisma, ...rest } = state
            let newCha = { ...charisma }
            newCha.base = action.payload
            return { ...rest, charisma: newCha }
        }
        default: return state
    }
}

export default abilityScoreReducer