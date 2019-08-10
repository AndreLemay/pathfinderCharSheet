import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState from '../../store/types'
import { intelligenceUpdate } from '../../store/actions/abilityScoreActions'
import {
	getIntelligenceBonus,
	getAdditionalIntelligence
} from '../../store/selectors/abilityScoreSelectors'
import { AbilityScoreProps } from '../../api/componentPropTypes'

interface OwnProps {
	className?: string
	abilityScoreComponent: React.FunctionComponent<AbilityScoreProps>
}

interface StateProps {
	baseInt: number
	addInt: number
	intBonus: number
}

interface DispatchProps {
	intChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<
	AbilityScoresContainerProps
> {
	render() {
		return React.createElement(this.props.abilityScoreComponent, {
			label: 'INT',
			className: this.props.className,
			base: this.props.baseInt,
			additional: this.props.addInt,
			bonus: this.props.intBonus,
			baseChange: this.props.intChange
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		baseInt: state.abilities.intelligence,
		addInt: getAdditionalIntelligence(state),
		intBonus: getIntelligenceBonus(state)
	}
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		intChange: base => dispatch(intelligenceUpdate(base))
	}
}

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AbilityScoresContainer)
