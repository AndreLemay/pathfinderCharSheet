import { FeatState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addFeat } from "../actions/toolbarActions";
import { ToolbarActionTypes, FeatActionTypes } from "../actions/actionTypes";
import { activeUpdate } from "../actions/featActions";

type featActions = (typeof addFeat) | (typeof activeUpdate)

const initialState: FeatState[] = []

const featReducer: Reducer<FeatState[]> = (state = initialState, action: ActionType<featActions>) => {
    switch(action.type) {
        case ToolbarActionTypes.ADD_FEAT: {
            return [...state, action.payload]
        }
        case FeatActionTypes.ACTIVE_UPDATE: {
            return state.map((item, index) => {
                if (index !== action.payload.featIndex) return item
                else {
                    return {
                        ...item,
                        active: action.payload.active
                    }
                } 
            })            
        }
        default: return state
    }
}

export default featReducer