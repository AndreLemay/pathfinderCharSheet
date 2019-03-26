import { action } from "typesafe-actions"
import { ToolbarActionTypes } from "./actionTypes";
import { EquipmentState, FeatState, AttackState } from "../types";

export const loadCharacter = (data: any) => action(ToolbarActionTypes.LOAD, { data })
export const addFeat = (feat: FeatState) => action(ToolbarActionTypes.ADD_FEAT, feat)
export const addEquip = (equip: EquipmentState) => action(ToolbarActionTypes.ADD_EQUIP, equip)
export const addAttack = (attack: AttackState, equip: EquipmentState) => action(ToolbarActionTypes.ADD_ATTACK, { attack, equip })