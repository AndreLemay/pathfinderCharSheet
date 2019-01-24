import { AttackInfoBundle } from "../../components/AttackModal";
import { action } from "typesafe-actions";
import { AttackActionTypes } from "./actionTypes";

export const editAttack = (bundle: AttackInfoBundle, index: number) => action(AttackActionTypes.EDIT, { bundle, index })
export const deleteAttack = (index: number) => action(AttackActionTypes.DELETE, { index })