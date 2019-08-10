import * as React from 'react'
import { connect } from 'react-redux'
import { ArmourTypeValue } from '../api/enums'
import CharacterSheetState from '../store/types'
import {
	nameUpdate,
	descriptionUpdate,
	typeUpdate,
	maxSpeedUpdate,
	maxDexUpdate,
	checkPenaltyUpdate,
	acUpdate
} from '../store/actions/armourActions'
import { ArmourProps } from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	armourComponent: React.FunctionComponent<ArmourProps>
}

interface StateProps {
	name: string
	description: string
	type: ArmourTypeValue
	maxSpeed: number
	maxDex: number
	checkPenalty: number
	ac: number
}

interface DispatchProps {
	nameChange: (name: string) => void
	descriptionChange: (description: string) => void
	typeChange: (type: ArmourTypeValue) => void
	maxSpeedChange: (maxSpeed: number) => void
	maxDexChange: (maxDex: number) => void
	checkPenaltyChange: (checkPenalty: number) => void
	acChange: (ac: number) => void
}

type ArmourContainerProps = StateProps & DispatchProps & OwnProps

class ArmourContainer extends React.Component<ArmourContainerProps> {
	render() {
		return React.createElement(this.props.armourComponent, {
			className: this.props.className,
			name: this.props.name,
			description: this.props.description,
			type: this.props.type,
			maxSpeed: this.props.maxSpeed,
			maxDex: this.props.maxDex,
			checkPenalty: this.props.checkPenalty,
			ac: this.props.ac,
			nameChange: this.props.nameChange,
			descriptionChange: this.props.descriptionChange,
			typeChange: this.props.typeChange,
			maxSpeedChange: this.props.maxSpeedChange,
			maxDexChange: this.props.maxDexChange,
			checkPenaltyChange: this.props.checkPenaltyChange,
			acChange: this.props.acChange
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		name: state.armour.name,
		description: state.armour.description,
		type: state.armour.type,
		maxSpeed: state.armour.maxSpeed,
		maxDex: state.armour.maxDex,
		checkPenalty: state.armour.checkPenalty,
		ac: state.armour.ac
	}
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		nameChange: name => dispatch(nameUpdate(name)),
		descriptionChange: desc => dispatch(descriptionUpdate(desc)),
		typeChange: type => dispatch(typeUpdate(type)),
		maxSpeedChange: speed => dispatch(maxSpeedUpdate(speed)),
		maxDexChange: dex => dispatch(maxDexUpdate(dex)),
		checkPenaltyChange: penalty => dispatch(checkPenaltyUpdate(penalty)),
		acChange: ac => dispatch(acUpdate(ac))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArmourContainer)
