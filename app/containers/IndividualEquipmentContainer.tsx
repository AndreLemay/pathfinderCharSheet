import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus, EquipmentState } from "../store/types";
import Equipment from "../components/Equipment";
import { editEquip, deleteEquip } from "../store/actions/equipmentActions";

interface OwnProps {
    equipIndex: number
    openEquipModal: (onSave: (state: EquipmentState) => void, equip?: EquipmentState) => void
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
}

interface DispatchProps {
    edit: (equip: EquipmentState) => void
    delete: () => void
}

type IndividualEquipmentContainerProps = StateProps & DispatchProps & OwnProps

class IndividualEquipmentContainer extends React.Component<IndividualEquipmentContainerProps> {
    edit = () => {
        this.props.openEquipModal((equip: EquipmentState) => {
            this.props.edit(equip)
        }, {
                name: this.props.name,
                description: this.props.description,
                bonuses: this.props.bonuses,
            })
    }

    render() {
        return (
            <Equipment className="mt-3"
                name={this.props.name}
                description={this.props.description}
                bonuses={this.props.bonuses}
                onEdit={this.edit}
                onDelete={this.props.delete} />
        )
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    return {
        name: state.equipment[props.equipIndex].name,
        description: state.equipment[props.equipIndex].description,
        bonuses: state.equipment[props.equipIndex].bonuses
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        edit: (equip: EquipmentState) => dispatch(editEquip(equip, props.equipIndex)),
        delete: () => dispatch(deleteEquip(props.equipIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualEquipmentContainer)