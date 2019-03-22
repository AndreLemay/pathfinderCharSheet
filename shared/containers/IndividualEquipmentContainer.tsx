import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus } from "../store/types";
import { editEquip, deleteEquip } from "../store/actions/equipmentActions";
import { EquipInfoBundle, EquipmentProps } from "../api/componentPropTypes";

interface OwnProps {
    uuid: string
    openEquipModal: (onSave: (state: EquipInfoBundle) => void, equip?: EquipInfoBundle) => void
    equipmentComponent: React.ComponentClass<EquipmentProps>
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
}

interface DispatchProps {
    edit: (equip: EquipInfoBundle) => void
    delete: () => void
}

type IndividualEquipmentContainerProps = StateProps & DispatchProps & OwnProps

class IndividualEquipmentContainer extends React.Component<IndividualEquipmentContainerProps> {
    edit = () => {
        this.props.openEquipModal((equip: EquipInfoBundle) => {
            this.props.edit(equip)
        }, {
                name: this.props.name,
                description: this.props.description,
                bonuses: this.props.bonuses,
            })
    }

    render() {
        return React.createElement(this.props.equipmentComponent, {
            className: "mt-3",
            name: this.props.name,
            description: this.props.description,
            bonuses: this.props.bonuses,
            onEdit: this.edit,
            onDelete: this.props.delete
        })
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    let equip = state.equipment.filter(e => e.uuid === props.uuid)[0]
    return {
        name: equip.name,
        description: equip.description,
        bonuses: equip.bonuses
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        edit: equip => dispatch(editEquip(props.uuid, equip)),
        delete: () => dispatch(deleteEquip(props.uuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualEquipmentContainer)