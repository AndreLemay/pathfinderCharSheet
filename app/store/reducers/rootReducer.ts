import { combineReducers } from "redux"
import CharacterSheetState from "../types";
import abilityScores from "./abilityScoreReducer"
import characterState from "./characterStateReducer"
import health from "./healthReducer"
import baseAttack from "./baseAttackReducer"
import saves from "./saveReducer"
import feats from "./featsReducer"
import skills from "./skillsReducer"
import armourClass from "./armourClassReducer"
import combatManeuvers from "./combatManeuverReducer"
import attacks from "./attacksReducer"
import armour from "./armourReducer"
import shield from "./shieldReducer"
import equipment from "./equipmentReducer"

const rootReducer = combineReducers<CharacterSheetState>({
    abilities: abilityScores,
    character: characterState,
    health,
    baseAttack,
    saves,
    feats,
    skills,
    armourClass,
    combatManeuvers,
    attacks,
    armour,
    shield,
    equipment
})

export default rootReducer