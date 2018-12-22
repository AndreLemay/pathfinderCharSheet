import { EquipmentState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addEquip } from "../actions/toolbarActions";
import { ToolbarActionTypes } from "../actions/actionTypes";

const intialState: EquipmentState[] = []

const equipmentReducer: Reducer<EquipmentState[]> = (state = intialState, action: ActionType<typeof addEquip>) => {
    switch(action.type) {
        case ToolbarActionTypes.ADD_EQUIP: {
            return [...state, action.payload]
        }
        default: return state
    }
}

export default equipmentReducer