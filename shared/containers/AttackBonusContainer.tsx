import CharacterSheetState, { BaseAttackState } from "../store/types";
import * as React from "react"
import SectionHeader from "../../desktop/components/common/SectionHeader";
import InputField from "../../desktop/components/common/InputField";
import OutputField from "../../desktop/components/common/OutputField";
import { baseUpdate } from "../store/actions/baseAttackActions";
import { connect } from "react-redux"
import { getMeleeAttackBonus, getRangedAttackBonus, getMiscAttackBonus } from "../store/selectors/baseAttackSelectors";
import { AttackBonusProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    attackBonusComponent: React.ComponentClass<AttackBonusProps>
}

interface StateProps {
    base: number
    miscBonus: number
    meleeBonus: number
    rangedBonus: number
}

interface DispatchProps {
    baseChange: (base: number) => void
}

type AttackBonusContainerProps = StateProps & DispatchProps & OwnProps

class AttackBonusContainer extends React.Component<AttackBonusContainerProps> {
    render() {
        return React.createElement(this.props.attackBonusComponent, {
            className: this.props.className,
            base: this.props.base,
            miscBonus: this.props.miscBonus,
            meleeBonus: this.props.meleeBonus,
            rangedBonus: this.props.rangedBonus,
            baseChange: this.props.baseChange
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        base: state.baseAttack.base,
        miscBonus: getMiscAttackBonus(state),
        meleeBonus: getMeleeAttackBonus(state),
        rangedBonus: getRangedAttackBonus(state)
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        baseChange: base => dispatch(baseUpdate(base))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackBonusContainer)