import * as React from "react"
import { connect } from "react-redux"
import Attack from "../../desktop/components/Attack";
import CharacterSheetState, { ValueBonus, AttackState } from "../store/types";
import { getDamageBonus, getMiscAttackBonus } from "../store/selectors/baseAttackSelectors";
import { AttackInfoBundle } from "../../desktop/components/AttackModal";
import { DamageDieValue, AbilityTypeValue, AbilityType } from "../api/enums";
import { editAttack, deleteAttack } from "../store/actions/attackActions";
import { getStrengthBonus, getDexterityBonus, getConstitutionBonus, getIntelligenceBonus, getWisdomBonus, getCharismaBonus } from "../store/selectors/abilityScoreSelectors";

interface OwnProps {
    attackUuid: string
    equipUuid: string
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
    toHitBonus: number
    toHitBonusAbility: AbilityTypeValue
    dmgBonusAbility: AbilityTypeValue
    bonuses: ValueBonus[]
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
                bonuses: this.props.bonuses,
                range: this.props.range,
                type: this.props.type,
                critRange: this.props.critRange,
                critMultiplier: this.props.critMultiplier,
                dmgDieCount: this.props.dmgDieCount,
                dmgDie: this.props.dmgDie,
                toHitBonusAbility: this.props.toHitBonusAbility,
                dmgBonusAbility: this.props.dmgBonusAbility
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
                toHit={'+' + this.props.toHitBonus}
                damage={this.damageString()}
                critical={this.critString()}
                onEdit={this.edit}
                onDelete={this.props.delete} />
        )
    }
}

function mapStateToProps(state: CharacterSheetState, props: OwnProps): StateProps {
    let attack = state.attacks.filter(a => a.uuid === props.attackUuid)[0]

    let getAbilityBonus = (type: AbilityTypeValue) => {
        switch(type) {
            case AbilityType.Strength:{
                return getStrengthBonus(state)
            }
            case AbilityType.Dexterity:{
                return getDexterityBonus(state)
            }
            case AbilityType.Constitution:{
                return getConstitutionBonus(state)
            }
            case AbilityType.Intelligence:{
                return getIntelligenceBonus(state)
            }
            case AbilityType.Wisdom:{
                return getWisdomBonus(state)
            }
            case AbilityType.Charisma:{
                return getCharismaBonus(state)
            }
        }
    }

    return {
        name: attack.name,
        description: attack.description,
        bonuses: state.equipment.filter(e => e.uuid === props.equipUuid)[0].bonuses,
        range: attack.range,
        type: attack.type,
        critRange: attack.critRange,
        critMultiplier: attack.critMultiplier,
        dmgDieCount: attack.dmgDieCount,
        dmgDie: attack.dmgDie,
        toHitBonusAbility: attack.toHitBonusAbility,
        dmgBonusAbility: attack.dmgBonusAbility,
        dmgBonus: getDamageBonus(state) + getAbilityBonus(attack.dmgBonusAbility),
        toHitBonus: getMiscAttackBonus(state) + getAbilityBonus(attack.toHitBonusAbility)
    }
}

function mapDispatchToProps(dispatch, props: OwnProps): DispatchProps {
    return {
        edit: bundle => dispatch(editAttack(props.attackUuid, props.equipUuid, bundle)),
        delete: () => dispatch(deleteAttack(props.attackUuid, props.equipUuid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualAttackContainer)