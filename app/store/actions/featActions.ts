import { action } from "typesafe-actions";
import { FeatActionTypes } from "./actionTypes";
import { OwnProps } from "../../containers/IndividualFeatContainer";
import { FeatState } from "../types";

export const activeUpdate = (active: boolean, props: OwnProps) => action(FeatActionTypes.ACTIVE_UPDATE, { active, featIndex: props.featIndex })
export const edit = (feat: FeatState, props: OwnProps) => action(FeatActionTypes.EDIT, { feat, featIndex: props.featIndex })
export const deleteFeat = (props: OwnProps) => action(FeatActionTypes.DELETE, { featIndex: props.featIndex })