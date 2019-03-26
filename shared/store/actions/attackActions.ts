import { AttackInfoBundle } from "../../api/componentPropTypes";
import { action } from "typesafe-actions";
import { AttackActionTypes } from "./actionTypes";

export const editAttack = (attackUuid: string, equipUuid: string, bundle: AttackInfoBundle) => action(AttackActionTypes.EDIT, { bundle, attackUuid, equipUuid })
export const deleteAttack = (attackUuid: string, equipUuid: string) => action(AttackActionTypes.DELETE, { attackUuid, equipUuid })