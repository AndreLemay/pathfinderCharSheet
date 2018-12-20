import { CombatManeuverState } from "../types";
import { Reducer } from "redux";

const initialState: CombatManeuverState = {
    miscCMB: 0,
    miscCMD: 0
}

const combatManeuverReducer: Reducer<CombatManeuverState> = (state = initialState, action) => {
    return state
}

export default combatManeuverReducer