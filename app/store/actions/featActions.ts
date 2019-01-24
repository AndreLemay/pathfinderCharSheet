import { action } from "typesafe-actions";
import { FeatActionTypes, EquipmentActionTypes } from "./actionTypes";
import { FeatState, EquipmentState } from "../types";

export const activeUpdate = (active: boolean, index: number) => action(FeatActionTypes.ACTIVE_UPDATE, { active, index })
export const editFeat = (feat: FeatState, index: number) => action(FeatActionTypes.EDIT, { feat, index })
export const deleteFeat = (index: number) => action(FeatActionTypes.DELETE, { index })