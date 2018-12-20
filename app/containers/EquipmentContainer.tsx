import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { EquipmentState } from "../store/types";
import IndividualEquipmentContainer from "./IndividualEquipmentContainer";
import SectionHeader from "../components/common/SectionHeader";

interface OwnProps {
    className?: string
}

interface StateProps {
    equipment: EquipmentState[]
}

type EquipmentContainerProps = StateProps & OwnProps

class EquipmentContainer extends React.Component<EquipmentContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Equipment" />
                {this.props.equipment.map((equip, index) => {
                    return <IndividualEquipmentContainer equipIndex={index} />
                })}
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        equipment: state.equipment
    }
}

export default connect(mapStateToProps)(EquipmentContainer)