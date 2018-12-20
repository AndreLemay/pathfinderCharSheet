import CharacterSheetState, { ShieldState } from "../types";
import * as actions from "../actions/shieldActions"
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { ShieldActionTypes } from "../actions/actionTypes";

const initialState: ShieldState = {
    name: "No Shield",
    description: "",
    checkPenalty: 0,
    ac: 0
}

const shieldReducer: Reducer<ShieldState> = (state = initialState, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ShieldActionTypes.NAME_UPDATE: {
            let { name, ...rest } = state
            return { name: action.payload, ...rest }
        }
        case ShieldActionTypes.DESCRIPTION_UPDATE: {
            let { description, ...rest } = state
            return { description: action.payload, ...rest }
        }
        case ShieldActionTypes.CHECK_PENALTY_UPDATE: {
            let { checkPenalty, ...rest } = state
            return { checkPenalty: action.payload, ...rest }
        }
        case ShieldActionTypes.AC_UPDATE: {
            let { ac, ...rest } = state
            return { ac: action.payload, ...rest }
        }
        default: return state
    }
}

export default shieldReducer