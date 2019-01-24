import { AttackState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addAttack } from "../actions/toolbarActions";
import * as actions from "../actions/attackActions"
import { ToolbarActionTypes, AttackActionTypes } from "../actions/actionTypes";

type AttackActions = typeof addAttack | typeof actions

const initialState: AttackState[] = []

const attackReducer: Reducer<AttackState[]> = (state = initialState, action: ActionType<AttackActions>) => {
    switch (action.type) {
        case ToolbarActionTypes.ADD_ATTACK: {
            return [...state, action.payload.attack]
        }
        case AttackActionTypes.EDIT: {
            return [...state.slice(0, action.payload.index),
                {
                    name: action.payload.bundle.name,
                    description: action.payload.bundle.description,
                    range: action.payload.bundle.range,
                    type: action.payload.bundle.type,
                    critRange: action.payload.bundle.critRange,
                    critMultiplier: action.payload.bundle.critMultiplier,
                    dmgDieCount: action.payload.bundle.dmgDieCount,
                    dmgDie: action.payload.bundle.dmgDie
                },
            ...state.slice(action.payload.index + 1)]
        }
        case AttackActionTypes.DELETE: {
            return [...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)]
        }
        default: return state
    }
}

export default attackReducer