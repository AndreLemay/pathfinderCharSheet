import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { AttackState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader";
import IndividualAttackContainer from "./IndividualAttackContainer";
import { AttackInfoBundle } from "../components/AttackModal";

interface OwnProps {
    className?: string
    openAttackModal: (onSave: (state: AttackInfoBundle) => void, attack?: AttackInfoBundle) => void
}

interface StateProps {
    attacks: AttackState[]
}

type AttacksContainerProps = StateProps & OwnProps

class AttacksContainer extends React.Component<AttacksContainerProps> {
    render() {
        return (
            <div className={this.props.className}>
                <SectionHeader label="Attacks" />
                {this.props.attacks.map((_, index) => {
                    return <IndividualAttackContainer key={index} attackIndex={index} openAttackModal={this.props.openAttackModal} />
                })}
            </div>
        )
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        attacks: state.attacks
    }
}

export default connect(mapStateToProps)(AttacksContainer)