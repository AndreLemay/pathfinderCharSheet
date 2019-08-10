import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState from '../../store/types'
import { constitutionUpdate } from '../../store/actions/abilityScoreActions'
import {
	getAdditionalConstitution,
	getConstitutionBonus
} from '../../store/selectors/abilityScoreSelectors'
import { AbilityScoreProps } from '../../api/componentPropTypes'

interface OwnProps {
	className?: string
	abilityScoreComponent: React.FunctionComponent<AbilityScoreProps>
}

interface StateProps {
	baseCon: number
	addCon: number
	conBonus: number
}

interface DispatchProps {
	conChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<
	AbilityScoresContainerProps
> {
	render() {
		return React.createElement(this.props.abilityScoreComponent, {
			label: 'CON',
			className: this.props.className,
			base: this.props.baseCon,
			additional: this.props.addCon,
			bonus: this.props.conBonus,
			baseChange: this.props.conChange
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		baseCon: state.abilities.constitution,
		addCon: getAdditionalConstitution(state),
		conBonus: getConstitutionBonus(state)
	}
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		conChange: base => dispatch(constitutionUpdate(base))
	}
}

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AbilityScoresContainer)
