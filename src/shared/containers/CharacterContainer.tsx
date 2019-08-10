import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState, { CharacterState } from '../store/types'
import { AlignmentValue, GenderValue, SizeValue } from '../api/enums'
import {
	nameUpdate,
	alignmentUpdate,
	genderUpdate,
	raceUpdate,
	sizeUpdate
} from '../store/actions/characterStateActions'
import { CharacterProps } from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	characterSectionComponent: React.FunctionComponent<CharacterProps>
}

interface DispatchProps {
	nameChange: (name: string) => void
	alignmentChange: (alignment: AlignmentValue) => void
	genderChange: (gender: GenderValue) => void
	raceChange: (race: string) => void
	sizeChange: (size: SizeValue) => void
}

type CharacterContainerProps = CharacterState & DispatchProps & OwnProps

class CharacterContainer extends React.Component<CharacterContainerProps> {
	render() {
		return React.createElement(this.props.characterSectionComponent, {
			className: this.props.className,
			name: this.props.name,
			alignment: this.props.alignment,
			gender: this.props.gender,
			race: this.props.race,
			size: this.props.size,
			nameChange: this.props.nameChange,
			alignmentChange: this.props.alignmentChange,
			genderChange: this.props.genderChange,
			raceChange: this.props.raceChange,
			sizeChange: this.props.sizeChange
		})
	}
}

function mapStateToProps(state: CharacterSheetState): CharacterState {
	return state.character
}

function mapDispatchToProps(dispatch): DispatchProps {
	return {
		nameChange: name => dispatch(nameUpdate(name)),
		alignmentChange: align => dispatch(alignmentUpdate(align)),
		genderChange: gender => dispatch(genderUpdate(gender)),
		raceChange: race => dispatch(raceUpdate(race)),
		sizeChange: size => dispatch(sizeUpdate(size))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CharacterContainer)
