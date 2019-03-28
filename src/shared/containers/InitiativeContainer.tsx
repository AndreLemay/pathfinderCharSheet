import * as React from "react"
import { connect } from "react-redux"
import CharacterSheetState from "../store/types";
import { getInitiative, getMiscInitiative } from "../store/selectors/initiativeSelectors";
import { getDexterityBonus } from "../store/selectors/abilityScoreSelectors";
import { InitiativeProps } from "../api/componentPropTypes";

interface OwnProps {
    className?: string
    initiativeComponent: React.SFC<InitiativeProps>
}

interface StateProps {
    initiative: number
    dexBonus: number
    miscInitiative: number
}

type InitiativeContainerProps = StateProps & OwnProps

class InitiativeContainer extends React.Component<InitiativeContainerProps> {
    render() {
        return React.createElement(this.props.initiativeComponent, {
            className: this.props.className,
            initiative: this.props.initiative,
            dexBonus: this.props.dexBonus,
            miscBonus: this.props.miscInitiative
        })
    }
}

function mapStateToProps(state: CharacterSheetState): StateProps {
    return {
        initiative: getInitiative(state),
        dexBonus: getDexterityBonus(state),
        miscInitiative: getMiscInitiative(state)
    }
}

export default connect(mapStateToProps)(InitiativeContainer)