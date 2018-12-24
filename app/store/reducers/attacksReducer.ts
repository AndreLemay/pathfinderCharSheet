import { AttackState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addAttack } from "../actions/toolbarActions";
import { ToolbarActionTypes } from "../actions/actionTypes";

const initialState: AttackState[] = []

const attackReducer: Reducer<AttackState[]> = (state = initialState, action: ActionType<typeof addAttack>) => {
    switch (action.type) {
        case ToolbarActionTypes.ADD_ATTACK: {
            return [...state, action.payload.attack]
        }
        default: return state
    }
}

export default attackReducer