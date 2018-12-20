import * as React from "react"
import { connect } from "react-redux"
import Attack from "../components/Attack";
import CharacterSheetState from "../store/types";

interface OwnProps {
    attackIndex: number
}

interface StateProps {
    name: string
    description: string
    range: string
    type: string
    damage: string
    critical: string
}

type IndividualAttackContainerProps = StateProps & OwnProps

class IndividualAttackContainer extends React.Component<IndividualAttackContainerProps> {
    render() {
        return (
            <Attack 
                name={this.props.name}
                description={this.props.description} 
                range={this.props.range}
                type={this.props.type}
                damage={this.props.damage}
                critical={this.props.critical} />
        )
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    return {
        name: state.attacks[props.attackIndex].name,
        description: state.attacks[props.attackIndex].description,
        range: state.attacks[props.attackIndex].range,
        type: state.attacks[props.attackIndex].type,
        damage: state.attacks[props.attackIndex].damage,
        critical: state.attacks[props.attackIndex].critical
    }
}

export default connect(mapStateToProps)(IndividualAttackContainer)