import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState from '../store/types'
import { SkillsSectionProps } from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	skillsSectionComponent: React.FunctionComponent<SkillsSectionProps>
}

interface StateProps {
	skills: number[]
}

type SkillsContainerProps = StateProps & OwnProps

class SkillsContainer extends React.Component<SkillsContainerProps> {
	render() {
		return React.createElement(this.props.skillsSectionComponent, {
			className: this.props.className,
			skills: this.props.skills
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		skills: Object.keys(state.skills).map(val => +val)
	}
}

export default connect(mapStateToProps)(SkillsContainer)
