import { FeatState } from "../types";
import { Reducer } from "redux";

const initialState: FeatState[] = []

const featReducer: Reducer<FeatState[]> = (state = initialState, action) => {
    switch(action.type) {
        default: return state
    }
}

export default featReducer