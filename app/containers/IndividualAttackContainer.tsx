import * as React from "react"
import { connect } from "react-redux"
import Attack from "../components/Attack";
import CharacterSheetState from "../store/types";
import { getDamageBonus } from "../store/selectors/baseAttackSelectors";
import { AttackInfoBundle } from "../components/AttackModal";
import { DamageDieValue } from "../api/enums";
import { editAttack, deleteAttack } from "../store/actions/attackActions";

interface OwnProps {
    attackIndex: number
    openAttackModal: (onSave: (state: AttackInfoBundle) => void, attack?: AttackInfoBundle) => void
}

interface StateProps {
    name: string
    description: string
    range: number
    type: string
    critRange: number
    critMultiplier: number
    dmgDieCount: number
    dmgDie: DamageDieValue
    dmgBonus: number
    //bonuses: ValueBonus[]
}

interface DispatchProps {
    edit: (bundle: AttackInfoBundle) => void
    delete: () => void
}

type IndividualAttackContainerProps = StateProps & DispatchProps & OwnProps

class IndividualAttackContainer extends React.Component<IndividualAttackContainerProps> {
    edit = () => {
        this.props.openAttackModal((bundle: AttackInfoBundle) => {
            this.props.edit(bundle)
        }, {
                name: this.props.name,
                description: this.props.description,
                bonuses: [],//this.props.bonuses,
                range: this.props.range,
                type: this.props.type,
                critRange: this.props.critRange,
                critMultiplier: this.props.critMultiplier,
                dmgDieCount: this.props.dmgDieCount,
                dmgDie: this.props.dmgDie
            })
    }

    damageString = (): string => {
        return `${this.props.dmgDieCount}d${this.props.dmgDie.description} +${this.props.dmgBonus}`
    }

    critString = (): string => {
        return `${this.props.critRange}-20x${this.props.critMultiplier}`
    }

    render() {
        return (
            <Attack
                name={this.props.name}
                description={this.props.description}
                range={this.props.range}
                type={this.props.type}
                damage={this.damageString()}
                critical={this.critString()}
                onEdit={this.edit}
                onDelete={this.props.delete} />
        )
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    return {
        name: state.attacks[props.attackIndex].name,
        description: state.attacks[props.attackIndex].description,
        range: state.attacks[props.attackIndex].range,
        type: state.attacks[props.attackIndex].type,
        critRange: state.attacks[props.attackIndex].critRange,
        critMultiplier: state.attacks[props.attackIndex].critMultiplier,
        dmgDieCount: state.attacks[props.attackIndex].dmgDieCount,
        dmgDie: state.attacks[props.attackIndex].dmgDie,
        dmgBonus: getDamageBonus(state),
        //bonuses: state.equipment[state.attacks[props.attackIndex].equipIndex].bonuses
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        edit: (bundle) => dispatch(editAttack(bundle, props.attackIndex)),
        delete: () => dispatch(deleteAttack(props.attackIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualAttackContainer)