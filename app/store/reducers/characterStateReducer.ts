import { Reducer } from "redux"
import { CharacterState } from "../types";
import { Alignment, Gender, Size } from "../../api/enums";
import { CharacterStateActionTypes } from "../actions/actionTypes";
import * as actions from "../actions/characterStateActions"
import { ActionType } from "typesafe-actions";

const initialState: CharacterState = {
    name: "Default Name",
    alignment: Alignment.TrueNeutral,
    gender: Gender.Male,
    race: "Human",
    size: Size.Medium
}

const characterStateReducer: Reducer<CharacterState> = (state = initialState, action: ActionType<typeof actions>): CharacterState => {
    switch(action.type) {
        case CharacterStateActionTypes.NAME_UPDATE: {
            let { name, ...rest } = state
            return { name: action.payload, ...rest }
        }
        case CharacterStateActionTypes.ALIGNMENT_UPDATE: {
            let { alignment, ...rest } = state
            return { alignment: action.payload, ...rest }
        }
        case CharacterStateActionTypes.GENDER_UPDATE: {
            let { gender, ...rest } = state
            return { gender: action.payload, ...rest }
        }
        case CharacterStateActionTypes.RACE_UPDATE: {
            let { race, ...rest } = state
            return { race: action.payload, ...rest }
        }
        case CharacterStateActionTypes.SIZE_UPDATE: {
            let { size, ...rest } = state
            return { size: action.payload, ...rest }
        }
        default: return state
    }
}

export default characterStateReducer