import { action } from "typesafe-actions";
import { FeatActionTypes } from "./actionTypes";
import { OwnProps } from "../../containers/IndividualFeatContainer";

export const activeUpdate = (active: boolean, props: OwnProps) => action(FeatActionTypes.ACTIVE_UPDATE, { active, featIndex: props.featIndex })