import { action } from "typesafe-actions";
import { FeatActionTypes } from "./actionTypes";
import { FeatInfoBundle } from "../../../desktop/components/FeatModal";

export const activeUpdate = (uuid: string, active: boolean) => action(FeatActionTypes.ACTIVE_UPDATE, { active, uuid })
export const editFeat = (uuid: string, feat: FeatInfoBundle) => action(FeatActionTypes.EDIT, { feat, uuid })
export const deleteFeat = (uuid: string) => action(FeatActionTypes.DELETE, { uuid })