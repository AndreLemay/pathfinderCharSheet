import { action } from "typesafe-actions";
import { EquipmentActionTypes } from "./actionTypes";
import { EquipInfoBundle } from "../../../desktop/components/EquipmentModal";

export const editEquip = (uuid: string, equip: EquipInfoBundle) => action(EquipmentActionTypes.EDIT, { equip, uuid })
export const deleteEquip = (uuid: string) => action(EquipmentActionTypes.DELETE, { uuid })