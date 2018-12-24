import * as React from "react"
import { connect } from "react-redux"
import Attack from "../components/Attack";
import CharacterSheetState, { AttackState } from "../store/types";
import { getDamageBonus } from "../store/selectors/baseAttackSelectors";

interface OwnProps {
    attackIndex: number
}

interface StateProps {
    name: string
    description: string
    range: number
    type: string
    damage: string
    critical: string
}

type IndividualAttackContainerProps = StateProps & OwnProps

function damageString(atk: AttackState, dmgBonus: number): string {
    return `${atk.dmgDieCount}d${atk.dmgDie.description} +${dmgBonus}`
}

function critString(atk: AttackState): string {
    return `${atk.critRange}-20x${atk.critMultiplier}`
}

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
        damage: damageString(state.attacks[props.attackIndex], getDamageBonus(state)),
        critical: critString(state.attacks[props.attackIndex])
    }
}

export default connect(mapStateToProps)(IndividualAttackContainer)