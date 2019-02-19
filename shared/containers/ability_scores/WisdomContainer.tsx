import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../../store/types";
import { wisdomUpdate } from "../../store/actions/abilityScoreActions";
import { getWisdomBonus, getAdditionalWisdom } from "../../store/selectors/abilityScoreSelectors";
import { AbilityScoreProps } from "../../api/componentPropTypes";

interface OwnProps {
    className?: string
    abilityScoreComponent: React.ComponentClass<AbilityScoreProps>
}

interface StateProps {
    baseWis: number
    addWis: number
    wisBonus: number
}

interface DispatchProps {
    wisChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<AbilityScoresContainerProps> {
    render() {
        return React.createElement(this.props.abilityScoreComponent, {
            label: "WIS",
            className: this.props.className,
            base: this.props.baseWis,
            additional: this.props.addWis,
            bonus: this.props.wisBonus,
            baseChange: this.props.wisChange
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        baseWis: state.abilities.wisdom,
        addWis: getAdditionalWisdom(state),
        wisBonus: getWisdomBonus(state),
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        wisChange: base => dispatch(wisdomUpdate(base)),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(AbilityScoresContainer)