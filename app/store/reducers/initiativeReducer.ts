import { InitiativeState } from "../types";
import { Reducer } from "redux";

const initialState: InitiativeState = {
    miscInitiative: 0
}

const initiativeReducer: Reducer<InitiativeState> = (state = initialState, action) => {
    return state
}

export default initiativeReducer