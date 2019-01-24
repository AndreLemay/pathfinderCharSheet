import { FeatState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addFeat } from "../actions/toolbarActions";
import { ToolbarActionTypes, FeatActionTypes } from "../actions/actionTypes";
import * as featActions from "../actions/featActions";

type FeatActions = (typeof addFeat) | (typeof featActions)

const initialState: FeatState[] = []

const featReducer: Reducer<FeatState[]> = (state = initialState, action: ActionType<FeatActions>) => {
    switch (action.type) {
        case ToolbarActionTypes.ADD_FEAT: {
            return [...state, action.payload]
        }
        case FeatActionTypes.ACTIVE_UPDATE: {
            return state.map((item, index) => {
                if (index !== action.payload.index) return item
                else {
                    return {
                        ...item,
                        active: action.payload.active
                    }
                }
            })
        }
        case FeatActionTypes.EDIT: {
            return [...state.slice(0, action.payload.index),
            action.payload.feat,
            ...state.slice(action.payload.index + 1)]
        }
        case FeatActionTypes.DELETE: {
            return [...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)]
        }
        default: return state
    }
}

export default featReducer