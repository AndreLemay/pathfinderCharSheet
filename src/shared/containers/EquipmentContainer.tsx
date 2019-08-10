import * as React from 'react'
import { connect } from 'react-redux'
import CharacterSheetState from '../store/types'
import {
	EquipmentSectionProps,
	EquipInfoBundle
} from '../api/componentPropTypes'

interface OwnProps {
	className?: string
	openEquipModal: (
		onSave: (state: EquipInfoBundle) => void,
		equip?: EquipInfoBundle
	) => void
	equipmentSectionComponent: React.FunctionComponent<EquipmentSectionProps>
}

interface StateProps {
	equipIds: string[]
}

type EquipmentContainerProps = StateProps & OwnProps

class EquipmentContainer extends React.Component<EquipmentContainerProps> {
	render() {
		return React.createElement(this.props.equipmentSectionComponent, {
			className: this.props.className,
			equipIds: this.props.equipIds,
			openEquipModal: this.props.openEquipModal
		})
	}
}

function mapStateToProps(state: CharacterSheetState): StateProps {
	return {
		equipIds: state.equipment.map(e => e.uuid)
	}
}

export default connect(mapStateToProps)(EquipmentContainer)
