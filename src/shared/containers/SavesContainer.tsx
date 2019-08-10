import * as React from 'react'
import CharacterSheetState from '../store/types'
import {
	fortUpdate,
	reflexUpdate,
	willUpdate
} from '../store/actions/saveActions'
import { connect } from 'react-redux'
import {
	getConstitutionBonus,
	getDexterityBonus,
	getWisdomBonus
} from '../store/selectors/abilityScoreSelectors'
import {
	getFortSave,
	getReflexSave,
	getWillSave,
	getMiscFortSave,
	getMiscReflexSave,
	getMiscWillSave
} from '../store/selectors/saveSelectors'
import { SaveProps } from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	saveComponent: React.FunctionComponent<SaveProps>
}

interface StateProps {
	fortSave: number
	reflexSave: number
	willSave: number
	baseFort: number
	baseReflex: number
	baseWill: number
	conBonus: number
	dexBonus: number
	wisBonus: number
	miscFort: number
	miscReflex: number
	miscWill: number
}

interface DispatchProps {
	fortSaveChange: (fort: number) => void
	reflexSaveChange: (reflex: number) => void
	willSaveChange: (will: number) => void
}

type SavesContainerProps = StateProps & DispatchProps & OwnProps

class SavesContainer extends React.Component<SavesContainerProps> {
	render() {
		return React.createElement(this.props.saveComponent, {
			className: this.props.className,
			fortSave: this.props.fortSave,
			reflexSave: this.props.reflexSave,
			willSave: this.props.willSave,
			baseFort: this.props.baseFort,
			baseReflex: this.props.baseReflex,
			baseWill: this.props.baseWill,
			conBonus: this.props.conBonus,
			dexBonus: this.props.dexBonus,
			wisBonus: this.props.wisBonus,
			miscFort: this.props.miscFort,
			miscReflex: this.props.miscReflex,
			miscWill: this.props.miscWill,
			fortSaveChange: this.props.fortSaveChange,
			reflexSaveChange: this.props.reflexSaveChange,
			willSaveChange: this.props.willSaveChange
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		fortSave: getFortSave(state),
		reflexSave: getReflexSave(state),
		willSave: getWillSave(state),
		baseFort: state.saves.baseFortSave,
		baseReflex: state.saves.baseReflexSave,
		baseWill: state.saves.baseWillSave,
		conBonus: getConstitutionBonus(state),
		dexBonus: getDexterityBonus(state),
		wisBonus: getWisdomBonus(state),
		miscFort: getMiscFortSave(state),
		miscReflex: getMiscReflexSave(state),
		miscWill: getMiscWillSave(state)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fortSaveChange: fort => dispatch(fortUpdate(fort)),
		reflexSaveChange: reflex => dispatch(reflexUpdate(reflex)),
		willSaveChange: will => dispatch(willUpdate(will))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SavesContainer)
