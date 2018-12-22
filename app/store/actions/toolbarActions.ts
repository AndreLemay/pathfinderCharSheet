import { action } from "typesafe-actions"
import { ToolbarActionTypes } from "./actionTypes";
import { EquipmentState } from "../types";

export const saveCharacter = () => action(ToolbarActionTypes.SAVE, {})
export const loadCharacter = () => action(ToolbarActionTypes.LOAD, {})
export const addFeat = () => action(ToolbarActionTypes.ADD_FEAT, {})
export const addEquip = (equip: EquipmentState) => action(ToolbarActionTypes.ADD_EQUIP, equip)
export const addAttack = () => action(ToolbarActionTypes.ADD_ATTACK, {})