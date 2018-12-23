import CharacterSheetState, { BaseAttackState } from "../store/types";
import * as React from "react"
import SectionHeader from "../components/common/SectionHeader";
import InputField from "../components/common/InputField";
import OutputField from "../components/common/OutputField";
import { baseUpdate } from "../store/actions/baseAttackActions";
import { connect } from "react-redux"
import { getMeleeAttackBonus, getRangedAttackBonus, getMiscAttackBonus } from "../store/selectors/baseAttackSelectors";

interface OwnProps {
    className?: string
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
        return (
            <div className={this.props.className}>
                <SectionHeader label="Attack Bonus" />
                <div className="form-row">
                    <InputField label="Base" inputType="number" className="col" value={this.props.base} onValueChange={this.props.baseChange} />
                    <OutputField label="Misc" inputType="number" className="col" value={this.props.miscBonus} />
                </div>
                <div className="form-row">
                    <OutputField label="Melee" inputType="number" className="col" value={this.props.meleeBonus} />
                    <OutputField label="Ranged" inputType="number" className="col" value={this.props.rangedBonus} />
                </div>
            </div>
        )
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