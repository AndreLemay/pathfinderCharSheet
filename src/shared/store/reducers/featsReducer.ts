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
            return state.map((item) => {
                if (item.uuid !== action.payload.uuid) return item
                else {
                    return {
                        ...item,
                        active: action.payload.active,
                    }
                }
            })
        }
        case FeatActionTypes.EDIT: {
            return state.map(item => {
                if (item.uuid !== action.payload.uuid) return item
                else return {
                    uuid: action.payload.uuid,
                    ...action.payload.feat,
                    active: item.active
                }
            })
        }
        case FeatActionTypes.DELETE: {
            return state.filter(f => f.uuid !== action.payload.uuid)
        }
        default: return state
    }
}

export default featReducer