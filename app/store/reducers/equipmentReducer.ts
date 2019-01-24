import { EquipmentState } from "../types";
import { Reducer } from "redux";
import { ActionType } from "typesafe-actions";
import { addEquip, addAttack } from "../actions/toolbarActions";
import * as actions from "../actions/equipmentActions"
import { ToolbarActionTypes, EquipmentActionTypes } from "../actions/actionTypes";

type ActionsType = typeof addEquip | typeof addAttack | typeof actions

const intialState: EquipmentState[] = []

const equipmentReducer: Reducer<EquipmentState[]> = (state = intialState, action: ActionType<ActionsType>) => {
    switch(action.type) {
        case ToolbarActionTypes.ADD_EQUIP: {
            return [...state, action.payload]
        }
        case ToolbarActionTypes.ADD_ATTACK: {
            return [...state, action.payload.equip]
        }
        case EquipmentActionTypes.EDIT: {
            return [...state.slice(0, action.payload.index),
            action.payload.equip,
            ...state.slice(action.payload.index + 1)]
        }
        case EquipmentActionTypes.DELETE: {
            return [...state.slice(0, action.payload.index),
            ...state.slice(action.payload.index + 1)]
        }
        default: return state
    }
}

export default equipmentReducer