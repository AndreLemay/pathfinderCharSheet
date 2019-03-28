import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../../store/types";
import { charismaUpdate } from "../../store/actions/abilityScoreActions";
import { getCharismaBonus, getAdditionalCharisma } from "../../store/selectors/abilityScoreSelectors";
import { AbilityScoreProps } from "../../api/componentPropTypes";

interface OwnProps {
    className?: string
    abilityScoreComponent: React.SFC<AbilityScoreProps>
}

interface StateProps {
    baseCha: number
    addCha: number
    chaBonus: number
}

interface DispatchProps {
    chaChange: (val: number) => void
}

type AbilityScoresContainerProps = StateProps & DispatchProps & OwnProps

class AbilityScoresContainer extends React.Component<AbilityScoresContainerProps> {
    render() {
        return React.createElement(this.props.abilityScoreComponent, {
            label: "CHA",
            className: this.props.className,
            base: this.props.baseCha,
            additional: this.props.addCha,
            bonus: this.props.chaBonus,
            baseChange: this.props.chaChange
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        baseCha: state.abilities.charisma,
        addCha: getAdditionalCharisma(state),
        chaBonus: getCharismaBonus(state),
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        chaChange: base => dispatch(charismaUpdate(base)),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(AbilityScoresContainer)