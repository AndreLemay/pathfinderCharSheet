import { AttackState } from "../types";
import { Reducer } from "redux";

const initialState: AttackState[] = []

const attackReducer: Reducer<AttackState[]> = (state = initialState, action) => {
    switch (action.type) {
        default: return state
    }
}

export default attackReducer