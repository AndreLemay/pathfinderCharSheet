import { createStore/*, compose*/ } from 'redux'
import rootReducer from './reducers/rootReducer'

export default function configureStore() {
	return createStore(
		rootReducer
		// , compose((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
	)
}
