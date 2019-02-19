import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../../store/types";
import { strengthUpdate } from "../../store/actions/abilityScoreActions";
import { getStrengthBonus, getAdditionalStrength } from "../../store/selectors/abilityScoreSelectors";
import { AbilityScoreProps } from "../../api/componentPropTypes";

interface OwnProps {
    className?: string
    abilityScoreComponent: React.ComponentClass<AbilityScoreProps>
}

interface StateProps {
    baseStr: number
    addStr: number
    strBonus: number
}

interface DispatchProps {
    strChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<AbilityScoresContainerProps> {
    render() {
        return React.createElement(this.props.abilityScoreComponent, {
                    label: "STR",
                    className: this.props.className,
                    base: this.props.baseStr,
                    additional: this.props.addStr,
                    bonus: this.props.strBonus,
                    baseChange: this.props.strChange
                })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        baseStr: state.abilities.strength,
        addStr: getAdditionalStrength(state),
        strBonus: getStrengthBonus(state),
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        strChange: base => dispatch(strengthUpdate(base)),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(AbilityScoresContainer)