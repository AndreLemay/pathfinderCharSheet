import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../store/types";
import { AttackInfoBundle, AttacksSectionProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    openAttackModal: (onSave: (state: AttackInfoBundle) => void, attack?: AttackInfoBundle) => void
    attacksSectionComponent: React.ComponentClass<AttacksSectionProps>
}

interface StateProps {
    attackAndEquipIds: [string, string][]
}

type AttacksContainerProps = StateProps & OwnProps

class AttacksContainer extends React.Component<AttacksContainerProps> {
    render() {
        return React.createElement(this.props.attacksSectionComponent, {
            className: this.props.className,
            attackAndEquipIds: this.props.attackAndEquipIds,
            openAttackModal: this.props.openAttackModal
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        attackAndEquipIds: state.attacks.map<[string, string]>(a => [a.uuid, a.equipId])
    }
}

export default connect(mapStateToProps)(AttacksContainer)