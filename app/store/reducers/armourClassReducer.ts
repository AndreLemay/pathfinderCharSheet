import { ArmourClassState } from "../types";
import { Reducer } from "redux";

//entire file should eventually be removed once all values are calculated. Right now this just seeds the state
let initialState: ArmourClassState = {
    dodgeModifier: 0,
    deflectionModifier: 0,
    armourAC: 0,
    shieldAC: 0,
    natArmour: 0
}

const armourClassReducer: Reducer<ArmourClassState> = (state = initialState, action): ArmourClassState => {
    return state
}

export default armourClassReducer