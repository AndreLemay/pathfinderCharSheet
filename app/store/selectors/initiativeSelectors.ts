import { createSelector } from "reselect"
import CharacterSheetState from "../types";
import { getDexterityBonus } from "./abilityScoreSelectors";

const getMiscInitiative = (state: CharacterSheetState) => state.initiative.miscInitiative

export const getInitiative = createSelector([getDexterityBonus, getMiscInitiative], (dex, misc) => dex + misc)