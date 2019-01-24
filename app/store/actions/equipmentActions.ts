import { EquipmentState } from "../types";
import { action } from "typesafe-actions";
import { EquipmentActionTypes } from "./actionTypes";

export const editEquip = (equip: EquipmentState, index: number) => action(EquipmentActionTypes.EDIT, { equip, index })
export const deleteEquip = (index: number) => action(EquipmentActionTypes.DELETE, { index })