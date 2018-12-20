import {createStore} from "redux"
import rootReducer from "./reducers/rootReducer"
import CharacterSheetState from "./types";

export default function configureStore(initialState?: CharacterSheetState) {
    return createStore(rootReducer, initialState)
}