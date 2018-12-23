import { FeatState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addFeat } from "../actions/toolbarActions";
import { ToolbarActionTypes } from "../actions/actionTypes";

const initialState: FeatState[] = []

const featReducer: Reducer<FeatState[]> = (state = initialState, action: ActionType<typeof addFeat>) => {
    switch(action.type) {
        case ToolbarActionTypes.ADD_FEAT: {
            return [...state, action.payload]
        }
        default: return state
    }
}

export default featReducer