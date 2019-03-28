import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../../store/types";
import { dexterityUpdate } from "../../store/actions/abilityScoreActions";
import { getAdditionalDexterity, getDexterityBonus } from "../../store/selectors/abilityScoreSelectors";
import { AbilityScoreProps } from "../../api/componentPropTypes";

interface OwnProps {
    className?: string
    abilityScoreComponent: React.SFC<AbilityScoreProps>
}

interface StateProps {
    baseDex: number
    addDex: number
    dexBonus: number
}

interface DispatchProps {
    dexChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<AbilityScoresContainerProps> {
    render() {
        return React.createElement(this.props.abilityScoreComponent, {
            label: "DEX",
            className: this.props.className,
            base: this.props.baseDex,
            additional: this.props.addDex,
            bonus: this.props.dexBonus,
            baseChange: this.props.dexChange
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        baseDex: state.abilities.dexterity,
        addDex: getAdditionalDexterity(state),
        dexBonus: getDexterityBonus(state),
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        dexChange: base => dispatch(dexterityUpdate(base)),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(AbilityScoresContainer)