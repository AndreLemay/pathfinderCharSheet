import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState, { AttackState } from "../store/types";
import SectionHeader from "../components/common/SectionHeader";
import IndividualAttackContainer from "./IndividualAttackContainer";

interface OwnProps {
    className?: string
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
                {this.props.attacks.map((attack, index) => {
                    return <IndividualAttackContainer key={index} attackIndex={index} />
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