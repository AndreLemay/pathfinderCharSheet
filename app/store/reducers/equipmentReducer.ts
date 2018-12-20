import { EquipmentState } from "../types";
import { Reducer } from "redux";

const intialState: EquipmentState[] = []

const equipmentReducer: Reducer<EquipmentState[]> = (state = intialState, action) => {
    return state
}

export default equipmentReducer