import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { ValueBonus } from "../store/types";
import Equipment from "../components/Equipment";

interface OwnProps {
    equipIndex: number
}

interface StateProps {
    name: string
    description: string
    bonuses: ValueBonus[]
}

type IndividualEquipmentContainerProps = StateProps & OwnProps

class IndividualEquipmentContainer extends React.Component<IndividualEquipmentContainerProps> {
    render() {
        return (
            <Equipment className="mt-3" name={this.props.name} description={this.props.description} bonuses={this.props.bonuses} />
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

export default connect(mapStateToProps)(IndividualEquipmentContainer)